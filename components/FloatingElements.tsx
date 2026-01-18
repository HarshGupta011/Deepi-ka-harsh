'use client';

import { motion } from 'framer-motion';

// Simplified subtle corner decorations
export function DecorativeCorners({ className = '' }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-24 h-24 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: 'rgba(201, 184, 150, 0.3)' }}>
          <path
            d="M0 80 L0 20 Q0 0 20 0 L80 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className={`absolute top-0 right-0 w-24 h-24 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full scale-x-[-1]" style={{ color: 'rgba(201, 184, 150, 0.3)' }}>
          <path
            d="M0 80 L0 20 Q0 0 20 0 L80 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className={`absolute bottom-0 left-0 w-24 h-24 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full scale-y-[-1]" style={{ color: 'rgba(201, 184, 150, 0.3)' }}>
          <path
            d="M0 80 L0 20 Q0 0 20 0 L80 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className={`absolute bottom-0 right-0 w-24 h-24 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full scale-[-1]" style={{ color: 'rgba(201, 184, 150, 0.3)' }}>
          <path
            d="M0 80 L0 20 Q0 0 20 0 L80 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </>
  );
}

// Minimal floating elements - just subtle dots
interface FloatingElementsProps {
  className?: string;
  count?: number;
}

export default function FloatingElements({
  className = '',
  count = 5,
}: FloatingElementsProps) {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + (i * 20) % 80,
    y: 10 + (i * 25) % 80,
    size: 4 + (i % 3) * 2,
    delay: i * 0.5,
    duration: 8 + i * 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
            background: 'rgba(232, 213, 211, 0.3)',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
