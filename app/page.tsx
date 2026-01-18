'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Countdown from '@/components/Countdown';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import ElegantDivider from '@/components/ElegantDivider';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const weddingDate = '2025-06-15T16:00:00';

  return (
    <>
      {/* Envelope Intro */}
      {!isOpen && (
        <EnvelopeIntro
          onOpen={() => setIsOpen(true)}
          videoSrc="/assets/intro-video.mp4"
        />
      )}

      {/* Main Content (Home Page) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Hero Section with User's Photo */}
        <section
          className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
        >
          {/* Background Photo */}
          <div className="absolute inset-0">
            <Image
              src="/images/couple-hills.jpg"
              alt="Deepi and Harsh"
              fill
              className="object-cover"
              priority
            />
            {/* Soft cream overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.4) 0%, rgba(250, 248, 245, 0.6) 50%, rgba(250, 248, 245, 0.8) 100%)',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Save the Date Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full shadow-soft mb-8"
              style={{
                background: 'rgba(255, 254, 249, 0.95)',
                border: '1px solid rgba(201, 184, 150, 0.4)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4" style={{ color: '#E8D5D3' }} fill="currentColor" />
              </motion.div>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#7BA3B5' }}>
                Save the Date
              </span>
            </motion.div>

            {/* Names */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-script text-6xl md:text-8xl lg:text-9xl mb-4"
              style={{
                color: '#3D3D3D',
              }}
            >
              Deepi & Harsh
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl mb-8 font-light"
              style={{ color: '#6B6B6B' }}
            >
              Are getting married!
            </motion.p>

            {/* Decorative Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: isOpen ? 1 : 0, scaleX: isOpen ? 1 : 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <ElegantDivider variant="with-heart" />
            </motion.div>

            {/* Date and Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255, 254, 249, 0.9)',
                  border: '1px solid rgba(201, 184, 150, 0.4)',
                }}
              >
                <Calendar className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                <span className="font-serif text-lg" style={{ color: '#3D3D3D' }}>June 15, 2025</span>
              </div>
              <div
                className="hidden md:block w-2 h-2 rotate-45"
                style={{ background: '#7BA3B5' }}
              />
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255, 254, 249, 0.9)',
                  border: '1px solid rgba(201, 184, 150, 0.4)',
                }}
              >
                <MapPin className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                <span className="font-serif text-lg" style={{ color: '#3D3D3D' }}>The Garden Estate, Napa Valley</span>
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mb-12"
            >
              <Countdown targetDate={weddingDate} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/rsvp"
                className="btn-dusty-blue px-8 py-4 font-medium rounded-lg shadow-soft"
              >
                RSVP Now
              </Link>
              <Link
                href="/our-story"
                className="px-8 py-4 font-medium rounded-lg transition-all"
                style={{
                  background: 'transparent',
                  border: '2px solid #7BA3B5',
                  color: '#7BA3B5',
                }}
              >
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 0.8 : 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8" style={{ color: '#7BA3B5' }} />
            </motion.div>
          </motion.div>
        </section>

        {/* Quick Info Section - Sage Pastel */}
        <section
          className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
          style={{
            background: '#E8F0E2',
          }}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💒',
                  title: 'The Ceremony',
                  description: '4:00 PM at the Rose Garden',
                },
                {
                  icon: '🥂',
                  title: 'The Reception',
                  description: '6:00 PM at the Grand Ballroom',
                },
                {
                  icon: '🎉',
                  title: 'The Celebration',
                  description: 'Dancing until midnight!',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-8 rounded-2xl card-elegant"
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-serif text-xl mb-2" style={{ color: '#3D3D3D' }}>{item.title}</h3>
                  <p style={{ color: '#6B6B6B' }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Invitation Section - Blush Pastel */}
        <section
          className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
          style={{
            background: '#F8F0EE',
          }}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-script text-4xl md:text-5xl mb-6"
                style={{ color: '#3D3D3D' }}
              >
                You&apos;re Invited
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg leading-relaxed mb-8"
                style={{ color: '#6B6B6B' }}
              >
                Together with their families, Deepika and Harsh
                request the pleasure of your company at the celebration of their marriage.
                Join us for an evening of love, laughter, and happily ever after.
              </motion.p>

              <ElegantDivider variant="simple" className="my-8 max-w-xs mx-auto" />

              {/* Additional Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
              >
                <div className="card-cream p-6">
                  <h4 className="font-serif text-xl mb-2" style={{ color: '#3D3D3D' }}>
                    Dress Code
                  </h4>
                  <p style={{ color: '#6B6B6B' }}>
                    Formal Indian Attire or Black Tie
                  </p>
                </div>
                <div className="card-cream p-6">
                  <h4 className="font-serif text-xl mb-2" style={{ color: '#3D3D3D' }}>
                    Accommodations
                  </h4>
                  <p style={{ color: '#6B6B6B' }}>
                    Room blocks available at partner hotels
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Photo Preview Section - Dusty Blue Pastel */}
        <section
          className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
          style={{
            background: '#E5EFF3',
          }}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#3D3D3D' }}>
                Our Journey
              </h2>
              <ElegantDivider variant="line" className="max-w-xs mx-auto" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square rounded-xl overflow-hidden card-elegant"
                >
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(232, 213, 211, 0.3)' }}>
                    <Heart className="w-8 h-8" style={{ color: '#7BA3B5' }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/gallery"
                className="btn-dusty-blue px-8 py-4 inline-block rounded-lg"
              >
                View Full Gallery
              </Link>
            </motion.div>
          </div>
        </section>

        {/* RSVP CTA Section - Warm Cream */}
        <section
          className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden"
          style={{
            background: '#F5EDE5',
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-script text-4xl md:text-6xl mb-6" style={{ color: '#3D3D3D' }}>
                We Can&apos;t Wait to Celebrate With You
              </h2>
              <p className="text-lg mb-8" style={{ color: '#6B6B6B' }}>
                Please let us know if you can join us for our special day
              </p>

              <ElegantDivider variant="with-heart" className="mb-8" />

              <Link
                href="/rsvp"
                className="btn-dusty-blue px-12 py-5 text-lg inline-block rounded-lg shadow-soft"
              >
                RSVP Now
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
