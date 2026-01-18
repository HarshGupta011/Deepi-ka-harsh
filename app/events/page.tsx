'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Map from '@/components/Map';
import AddToCalendar from '@/components/AddToCalendar';
import { Clock, MapPin, Shirt, PartyPopper, GlassWater, Heart } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

const events = [
  {
    title: 'The Ceremony',
    icon: Heart,
    time: '4:00 PM',
    venue: 'The Rose Garden',
    address: '1234 Garden Estate Drive, Napa Valley, CA 94558',
    description: 'Join us as we exchange our vows surrounded by beautiful roses and the people we love most.',
    dressCode: 'Formal Indian Attire',
    calendarEvent: {
      title: 'Deepi & Harsh Wedding Ceremony',
      description: 'Wedding ceremony at The Rose Garden',
      location: '1234 Garden Estate Drive, Napa Valley, CA 94558',
      startDate: '2025-06-15T16:00:00',
      endDate: '2025-06-15T17:00:00',
    },
  },
  {
    title: 'Cocktail Hour',
    icon: GlassWater,
    time: '5:00 PM',
    venue: 'The Terrace',
    address: '1234 Garden Estate Drive, Napa Valley, CA 94558',
    description: 'Enjoy drinks and hors d\'oeuvres on the terrace while taking in stunning vineyard views.',
    dressCode: 'Formal Attire',
    calendarEvent: {
      title: 'Deepi & Harsh Wedding - Cocktail Hour',
      description: 'Cocktail hour on The Terrace',
      location: '1234 Garden Estate Drive, Napa Valley, CA 94558',
      startDate: '2025-06-15T17:00:00',
      endDate: '2025-06-15T18:00:00',
    },
  },
  {
    title: 'The Reception',
    icon: PartyPopper,
    time: '6:00 PM',
    venue: 'The Grand Ballroom',
    address: '1234 Garden Estate Drive, Napa Valley, CA 94558',
    description: 'Dinner, dancing, and celebration! Let\'s make unforgettable memories together.',
    dressCode: 'Formal Attire',
    calendarEvent: {
      title: 'Deepi & Harsh Wedding Reception',
      description: 'Wedding reception at The Grand Ballroom',
      location: '1234 Garden Estate Drive, Napa Valley, CA 94558',
      startDate: '2025-06-15T18:00:00',
      endDate: '2025-06-16T00:00:00',
    },
  },
];

export default function EventsPage() {
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
            {/* Decorative top element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Heart className="w-8 h-8 mx-auto" style={{ color: '#E8D5D3' }} fill="currentColor" />
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Wedding Day
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
              Join us for a day of love, laughter, and celebration at The Garden Estate.
            </p>

            {/* Date and Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: 'rgba(255, 254, 249, 0.9)',
                  border: '1px solid rgba(201, 184, 150, 0.4)',
                }}
              >
                <span className="font-serif text-lg" style={{ color: '#3D3D3D' }}>June 15, 2025</span>
              </div>
              <div
                className="w-2 h-2 rotate-45 hidden md:block"
                style={{ background: '#7BA3B5' }}
              />
              <div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: 'rgba(255, 254, 249, 0.9)',
                  border: '1px solid rgba(201, 184, 150, 0.4)',
                }}
              >
                <span className="font-serif text-lg" style={{ color: '#3D3D3D' }}>Napa Valley, CA</span>
              </div>
            </motion.div>

            <ElegantDivider variant="line" className="mt-10" />
          </motion.div>
        </div>
      </section>

      {/* Events Timeline - Warm Cream */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F5EDE5',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Schedule of Events"
            subtitle="Here's what to expect on our special day."
          />

          <div className="space-y-10 max-w-4xl mx-auto">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden card-elegant"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(123, 163, 181, 0.15)',
                        border: '1px solid rgba(123, 163, 181, 0.3)',
                      }}
                    >
                      <event.icon className="w-8 h-8" style={{ color: '#7BA3B5' }} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <h3 className="font-serif text-2xl" style={{ color: '#3D3D3D' }}>
                          {event.title}
                        </h3>
                        <AddToCalendar event={event.calendarEvent} />
                      </div>

                      <p className="mb-6" style={{ color: '#6B6B6B' }}>{event.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                          className="flex items-center gap-3 px-4 py-2 rounded-lg"
                          style={{
                            background: 'rgba(123, 163, 181, 0.1)',
                            border: '1px solid rgba(123, 163, 181, 0.2)',
                          }}
                        >
                          <Clock className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                          <span style={{ color: '#3D3D3D' }}>{event.time}</span>
                        </div>
                        <div
                          className="flex items-center gap-3 px-4 py-2 rounded-lg"
                          style={{
                            background: 'rgba(123, 163, 181, 0.1)',
                            border: '1px solid rgba(123, 163, 181, 0.2)',
                          }}
                        >
                          <MapPin className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                          <span style={{ color: '#3D3D3D' }}>{event.venue}</span>
                        </div>
                        <div
                          className="flex items-center gap-3 px-4 py-2 rounded-lg"
                          style={{
                            background: 'rgba(123, 163, 181, 0.1)',
                            border: '1px solid rgba(123, 163, 181, 0.2)',
                          }}
                        >
                          <Shirt className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                          <span style={{ color: '#3D3D3D' }}>{event.dressCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div style={{ borderTop: '1px solid rgba(201, 184, 150, 0.3)' }}>
                  <Map address={event.address} title={event.venue} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dress Code Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
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
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(156, 175, 136, 0.15)',
                border: '1px solid rgba(156, 175, 136, 0.3)',
              }}
            >
              <Shirt className="w-8 h-8" style={{ color: '#9CAF88' }} />
            </motion.div>

            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              Dress Code
            </h2>

            <p className="text-lg mb-8" style={{ color: '#6B6B6B' }}>
              We kindly request{' '}
              <span style={{ color: '#7BA3B5' }}>formal Indian attire or black tie</span>{' '}
              for our celebration.
            </p>

            <ElegantDivider variant="simple" className="mb-10 max-w-xs mx-auto" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Ladies card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl card-elegant"
              >
                <h3 className="font-serif text-xl mb-3" style={{ color: '#3D3D3D' }}>
                  Ladies
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                  Sarees, lehengas, anarkalis, or elegant gowns.
                  Soft pastels and jewel tones are encouraged.
                </p>
              </motion.div>

              {/* Gentlemen card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl card-elegant"
              >
                <h3 className="font-serif text-xl mb-3" style={{ color: '#3D3D3D' }}>
                  Gentlemen
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                  Sherwanis, kurta pajamas, or dark suits/tuxedos.
                  A pocket square or boutonniere is always a nice touch!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
