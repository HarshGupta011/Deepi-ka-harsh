'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Timeline from '@/components/Timeline';
import Image from 'next/image';
import ElegantDivider from '@/components/ElegantDivider';

const timelineEvents = [
  {
    date: '2016',
    title: 'Our first ever picture',
    description: 'Taken 10 years ago during undergrad, when Harsh was helping Deepika with coursework. We became friends around that time.',
    image: '/images/first-meeting.png',
    imagePosition: 'center top',
  },
  {
    date: '2018',
    title: 'First Date',
    description: 'Our first official date was at a cozy Italian restaurant downtown. We talked for hours and closed the place down.',
    image: '/images/gallery/d570c152-af13-4e3f-9394-690f0e7c7c9b_Original.jpg',
    imagePosition: 'center bottom',
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
    image: '/images/proposal.jpg',
    imagePosition: 'center 40%',
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
        className="relative py-12 md:py-16 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/our-story-hero.jpg"
            alt="Deepika and Harsh"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 35%' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.4), rgba(250, 248, 245, 0.5), rgba(250, 248, 245, 0.7))',
            }}
          />
        </div>

        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#2D2D2D' }}
            >
              Our Story
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-8 font-medium" style={{ color: '#2D2D2D' }}>
              Nothing dramatic. Just real moments, real love, and the parts we can finally talk about.
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
          <Timeline events={timelineEvents} />
        </div>
      </section>

    </>
  );
}
