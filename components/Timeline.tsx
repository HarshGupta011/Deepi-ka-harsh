'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Elegant Vertical Line with Champagne Gradient */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
        style={{
          background: 'linear-gradient(180deg, transparent, #C9B896 10%, #C9B896 90%, transparent)',
        }}
      />

      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`relative flex flex-col md:flex-row items-start mb-12 md:mb-16 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Timeline Dot */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full flex items-center justify-center z-10"
            style={{
              background: '#FFFEF9',
              border: '2px solid #7BA3B5',
              boxShadow: '0 4px 12px rgba(123, 163, 181, 0.2)',
            }}
          >
            <Heart className="w-4 h-4" style={{ color: '#E8D5D3' }} fill="currentColor" />
          </motion.div>

          {/* Content Card */}
          <div className={`ml-16 md:ml-0 md:w-1/2 ${
            index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
          }`}>
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
              }}
              className="rounded-xl overflow-hidden card-elegant"
            >
              {/* Image */}
              {event.image && (
                <div className="relative h-48 md:h-56">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  {/* Soft overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 60%, rgba(250, 248, 245, 0.3) 100%)',
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                {/* Date Badge */}
                <span
                  className="inline-block px-4 py-1.5 text-sm font-medium rounded-full mb-3"
                  style={{
                    background: 'rgba(123, 163, 181, 0.15)',
                    color: '#5A8899',
                  }}
                >
                  {event.date}
                </span>
                {/* Title */}
                <h3
                  className="text-xl font-serif mb-2"
                  style={{ color: '#3D3D3D' }}
                >
                  {event.title}
                </h3>
                {/* Description */}
                <p className="leading-relaxed" style={{ color: '#6B6B6B' }}>
                  {event.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Empty space for alternating layout */}
          <div className="hidden md:block md:w-1/2" />
        </motion.div>
      ))}

      {/* End ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute left-4 md:left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 rotate-45"
        style={{
          background: '#7BA3B5',
        }}
      />
    </div>
  );
}
