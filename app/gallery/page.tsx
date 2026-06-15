'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import PhotoGallery from '@/components/PhotoGallery';
import ElegantDivider from '@/components/ElegantDivider';
import { Camera, Heart, Upload } from 'lucide-react';

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
  { src: '/images/gallery/IMG_3179_Original.jpg', alt: 'Memory 28' },
  { src: '/images/gallery/IMG_3590_Original.jpg', alt: 'Memory 29' },
  { src: '/images/gallery/IMG_3791_Original.jpg', alt: 'Memory 30' },
  { src: '/images/gallery/F8697AF1-94F8-461A-AB18-98FE63923EB4_Original.jpg', alt: 'Memory 31' },
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
          />

          <PhotoGallery photos={photos} />
        </div>
      </section>

      {/* Share Your Photos Section - Sage Pastel */}
      <section
        className="py-10 md:py-14 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F5EDE5',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto text-center"
          >
            {/* Camera icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(156, 175, 136, 0.15)',
                border: '1px solid rgba(156, 175, 136, 0.3)',
              }}
            >
              <Camera className="w-7 h-7" style={{ color: '#9CAF88' }} />
            </motion.div>

            <h2 className="font-serif text-2xl md:text-3xl mb-2" style={{ color: '#3D3D3D' }}>
              Share Your Photos!
            </h2>

            <p className="text-base mb-4" style={{ color: '#6B6B6B' }}>
              Use our wedding hashtag to share your photos from the big day.
            </p>

            {/* Hashtag card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block px-6 py-3 rounded-xl card-elegant"
            >
              <span className="font-script text-xl md:text-2xl" style={{ color: '#7BA3B5' }}>
                #Deepi-ka-harsh
              </span>
            </motion.div>

            {/* Shared Google Drive upload link */}
            <p className="text-base mt-6 mb-3" style={{ color: '#6B6B6B' }}>
              Or drop your pictures straight into our shared Drive folder so we can all keep adding to the album.
            </p>
            <motion.a
              href="https://drive.google.com/drive/folders/REPLACE_WITH_FOLDER_ID"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white tracking-wide transition-all duration-300 hover:opacity-90"
              style={{ background: '#9CAF88' }}
            >
              <Upload className="w-5 h-5" />
              Upload to our Drive
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
