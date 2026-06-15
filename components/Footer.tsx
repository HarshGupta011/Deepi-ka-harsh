'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

const footerLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/events', label: 'Events' },
  { href: '/travel', label: 'Travel & Stay' },
  { href: '/things-to-do', label: 'Things to Do' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQs' },
];

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

      <div className="py-8 px-4">
        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-wide transition-opacity duration-300 hover:opacity-60"
              style={{ color: '#5A5A5A' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-center text-sm" style={{ color: '#9A9A9A' }}>
          <p className="flex items-center justify-center gap-1">
            Made by us for our special day
            <Heart className="w-4 h-4" style={{ color: '#E8D5D3' }} fill="currentColor" />
          </p>
          <p className="mt-1">© 2026 Deepi-ka-Harsh</p>
        </div>
      </div>
    </footer>
  );
}
