'use client';

import { Heart, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}>
      {/* Champagne top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #C9B896, transparent)',
        }}
      />

      <div className="container-wedding py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="font-script text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              Deepi & Harsh
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
              December 12, 2026
              <br />
              The Garden Estate, Napa Valley
            </p>
            {/* Decorative element */}
            <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }} />
              <Heart className="w-3 h-3" style={{ color: '#E8D5D3' }} fill="currentColor" />
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }} />
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-right"
          >
            <h4 className="font-serif text-lg mb-4" style={{ color: '#3D3D3D' }}>Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:wedding@deepiandharsh.com"
                className="flex items-center justify-center md:justify-end gap-2 transition-all duration-300 hover:text-dusty-500"
                style={{ color: '#6B6B6B' }}
              >
                <Mail className="w-4 h-4" style={{ color: '#7BA3B5' }} />
                wedding@deepiandharsh.com
              </a>
              <div className="flex items-center justify-center md:justify-end gap-2" style={{ color: '#6B6B6B' }}>
                <MapPin className="w-4 h-4" style={{ color: '#7BA3B5' }} />
                Napa Valley, California
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-8 relative">
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
            <div className="h-px flex-1 max-w-[200px]" style={{ background: 'linear-gradient(to right, transparent, #C9B896)' }} />
            <div className="mx-4 w-2 h-2 rotate-45" style={{ background: '#7BA3B5' }} />
            <div className="h-px flex-1 max-w-[200px]" style={{ background: 'linear-gradient(to left, transparent, #C9B896)' }} />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: '#9A9A9A' }}>
            <p className="flex items-center gap-1">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4" style={{ color: '#E8D5D3' }} fill="currentColor" />
              </motion.span>{' '}
              for our special day
            </p>
            <p>© 2026 Deepi & Harsh Wedding</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
