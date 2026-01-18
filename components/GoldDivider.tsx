'use client';

import { motion } from 'framer-motion';

interface GoldDividerProps {
  className?: string;
  variant?: 'simple' | 'ornate' | 'floral' | 'diamond';
  animated?: boolean;
}

export default function GoldDivider({
  className = '',
  variant = 'ornate',
  animated = true,
}: GoldDividerProps) {
  const Wrapper = animated ? motion.div : 'div';
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, scaleX: 0 },
        whileInView: { opacity: 1, scaleX: 1 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : {};

  if (variant === 'simple') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent ${className}`}
      />
    );
  }

  if (variant === 'diamond') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`flex items-center justify-center gap-4 py-4 ${className}`}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500" />
        <div className="w-3 h-3 rotate-45 border border-gold-500 bg-gradient-to-br from-gold-400 to-gold-600" />
        <div className="w-2 h-2 rotate-45 bg-gold-500" />
        <div className="w-3 h-3 rotate-45 border border-gold-500 bg-gradient-to-br from-gold-400 to-gold-600" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500" />
      </Wrapper>
    );
  }

  if (variant === 'floral') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`flex items-center justify-center gap-3 py-6 ${className}`}
      >
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold-500" />
        <svg className="w-6 h-6 text-gold-500" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C9 2 7 4 7 7c0 2.5 2 4.5 5 7.5 3-3 5-5 5-7.5 0-3-2-5-5-5zm0 16c-3-3-5-5-5-7.5 0-3 2-5 5-5s5 2 5 5c0 2.5-2 4.5-5 7.5z"
          />
        </svg>
        <div className="w-2 h-2 rounded-full bg-royal-600" />
        <svg className="w-6 h-6 text-gold-500 rotate-180" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C9 2 7 4 7 7c0 2.5 2 4.5 5 7.5 3-3 5-5 5-7.5 0-3-2-5-5-5zm0 16c-3-3-5-5-5-7.5 0-3 2-5 5-5s5 2 5 5c0 2.5-2 4.5-5 7.5z"
          />
        </svg>
        <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold-500" />
      </Wrapper>
    );
  }

  // Default: ornate
  return (
    <Wrapper
      {...wrapperProps}
      className={`flex items-center justify-center gap-4 py-6 ${className}`}
    >
      <div className="h-px flex-1 max-w-[100px] md:max-w-[150px] bg-gradient-to-r from-transparent to-gold-500" />

      {/* Left swirl */}
      <svg className="w-8 h-4 text-gold-500" viewBox="0 0 32 16">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M0 8 Q8 0 16 8 T32 8"
        />
      </svg>

      {/* Center element */}
      <div className="relative">
        <div className="w-4 h-4 rotate-45 border-2 border-gold-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-royal-600" />
        </div>
      </div>

      {/* Right swirl */}
      <svg className="w-8 h-4 text-gold-500 scale-x-[-1]" viewBox="0 0 32 16">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M0 8 Q8 0 16 8 T32 8"
        />
      </svg>

      <div className="h-px flex-1 max-w-[100px] md:max-w-[150px] bg-gradient-to-l from-transparent to-gold-500" />
    </Wrapper>
  );
}

// Horizontal rule with text
interface DividerWithTextProps {
  children: React.ReactNode;
  className?: string;
}

export function DividerWithText({ children, className = '' }: DividerWithTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`flex items-center gap-4 ${className}`}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500" />
      <span className="text-gold-500 font-serif">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500" />
    </motion.div>
  );
}

// Section separator with mandala
interface MandalaDividerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MandalaDivider({ className = '', size = 'md' }: MandalaDividerProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -180 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`flex items-center justify-center py-8 ${className}`}
    >
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold-500" />

      <svg className={`${sizes[size]} text-gold-500 mx-4`} viewBox="0 0 100 100">
        {/* Outer circles */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />

        {/* Radial lines */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 45 * Math.cos((i * Math.PI) / 4)}
            y2={50 + 45 * Math.sin((i * Math.PI) / 4)}
            stroke="currentColor"
            strokeWidth="0.3"
          />
        ))}

        {/* Center dot */}
        <circle cx="50" cy="50" r="3" fill="#8B0000" />

        {/* Petal shapes */}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={`petal-${i}`}
            cx={50 + 20 * Math.cos((i * Math.PI) / 4)}
            cy={50 + 20 * Math.sin((i * Math.PI) / 4)}
            rx="5"
            ry="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </svg>

      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold-500" />
    </motion.div>
  );
}
