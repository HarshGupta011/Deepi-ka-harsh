'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ElegantDivider from '@/components/ElegantDivider';
import Recommendations from '@/components/Recommendations';
import {
  Utensils,
  IceCream,
  Coffee,
  Cookie,
  Landmark,
  ShoppingBag,
  Trees,
  Flower2,
  Wine,
  Sparkles,
  BookOpen,
  Building2,
  Waves,
} from 'lucide-react';

const bangaloreThingsToDo = [
  {
    name: 'Corner House',
    description:
      '"Death By Chocolate" is non-negotiable. The city’s beloved ice-cream parlour chain.',
    icon: IceCream,
  },
  {
    name: 'Taaza Thindi',
    description:
      'Legendary South Indian breakfast — piping idli, crispy vada, butter dosa. Get there early.',
    icon: Utensils,
  },
  {
    name: 'CTR (Central Tiffin Room)',
    description: 'The benne dosa worth the queue — crispy, buttery, unforgettable.',
    icon: Utensils,
  },
  {
    name: "Meghana's Foods",
    description: 'Bengaluru’s most-argued-about biryani. Try the Andhra-style chicken.',
    icon: Utensils,
  },
  {
    name: 'Filter Coffee',
    description:
      'South India’s signature brew — try any classic darshini or Airlines Hotel.',
    icon: Coffee,
  },
  {
    name: 'Bangalore Palace',
    description:
      'A Tudor-style royal residence with grand interiors — a slice of the city’s history.',
    icon: Landmark,
  },
  {
    name: 'Commercial Street',
    description:
      'The classic Bangalore shopping run — jewellery, fabrics, and bargains worth the chaos.',
    icon: ShoppingBag,
  },
  {
    name: 'Lalbagh',
    description:
      'Historic botanical garden with the famous Glass House and centuries-old trees.',
    icon: Flower2,
  },
  {
    name: 'Cubbon Park',
    description:
      'A leafy green lung in the middle of the city — perfect for a morning walk.',
    icon: Trees,
  },
  {
    name: 'Bars & Clubs',
    description:
      'Hard to keep track of which is the best — the scene moves fast. Ask us for current picks.',
    icon: Wine,
  },
];

const kolkataThingsToDo = [
  {
    name: 'Victoria Memorial',
    description:
      'The white-marble crown jewel of the city, wrapped in gardens. Peak colonial-era grandeur.',
    icon: Landmark,
  },
  {
    name: 'National Library of India',
    description:
      'The country’s largest library, set in the leafy colonial Belvedere Estate — a century-plus of books and quiet grandeur.',
    icon: BookOpen,
  },
  {
    name: 'Howrah Bridge & Princep Ghat',
    description:
      'Walk the iconic cantilever bridge, then catch a Hooghly-river sunset from the ghats.',
    icon: Waves,
  },
  {
    name: 'Indian Museum',
    description:
      'The oldest and largest museum in India — Egyptian mummies to Mughal miniatures under one colonial roof.',
    icon: Building2,
  },
  {
    name: 'Park Street',
    description:
      'Kolkata’s nightlife spine. Chelo kebab at Peter Cat, breakfast and rum balls at Flury’s.',
    icon: Wine,
  },
  {
    name: 'Phuchka',
    description:
      'Kolkata’s street-snack pride — crispy puris with spiced tamarind water. Eat them where the locals do.',
    icon: Utensils,
  },
  {
    name: 'Kathi Rolls',
    description:
      'The original Kolkata roll — egg, kebab, paratha. Nizam’s started it; everyone perfected it.',
    icon: Utensils,
  },
  {
    name: 'Kolkata Biryani',
    description:
      'Fragrant, subtle, and famously hiding a whole potato. Try Arsalan or Aminia.',
    icon: Utensils,
  },
  {
    name: 'Tiretti Bazaar',
    description:
      'Dawn breakfast in Kolkata’s old Chinatown — momos, pork buns, and hand-pulled noodles.',
    icon: Utensils,
  },
  {
    name: 'Bengali Sweets',
    description:
      'Rosogolla, mishti doi, sandesh. Visit K.C. Das or Balaram Mullick & Radharaman Mullick.',
    icon: Cookie,
  },
  {
    name: 'Aloo Puri',
    description:
      'Classic Bengali breakfast — fluffy pooris with spiced potato curry. Try Tewari Brothers.',
    icon: Utensils,
  },
];

export default function ThingsToDoPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-12 md:py-16 overflow-hidden -mt-16 md:-mt-20 pt-28 md:pt-36"
        style={{ background: '#E5EFF3' }}
      >
        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
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
                <Sparkles className="w-8 h-8" style={{ color: '#7BA3B5' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Things to Do
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: '#6B6B6B' }}
            >
              Our favourite spots in Bangalore and Kolkata — plus a place for you to
              share your own picks with everyone else.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Curated picks */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{ background: '#F5EDE5' }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Our Picks"
            subtitle="If you have the time, explore the cities — here are a few of our favourites to get you started."
          />

          <div className="space-y-14 max-w-5xl mx-auto">
            {/* Bangalore */}
            <div>
              <h3
                className="font-serif text-xl md:text-2xl mb-6 text-center"
                style={{ color: '#3D3D3D' }}
              >
                Bangalore
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bangaloreThingsToDo.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="text-center p-6 rounded-xl card-elegant"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: 'rgba(123, 163, 181, 0.15)',
                        border: '1px solid rgba(123, 163, 181, 0.3)',
                      }}
                    >
                      <item.icon className="w-7 h-7" style={{ color: '#7BA3B5' }} />
                    </motion.div>
                    <h4
                      className="font-serif text-lg mb-2"
                      style={{ color: '#3D3D3D' }}
                    >
                      {item.name}
                    </h4>
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p
                className="text-sm md:text-base text-center mt-6 italic"
                style={{ color: '#6B6B6B' }}
              >
                The list doesn&apos;t end here — there&apos;s plenty more. Hope you have
                time to explore the city.
              </p>
            </div>

            {/* Kolkata */}
            <div>
              <h3
                className="font-serif text-xl md:text-2xl mb-6 text-center"
                style={{ color: '#3D3D3D' }}
              >
                Kolkata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kolkataThingsToDo.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="text-center p-6 rounded-xl card-elegant"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: 'rgba(156, 175, 136, 0.15)',
                        border: '1px solid rgba(156, 175, 136, 0.3)',
                      }}
                    >
                      <item.icon className="w-7 h-7" style={{ color: '#9CAF88' }} />
                    </motion.div>
                    <h4
                      className="font-serif text-lg mb-2"
                      style={{ color: '#3D3D3D' }}
                    >
                      {item.name}
                    </h4>
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Recommendations */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{ background: '#E8F0E2' }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Guest Recommendations"
            subtitle="Share your favourite spots. Reply to others. Build the ultimate list together."
          />
          <Recommendations />
        </div>
      </section>
    </>
  );
}
