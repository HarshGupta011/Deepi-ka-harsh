'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { ExternalLink, Gift, Home, Plane, Heart, Sparkles } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

const registries = [
  {
    name: 'Amazon',
    description: 'Kitchen essentials, home decor, and tech gadgets for our new home.',
    icon: Gift,
    url: 'https://www.amazon.com/wedding',
  },
  {
    name: 'Zola',
    description: 'Curated collection of experiences and home items we love.',
    icon: Heart,
    url: 'https://www.zola.com/registry',
  },
  {
    name: 'Crate & Barrel',
    description: 'Elegant home furnishings and timeless pieces.',
    icon: Home,
    url: 'https://www.crateandbarrel.com/gift-registry',
  },
  {
    name: 'Honeyfund',
    description: 'Contribute to our honeymoon adventure in Greece!',
    icon: Plane,
    url: 'https://www.honeyfund.com',
  },
];

export default function RegistryPage() {
  return (
    <>
      {/* Hero Section - Sage Pastel */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Decorative gift icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(156, 175, 136, 0.15)',
                  border: '1px solid rgba(156, 175, 136, 0.3)',
                }}
              >
                <Gift className="w-8 h-8" style={{ color: '#9CAF88' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Gift Registry
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              Your presence at our wedding is the greatest gift of all.
              However, if you wish to honor us with a gift, we&apos;ve registered at these stores.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Registry Cards - Dusty Blue Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E5EFF3',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Our Registries"
            subtitle="Click on any registry to view our wish list."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {registries.map((registry, index) => (
              <motion.a
                key={index}
                href={registry.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl p-8 flex flex-col items-center text-center card-elegant"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(123, 163, 181, 0.15)',
                    border: '1px solid rgba(123, 163, 181, 0.3)',
                  }}
                >
                  <registry.icon className="w-8 h-8" style={{ color: '#7BA3B5' }} />
                </motion.div>

                <h3 className="font-serif text-2xl mb-3 flex items-center gap-2" style={{ color: '#3D3D3D' }}>
                  {registry.name}
                  <ExternalLink
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#7BA3B5' }}
                  />
                </h3>

                <p style={{ color: '#6B6B6B' }}>{registry.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section - Blush Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F8F0EE',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(232, 213, 211, 0.3)',
                border: '1px solid rgba(232, 213, 211, 0.5)',
              }}
            >
              <Sparkles className="w-10 h-10" style={{ color: '#7BA3B5' }} />
            </motion.div>

            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              A Note on Gifts
            </h2>

            <p className="text-lg mb-6" style={{ color: '#6B6B6B' }}>
              We truly mean it when we say your presence is the best present.
              We&apos;re blessed to have everything we need, and sharing our special
              day with you is more than enough.
            </p>

            <ElegantDivider variant="with-heart" className="mb-6" />

            <p className="text-lg" style={{ color: '#6B6B6B' }}>
              If you do choose to give a gift, please know that any contribution—big
              or small—is deeply appreciated and will help us build our new life together.
            </p>

            {/* Decorative hearts */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#C9B896' }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
              </motion.div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#C9B896' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
