'use client';

import { motion } from 'framer-motion';
import RSVPForm from '@/components/RSVPForm';
import { Heart, Mail } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

// Subtle floating rings animation
function FloatingRings() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large ring */}
      <motion.div
        className="absolute -right-20 top-1/4 w-64 h-64 rounded-full opacity-20"
        style={{ border: '2px solid #C9B896' }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Medium ring */}
      <motion.div
        className="absolute -left-10 top-1/3 w-40 h-40 rounded-full opacity-15"
        style={{ border: '2px solid #7BA3B5' }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      {/* Small decorative dots */}
      <motion.div
        className="absolute right-1/4 top-1/2 w-3 h-3 rounded-full"
        style={{ background: '#E8D5D3' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute left-1/3 bottom-1/4 w-2 h-2 rounded-full"
        style={{ background: '#C9B896' }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  );
}

export default function RSVPPage() {
  return (
    <>
      {/* Hero Section - Blush Pastel */}
      <section
        className="relative py-12 md:py-16 overflow-hidden"
        style={{
          background: '#F8F0EE',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Decorative heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart
                  className="w-10 h-10 mx-auto"
                  style={{ color: '#E8D5D3' }}
                  fill="currentColor"
                />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              RSVP
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              If it were up to us, attendance would be mandatory—we can&apos;t imagine celebrating without you. But since we&apos;re polite, please let us know if you can make it.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* RSVP Form Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <FloatingRings />
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            {/* Form Card */}
            <div className="rounded-2xl p-6 md:p-10 card-elegant">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl md:text-3xl mb-2" style={{ color: '#3D3D3D' }}>
                  Kindly Respond
                </h2>
                <p style={{ color: '#6B6B6B' }}>
                  Please RSVP by Aug 1, 2025
                </p>
                <ElegantDivider variant="simple" className="mt-4 max-w-xs mx-auto" />
              </div>

              <RSVPForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Dusty Blue Pastel */}
      <section
        className="py-16 md:py-20 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E5EFF3',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Mail Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(123, 163, 181, 0.15)',
                border: '1px solid rgba(123, 163, 181, 0.3)',
              }}
            >
              <Mail className="w-8 h-8" style={{ color: '#7BA3B5' }} />
            </motion.div>

            <h2 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: '#3D3D3D' }}>
              Questions?
            </h2>
            <p className="mb-2" style={{ color: '#6B6B6B' }}>
              Need to reach us? You know who we are.
            </p>
            <p className="italic" style={{ color: '#7BA3B5' }}>
              You have our numbers. Use them wisely... or just show up!
            </p>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#C9B896' }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
              </motion.div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#C9B896' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
