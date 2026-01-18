'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ElegantDividerProps {
  className?: string;
  variant?: 'line' | 'dotted' | 'with-heart' | 'simple';
  animated?: boolean;
}

export default function ElegantDivider({
  className = '',
  variant = 'line',
  animated = true,
}: ElegantDividerProps) {
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
        className={`h-px ${className}`}
        style={{ background: 'linear-gradient(to right, transparent, #C9B896, transparent)' }}
      />
    );
  }

  if (variant === 'dotted') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`border-0 border-t-2 border-dotted my-8 ${className}`}
        style={{ borderColor: '#DED4BC' }}
      />
    );
  }

  if (variant === 'with-heart') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`flex items-center justify-center gap-4 py-6 ${className}`}
      >
        <div
          className="h-px flex-1 max-w-[100px] md:max-w-[150px]"
          style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }}
        />
        <Heart
          className="w-4 h-4"
          style={{ color: '#E8D5D3' }}
          fill="currentColor"
        />
        <div
          className="h-px flex-1 max-w-[100px] md:max-w-[150px]"
          style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }}
        />
      </Wrapper>
    );
  }

  // Default: line with diamond
  return (
    <Wrapper
      {...wrapperProps}
      className={`flex items-center justify-center gap-4 py-4 ${className}`}
    >
      <div
        className="h-px flex-1 max-w-[100px] md:max-w-[150px]"
        style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }}
      />
      <div
        className="w-2 h-2 rotate-45"
        style={{ background: '#7BA3B5' }}
      />
      <div
        className="h-px flex-1 max-w-[100px] md:max-w-[150px]"
        style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }}
      />
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
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }}
      />
      <span className="font-serif" style={{ color: '#7BA3B5' }}>{children}</span>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }}
      />
    </motion.div>
  );
}
