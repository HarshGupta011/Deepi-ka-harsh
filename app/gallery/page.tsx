'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import PhotoGallery from '@/components/PhotoGallery';
import ElegantDivider from '@/components/ElegantDivider';
import { Camera, Heart } from 'lucide-react';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    alt: 'Engagement photo 1',
    caption: 'Our engagement day',
  },
  {
    src: 'https://images.unsplash.com/photo-1529543544277-750e2ea55d68?q=80&w=1000',
    alt: 'Date night',
    caption: 'Date night in the city',
  },
  {
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000',
    alt: 'Beach sunset',
    caption: 'Sunset at the beach',
  },
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000',
    alt: 'Hiking adventure',
    caption: 'Hiking together',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000',
    alt: 'Coffee date',
    caption: 'Morning coffee tradition',
  },
  {
    src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000',
    alt: 'Paris trip',
    caption: 'Paris adventures',
  },
  {
    src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000',
    alt: 'The proposal',
    caption: 'The moment we got engaged',
  },
  {
    src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1000',
    alt: 'Celebration',
    caption: 'Celebrating with friends',
  },
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000',
    alt: 'Garden stroll',
    caption: 'Stroll through the gardens',
  },
  {
    src: 'https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?q=80&w=1000',
    alt: 'Cooking together',
    caption: 'Kitchen adventures',
  },
  {
    src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000',
    alt: 'Dancing',
    caption: 'Dancing the night away',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000',
    alt: 'Anniversary dinner',
    caption: 'Anniversary celebration',
  },
];

export default function GalleryPage() {
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
            {/* Decorative camera icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(123, 163, 181, 0.15)',
                  border: '1px solid rgba(123, 163, 181, 0.3)',
                }}
              >
                <Camera className="w-8 h-8" style={{ color: '#7BA3B5' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Our Moments
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              A collection of our favorite memories together.
              Click on any photo to see it larger.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Warm Cream */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F5EDE5',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Photo Gallery"
            subtitle="Snapshots of love, laughter, and adventures shared."
          />

          <PhotoGallery photos={photos} />
        </div>
      </section>

      {/* Share Your Photos Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Camera icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(156, 175, 136, 0.15)',
                border: '1px solid rgba(156, 175, 136, 0.3)',
              }}
            >
              <Camera className="w-10 h-10" style={{ color: '#9CAF88' }} />
            </motion.div>

            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              Share Your Photos!
            </h2>

            <p className="text-lg mb-8" style={{ color: '#6B6B6B' }}>
              We&apos;d love to see the celebration through your eyes!
              Use our wedding hashtag to share your photos from the big day.
            </p>

            <ElegantDivider variant="with-heart" className="mb-8" />

            {/* Hashtag card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block px-10 py-5 rounded-xl card-elegant"
            >
              <span className="font-script text-2xl md:text-3xl" style={{ color: '#7BA3B5' }}>
                #DeepiAndHarsh2025
              </span>
            </motion.div>

            {/* Decorative hearts */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 mt-8"
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
