'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ElegantDivider from '@/components/ElegantDivider';
import {
  Hotel,
  Plane,
  MapPin,
  Heart,
  Utensils,
  ShieldCheck,
  Droplet,
  Syringe,
  Bug,
  ExternalLink,
  FileCheck,
} from 'lucide-react';

const bangaloreHotels = [
  {
    name: 'La Marvella, Jayanagar',
    description:
      'Our Reception venue — stay where the party is.',
    distance: 'At the Reception venue',
    price: '$$',
    url: 'https://www.lamarvellahotels.com/',
  },
  {
    name: 'Hotel Pai Viceroy',
    description:
      'Super close to the Bangalore events — convenient and comfortable.',
    distance: 'Near both Bangalore venues',
    price: '$$',
    url: 'https://www.paihotels.com/hotel-pai-viceroy-jayanagar-bangalore/',
  },
];

const indiaTips = [
  {
    title: 'Street food',
    body: 'Be cautious early in your trip. Stick to busy, well-known spots and pace yourself before going adventurous.',
    icon: Utensils,
  },
  {
    title: 'Drink bottled or mineral water only',
    body: 'Avoid tap water and ice from unverified sources. Sealed bottles are widely available everywhere.',
    icon: Droplet,
  },
  {
    title: 'Vaccinations',
    body: 'Check with your doctor 4–6 weeks before travel. Typhoid and hepatitis A are commonly recommended.',
    icon: Syringe,
  },
  {
    title: 'Mosquito repellent',
    body: 'Apply it like sunscreen — morning and evening. Long sleeves help at dusk.',
    icon: Bug,
  },
];

