'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Heart, Music } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  attending: string;
  guestCount: string;
  mealPreference: string;
  dietaryRestrictions: string;
  songRequest: string;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    guestCount: '1',
    mealPreference: '',
    dietaryRestrictions: '',
    songRequest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
        setFormData({
          name: '',
          email: '',
          attending: '',
          guestCount: '1',
          mealPreference: '',
          dietaryRestrictions: '',
          songRequest: '',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="input-elegant w-full"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Meal Preference */}
            <div>
              <label htmlFor="mealPreference" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
                Meal Preference
              </label>
              <select
                id="mealPreference"
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleChange}
                className="input-elegant w-full"
              >
                <option value="">Select an option</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="jain">Jain</option>
              </select>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
              Dietary Restrictions or Allergies
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="input-elegant w-full"
              placeholder="Please list any dietary restrictions"
            />
          </div>

          {/* Song Request */}
          <div>
            <label htmlFor="songRequest" className="block text-sm font-medium mb-2" style={{ color: '#3D3D3D' }}>
              <span className="flex items-center gap-2">
                Song Request
                <Music className="w-4 h-4" style={{ color: '#7BA3B5' }} />
              </span>
            </label>
            <input
              type="text"
              id="songRequest"
              name="songRequest"
              value={formData.songRequest}
              onChange={handleChange}
              className="input-elegant w-full"
              placeholder="What song will get you on the dance floor?"
            />
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
