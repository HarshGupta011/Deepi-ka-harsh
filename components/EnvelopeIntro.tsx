'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsVisible(false);
      window.scrollTo(0, 0);
      setTimeout(onOpen, 200);
    }, 700);
  };

  // Hide scrollbar when envelope is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
          onClick={!isOpening ? handleClick : undefined}
          style={{
            background: 'rgba(248, 240, 238, 0.85)',
            backdropFilter: 'blur(8px)',
          }}
        >

          {/* Full Screen Animated Envelope - Sliding Doors */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Left Door */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
              animate={{
                x: isOpening ? '-100%' : 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div
                className="absolute inset-0 w-[200%] h-full"
                style={{
                  backgroundImage: `url('/assets/envelope.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </motion.div>

            {/* Right Door */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
              animate={{
                x: isOpening ? '100%' : 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div
                className="absolute inset-0 w-[200%] h-full"
                style={{
                  backgroundImage: `url('/assets/envelope.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  left: '-100%',
                }}
              />
            </motion.div>
          </div>

          {/* Subtle Corner Decorations */}
          {!isOpening && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-8 left-8 w-20 h-20"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                  <path
                    d="M0 80 L0 20 Q0 0 20 0 L80 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute top-8 right-8 w-20 h-20 scale-x-[-1]"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                  <path
                    d="M0 80 L0 20 Q0 0 20 0 L80 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-8 left-8 w-20 h-20 scale-y-[-1]"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                  <path
                    d="M0 80 L0 20 Q0 0 20 0 L80 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-8 right-8 w-20 h-20 scale-[-1]"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#C9B896' }}>
                  <path
                    d="M0 80 L0 20 Q0 0 20 0 L80 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
            </>
          )}

          {/* You're Invited text - elegant charcoal */}
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-[15%] sm:bottom-[18%] left-0 right-0 text-center z-10 px-4"
            >
              <p
                className="font-script text-3xl sm:text-4xl md:text-6xl"
                style={{
                  color: '#3D3D3D',
                }}
              >
                You&apos;re Invited
              </p>
            </motion.div>
          )}

          {/* Tap/Click to Open */}
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center z-10"
            >
              <p
                className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium mb-2 sm:mb-3"
                style={{ color: '#3D3D3D' }}
              >
                <span className="sm:hidden">Tap to Open</span>
                <span className="hidden sm:inline">Click to Open</span>
              </p>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mx-auto w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                style={{ background: '#7BA3B5' }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
