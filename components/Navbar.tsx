'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/events', label: 'Events' },
  { href: '/travel', label: 'Travel & Stay' },
  { href: '/things-to-do', label: 'Things to Do' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQs' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm"
      style={{
        background: scrolled
          ? 'rgba(250, 248, 245, 0.5)'
          : 'rgba(250, 248, 245, 0.25)',
        boxShadow: scrolled
          ? '0 2px 10px rgba(0, 0, 0, 0.05)'
          : 'none',
      }}
    >
      <div className="container-wedding">
        {/* Mobile: Row layout | Desktop: Centered column */}
        <div className="flex items-center justify-between py-2 md:flex-col md:items-center md:justify-center md:py-2">
          {/* Logo - Centered */}
          <Link href="/" className="md:mb-1">
            <span
              className="font-signature text-lg md:text-xl transition-all duration-300 hover:opacity-70"
              style={{ color: '#3D3D3D' }}
            >
              D & H
            </span>
          </Link>

          {/* Desktop Navigation - Centered with dividers */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <div key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="px-2.5 py-0 text-[11px] tracking-wide transition-all duration-300 hover:opacity-60"
                  style={{ color: '#5A5A5A' }}
                >
                  {link.label}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="text-gray-300 mx-0.5 text-[11px]">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:opacity-70 transition-all duration-300 rounded-lg"
            style={{
              color: '#3D3D3D',
              background: isOpen ? 'rgba(123, 163, 181, 0.1)' : 'transparent',
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-md overflow-hidden"
            style={{
              background: 'rgba(250, 248, 245, 0.98)',
              borderTop: '1px solid rgba(201, 184, 150, 0.3)',
            }}
          >
            <div className="container-wedding py-4 space-y-1 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-center transition-all duration-300 hover:opacity-60"
                    style={{
                      color: '#5A5A5A',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
