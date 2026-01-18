'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
  imagePosition?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Center vertical line */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{
          background: 'linear-gradient(180deg, transparent, #C9B896 5%, #C9B896 95%, transparent)',
        }}
      />

      <div className="space-y-16 md:space-y-24">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Heart marker on center line */}
            <div
              className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center z-10"
              style={{
                background: '#FFFEF9',
                border: '2px solid #C9B896',
                boxShadow: '0 4px 12px rgba(201, 184, 150, 0.3)',
              }}
            >
              <Heart className="w-4 h-4" style={{ color: '#E8D5D3' }} fill="currentColor" />
            </div>

            {/* Content grid */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-0 items-start">
              {/* Left side - always has right padding to stay away from center */}
              <div className="md:pr-20">
                {index % 2 === 0 ? (
                  // Even: Image on left
                  event.image && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg max-w-sm ml-auto"
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: event.imagePosition || 'center' }}
                      />
                    </motion.div>
                  )
                ) : (
                  // Odd: Text on left
                  <div className="text-center md:text-right ml-auto max-w-sm">
                    <span
                      className="inline-block px-5 py-2 text-sm font-medium rounded-full mb-4"
                      style={{
                        background: 'rgba(123, 163, 181, 0.15)',
                        color: '#5A8899',
                      }}
                    >
                      {event.date}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-serif mb-3"
                      style={{ color: '#3D3D3D' }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#6B6B6B' }}>
                      {event.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Right side - always has left padding to stay away from center */}
              <div className="md:pl-20">
                {index % 2 === 0 ? (
                  // Even: Text on right
                  <div className="text-center md:text-left mr-auto max-w-sm">
                    <span
                      className="inline-block px-5 py-2 text-sm font-medium rounded-full mb-4"
                      style={{
                        background: 'rgba(123, 163, 181, 0.15)',
                        color: '#5A8899',
                      }}
                    >
                      {event.date}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-serif mb-3"
                      style={{ color: '#3D3D3D' }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#6B6B6B' }}>
                      {event.description}
                    </p>
                  </div>
                ) : (
                  // Odd: Image on right
                  event.image && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg max-w-sm mr-auto"
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: event.imagePosition || 'center' }}
                      />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
