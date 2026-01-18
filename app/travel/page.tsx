'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Map from '@/components/Map';
import { Hotel, Plane, Car, Wine, Utensils, Camera, ExternalLink, MapPin, Heart } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

const hotels = [
  {
    name: 'The Vineyard Inn',
    description: 'Our preferred hotel with special rates for wedding guests. Mention "Deepi & Harsh Wedding" for 15% off.',
    distance: '5 minutes from venue',
    price: '$$$',
    url: 'https://example.com/vineyard-inn',
  },
  {
    name: 'Napa Valley Lodge',
    description: 'Beautiful rooms with mountain views and complimentary breakfast.',
    distance: '10 minutes from venue',
    price: '$$$',
    url: 'https://example.com/napa-valley-lodge',
  },
  {
    name: 'Holiday Inn Express',
    description: 'Comfortable and budget-friendly option with easy access to the venue.',
    distance: '15 minutes from venue',
    price: '$$',
    url: 'https://example.com/holiday-inn',
  },
  {
    name: 'Airbnb Options',
    description: 'Various vacation rentals available in the area for families and groups.',
    distance: 'Varies',
    price: '$-$$$',
    url: 'https://www.airbnb.com',
  },
];

const attractions = [
  {
    name: 'Wine Tasting Tours',
    description: 'Explore world-renowned Napa Valley wineries and taste exceptional wines.',
    icon: Wine,
  },
  {
    name: 'Gourmet Dining',
    description: 'Experience Michelin-starred restaurants and farm-to-table cuisine.',
    icon: Utensils,
  },
  {
    name: 'Hot Air Balloon Rides',
    description: 'See the stunning valley views from above at sunrise.',
    icon: Camera,
  },
];

export default function TravelPage() {
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
                <MapPin className="w-8 h-8" style={{ color: '#7BA3B5' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Travel & Stay
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              Everything you need to know about getting here and where to stay
              for our celebration in beautiful Napa Valley.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Getting Here Section - Warm Cream */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F5EDE5',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Getting Here"
            subtitle="Options for traveling to Napa Valley."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* By Air */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 card-elegant"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(123, 163, 181, 0.15)',
                  border: '1px solid rgba(123, 163, 181, 0.3)',
                }}
              >
                <Plane className="w-7 h-7" style={{ color: '#7BA3B5' }} />
              </motion.div>
              <h3 className="font-serif text-xl mb-3" style={{ color: '#3D3D3D' }}>By Air</h3>
              <p className="mb-4" style={{ color: '#6B6B6B' }}>
                The closest airports are:
              </p>
              <ul className="space-y-2" style={{ color: '#3D3D3D' }}>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7BA3B5' }} />
                  <span><strong style={{ color: '#7BA3B5' }}>San Francisco (SFO)</strong> — 1 hour drive</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7BA3B5' }} />
                  <span><strong style={{ color: '#7BA3B5' }}>Oakland (OAK)</strong> — 1 hour drive</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7BA3B5' }} />
                  <span><strong style={{ color: '#7BA3B5' }}>Sacramento (SMF)</strong> — 1.5 hour drive</span>
                </li>
              </ul>
            </motion.div>

            {/* By Car */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 card-elegant"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(123, 163, 181, 0.15)',
                  border: '1px solid rgba(123, 163, 181, 0.3)',
                }}
              >
                <Car className="w-7 h-7" style={{ color: '#7BA3B5' }} />
              </motion.div>
              <h3 className="font-serif text-xl mb-3" style={{ color: '#3D3D3D' }}>By Car</h3>
              <p className="mb-4" style={{ color: '#6B6B6B' }}>
                Napa Valley is easily accessible by car:
              </p>
              <ul className="space-y-2" style={{ color: '#3D3D3D' }}>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7BA3B5' }} />
                  <span><strong style={{ color: '#7BA3B5' }}>From San Francisco:</strong> North on I-80, exit Highway 29</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7BA3B5' }} />
                  <span><strong style={{ color: '#7BA3B5' }}>From Sacramento:</strong> West on I-80, exit Highway 29</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7BA3B5' }} />
                  <span><strong style={{ color: '#7BA3B5' }}>Parking:</strong> Free parking available at the venue</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Venue Map */}
          <div className="mt-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className="font-serif text-xl" style={{ color: '#3D3D3D' }}>Venue Location</h3>
            </motion.div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(201, 184, 150, 0.4)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Map
                address="1234 Garden Estate Drive, Napa Valley, CA 94558"
                title="The Garden Estate"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <div className="container-wedding relative z-10">
          <div className="text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(156, 175, 136, 0.15)',
                border: '1px solid rgba(156, 175, 136, 0.3)',
              }}
            >
              <Hotel className="w-8 h-8" style={{ color: '#9CAF88' }} />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3D3D3D' }}>Where to Stay</h2>
            <p style={{ color: '#6B6B6B' }}>We&apos;ve compiled some hotel options for your convenience.</p>
            <ElegantDivider variant="simple" className="mt-6 max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hotels.map((hotel, index) => (
              <motion.a
                key={index}
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group block rounded-xl p-6 card-elegant"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Hotel className="w-5 h-5" style={{ color: '#7BA3B5' }} />
                    <h3 className="font-serif text-lg transition-colors" style={{ color: '#3D3D3D' }}>
                      {hotel.name}
                    </h3>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#7BA3B5' }}
                  />
                </div>
                <p className="text-sm mb-3" style={{ color: '#6B6B6B' }}>{hotel.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span style={{ color: '#3D3D3D' }}>{hotel.distance}</span>
                  <span className="font-medium" style={{ color: '#9CAF88' }}>{hotel.price}</span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p style={{ color: '#6B6B6B' }}>
              We recommend booking early as June is peak season in Napa Valley!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Things to Do Section - Dusty Blue Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E5EFF3',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Things to Do"
            subtitle="Make a weekend of it! Here are some local attractions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {attractions.map((attraction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center p-6 rounded-xl card-elegant"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'rgba(123, 163, 181, 0.15)',
                    border: '1px solid rgba(123, 163, 181, 0.3)',
                  }}
                >
                  <attraction.icon className="w-8 h-8" style={{ color: '#7BA3B5' }} />
                </motion.div>
                <h3 className="font-serif text-lg mb-2" style={{ color: '#3D3D3D' }}>{attraction.name}</h3>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{attraction.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation Note - Blush Pastel */}
      <section
        className="py-16 md:py-20 px-4 md:px-8 relative overflow-hidden"
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
            {/* Car Icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(232, 213, 211, 0.3)',
                border: '1px solid rgba(232, 213, 211, 0.5)',
              }}
            >
              <Car className="w-8 h-8" style={{ color: '#7BA3B5' }} />
            </motion.div>

            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              Wedding Day Transportation
            </h2>
            <p className="text-lg" style={{ color: '#6B6B6B' }}>
              We&apos;ll be providing a shuttle service between The Vineyard Inn and the venue
              for guests who prefer not to drive. Details will be sent closer to the date.
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
