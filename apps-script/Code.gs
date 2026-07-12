/**
 * RSVP + guest-recommendations backend for the Deepika & Harsh wedding site.
 *
 * THIS FILE IS VERSION CONTROL ONLY. Apps Script does not pull from this repo.
 * To apply changes: open the Apps Script editor bound to the RSVP Google Sheet,
 * paste this file over Code.gs, then Deploy > Manage deployments > (edit the
 * existing web app) > New version. Re-deploying as a NEW VERSION of the SAME
 * deployment keeps the /exec URL stable so the committed default in
 * components/RSVPForm.tsx and lib/recommendations.ts keeps working.
 *
 * Sheet model:
 *  - responses tab (named "RSVPs" / "Responses" / whatever): one row per
 *    submission. The script matches values to columns BY HEADER NAME (row 1),
 *    so the column order can be anything. Recognized headers (case/space/
 *    punctuation-insensitive): Timestamp, First Name, Last Name, Email,
 *    Attending, Guest Count, Guest Names, Events, Message, nameKey.
 *    (nameKey is an optional helper column holding the normalized name.)
 *  - "InviteList": the allow-list. Headers: First Name, Last Name, Allowed Events.
 *    Allowed Events is a comma-separated list of event ids, or "ALL".
 *  - "Recommendations": guest-submitted recommendations. Headers: id, city,
 *    title, body, author_name, created_at. Created automatically on first
 *    submission if missing.
 *  - "Replies": replies to recommendations. Headers: id, recommendation_id,
 *    body, author_name, created_at. Created automatically on first submission
 *    if missing.
 */

var RESPONSES_SHEET_NAMES = ['RSVPs', 'Responses'];
var INVITE_SHEET = 'InviteList';
var RECOMMENDATIONS_SHEET = 'Recommendations';
var REPLIES_SHEET = 'Replies';
var RECOMMENDATIONS_HEADER = ['id', 'city', 'title', 'body', 'author_name', 'created_at'];
var REPLIES_HEADER = ['id', 'recommendation_id', 'body', 'author_name', 'created_at'];

function ALL_EVENT_IDS() {
  return ['cocktail', 'reception', 'mehendi', 'haldi', 'yaar-di-shaadi'];
}

// Event id -> human label, mirroring the EVENTS const in components/RSVPForm.tsx.
// Used to render readable event names in the confirmation email.
var EVENT_LABELS = {
  'cocktail': 'Cocktail Party',
  'reception': 'Reception',
  'mehendi': 'Mehendi',
  'haldi': 'Haldi',
  'yaar-di-shaadi': 'Yaar Di Shaadi'
};

// Reply-to / contact address shown on confirmation emails.
var COUPLE_CONTACT_EMAIL = 'deepika23shekar@gmail.com';

// Font stacks for the email. Body mirrors the website (Source Code Pro). The
// site's handwritten script heading renders poorly in mail clients, so the
// heading uses Playfair Display — an elegant serif also imported by the site
// (app/globals.css). Clients that support web fonts (Apple Mail, iOS Mail) load
// these via @import; Gmail strips them and uses the fallbacks, so each stack
// ends in a safe system fallback.
var FONT_HEADING = "'Playfair Display', Georgia, 'Times New Roman', serif";
var FONT_BODY = "'Source Code Pro', 'Courier New', Consolas, monospace";
var FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Source+Code+Pro:wght@300;400;500&display=swap');";

/**
 * The tab RSVPs are written to. Prefers a tab named "RSVPs"/"Responses", but
 * falls back to the first tab that isn't the invite list — so it works no matter
 * what the responses tab is named.
 */
function getResponsesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var n = 0; n < RESPONSES_SHEET_NAMES.length; n++) {
    var s = ss.getSheetByName(RESPONSES_SHEET_NAMES[n]);
    if (s) return s;
  }
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== INVITE_SHEET) return sheets[i];
  }
  return sheets[0];
}

// Header text -> a loose key so "First Name", "firstName", "first_name" all match.
function headerKey(h) {
  return String(h == null ? '' : h).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Build { looseHeader: columnIndex } from a header row.
function headerMap(header) {
  var m = {};
  if (header) {
    for (var i = 0; i < header.length; i++) m[headerKey(header[i])] = i;
  }
  return m;
}

/**
 * Canonical name key. MUST stay byte-for-byte identical to normalizeNameClient
 * in components/RSVPForm.tsx — the duplicate/allow-list lookup compares the two.
 */
function normalizeName(first, last) {
  return [first, last]
    .map(function (s) { return s == null ? '' : String(s); })
    .join(' ')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/** Gets (creating + header-seeding if needed) a tab by name. */
function getOrCreateSheet(name, header) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    s.appendRow(header);
  }
  return s;
}

