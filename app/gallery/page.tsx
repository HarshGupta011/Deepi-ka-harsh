'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import PhotoGallery from '@/components/PhotoGallery';
import ElegantDivider from '@/components/ElegantDivider';
import { Camera, Heart } from 'lucide-react';

const photos = [
  { src: '/images/gallery/IMG_2654_Original.jpg', alt: 'Memory 1' },
  { src: '/images/gallery/da9b9622-3008-43f1-aa3a-b21c379f21b6_Original.jpg', alt: 'Memory 3' },
  { src: '/images/gallery/IMG_0406_Original.jpg', alt: 'Memory 4' },
  { src: '/images/gallery/cc938863-dc58-40af-b828-502034f0c8df_Original.jpg', alt: 'Memory 5' },
  { src: '/images/gallery/69a79e26-edd5-42b8-8033-54fa8277e13e_Original.jpg', alt: 'Memory 6' },
    { src: '/images/gallery/IMG_3188_Original.jpg', alt: 'Memory 8' },
  { src: '/images/gallery/9e6f4ebe-c6cc-4f3c-97f8-e8d8b97488ee_Original.jpg', alt: 'Memory 9' },
  { src: '/images/gallery/402e38da-e55b-431a-b623-43c172bf01c1_Original.jpg', alt: 'Memory 10' },
  { src: '/images/gallery/IMG_4177_Original.jpg', alt: 'Memory 11' },
  { src: '/images/gallery/IMG_4219_Original.jpg', alt: 'Memory 12' },
  { src: '/images/gallery/IMG_7084_Original.jpg', alt: 'Memory 13' },
  { src: '/images/gallery/IMG_6309_Original.jpg', alt: 'Memory 14' },
  { src: '/images/gallery/IMG_4435_Original.jpg', alt: 'Memory 15' },
  { src: '/images/gallery/IMG_1647_Original.jpg', alt: 'Memory 16' },
  { src: '/images/gallery/PXL_20231124_175634008.MP_Original.JPG', alt: 'Memory 17' },
  { src: '/images/gallery/IMG_2955_Original.jpg', alt: 'Memory 18' },
  { src: '/images/gallery/IMG_3785_Original.jpg', alt: 'Memory 19' },
  { src: '/images/gallery/IMG_8801_Original.jpg', alt: 'Memory 20' },
  { src: '/images/gallery/IMG_5106_Original.jpg', alt: 'Memory 21' },
  { src: '/images/gallery/IMG_7586_Original.jpg', alt: 'Memory 22' },
  { src: '/images/gallery/20250923_202607_846_Original.jpg', alt: 'Memory 23' },
  { src: '/images/gallery/IMG_6878_Original.jpg', alt: 'Memory 24' },
  { src: '/images/gallery/IMG_6815_Original.jpg', alt: 'Memory 25' },
  { src: '/images/gallery/IMG_9191.jpg', alt: 'Memory 26' },
  { src: '/images/gallery/IMG_9195.jpg', alt: 'Memory 27' },
];

export default function GalleryPage() {
  return (
    <>
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
