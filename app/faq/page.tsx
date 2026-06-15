'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Accordion from '@/components/Accordion';
import { Mail, HelpCircle, Heart } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

const faqItems = [
  {
    question: 'When is the RSVP deadline?',
    answer:
      'Please RSVP by August 30th, 2026, so we can finalize our guest count, seating, and stay allocations. You can RSVP through the RSVP page on our website.',
  },
  {
    question: 'What is the dress code?',
    answer:
      'Each event has its own dress code — full details, colour palettes, and outfit inspiration are on the Events page. Don’t hesitate to reach out to us if you have questions or want suggestions.',
  },
  {
    question: 'Can I bring a plus one?',
    answer:
      'Please check your invite — if you have the option for a plus one, it will be noted there. If anything is unclear, reach out to us directly.',
  },
  {
    question: 'Are children welcome?',
    answer:
      'Yes — children are warmly welcome at every event except the Cocktail night, which is adults-only. We can’t wait to see your little ones at the rest of the celebrations!',
  },
  {
    question: 'What will the weather be like?',
    answer:
      'December is one of the best months to visit both cities.\n\nBangalore: pleasantly cool and dry — highs around 28°C / 82°F and lows around 15–17°C / 59–63°F. Mornings and evenings can feel chilly; a light jacket or shawl is handy.\n\nKolkata: mildly cool and dry — highs around 25–27°C / 77–80°F and lows around 11–16°C / 53–60°F. Comfortable during the day, breezy at night.\n\nRain is unlikely in both cities during the wedding week.',
  },
  {
    question: 'What if I need to update my RSVP?',
    answer:
      'Life happens — just reach out to us as soon as you can and we’ll update it for you.',
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero Section - Dusty Blue Pastel */}
      <section
        className="relative py-12 md:py-16 overflow-hidden -mt-16 md:-mt-20 pt-28 md:pt-36"
        style={{
          background: '#E5EFF3',
        }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Decorative icon */}
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
                  background: 'rgba(123, 163, 181, 0.15)',
                  border: '1px solid rgba(123, 163, 181, 0.3)',
                }}
              >
                <HelpCircle className="w-8 h-8" style={{ color: '#7BA3B5' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              FAQ
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              Got questions? We&apos;ve got answers! Here are some frequently asked questions
              about our wedding celebration.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Common Questions"
            subtitle="Everything you need to know about our big day."
          />

          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Still Have Questions - Blush Pastel */}
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
            {/* Mail Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(232, 213, 211, 0.3)',
                border: '1px solid rgba(232, 213, 211, 0.5)',
              }}
            >
              <Mail className="w-8 h-8" style={{ color: '#7BA3B5' }} />
            </motion.div>

            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              Still Have Questions?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#6B6B6B' }}>
              Don&apos;t hesitate to reach out! We&apos;re happy to help with anything.
            </p>

            {/* Contact button */}
            <motion.a
              href="mailto:wedding@deepiandharsh.com"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all btn-dusty-blue"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </motion.a>

            {/* Decorative hearts */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 mt-10"
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
