'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Heart, ChevronDown, ChevronRight } from 'lucide-react';

// Deployed Google Apps Script endpoint (env var overrides if set).
// Drives both the RSVP POST and the name lookup GET.
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwjbQgc2IKQxT8aafz4x0qeA5uZS7NvfG8dILClUwgNp0nfzRiTXoZQI7UFskI6qbWPjQ/exec';

interface LookupResult {
  ok: boolean;
  nameKey: string;
  alreadyRSVPd?: boolean;
  existingAttending?: string;
  found?: boolean;
  allowedEvents?: string[];
}

/**
 * Canonical name key. MUST stay byte-for-byte identical to normalizeName in
 * apps-script/Code.gs — the duplicate/allow-list lookup compares the two.
 */
function normalizeNameClient(first: string, last: string) {
  return [first, last]
    .join(' ')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

// JSONP fallback: Apps Script GET reads are flaky cross-origin in some browsers,
// so we run this in parallel with a plain fetch (see lookupGuest) rather than
// waiting for the fetch to fail first — a Google Apps Script round trip alone
// already costs ~2-4s, so running fallback attempts sequentially can leave a
// guest waiting 5-8s instead of the ~2-4s a single successful attempt takes.
let jsonpCounter = 0;
function startJsonp(url: string, timeoutMs: number) {
  const cb = `__rsvpLookup${jsonpCounter++}`;
  const script = document.createElement('script');
  let settled = false;
  let timer: ReturnType<typeof setTimeout>;
  const cleanup = () => {
    delete (window as unknown as Record<string, unknown>)[cb];
    script.remove();
    clearTimeout(timer);
  };
  const promise = new Promise<LookupResult>((resolve, reject) => {
    timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('jsonp timeout'));
    }, timeoutMs);
    (window as unknown as Record<string, unknown>)[cb] = (data: LookupResult) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('jsonp error'));
    };
    script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${cb}`;
    document.body.appendChild(script);
  });
  return {
    promise,
    cancel: () => {
      if (settled) return;
      settled = true;
      cleanup();
    },
  };
}

// Resolves with the first promise to succeed; rejects only if all of them fail.
function firstSuccess<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    let remaining = promises.length;
    let lastError: unknown;
    promises.forEach((p) => {
      p.then(resolve).catch((err) => {
        lastError = err;
        remaining -= 1;
        if (remaining === 0) reject(lastError);
      });
    });
  });
}

// Look up a name: race a readable fetch GET against a JSONP request, and take
// whichever answers first — instead of trying one, waiting for it to fail,
// then starting the other.
async function lookupGuest(
  first: string,
  last: string,
  signal: AbortSignal
): Promise<LookupResult> {
  const params = new URLSearchParams({
    action: 'lookup',
    firstName: first,
    lastName: last,
  });
  const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;

  const fetchCtrl = new AbortController();
  const onOuterAbort = () => fetchCtrl.abort();
  signal.addEventListener('abort', onOuterAbort);

  const fetchAttempt = fetch(url, { method: 'GET', signal: fetchCtrl.signal }).then((res) => {
    if (!res.ok) throw new Error(`status ${res.status}`);
    return res.json() as Promise<LookupResult>;
  });
  const jsonp = startJsonp(url, 8000);

  try {
    return await firstSuccess([fetchAttempt, jsonp.promise]);
  } finally {
    fetchCtrl.abort();
    jsonp.cancel();
    signal.removeEventListener('abort', onOuterAbort);
  }
}

interface Guest {
  firstName: string;
  lastName: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  attending: string;
  guestCount: string;
  guests: Guest[];
  selectedEvents: string[];
  message: string;
}

// Event structure
const EVENTS = {
  bangalore: {
    label: 'All Bangalore Events',
    events: [
      { id: 'cocktail', label: 'Cocktail Party' },
      { id: 'reception', label: 'Pre Wedding Dinner' },
    ],
  },
  kolkata: {
    label: 'All Kolkata Events',
    events: [
      { id: 'mehendi', label: 'Mehendi' },
      { id: 'haldi', label: 'Haldi' },
      { id: 'yaar-di-shaadi', label: 'Yaar Di Shaadi' },
    ],
  },
};

const ALL_EVENT_IDS = [
  ...EVENTS.bangalore.events.map(e => e.id),
  ...EVENTS.kolkata.events.map(e => e.id),
];

// Confetti particle component
function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{
        backgroundColor: color,
        left: `${randomX}%`,
        top: '-10px',
      }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, 400],
        opacity: [1, 1, 0],
        rotate: [0, randomRotation + 360],
        x: [0, (Math.random() - 0.5) * 100],
        scale: [1, 0.5],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Confetti component
function Confetti() {
  const colors = ['#E8D5D3', '#7BA3B5', '#C9B896', '#F8F0EE', '#A8D5BA'];
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((particle) => (
        <ConfettiParticle key={particle.id} delay={particle.delay} color={particle.color} />
      ))}
    </div>
  );
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    attending: '',
    guestCount: '1',
    guests: [],
    selectedEvents: [],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [alreadyRSVPd, setAlreadyRSVPd] = useState(false);
  const [allowedEvents, setAllowedEvents] = useState<string[]>(ALL_EVENT_IDS);

  // Debounced lookup: once both names are present, ask the backend whether this
  // person already RSVP'd and which events they're invited to.
  useEffect(() => {
    const f = formData.firstName.trim();
    const l = formData.lastName.trim();
    if (!f || !l) {
      setLookupStatus('idle');
      setAlreadyRSVPd(false);
      setAllowedEvents(ALL_EVENT_IDS);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLookupStatus('loading');
      try {
        const data = await lookupGuest(f, l, ctrl.signal);
        // Discard stale results from rapid typing — only honor the response whose
        // key matches what's currently in the name fields.
        if (data.nameKey !== normalizeNameClient(f, l)) return;
        setAlreadyRSVPd(!!data.alreadyRSVPd);
        // Fail-open: show all events unless the guest was matched to the invite list.
        setAllowedEvents(data.found && data.allowedEvents?.length ? data.allowedEvents : ALL_EVENT_IDS);
        setLookupStatus('done');
      } catch {
        if (!ctrl.signal.aborted) setLookupStatus('error'); // fail-open: never block submit
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [formData.firstName, formData.lastName]);

  // Allow-list view over the static EVENTS (never mutate the const).
  const allowedSet = useMemo(() => new Set(allowedEvents), [allowedEvents]);
  const visibleEvents = useMemo(() => {
    const out: Record<string, { label: string; events: { id: string; label: string }[] }> = {};
    (Object.keys(EVENTS) as (keyof typeof EVENTS)[]).forEach((cityKey) => {
      const city = EVENTS[cityKey];
      const events = city.events.filter((e) => allowedSet.has(e.id));
      if (events.length) out[cityKey] = { label: city.label, events };
    });
    return out;
  }, [allowedSet]);
  const visibleEventIds = useMemo(
    () => Object.values(visibleEvents).flatMap((c) => c.events.map((e) => e.id)),
    [visibleEvents]
  );

  // Drop any selected events that are no longer allowed after a lookup narrows the list.
  useEffect(() => {
    setFormData((prev) => {
      const pruned = prev.selectedEvents.filter((id) => allowedSet.has(id));
      return pruned.length === prev.selectedEvents.length ? prev : { ...prev, selectedEvents: pruned };
    });
  }, [allowedSet]);

  // Update guests array when guestCount changes
  useEffect(() => {
    const count = parseInt(formData.guestCount);
    const additionalGuests = count - 1; // Subtract 1 for the main person

    setFormData((prev) => {
      const currentGuests = prev.guests;
      if (additionalGuests > currentGuests.length) {
        // Add more guest slots
        const newGuests = [...currentGuests];
        for (let i = currentGuests.length; i < additionalGuests; i++) {
          newGuests.push({ firstName: '', lastName: '' });
        }
        return { ...prev, guests: newGuests };
      } else if (additionalGuests < currentGuests.length) {
        // Remove extra guest slots
        return { ...prev, guests: currentGuests.slice(0, additionalGuests) };
      }
      return prev;
    });
  }, [formData.guestCount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    setFormData((prev) => {
      const newGuests = [...prev.guests];
      newGuests[index] = { ...newGuests[index], [field]: value };
      return { ...prev, guests: newGuests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadyRSVPd) return; // defense in depth — submit is also disabled below
    setStatus('loading');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          attending: formData.attending,
          guestCount: formData.guestCount,
          guestNames: formData.guests.map(g => `${g.firstName} ${g.lastName}`).join(', '),
          events: formData.selectedEvents.join(', '),
          message: formData.message,
        }),
      });

      // With no-cors mode, we can't read the response, so we assume success
      // The Google Script handles duplicates on its end
      setStatus('success');
      // Show confetti only if attending
      if (formData.attending === 'Joyfully Accepts') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        attending: '',
        guestCount: '1',
        guests: [],
        selectedEvents: [],
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6 rounded-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(250, 248, 245, 0.98), rgba(232, 213, 211, 0.3))',
          border: '1px solid rgba(201, 184, 150, 0.4)',
        }}
      >
        {showConfetti && <Confetti />}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10"
        >
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(123, 163, 181, 0.15)',
              border: '2px solid #7BA3B5',
            }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: '#7BA3B5' }} />
          </div>
        </motion.div>
        <h3
          className="text-2xl font-script mb-2 relative z-10"
          style={{ color: '#3D3D3D' }}
        >
          Thank You!
        </h3>
        <p className="relative z-10" style={{ color: '#6B6B6B' }}>
          Your RSVP has been received. We can&apos;t wait to celebrate with you!
        </p>
        <motion.div
          className="flex items-center justify-center gap-3 mt-4 relative z-10"
        >
          <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
          <span style={{ color: '#7BA3B5' }}>Deepi & Harsh</span>
          <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-lg"
          style={{
            background: 'rgba(232, 213, 211, 0.3)',
            border: '1px solid rgba(232, 213, 211, 0.6)',
          }}
        >
          <AlertCircle className="w-5 h-5" style={{ color: '#7BA3B5' }} />
          <p className="text-sm" style={{ color: '#3D3D3D' }}>
            Something went wrong. Please try again or contact us directly.
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="input-elegant w-full"
            placeholder="Your first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="input-elegant w-full"
            placeholder="Your last name"
          />
        </div>
      </div>

      {/* Name lookup status */}
      {lookupStatus === 'loading' && (
        <p className="text-sm flex items-center gap-2" style={{ color: '#6B6B6B' }}>
          <span
            className="w-4 h-4 rounded-full inline-block animate-spin"
            style={{
              border: '2px solid rgba(123, 163, 181, 0.3)',
              borderTopColor: '#7BA3B5',
            }}
          />
          Checking your invitation…
        </p>
      )}
      {alreadyRSVPd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: 'easeOut' as const }}
          className="flex items-start gap-3 p-4 rounded-lg"
          style={{
            background: 'rgba(232, 213, 211, 0.3)',
            border: '1px solid rgba(232, 213, 211, 0.6)',
          }}
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#7BA3B5' }} />
          <p className="text-sm" style={{ color: '#3D3D3D' }}>
            We&apos;ve already received your RSVP! To make any changes, please reach out to Harsh or Deepika directly.
          </p>
        </motion.div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input-elegant w-full"
          placeholder="your@email.com"
        />
      </div>

      {/* Attending */}
      <div>
        <label className="block text-sm font-medium mb-3" style={{ color: '#3D3D3D' }}>
          Will you be attending? *
        </label>
        <div className="flex flex-wrap gap-4">
          {['Joyfully Accepts', 'Regretfully Declines'].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-4 sm:px-5 sm:py-3 rounded-lg cursor-pointer transition-all min-h-[48px]`}
              style={{
                background: formData.attending === option
                  ? 'rgba(123, 163, 181, 0.15)'
                  : 'rgba(255, 254, 249, 0.9)',
                border: formData.attending === option
                  ? '2px solid #7BA3B5'
                  : '1px solid rgba(201, 184, 150, 0.4)',
              }}
            >
              <input
                type="radio"
                name="attending"
                value={option}
                checked={formData.attending === option}
                onChange={handleChange}
                className="w-4 h-4"
                style={{ accentColor: '#7BA3B5' }}
              />
              <span style={{ color: '#3D3D3D' }}>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {formData.attending === 'Joyfully Accepts' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-6"
        >
          {/* +1 toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.guestCount === '2'}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, guestCount: e.target.checked ? '2' : '1' }))
                }
                className="w-4 h-4 rounded"
                style={{ accentColor: '#7BA3B5' }}
              />
              <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>
                I&apos;m bringing a guest (+1)
              </span>
            </label>
          </div>

          {/* Additional Guest Names */}
          <AnimatePresence>
            {formData.guests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {formData.guests.map((guest, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg"
                    style={{
                      background: 'rgba(255, 254, 249, 0.9)',
                      border: '1px solid rgba(201, 184, 150, 0.4)',
                    }}
                  >
                    <p className="text-sm font-medium mb-3" style={{ color: '#7BA3B5' }}>
                      Your guest (+1)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`guest-${index}-firstName`}
                          className="block text-sm font-medium mb-2"
                          style={{ color: '#3D3D3D' }}
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id={`guest-${index}-firstName`}
                          required
                          value={guest.firstName}
                          onChange={(e) => handleGuestChange(index, 'firstName', e.target.value)}
                          className="input-elegant w-full"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`guest-${index}-lastName`}
                          className="block text-sm font-medium mb-2"
                          style={{ color: '#3D3D3D' }}
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id={`guest-${index}-lastName`}
                          required
                          value={guest.lastName}
                          onChange={(e) => handleGuestChange(index, 'lastName', e.target.value)}
                          className="input-elegant w-full"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: '#3D3D3D' }}>
              Which events will you be attending?
            </label>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'rgba(255, 254, 249, 0.9)',
                border: '1px solid rgba(201, 184, 150, 0.4)',
              }}
            >
              {/* All Events */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newExpanded = new Set(expandedSections);
                      if (newExpanded.has('all')) {
                        newExpanded.delete('all');
                      } else {
                        newExpanded.add('all');
                      }
                      setExpandedSections(newExpanded);
                    }}
                    className="p-2.5 -ml-2.5 rounded hover:bg-gray-100 transition-colors"
                  >
                    {expandedSections.has('all') ? (
                      <ChevronDown className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                    ) : (
                      <ChevronRight className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                    )}
                  </button>
                  <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={
                        visibleEventIds.length > 0 &&
                        formData.selectedEvents.length === visibleEventIds.length
                      }
                      ref={(el) => {
                        if (el) {
                          el.indeterminate =
                            formData.selectedEvents.length > 0 &&
                            formData.selectedEvents.length < visibleEventIds.length;
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({ ...prev, selectedEvents: [...visibleEventIds] }));
                        } else {
                          setFormData((prev) => ({ ...prev, selectedEvents: [] }));
                        }
                      }}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#7BA3B5' }}
                    />
                    <span className="font-medium" style={{ color: '#3D3D3D' }}>All Events</span>
                  </label>
                </div>

                {/* City sections */}
                <AnimatePresence>
                  {expandedSections.has('all') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 sm:ml-6 space-y-2 overflow-hidden"
                    >
                      {Object.entries(visibleEvents).map(([cityKey, city]) => {
                        const cityEventIds = city.events.map((e) => e.id);
                        const selectedCityEvents = formData.selectedEvents.filter((id) =>
                          cityEventIds.includes(id)
                        );
                        const allCitySelected = selectedCityEvents.length === cityEventIds.length;
                        const someCitySelected = selectedCityEvents.length > 0 && !allCitySelected;

                        return (
                          <div key={cityKey} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const newExpanded = new Set(expandedSections);
                                  if (newExpanded.has(cityKey)) {
                                    newExpanded.delete(cityKey);
                                  } else {
                                    newExpanded.add(cityKey);
                                  }
                                  setExpandedSections(newExpanded);
                                }}
                                className="p-2.5 -ml-2.5 rounded hover:bg-gray-100 transition-colors"
                              >
                                {expandedSections.has(cityKey) ? (
                                  <ChevronDown className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                                ) : (
                                  <ChevronRight className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                                )}
                              </button>
                              <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
                                <input
                                  type="checkbox"
                                  checked={allCitySelected}
                                  ref={(el) => {
                                    if (el) {
                                      el.indeterminate = someCitySelected;
                                    }
                                  }}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData((prev) => ({
                                        ...prev,
                                        selectedEvents: Array.from(
                                          new Set([...prev.selectedEvents, ...cityEventIds])
                                        ),
                                      }));
                                    } else {
                                      setFormData((prev) => ({
                                        ...prev,
                                        selectedEvents: prev.selectedEvents.filter(
                                          (id) => !cityEventIds.includes(id)
                                        ),
                                      }));
                                    }
                                  }}
                                  className="w-5 h-5 rounded"
                                  style={{ accentColor: '#7BA3B5' }}
                                />
                                <span style={{ color: '#3D3D3D' }}>{city.label}</span>
                              </label>
                            </div>

                            {/* Individual events */}
                            <AnimatePresence>
                              {expandedSections.has(cityKey) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-6 sm:ml-10 space-y-1 overflow-hidden"
                                >
                                  {city.events.map((event) => (
                                    <label
                                      key={event.id}
                                      className="flex items-center gap-3 cursor-pointer py-2 min-h-[44px]"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={formData.selectedEvents.includes(event.id)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setFormData((prev) => ({
                                              ...prev,
                                              selectedEvents: [...prev.selectedEvents, event.id],
                                            }));
                                          } else {
                                            setFormData((prev) => ({
                                              ...prev,
                                              selectedEvents: prev.selectedEvents.filter(
                                                (id) => id !== event.id
                                              ),
                                            }));
                                          }
                                        }}
                                        className="w-5 h-5 rounded"
                                        style={{ accentColor: '#7BA3B5' }}
                                      />
                                      <span style={{ color: '#6B6B6B' }}>{event.label}</span>
                                    </label>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
          Message for the Couple (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="input-elegant w-full resize-none"
          placeholder="Share your well wishes..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === 'loading' || alreadyRSVPd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-dusty-blue w-full md:w-auto px-10 py-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 rounded-full"
              style={{ border: '2px solid rgba(255, 254, 249, 0.3)', borderTopColor: '#FFFEF9' }}
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send RSVP
          </>
        )}
      </motion.button>
    </form>
  );
}
