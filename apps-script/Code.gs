/**
 * RSVP backend for the Deepika & Harsh wedding site.
 *
 * THIS FILE IS VERSION CONTROL ONLY. Apps Script does not pull from this repo.
 * To apply changes: open the Apps Script editor bound to the RSVP Google Sheet,
 * paste this file over Code.gs, then Deploy > Manage deployments > (edit the
 * existing web app) > New version. Re-deploying as a NEW VERSION of the SAME
 * deployment keeps the /exec URL stable so the committed default in
 * components/RSVPForm.tsx keeps working.
 *
 * Sheet model (two tabs):
 *  - "Responses"  : submissions. Columns, in order:
 *      timestamp, email, firstName, lastName, attending, guestCount,
 *      guestNames, events, message, nameKey
 *    (nameKey is a helper column holding the normalized name for dedupe/lookup.)
 *  - "InviteList" : the allow-list. Columns:
 *      firstName, lastName, allowedEvents
 *    allowedEvents is a comma-separated list of event ids, or "ALL".
 */

var RESPONSES_SHEET = 'Responses';
var INVITE_SHEET = 'InviteList';

// Column positions (0-based) in the Responses tab, matching the append order in
// doPost. Used instead of header-name lookup so dedupe works whether or not the
// sheet has a header row.
var FIRST_NAME_COL = 2;
var LAST_NAME_COL = 3;
var ATTENDING_COL = 4;

function ALL_EVENT_IDS() {
  return ['cocktail', 'reception', 'mehendi', 'haldi', 'yaar-di-shaadi'];
}

/**
 * The tab RSVPs are written to. Prefers a tab literally named "Responses", but
 * falls back to the first tab that isn't the invite list — so it works no matter
 * what the original RSVP tab was named (Sheet1, RSVPs, "Form Responses 1", ...).
 */
function getResponsesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(RESPONSES_SHEET);
  if (sheet) return sheet;
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== INVITE_SHEET) return sheets[i];
  }
  return sheets[0];
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
      for (var i = 0; i < rows.length; i++) {
        if (normalizeName(rows[i][FIRST_NAME_COL], rows[i][LAST_NAME_COL]) === key) {
          out.alreadyRSVPd = true;
          out.existingAttending = rows[i][ATTENDING_COL];
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
      var ih = ir[0];
      var ifI = ih.indexOf('firstName');
      var ilI = ih.indexOf('lastName');
      var ieI = ih.indexOf('allowedEvents');
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

  return respond(out, p.callback);
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
    var key = normalizeName(data.firstName, data.lastName);
    var sheet = getResponsesSheet();

    var row = [
      data.timestamp || new Date().toISOString(),
      data.email,
      data.firstName,
      data.lastName,
      data.attending,
      data.guestCount,
      data.guestNames,
      data.events,
      data.message,
      key
    ];

    var values = sheet.getLastRow() > 0 ? sheet.getDataRange().getValues() : [];
    var matchRow = -1;
    for (var i = 0; i < values.length; i++) {
      if (normalizeName(values[i][FIRST_NAME_COL], values[i][LAST_NAME_COL]) === key) {
        matchRow = i + 1; // 1-based sheet row
        break;
      }
    }

    if (matchRow > 0) {
      sheet.getRange(matchRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return respond({ ok: true, upserted: matchRow > 0 }, e.parameter && e.parameter.callback);
  } catch (err) {
    return respond({ ok: false, error: String(err) }, null);
  } finally {
    lock.releaseLock();
  }
}
