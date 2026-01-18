'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Timeline from '@/components/Timeline';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import ElegantDivider from '@/components/ElegantDivider';

const timelineEvents = [
  {
    date: 'August 2018',
    title: 'First Meeting',
    description: 'We met at a mutual friend\'s birthday party. Harsh spilled his drink on Deepika, and the rest is history!',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000',
  },
  {
    date: 'December 2018',
    title: 'First Date',
    description: 'Our first official date was at a cozy Italian restaurant downtown. We talked for hours and closed the place down.',
    image: 'https://images.unsplash.com/photo-1529543544277-750e2ea55d68?q=80&w=1000',
  },
  {
    date: 'June 2019',
    title: 'Made It Official',
    description: 'After six months of dating, Harsh asked Deepika to be his girlfriend during a sunset picnic at the beach.',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000',
  },
  {
    date: 'February 2020',
    title: 'Moving In Together',
    description: 'We took the big step and moved into our first apartment together. Our tiny kitchen has seen many cooking adventures!',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000',
  },
  {
    date: 'July 2022',
    title: 'European Adventure',
    description: 'We spent three weeks exploring Italy, France, and Spain. That trip made us realize we\'re perfect travel partners.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000',
  },
  {
    date: 'October 2024',
    title: 'The Proposal',
    description: 'Harsh proposed at our favorite hiking spot overlooking the valley. Deepika said yes before he could finish asking!',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000',
  },
  {
    date: 'June 2025',
    title: 'The Wedding',
    description: 'And now, we\'re about to embark on our greatest adventure yet - becoming husband and wife!',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero Section with User's Photo */}
      <section
        className="relative py-24 md:py-36 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/proposal-waterfall.jpg"
            alt="Proposal moment"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.7), rgba(250, 248, 245, 0.8), rgba(250, 248, 245, 0.9))',
            }}
          />
        </div>

        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Decorative element above title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }} />
              <Heart className="w-6 h-6" style={{ color: '#E8D5D3' }} fill="currentColor" />
              <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }} />
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Our Love Story
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
              From strangers to soulmates, our journey has been filled with
              laughter, love, and countless beautiful moments. Here&apos;s how
              our story unfolded...
            </p>

            <ElegantDivider variant="line" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="How It All Began"
            subtitle="A timeline of our love story, from that first awkward meeting to forever."
          />

          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Quote Section - Dusty Blue Pastel */}
      <section
        className="py-20 md:py-28 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E5EFF3',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Animated heart */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <Heart
                className="w-12 h-12 mx-auto"
                style={{ color: '#E8D5D3' }}
                fill="currentColor"
              />
            </motion.div>

            {/* Decorative quote marks */}
            <div
              className="font-serif text-6xl md:text-8xl leading-none mb-4"
              style={{ color: 'rgba(201, 184, 150, 0.4)' }}
            >
              &ldquo;
            </div>

            <blockquote
              className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-6"
              style={{ color: '#3D3D3D' }}
            >
              I knew from the moment I met you that there was something
              about you I needed. Turns out it wasn&apos;t something about you at all.
              It was just you.
            </blockquote>

            <div
              className="font-serif text-6xl md:text-8xl leading-none rotate-180 mb-6"
              style={{ color: 'rgba(201, 184, 150, 0.4)' }}
            >
              &ldquo;
            </div>

            <p className="text-lg" style={{ color: '#7BA3B5' }}>— Jamie McGuire</p>

            <ElegantDivider variant="simple" className="mt-8 max-w-xs mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Looking Forward - Blush Pastel */}
      <section
        className="py-20 md:py-28 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F8F0EE',
        }}
      >
        <div className="container-wedding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="font-script text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: '#3D3D3D' }}
              >
                Forever Starts Here
              </h2>

              <p className="text-lg leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
                After years of growing together, learning from each other, and
                building a foundation of love and trust, we&apos;re ready to say
                &ldquo;I do.&rdquo; We can&apos;t wait to celebrate this new chapter
                with all of you.
              </p>

              <ElegantDivider variant="with-heart" className="mb-8" />

              {/* Names with decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-6"
              >
                <div
                  className="h-px w-16 md:w-24"
                  style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }}
                />
                <span
                  className="font-script text-3xl md:text-4xl"
                  style={{ color: '#7BA3B5' }}
                >
                  Deepi & Harsh
                </span>
                <div
                  className="h-px w-16 md:w-24"
                  style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }}
                />
              </motion.div>

              {/* Decorative bottom element */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#C9B896' }}
                />
                <div
                  className="w-3 h-3 rotate-45"
                  style={{ background: '#7BA3B5' }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#C9B896' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
