'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ElegantTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  variant?: 'dusty-blue' | 'sage' | 'charcoal' | 'champagne';
}

// Renamed from ShimmerText to ElegantText - simple elegant text without shimmer
export default function ElegantText({
  children,
  className = '',
  as: Component = 'span',
  delay = 0,
  variant = 'charcoal',
}: ElegantTextProps) {
  const colors = {
    'dusty-blue': '#7BA3B5',
    'sage': '#9CAF88',
    'charcoal': '#3D3D3D',
    'champagne': '#C9B896',
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <Component
        className={className}
        style={{ color: colors[variant] }}
      >
        {children}
      </Component>
    </motion.span>
  );
}

// Simple text component with color variants
interface ColoredTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  color?: 'dusty-blue' | 'sage' | 'champagne' | 'charcoal' | 'warm-gray';
  animate?: boolean;
}

export function ColoredText({
  children,
  className = '',
  as: Component = 'span',
  color = 'charcoal',
  animate = true,
}: ColoredTextProps) {
  const colors = {
    'dusty-blue': '#7BA3B5',
    'sage': '#9CAF88',
    'champagne': '#C9B896',
    'charcoal': '#3D3D3D',
    'warm-gray': '#6B6B6B',
  };

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Component className={className} style={{ color: colors[color] }}>
          {children}
        </Component>
      </motion.span>
    );
  }

  return (
    <Component className={className} style={{ color: colors[color] }}>
      {children}
    </Component>
  );
}

// Animated letter reveal
interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  color?: string;
}

export function AnimatedLetters({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.05,
  color = '#3D3D3D',
}: AnimatedLettersProps) {
  return (
    <span className={className} style={{ color }}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + index * staggerDelay,
            duration: 0.4,
          }}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}
