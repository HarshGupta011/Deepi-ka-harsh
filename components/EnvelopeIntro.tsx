'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeIntroProps {
  onOpen: () => void;
  videoSrc?: string;
}

export default function EnvelopeIntro({ onOpen, videoSrc = '/assets/intro-video.mp4' }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    setShowPetals(true);
    if (videoRef.current && !videoError) {
      setIsOpening(true);
      videoRef.current.play().catch(() => {
        setVideoError(true);
        handleEnvelopeAnimation();
      });
    } else {
      handleEnvelopeAnimation();
    }
  };

  const handleEnvelopeAnimation = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onOpen, 300);
    }, 1200);
  };

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onOpen, 300);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', () => setVideoError(true));
    }
  }, []);

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
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
          onClick={!isOpening ? handleClick : undefined}
          style={{
            background: '#F8F0EE',
          }}
        >

          {/* Soft Petal Animation on Click */}
          <AnimatePresence>
            {showPetals && (
              <>
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      background: i % 3 === 0 ? '#E8D5D3' : i % 3 === 1 ? '#A8C5D1' : '#B8C9A9',
                      opacity: 0.6,
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0.5],
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.03,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Video Layer */}
          {!videoError && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videoSrc}
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
              style={{ display: isOpening && !videoError ? 'block' : 'none' }}
            />
          )}

          {/* Full Screen Animated Envelope - Sliding Doors */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Left Door */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
              animate={{
                x: isOpening ? '-100%' : 0,
              }}
              transition={{
                duration: 1,
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
                duration: 1,
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

          {/* Mute button for video */}
          {isOpening && !videoError && (
            <button
              className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-soft hover:opacity-90 transition-all"
              style={{
                background: '#7BA3B5',
                color: '#FFFEF9',
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6l-4 4H4v4h4l4 4V6z" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