/** Reads a header-mapped sheet into an array of plain objects. */
function readSheetAsObjects(sheet, header) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  var rows = sheet.getDataRange().getValues();
  var m = headerMap(rows[0]);
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    var obj = {};
    for (var c = 0; c < header.length; c++) {
      var idx = m.hasOwnProperty(headerKey(header[c])) ? m[headerKey(header[c])] : c;
      obj[header[c]] = rows[i][idx];
    }
    out.push(obj);
  }
  return out;
}

/** JSONP-aware responder shared by doGet/doPost. */
function respond(obj, callback) {
  var json = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Read endpoint. ?action=lookup&firstName=&lastName=&callback=
 * Answers both features in one round-trip:
 *   { ok, nameKey, alreadyRSVPd, existingAttending, found, allowedEvents }
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var out = { ok: true };

  if (p.action === 'lookup') {
    var key = normalizeName(p.firstName, p.lastName);
    out.nameKey = key;

    if (!key) {
      out.ok = false;
      out.error = 'empty_name';
      return respond(out, p.callback);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Feature 1: duplicate check against the responses tab.
    out.alreadyRSVPd = false;
    out.existingAttending = '';
    var resp = getResponsesSheet();
    if (resp && resp.getLastRow() > 0) {
      var rows = resp.getDataRange().getValues();
      var rm = headerMap(rows[0]);
      var fI = rm.hasOwnProperty('firstname') ? rm.firstname : 1;
      var lI = rm.hasOwnProperty('lastname') ? rm.lastname : 2;
      var aI = rm.hasOwnProperty('attending') ? rm.attending : 4;
      for (var i = 0; i < rows.length; i++) {
        if (normalizeName(rows[i][fI], rows[i][lI]) === key) {
          out.alreadyRSVPd = true;
          out.existingAttending = rows[i][aI];
          break;
        }
      }
    }

    // Feature 2: invite-list lookup.
    out.found = false;
    out.allowedEvents = [];
    var inv = ss.getSheetByName(INVITE_SHEET);
    if (inv && inv.getLastRow() > 1) {
      var ir = inv.getDataRange().getValues();
      var im = headerMap(ir[0]);
      var ifI = im.hasOwnProperty('firstname') ? im.firstname : 0;
      var ilI = im.hasOwnProperty('lastname') ? im.lastname : 1;
      var ieI = im.hasOwnProperty('allowedevents') ? im.allowedevents : 2;
      for (var j = 1; j < ir.length; j++) {
        if (normalizeName(ir[j][ifI], ir[j][ilI]) === key) {
          out.found = true;
          var raw = String(ir[j][ieI] || '').trim();
          if (raw.toUpperCase() === 'ALL' || raw === '') {
            out.allowedEvents = ALL_EVENT_IDS();
          } else {
            out.allowedEvents = raw.split(',')
              .map(function (s) { return s.trim(); })
              .filter(function (s) { return s.length > 0; });
          }
          break;
        }
      }
    }
  }

  if (p.action === 'listRecommendations') {
    var recSheet = getOrCreateSheet(RECOMMENDATIONS_SHEET, RECOMMENDATIONS_HEADER);
    var replySheet = getOrCreateSheet(REPLIES_SHEET, REPLIES_HEADER);
    out.recommendations = readSheetAsObjects(recSheet, RECOMMENDATIONS_HEADER)
      .sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); });
    out.replies = readSheetAsObjects(replySheet, REPLIES_HEADER);
  }

  return respond(out, p.callback);
}

// Map a submission's fields to a row aligned to the sheet's header columns.
// Falls back to a fixed order (Timestamp, First, Last, Email, Attending, ...)
// only if the sheet has no recognizable header.
function buildRow(data, key, header) {
  var fields = {
    timestamp: data.timestamp || new Date().toISOString(),
    firstname: data.firstName,
    lastname: data.lastName,
    email: data.email,
    attending: data.attending,
    guestcount: data.guestCount,
    guestnames: data.guestNames,
    events: data.events,
    message: data.message,
    namekey: key
  };
  if (header && headerMap(header).hasOwnProperty('firstname')) {
    return header.map(function (h) {
      var k = headerKey(h);
      return fields.hasOwnProperty(k) ? fields[k] : '';
    });
  }
  return [fields.timestamp, fields.firstname, fields.lastname, fields.email,
          fields.attending, fields.guestcount, fields.guestnames, fields.events,
          fields.message, fields.namekey];
}

