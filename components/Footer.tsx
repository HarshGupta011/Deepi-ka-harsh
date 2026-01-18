'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}>
      {/* Champagne top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #C9B896, transparent)',
        }}
      />

      <div className="py-6 text-center text-sm" style={{ color: '#9A9A9A' }}>
        <p className="flex items-center justify-center gap-1">
          Made by us for our special day
          <Heart className="w-4 h-4" style={{ color: '#E8D5D3' }} fill="currentColor" />
        </p>
        <p className="mt-1">© 2026 Deepi-ka-Harsh</p>
      </div>
    </footer>
  );
}
