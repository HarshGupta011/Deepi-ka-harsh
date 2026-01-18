'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Heart, ChevronDown, ChevronRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  attending: string;
  guestCount: string;
  selectedEvents: string[];
  message: string;
}

// Event structure
const EVENTS = {
  bangalore: {
    label: 'All Bangalore Events',
    events: [
      { id: 'cocktail', label: 'Cocktail Party' },
      { id: 'reception', label: 'Reception' },
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
    name: '',
    email: '',
    attending: '',
    guestCount: '1',
    selectedEvents: [],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // Show confetti only if attending
        if (formData.attending === 'Joyfully Accepts') {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        setFormData({
          name: '',
          email: '',
          attending: '',
          guestCount: '1',
          selectedEvents: [],
          message: '',
        });
      } else {
        setStatus('error');
      }
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
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-elegant w-full"
            placeholder="Your full name"
          />
        </div>

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
              className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all`}
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
          {/* Guest Count */}
          <div>
            <label htmlFor="guestCount" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
              Number of Guests
            </label>
            <select
              id="guestCount"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              className="input-elegant w-full md:w-48"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

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
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    {expandedSections.has('all') ? (
                      <ChevronDown className="w-4 h-4" style={{ color: '#7BA3B5' }} />
                    ) : (
                      <ChevronRight className="w-4 h-4" style={{ color: '#7BA3B5' }} />
                    )}
                  </button>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedEvents.length === ALL_EVENT_IDS.length}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate =
                            formData.selectedEvents.length > 0 &&
                            formData.selectedEvents.length < ALL_EVENT_IDS.length;
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({ ...prev, selectedEvents: [...ALL_EVENT_IDS] }));
                        } else {
                          setFormData((prev) => ({ ...prev, selectedEvents: [] }));
                        }
                      }}
                      className="w-4 h-4 rounded"
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
                      className="ml-6 space-y-2 overflow-hidden"
                    >
                      {Object.entries(EVENTS).map(([cityKey, city]) => {
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
                                className="p-1 rounded hover:bg-gray-100 transition-colors"
                              >
                                {expandedSections.has(cityKey) ? (
                                  <ChevronDown className="w-4 h-4" style={{ color: '#7BA3B5' }} />
                                ) : (
                                  <ChevronRight className="w-4 h-4" style={{ color: '#7BA3B5' }} />
                                )}
                              </button>
                              <label className="flex items-center gap-2 cursor-pointer">
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
                                        selectedEvents: [
                                          ...new Set([...prev.selectedEvents, ...cityEventIds]),
                                        ],
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
                                  className="w-4 h-4 rounded"
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
                                  className="ml-10 space-y-1 overflow-hidden"
                                >
                                  {city.events.map((event) => (
                                    <label
                                      key={event.id}
                                      className="flex items-center gap-2 cursor-pointer py-1"
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
                                        className="w-4 h-4 rounded"
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
        disabled={status === 'loading'}
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
