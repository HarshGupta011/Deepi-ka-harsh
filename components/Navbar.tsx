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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
      style={scrolled ? {
        background: 'rgba(250, 248, 245, 0.95)',
        borderBottom: '1px solid rgba(201, 184, 150, 0.3)',
      } : {}}
    >
      <div className="container-wedding">
        {/* Centered Layout */}
        <div className="flex flex-col items-center py-1.5 md:py-2">
          {/* Logo - Centered */}
          <Link href="/" className="mb-0.5 md:mb-1">
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
            className="md:hidden absolute right-4 top-2 p-1.5 hover:opacity-70 transition-all duration-300 rounded-lg"
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
