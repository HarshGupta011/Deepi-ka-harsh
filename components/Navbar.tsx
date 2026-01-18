'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/registry', label: 'Registry' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/travel', label: 'Travel' },
  { href: '/faq', label: 'FAQ' },
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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Heart
                className="w-5 h-5 transition-all duration-300"
                style={{ color: '#7BA3B5' }}
                fill="currentColor"
              />
            </motion.div>
            <span
              className="font-script text-2xl md:text-3xl transition-all duration-300"
              style={{ color: '#3D3D3D' }}
            >
              H & D
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                style={{ color: '#3D3D3D' }}
              >
                <span className="relative z-10 group-hover:text-dusty-500 transition-colors">
                  {link.label}
                </span>
                {/* Dusty blue underline on hover */}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                  style={{ background: '#7BA3B5' }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:opacity-70 transition-all duration-300 rounded-lg"
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
            className="lg:hidden backdrop-blur-md overflow-hidden"
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
                    className="block px-4 py-3 rounded-lg transition-all duration-300 hover:pl-6 hover:bg-blush-100"
                    style={{
                      color: '#3D3D3D',
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#7BA3B5' }}
                      />
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Decorative divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 mt-4"
                style={{ borderTop: '1px solid rgba(201, 184, 150, 0.3)' }}
              >
                <p className="text-center text-sm font-script" style={{ color: '#7BA3B5' }}>
                  June 15, 2025
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
