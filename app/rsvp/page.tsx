'use client';

import { motion } from 'framer-motion';
import RSVPForm from '@/components/RSVPForm';
import { Calendar, MapPin, Clock, Heart, Mail } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

export default function RSVPPage() {
  return (
    <>
      {/* Hero Section - Blush Pastel */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
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
              We can&apos;t wait to celebrate with you! Please let us know if you&apos;ll be able to join us.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Event Quick Info - Warm Cream */}
      <section
        className="py-8 relative overflow-hidden"
        style={{
          background: '#F5EDE5',
          borderBottom: '1px solid rgba(201, 184, 150, 0.3)',
        }}
      >
        <div className="container-wedding">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(255, 254, 249, 0.9)',
                border: '1px solid rgba(201, 184, 150, 0.4)',
              }}
            >
              <Calendar className="w-5 h-5" style={{ color: '#7BA3B5' }} />
              <span style={{ color: '#3D3D3D' }}>June 15, 2025</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(255, 254, 249, 0.9)',
                border: '1px solid rgba(201, 184, 150, 0.4)',
              }}
            >
              <Clock className="w-5 h-5" style={{ color: '#7BA3B5' }} />
              <span style={{ color: '#3D3D3D' }}>4:00 PM</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(255, 254, 249, 0.9)',
                border: '1px solid rgba(201, 184, 150, 0.4)',
              }}
            >
              <MapPin className="w-5 h-5" style={{ color: '#7BA3B5' }} />
              <span style={{ color: '#3D3D3D' }}>The Garden Estate, Napa Valley</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Form Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
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
                  Please RSVP by May 15, 2025
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
            <p className="mb-6" style={{ color: '#6B6B6B' }}>
              If you have any questions or need to update your RSVP, please don&apos;t hesitate to reach out.
            </p>

            {/* Email link */}
            <motion.a
              href="mailto:wedding@deepiandharsh.com"
              whileHover={{ scale: 1.02 }}
              className="inline-block px-8 py-3 rounded-lg transition-all btn-dusty-blue"
            >
              wedding@deepiandharsh.com
            </motion.a>

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
