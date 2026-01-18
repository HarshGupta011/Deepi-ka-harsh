'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Accordion from '@/components/Accordion';
import { Mail, HelpCircle, Heart } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

const faqItems = [
  {
    question: 'When is the RSVP deadline?',
    answer: 'Please RSVP by August 1st, 2026, so we can finalize our guest count and seating arrangements. You can RSVP through our website or by contacting us directly.',
  },
  {
    question: 'What is the dress code?',
    answer: 'We request formal Indian attire or black tie for our celebration. Ladies: sarees, lehengas, anarkalis, or elegant gowns in rich colors like red, maroon, gold, and jewel tones. Gentlemen: sherwanis, kurta pajamas, or dark suits/tuxedos. Please avoid wearing white or red, as those colors are traditionally reserved for the bride.',
  },
  {
    question: 'Can I bring a plus one?',
    answer: 'Due to venue capacity, we can only accommodate guests listed on the invitation. If you received a plus one, it will be noted on your invitation. Please reach out if you have questions.',
  },
  {
    question: 'Are children welcome?',
    answer: 'While we love your little ones, we have decided to make our wedding an adults-only celebration. We hope this gives you a chance to enjoy a night off! We will have a list of recommended babysitters available upon request.',
  },
  {
    question: 'Will the ceremony be indoors or outdoors?',
    answer: 'The ceremony will take place in the beautiful Rose Garden (outdoors), weather permitting. In case of rain, we have a gorgeous indoor backup location at the estate. We recommend ladies bring a wrap for the evening and avoid stiletto heels for the garden.',
  },
  {
    question: 'What time should I arrive?',
    answer: 'The ceremony begins promptly at 4:00 PM. We recommend arriving at least 30 minutes early to find parking, grab a drink, and get seated. Please plan accordingly!',
  },
  {
    question: 'Is there parking at the venue?',
    answer: 'Yes! The Garden Estate has complimentary parking for all guests. There will be attendants to direct you when you arrive.',
  },
  {
    question: 'Will there be transportation provided?',
    answer: 'We will be providing a shuttle service between The Vineyard Inn and the venue for guests who prefer not to drive. Shuttle times will be communicated closer to the wedding date.',
  },
  {
    question: 'I have dietary restrictions. What should I do?',
    answer: 'We want everyone to enjoy the meal! Please indicate any dietary restrictions or allergies on your RSVP form, and our caterer will prepare a suitable alternative for you. We offer vegetarian, vegan, and Jain options.',
  },
  {
    question: 'Can I take photos during the ceremony?',
    answer: 'We kindly ask that you keep phones and cameras put away during the ceremony so our photographer can capture these special moments without distractions. We\'ll have plenty of time for photos during the reception! Feel free to use our hashtag #DeepiAndHarsh2025 to share reception photos.',
  },
  {
    question: 'Where can I find your gift registry?',
    answer: 'Your presence is truly the greatest gift! However, if you wish to honor us with a gift, please visit our Registry page for links to our registries at Amazon, Zola, Crate & Barrel, and our honeymoon fund.',
  },
  {
    question: 'What if I need to update my RSVP?',
    answer: 'Things happen, and we understand! Please reach out to us as soon as possible at wedding@deepiandharsh.com to make any changes to your RSVP.',
  },
  {
    question: 'Will there be an open bar?',
    answer: 'Yes! We will have an open bar throughout the cocktail hour and reception with a selection of wine, beer, and signature cocktails. Please drink responsibly and use our shuttle service or a rideshare if needed.',
  },
  {
    question: 'When does the reception end?',
    answer: 'The reception will end at midnight. We plan to party until the very last song! After-party details may be shared closer to the wedding.',
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero Section - Dusty Blue Pastel */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
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
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
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
