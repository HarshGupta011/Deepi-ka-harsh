'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DecorativeBorderProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export default function DecorativeBorder({
  children,
  className = '',
  animated = true,
}: DecorativeBorderProps) {
  const Wrapper = animated ? motion.div : 'div';
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, scale: 0.98 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`relative rounded-xl overflow-hidden card-elegant ${className}`}
    >
      {children}
    </Wrapper>
  );
}

// Simple elegant frame
interface ElegantFrameProps {
  children: ReactNode;
  className?: string;
}

export function ElegantFrame({ children, className = '' }: ElegantFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`relative p-8 ${className}`}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9B896, transparent)' }}
      />
      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9B896, transparent)' }}
      />
      {/* Left border */}
      <div
        className="absolute top-8 bottom-8 left-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, #C9B896, transparent)' }}
      />
      {/* Right border */}
      <div
        className="absolute top-8 bottom-8 right-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, #C9B896, transparent)' }}
      />

      {children}
    </motion.div>
  );
}

// Simple elegant card
interface ElegantCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function ElegantCard({ children, className = '', hover = true }: ElegantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4 } : {}}
      className={`card-elegant p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Cream card variant
interface CreamCardProps {
  children: ReactNode;
  className?: string;
}

export function CreamCard({ children, className = '' }: CreamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`card-cream p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
