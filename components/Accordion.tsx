'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl overflow-hidden card-elegant"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-all duration-300"
            style={{
              background: openIndex === index
                ? 'rgba(123, 163, 181, 0.08)'
                : 'transparent',
            }}
          >
            <h3 className="font-serif text-lg" style={{ color: '#3D3D3D' }}>
              {item.question}
            </h3>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                background: openIndex === index
                  ? 'rgba(123, 163, 181, 0.2)'
                  : 'rgba(201, 184, 150, 0.15)',
                border: '1px solid rgba(201, 184, 150, 0.3)',
              }}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                style={{ color: '#7BA3B5' }}
              />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div
                  className="px-6 pb-5 leading-relaxed"
                  style={{
                    color: '#6B6B6B',
                    borderTop: '1px solid rgba(201, 184, 150, 0.2)',
                    paddingTop: '1rem',
                  }}
                >
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
