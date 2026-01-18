'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      {/* Photo Grid - Masonry Style */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
            }}
            className="relative cursor-pointer group overflow-hidden rounded-xl card-elegant break-inside-avoid mb-4 md:mb-6"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={800}
              className="w-full h-auto object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(180deg, transparent 50%, rgba(61, 61, 61, 0.4) 100%)',
              }}
            />

            {/* Caption overlay */}
            {photo.caption && (
              <div
                className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p className="text-sm" style={{ color: '#FFFEF9' }}>{photo.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: 'rgba(250, 248, 245, 0.98)',
            }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Subtle corner decorations */}
            <div className="absolute top-8 left-8 w-12 h-12 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                <path d="M0 80 L0 20 Q0 0 20 0 L80 0" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-8 right-8 w-12 h-12 opacity-30 scale-x-[-1]">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                <path d="M0 80 L0 20 Q0 0 20 0 L80 0" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-8 left-8 w-12 h-12 opacity-30 scale-y-[-1]">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                <path d="M0 80 L0 20 Q0 0 20 0 L80 0" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-8 right-8 w-12 h-12 opacity-30 scale-[-1]">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                <path d="M0 80 L0 20 Q0 0 20 0 L80 0" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 rounded-full transition-all duration-300 z-20"
              style={{
                background: 'rgba(123, 163, 181, 0.1)',
                border: '1px solid rgba(123, 163, 181, 0.3)',
                color: '#7BA3B5',
              }}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(123, 163, 181, 0.1)',
                border: '1px solid rgba(123, 163, 181, 0.3)',
                color: '#7BA3B5',
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-soft-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh]"
              />
              {photos[selectedIndex].caption && (
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 text-center"
                  style={{
                    background: 'linear-gradient(to top, rgba(250, 248, 245, 0.95), transparent)',
                  }}
                >
                  <p style={{ color: '#3D3D3D' }}>{photos[selectedIndex].caption}</p>
                </div>
              )}
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(123, 163, 181, 0.1)',
                border: '1px solid rgba(123, 163, 181, 0.3)',
                color: '#7BA3B5',
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm"
              style={{
                background: 'rgba(123, 163, 181, 0.1)',
                border: '1px solid rgba(123, 163, 181, 0.3)',
                color: '#7BA3B5',
              }}
            >
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
