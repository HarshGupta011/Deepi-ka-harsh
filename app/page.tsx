'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import ElegantDivider from '@/components/ElegantDivider';
import HeroSlideshow from '@/components/HeroSlideshow';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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
        initial={{ opacity: 0.5, filter: 'blur(6px)' }}
        animate={{
          opacity: isOpen ? 1 : 0.5,
          filter: isOpen ? 'blur(0px)' : 'blur(6px)'
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Hero Section - Clean & Minimal like reference */}
        <section className="relative h-screen flex items-end justify-center pb-20 md:pb-32 overflow-hidden">
          {/* Background Slideshow */}
          <HeroSlideshow
            images={[
              { src: '/images/couple-hills.jpg', position: 'center' },
              { src: '/images/proposal-waterfall.jpg', position: 'center 60%' },
              { src: '/images/waterfall-hug.jpg', position: 'center 45%' },
              { src: '/images/helicopter.jpg', position: 'center' }
            ]}
            interval={6000}
          />

          {/* Content - Names and Date */}
          <div className="relative z-10 text-center px-4">
            {/* Names */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-names text-5xl md:text-7xl lg:text-8xl mb-6 text-white"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              Deepika & Harsh
            </motion.h1>

            {/* Date | Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg md:text-xl text-white font-light tracking-wide"
              style={{
                fontFamily: "'Source Code Pro', monospace",
                textShadow: '0 1px 5px rgba(0,0,0,0.3)',
              }}
            >
              December 12, 2026 | Kolkata
            </motion.p>
          </div>
        </section>

        {/* We're Getting Married Section */}
        <section
          className="py-20 md:py-28 px-4 md:px-8 relative overflow-hidden"
          style={{
            background: '#FAF8F5',
          }}
        >
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-names text-2xl md:text-3xl mb-2"
              style={{ color: '#3D3D3D' }}
            >
              Yay! It&apos;s finally happening!
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-names text-4xl md:text-5xl lg:text-6xl mb-8"
              style={{ color: '#3D3D3D' }}
            >
              We&apos;re getting married!!!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: '#6B6B6B', fontFamily: "'Source Code Pro', monospace" }}
            >
              Think big Indian wedding energy, just a little more us, with travel, great food to obsess over, glam looks, dance floors, endless photos and reels, and a whole lot of fun together.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: '#6B6B6B', fontFamily: "'Source Code Pro', monospace" }}
            >
              We&apos;re so excited to celebrate this special moment with all our favorite people and feel incredibly grateful to have you as part of our journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <Link
                href="/rsvp"
                className="inline-block px-10 py-3 rounded-full text-white tracking-wide transition-all duration-300 hover:opacity-90"
                style={{
                  background: '#C4A484',
                }}
              >
                RSVP
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Details Section with Background Image */}
        <section className="relative py-16 md:py-24 mx-4 md:mx-16 lg:mx-32 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/misty-hills.jpg"
              alt="Hills background"
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
            />
            {/* Soft overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.7) 100%)',
              }}
            />
          </div>

          {/* Details Title - On top of image */}
          <div className="relative z-10 pt-16 md:pt-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-names text-5xl md:text-6xl mb-2"
              style={{ color: '#3D3D3D', textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}
            >
              Two State Wedding
            </motion.h2>

            {/* Heart decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mt-2"
            >
              <Heart className="w-5 h-5" style={{ color: '#3D3D3D', filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.6))' }} />
              <Heart className="w-4 h-4" style={{ color: '#3D3D3D', filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.6))' }} />
            </motion.div>
          </div>

          {/* City Images */}
          <div className="relative z-10 mt-8 md:mt-12 px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                {/* Kolkata */}
                <Link href="/events" className="block text-center group">
                  <div className="overflow-hidden rounded-xl mb-4 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/kolkata.png"
                      alt="Kolkata"
                      width={400}
                      height={280}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3
                    className="font-names text-2xl md:text-3xl mb-2"
                    style={{ color: '#3D3D3D', textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}
                  >
                    Kolkata
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed font-medium"
                    style={{ color: '#3D3D3D', fontFamily: "'Source Code Pro', monospace", textShadow: '0 2px 6px rgba(255,255,255,0.9)' }}
                  >
                    ancient architecture, late-night conversations, sweets after every meal
                  </p>
                </Link>

                {/* Bangalore */}
                <Link href="/events" className="block text-center group">
                  <div className="overflow-hidden rounded-xl mb-4 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/bangalore.png"
                      alt="Bangalore"
                      width={400}
                      height={280}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3
                    className="font-names text-2xl md:text-3xl mb-2"
                    style={{ color: '#3D3D3D', textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}
                  >
                    Bangalore
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed font-medium"
                    style={{ color: '#3D3D3D', fontFamily: "'Source Code Pro', monospace", textShadow: '0 2px 6px rgba(255,255,255,0.9)' }}
                  >
                    tech hub, weekday dosas, a new bar to try every weekend
                  </p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