/**
 * Write endpoint. Upserts by normalized name (most-recent-wins) so a guest who
 * RSVPs twice produces one row, not two. LockService serializes concurrent
 * submits to avoid a double-append race.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.type === 'recommendation') {
      var recSheet = getOrCreateSheet(RECOMMENDATIONS_SHEET, RECOMMENDATIONS_HEADER);
      recSheet.appendRow([
        Utilities.getUuid(),
        data.city,
        data.title,
        data.body,
        data.author_name,
        new Date().toISOString()
      ]);
      return respond({ ok: true }, e.parameter && e.parameter.callback);
    }

    if (data.type === 'reply') {
      var replySheet = getOrCreateSheet(REPLIES_SHEET, REPLIES_HEADER);
      replySheet.appendRow([
        Utilities.getUuid(),
        data.recommendation_id,
        data.body,
        data.author_name,
        new Date().toISOString()
      ]);
      return respond({ ok: true }, e.parameter && e.parameter.callback);
    }

    var key = normalizeName(data.firstName, data.lastName);
    var sheet = getResponsesSheet();

    var values = sheet.getLastRow() > 0 ? sheet.getDataRange().getValues() : [];
    var header = values.length ? values[0] : null;
    var m = headerMap(header);
    var fI = m.hasOwnProperty('firstname') ? m.firstname : 1;
    var lI = m.hasOwnProperty('lastname') ? m.lastname : 2;

    var matchRow = -1;
    for (var i = 0; i < values.length; i++) {
      if (normalizeName(values[i][fI], values[i][lI]) === key) {
        matchRow = i + 1; // 1-based sheet row
        break;
      }
    }

    var row = buildRow(data, key, header);
    if (matchRow > 0) {
      sheet.getRange(matchRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    sendConfirmationEmail(data); // self-guards; never throws

    return respond({ ok: true, upserted: matchRow > 0 }, e.parameter && e.parameter.callback);
  } catch (err) {
    return respond({ ok: false, error: String(err) }, null);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sends a branded HTML confirmation email to the (primary) guest after an RSVP.
 * Self-contained and fail-safe: it validates the address and swallows any send
 * error (quota, transient failure) so a mail problem can never break the RSVP
 * write or change the doPost response. Attendees get an event list; decliners
 * get a short "we'll miss you" note. Called for every successful submit, so a
 * re-RSVP (upsert) also re-confirms.
 */
