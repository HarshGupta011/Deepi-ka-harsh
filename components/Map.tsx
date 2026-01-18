'use client';

import { motion } from 'framer-motion';

interface MapProps {
  address: string;
  title: string;
  className?: string;
}

export default function Map({ address, title, className = '' }: MapProps) {
  const encodedAddress = encodeURIComponent(address);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  // For Google Maps embed, use this URL with your API key:
  // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-xl overflow-hidden shadow-lg ${className}`}
    >
      {/* Map Placeholder - Replace with actual Google Maps embed */}
      <div className="relative bg-sage-100 h-64">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-sage-600">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="font-medium">{title}</p>
          <p className="text-sm mt-1 text-sage-500 text-center px-4">{address}</p>
        </div>

        {/* Uncomment below to use actual Google Maps embed */}
        {/*
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${title}`}
        />
        */}
      </div>

      <div className="bg-white p-4 flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sage-800">{title}</h4>
          <p className="text-sm text-sage-500">{address}</p>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 text-sm font-medium rounded-lg transition-colors"
        >
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}
