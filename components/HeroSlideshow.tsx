'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageItem {
  src: string;
  position?: string;
}

interface HeroSlideshowProps {
  images: ImageItem[];
  interval?: number;
}

export default function HeroSlideshow({ images, interval = 6000 }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const currentImage = images[currentIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{
            duration: 2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.src}
            alt="Deepika and Harsh"
            fill
            className="object-cover"
            style={{ objectPosition: currentImage.position || 'center' }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle dark overlay for text readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
}
