'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  variant?: 'dusty-blue' | 'sage' | 'charcoal';
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  variant = 'charcoal'
}: SectionHeaderProps) {
  const titleColors = {
    'dusty-blue': '#7BA3B5',
    'sage': '#9CAF88',
    'charcoal': '#3D3D3D',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4"
        style={{ color: titleColors[variant] }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="max-w-2xl mx-auto text-lg"
          style={{ color: '#6B6B6B' }}
        >
          {subtitle}
        </p>
      )}

      {/* Elegant divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center justify-center gap-4 mt-6"
      >
        {/* Left line */}
        <div
          className="h-px w-12 md:w-20"
          style={{
            background: 'linear-gradient(to right, transparent, #C9B896)',
          }}
        />

        {/* Center heart */}
        <Heart
          className="w-4 h-4"
          style={{ color: '#E8D5D3' }}
          fill="currentColor"
        />

        {/* Right line */}
        <div
          className="h-px w-12 md:w-20"
          style={{
            background: 'linear-gradient(to left, transparent, #C9B896)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