export default function TravelPage() {
  return (
    <>
      {/* Hero Section */}
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
                <MapPin className="w-8 h-8" style={{ color: '#7BA3B5' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Travel & Stay
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              A two-state celebration across Bangalore and Kolkata. Here&apos;s
              everything you&apos;ll need to get here, settle in, and feel at home.
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Getting Here - Airports */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{ background: '#F5EDE5' }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Getting Here"
            subtitle="Two cities, two airports. Both well-connected to most major hubs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Bangalore Airport */}
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
              <h3 className="font-serif text-xl mb-1" style={{ color: '#3D3D3D' }}>
                Bangalore (BLR)
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B6B6B' }}>
                Kempegowda International Airport
              </p>
              <ul className="space-y-2" style={{ color: '#3D3D3D' }}>
                <li className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: '#7BA3B5' }}
                  />
                  <span>
                    <strong style={{ color: '#7BA3B5' }}>~40 km</strong> from the South
                    Bangalore venues.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: '#7BA3B5' }}
                  />
                  <span>
                    <strong style={{ color: '#7BA3B5' }}>60–90 min</strong> by car
                    depending on traffic.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: '#7BA3B5' }}
                  />
                  <span>
                    <strong style={{ color: '#7BA3B5' }}>Uber & Ola</strong> work well; pre-book
                    an airport cab for late arrivals.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Kolkata Airport */}
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
                <Plane className="w-7 h-7" style={{ color: '#7BA3B5' }} />
              </motion.div>
              <h3 className="font-serif text-xl mb-1" style={{ color: '#3D3D3D' }}>
                Kolkata (CCU)
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B6B6B' }}>
                Netaji Subhas Chandra Bose International Airport
              </p>
              <ul className="space-y-2" style={{ color: '#3D3D3D' }}>
                <li className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: '#7BA3B5' }}
                  />
                  <span>
                    <strong style={{ color: '#7BA3B5' }}>~13 km</strong> from Salt Lake /
                    Stadel.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: '#7BA3B5' }}
                  />
                  <span>
                    <strong style={{ color: '#7BA3B5' }}>30–45 min</strong> by car.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: '#7BA3B5' }}
                  />
                  <span>
                    <strong style={{ color: '#7BA3B5' }}>Uber & Ola</strong> available; the
                    airport taxi counter inside arrivals is also reliable.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-10 rounded-2xl p-6 md:p-7 card-elegant text-center"
          >
            <p className="leading-relaxed" style={{ color: '#3D3D3D' }}>
              Once your flights are booked, please{' '}
              <strong style={{ color: '#7BA3B5' }}>share your arrival times with us</strong>.
              Double-check the time-zone difference from where you&apos;re flying in, and
              plan to arrive at least <strong style={{ color: '#7BA3B5' }}>3 hours before
              your first event</strong> so you can settle in, freshen up, and enjoy
              everything stress-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Where to Stay */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{ background: '#E8F0E2' }}
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
            <h2 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3D3D3D' }}>
              Where to Stay
            </h2>
            <p style={{ color: '#6B6B6B' }}>
              On-site rooms in Kolkata and a few hand-picked options in Bangalore.
            </p>
            <ElegantDivider variant="simple" className="mt-6 max-w-xs mx-auto" />
          </div>

          {/* Kolkata - Stadel featured card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto rounded-2xl p-8 md:p-10 card-elegant mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Hotel className="w-5 h-5" style={{ color: '#9CAF88' }} />
              <h3 className="font-serif text-2xl" style={{ color: '#3D3D3D' }}>
                Kolkata — at the venue (Stadel)
              </h3>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: '#3D3D3D' }}>
              For our Kolkata weekend, a limited block of rooms is available on-site at{' '}
              <strong>Stadel</strong> from the <strong>evening of December 12th</strong> to
              the <strong>early morning of December 14th</strong>.
            </p>
            <p className="leading-relaxed" style={{ color: '#6B6B6B' }}>
              Allocation is based on the order of RSVPs — please confirm yours as early
              as possible so we can hold a room for you. If on-site stay fills up, we&apos;ll
              share a list of nearby hotels and help with transport to the venue.
            </p>
          </motion.div>

          {/* Bangalore hotels */}
          <div className="max-w-4xl mx-auto">
            <h3
              className="font-serif text-xl md:text-2xl mb-3 text-center"
              style={{ color: '#3D3D3D' }}
            >
              Bangalore — nearby hotels
            </h3>
            <p
              className="text-center text-sm md:text-base mb-6 max-w-2xl mx-auto"
              style={{ color: '#6B6B6B' }}
            >
              Please <strong style={{ color: '#9CAF88' }}>confirm with us before booking any hotels</strong> — we may have updates or recommendations to share.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {bangaloreHotels.map((hotel, index) => (
                <motion.a
                  key={hotel.name}
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
                      <h4 className="font-serif text-lg" style={{ color: '#3D3D3D' }}>
                        {hotel.name}
                      </h4>
                    </div>
                    <ExternalLink
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#7BA3B5' }}
                    />
                  </div>
                  <p className="text-sm mb-3" style={{ color: '#6B6B6B' }}>
                    {hotel.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: '#3D3D3D' }}>{hotel.distance}</span>
                    <span className="font-medium" style={{ color: '#9CAF88' }}>
                      {hotel.price}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* First-Time in India */}
      <section
        className="py-16 md:py-20 px-4 md:px-8 relative overflow-hidden"
        style={{ background: '#F8F0EE' }}
      >
        <div className="container-wedding relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(232, 213, 211, 0.4)',
                border: '1px solid rgba(232, 213, 211, 0.6)',
              }}
            >
              <ShieldCheck className="w-8 h-8" style={{ color: '#7BA3B5' }} />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#3D3D3D' }}>
              First-Time in India?
            </h2>
            <p className="text-lg" style={{ color: '#6B6B6B' }}>
              A few small precautions so you can focus on the celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {indiaTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-xl p-6 card-elegant"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(232, 213, 211, 0.4)',
                      border: '1px solid rgba(232, 213, 211, 0.6)',
                    }}
                  >
                    <tip.icon className="w-6 h-6" style={{ color: '#7BA3B5' }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1" style={{ color: '#3D3D3D' }}>
                      {tip.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                      {tip.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10 max-w-2xl mx-auto"
            style={{ color: '#6B6B6B' }}
          >
            Reach out to either of us if anything feels unclear — we want you to feel
            safe and looked after.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <div className="w-2 h-2 rounded-full" style={{ background: '#C9B896' }} />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
            </motion.div>
            <div className="w-2 h-2 rounded-full" style={{ background: '#C9B896' }} />
          </motion.div>
        </div>
      </section>

      {/* Visa */}
      <section
        className="py-16 md:py-20 px-4 md:px-8 relative overflow-hidden"
        style={{ background: '#E5EFF3' }}
      >
        <div className="container-wedding relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(123, 163, 181, 0.15)',
                border: '1px solid rgba(123, 163, 181, 0.3)',
              }}
            >
              <FileCheck className="w-7 h-7" style={{ color: '#7BA3B5' }} />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl mb-3" style={{ color: '#3D3D3D' }}>
              Visa for India
            </h2>
            <p style={{ color: '#6B6B6B' }}>
              Most international guests need a visa. The online{' '}
              <a
                href="https://indianvisaonline.gov.in/evisa/tvoa.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline inline-flex items-center gap-1"
                style={{ color: '#7BA3B5' }}
              >
                e-Tourist Visa
                <ExternalLink className="w-3.5 h-3.5" />
              </a>{' '}
              is the simplest route. Apply about 3 months prior to be safe; your passport
              must be valid for 6+ months from entry. Print the approved e-Visa to show on
              arrival.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