function sendConfirmationEmail(data) {
  try {
    var email = data && data.email ? String(data.email).trim() : '';
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;

    var first = data.firstName ? String(data.firstName).trim() : '';
    var greeting = first ? 'Dear ' + escapeHtml(first) + ',' : 'Hello,';
    var attending = String(data.attending || '');
    var isAttending = attending === 'Joyfully Accepts';

    // Readable event labels from the comma-separated ids.
    var eventLabels = String(data.events || '').split(',')
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; })
      .map(function (id) { return EVENT_LABELS[id] || id; });

    var plusOne = String(data.guestCount || '') === '2';
    var plusOneName = String(data.guestNames || '').trim();

    var subject, intro, bodyHtml, bodyText;

    if (isAttending) {
      subject = 'Your RSVP is confirmed — Deepika & Harsh';
      intro = 'We are overjoyed that you’ll be celebrating with us! Your RSVP is confirmed. 💛';

      var eventsHtml = '';
      var eventsText = '';
      if (eventLabels.length) {
        var items = eventLabels.map(function (l) {
          return '<li style="margin:0 0 6px 0;">' + escapeHtml(l) + '</li>';
        }).join('');
        eventsHtml =
          '<p style="margin:24px 0 8px 0;font-weight:600;color:#3D3D3D;font-size:15px;font-family:' + FONT_BODY + ';">We’ll see you at:</p>' +
          '<ul style="margin:0;padding-left:20px;color:#3D3D3D;font-size:15px;font-family:' + FONT_BODY + ';">' + items + '</ul>';
        eventsText = '\n\nWe’ll see you at:\n- ' + eventLabels.join('\n- ');
      }

      var plusOneHtml = '';
      var plusOneText = '';
      if (plusOne) {
        var who = plusOneName ? escapeHtml(plusOneName) : 'your +1';
        plusOneHtml = '<p style="margin:16px 0 0 0;color:#3D3D3D;font-size:15px;font-family:' + FONT_BODY + ';">We’ve noted that your guest, <strong>' +
          who + '</strong>, will also be joining us.</p>';
        plusOneText = '\n\nWe’ve noted that your guest, ' + (plusOneName || 'your +1') + ', will also be joining us.';
      }

      bodyHtml = eventsHtml + plusOneHtml +
        '<p style="margin:24px 0 0 0;color:#3D3D3D;font-size:15px;line-height:1.7;font-family:' + FONT_BODY + ';">We can’t wait to make beautiful memories with you. If anything changes, we’d love to hear from you — just reach out to us!</p>';
      bodyText = eventsText + plusOneText +
        '\n\nWe can’t wait to make beautiful memories with you. If anything changes, we’d love to hear from you — just reach out to us!';
    } else {
      subject = 'We’ll miss you — Deepika & Harsh';
      intro = 'Thank you for letting us know. We’re so sorry you won’t be able to join us — you’ll be missed, and we’ll be thinking of you.';
      bodyHtml = '<p style="margin:24px 0 0 0;color:#3D3D3D;font-size:15px;line-height:1.7;font-family:' + FONT_BODY + ';">If your plans change, you’re always welcome — just reach out to us!</p>';
      bodyText = '\n\nIf your plans change, you’re always welcome — just reach out to us!';
    }

    var html =
      '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<style>' + FONT_IMPORT + '</style></head>' +
      '<body style="margin:0;padding:0;background-color:#FBF8F3;">' +
      '<div style="background-color:#FBF8F3;padding:32px 16px;font-family:' + FONT_BODY + ';">' +
        '<div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #ECE4D8;border-radius:12px;overflow:hidden;">' +
          '<div style="background:#FBF8F3;padding:28px 32px;text-align:center;border-bottom:1px solid #ECE4D8;">' +
            '<p style="margin:0;letter-spacing:2px;font-size:12px;color:#B08D57;text-transform:uppercase;font-family:' + FONT_BODY + ';">The Wedding of</p>' +
            '<h1 style="margin:10px 0 0 0;font-size:34px;line-height:1.2;color:#3D3D3D;font-weight:500;letter-spacing:0.5px;font-family:' + FONT_HEADING + ';">Deepika &amp; Harsh</h1>' +
          '</div>' +
          '<div style="padding:32px;font-family:' + FONT_BODY + ';">' +
            '<p style="margin:0 0 16px 0;color:#3D3D3D;font-size:15px;font-family:' + FONT_BODY + ';">' + greeting + '</p>' +
            '<p style="margin:0;color:#3D3D3D;font-size:15px;line-height:1.7;font-family:' + FONT_BODY + ';">' + intro + '</p>' +
            bodyHtml +
            '<p style="margin:32px 0 0 0;color:#3D3D3D;font-size:15px;font-family:' + FONT_BODY + ';">With love,<br/>' +
              '<span style="font-family:' + FONT_HEADING + ';font-size:18px;font-style:italic;color:#3D3D3D;">Deepika &amp; Harsh</span></p>' +
          '</div>' +
          '<div style="background:#FBF8F3;padding:16px 32px;text-align:center;border-top:1px solid #ECE4D8;">' +
            '<p style="margin:0;font-size:12px;color:#9A9A9A;font-family:' + FONT_BODY + ';">This is an automated confirmation. We’d love to hear from you — for any changes, just reach out to us!</p>' +
          '</div>' +
        '</div>' +
      '</div></body></html>';

    var text =
      (first ? 'Dear ' + first + ',' : 'Hello,') + '\n\n' +
      intro +
      bodyText +
      '\n\nWith love,\nDeepika & Harsh';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      name: 'Deepika & Harsh',
      replyTo: COUPLE_CONTACT_EMAIL,
      htmlBody: html,
      body: text
    });
  } catch (mailErr) {
    // Never let a mail failure affect the RSVP write.
    try { console.log('sendConfirmationEmail failed: ' + mailErr); } catch (ignore) {}
  }
}

// Minimal HTML escaping for user-supplied values interpolated into the email.
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
