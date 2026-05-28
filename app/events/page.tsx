'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, MapPin, Shirt, Sparkles, ExternalLink, Building2 } from 'lucide-react';
import AddToCalendar from '@/components/AddToCalendar';

interface EventType {
  id: number;
  name: string;
  date: string;
  time: string;
  timeNote?: string;
  ageRestriction?: string;
  venueType?: 'Indoor' | 'Outdoor' | 'Indoor & Outdoor';
  location: string;
  address: string;
  mapUrl?: string;
  dressCode: string;
  dressCodeNote?: string;
  dressCodeSplit?: {
    brideTitle: string;
    brideDesc: string;
    groomTitle: string;
    groomDesc: string;
  };
  colorPalette?: string[];
  outfitInspoUrl?: string;
  outfitInspoUrl2?: string;
  outfitInspoLinks?: { label: string; url: string }[];
  description: string;
  image: string;
  color: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

const events: EventType[] = [
  {
    id: 1,
    name: 'The Prequel',
    date: 'December 5th',
    time: '9:00 PM - 12:00 AM',
    timeNote: 'Arrival: 8:30 - 9 PM. Account for Bangalore traffic & arrive on time!',
    ageRestriction: '21+ only',
    venueType: 'Indoor',
    location: 'Gatsby, Bangalore',
    address: 'Bannerghatta Rd, Arekere, Bengaluru',
    mapUrl: 'https://maps.google.com/?q=Gatsby+Bannerghatta+Rd+Arekere+Bengaluru',
    dressCode: 'Cocktail Glam Only ✨',
    dressCodeNote: 'Think chic western cocktail fits — gowns, sleek dresses, suits, blazers & party-ready looks',
    colorPalette: ['#1a1a2e', '#0f3460', '#16213e', '#1b4332', '#7c0a02', '#2d0a0a', '#000000', '#4a0e0e'],
    description: 'Raise a glass as we kick off the celebrations with drinks, music, and good vibes.',
    image: '/images/events/cocktail_main.png',
    color: '#7BA3B5',
    calendarEvent: {
      title: 'Deepika & Harsh - The Prequel (Cocktail)',
      description: 'Cocktail celebration for Deepika & Harsh wedding. Arrival window: 8:30-9PM. Doors close after 9PM.',
      location: 'Gatsby, Survey No.2&3, Bannerghatta Rd, Arekere, Bengaluru, Karnataka 560076',
      startDate: '2025-12-05T20:30:00',
      endDate: '2025-12-05T23:59:00',
    },
  },
  {
    id: 2,
    name: 'The Reception',
    date: 'December 6th',
    time: '7:00 PM onwards',
    venueType: 'Outdoor',
    location: 'La Marvella, Bangalore',
    address: 'South End Circle, Jayanagar, Bengaluru',
    mapUrl: 'https://maps.google.com/?q=La+Marvella+South+End+Circle+Jayanagar+Bengaluru',
    dressCode: 'Indian Formal / Reception Glam ✨',
    dressCodeNote: 'Think elegant sarees, statement lehengas, bandhgalas & refined evening looks',
    description: 'An elegant evening of dinner, dancing, and celebrating our new journey together.',
    image: '/images/events/reception_main.png',
    color: '#C9A86C',
    calendarEvent: {
      title: 'Deepika & Harsh - Reception',
      description: 'Wedding reception for Deepika & Harsh',
      location: 'La Marvella, #1 South End Circle, 14th Cross Road, Jayanagar, Bengaluru, Karnataka 560011',
      startDate: '2025-12-06T19:00:00',
      endDate: '2025-12-06T23:59:00',
    },
  },
  {
    id: 3,
    name: 'Jashn-e-Mehendi',
    date: 'December 12th',
    time: '2:00 PM onwards',
    venueType: 'Indoor',
    location: 'Stadel, Kolkata',
    address: 'Salt Lake Stadium Metro Station, Kolkata',
    mapUrl: 'https://maps.google.com/?q=Stadel+Salt+Lake+Stadium+Kolkata',
    dressCodeSplit: {
      brideTitle: "Bride's Side",
      brideDesc: "Casual North Indian vibes — shararas, lehengas, kurtas & half sarees",
      groomTitle: "Groom's Side",
      groomDesc: "Traditional South Indian elegance — dhotis, veshtis, classic South Indian sarees & half sarees"
    },
    dressCode: '',
    description: 'Intricate henna designs, vibrant colors, and joyful celebrations with loved ones.',
    image: '/images/events/mehendi_the_one.png',
    color: '#9CAF88',
    calendarEvent: {
      title: 'Deepika & Harsh - Mehendi',
      description: 'Mehendi ceremony for Deepika & Harsh wedding',
      location: 'Stadel, Gate No.3, Salt Lake Stadium Metro Station, Kolkata, West Bengal 700106',
      startDate: '2025-12-12T14:00:00',
      endDate: '2025-12-12T22:00:00',
    },
  },
  {
    id: 4,
    name: 'Haldiwood Carnival',
    date: 'December 13th',
    time: '10:30 AM',
    venueType: 'Outdoor',
    location: 'Stadel, Kolkata',
    address: 'Salt Lake Stadium Metro Station, Kolkata',
    mapUrl: 'https://maps.google.com/?q=Stadel+Salt+Lake+Stadium+Kolkata',
    dressCode: 'Funky Indian - Lehengas, Shararas, Indo-Western',
    colorPalette: ['#E8A0B0', '#E8C4A8', '#F5E6B8', '#8CBDCC', '#B8A8C8', '#C8A8B8'],
    outfitInspoLinks: [
      { label: 'Lehengas & Shararas', url: 'https://www.google.com/search?q=pastel+funky+indian+haldi+lehenga+sharara+outfits&tbm=isch' },
      { label: 'Kurtas & Indo-Western', url: 'https://www.google.com/search?q=pastel+kurta+indo+western+haldi+outfit+men&tbm=isch' },
    ],
    description: 'A morning of turmeric blessings, laughter, and pre-wedding traditions.',
    image: '/images/events/haldi_main.png',
    color: '#E8C547',
    calendarEvent: {
      title: 'Deepika & Harsh - Haldi',
      description: 'Haldi ceremony for Deepika & Harsh wedding',
      location: 'Stadel, Gate No.3, Salt Lake Stadium Metro Station, Kolkata, West Bengal 700106',
      startDate: '2025-12-13T10:30:00',
      endDate: '2025-12-13T14:00:00',
    },
  },
  {
    id: 5,
    name: 'Wedding',
    date: 'December 13th',
    time: '6:00 PM onwards',
    venueType: 'Indoor & Outdoor',
    location: 'Venue TBD',
    address: 'Kolkata, India',
    dressCode: 'Formal Indian Attire',
    description: 'The moment we say "I do" - surrounded by family, friends, and endless love.',
    image: '/images/first-meeting.png',
    color: '#E8D5D3',
    calendarEvent: {
      title: 'Deepika & Harsh - Wedding',
      description: 'Wedding ceremony for Deepika & Harsh',
      location: 'Kolkata, India',
      startDate: '2025-12-13T18:00:00',
      endDate: '2025-12-14T00:00:00',
    },
  },
];

function EventCard({ event, index }: { event: EventType; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 w-full"
    >
      <div
        className={`relative w-full cursor-pointer transition-transform duration-700 transform-style-3d ${
          event.id === 4 ? 'aspect-[1054/1492]' : 'aspect-[3/4]'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={handleFlip}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        tabIndex={0}
        role="button"
        aria-label={`${event.name} event card. Click to ${isFlipped ? 'see image' : 'see details'}`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl">
          <div className="relative w-full h-full">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 25%, transparent 50%)',
              }}
            />
            {/* Date bottom left */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex justify-between items-end">
              <p
                className="text-lg font-medium tracking-wide"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {event.date}
              </p>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Tap for details
              </p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl"
          style={{ backgroundColor: '#FFFEF9' }}
        >
          <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto">
            {/* Header */}
            <div
              className="text-center pb-4 mb-4"
              style={{ borderBottom: `2px solid ${event.color}` }}
            >
              <p
                className="text-sm uppercase tracking-widest mb-1"
                style={{ color: event.color }}
              >
                {event.date}
              </p>
              <h3
                className="font-script text-3xl md:text-4xl"
                style={{ color: '#3D3D3D' }}
              >
                {event.name}
              </h3>
            </div>

            {/* Description */}
            <p
              className="text-center italic mb-5 text-sm leading-relaxed"
              style={{ color: '#6B6B6B' }}
            >
              "{event.description}"
            </p>

            {/* Details */}
            <div className="space-y-3 flex-grow">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <Clock className="w-4 h-4" style={{ color: event.color }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-0.5" style={{ color: '#9B9B9B' }}>Time</p>
                  <p className="font-medium text-sm" style={{ color: '#3D3D3D' }}>{event.time}</p>
                  {event.timeNote && (
                    <p className="text-xs mt-0.5 italic" style={{ color: event.color }}>{event.timeNote}</p>
                  )}
                  {event.ageRestriction && (
                    <span
                      className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${event.color}25`,
                        color: event.color,
                      }}
                    >
                      {event.ageRestriction}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <MapPin className="w-4 h-4" style={{ color: event.color }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-0.5" style={{ color: '#9B9B9B' }}>Location</p>
                  <p className="font-medium text-sm" style={{ color: '#3D3D3D' }}>{event.location}</p>
                  {event.mapUrl ? (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="text-xs flex items-center gap-1 mt-1 hover:underline"
                      style={{ color: event.color }}
                    >
                      View on Map <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="text-xs" style={{ color: '#6B6B6B' }}>{event.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <Shirt className="w-4 h-4" style={{ color: event.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#9B9B9B' }}>Dress Code</p>
                  {event.dressCodeSplit ? (
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-xs" style={{ color: event.color }}>{event.dressCodeSplit.brideTitle}</p>
                        <p className="text-xs" style={{ color: '#6B6B6B' }}>{event.dressCodeSplit.brideDesc}</p>
                      </div>
                      <div>
                        <p className="font-medium text-xs" style={{ color: event.color }}>{event.dressCodeSplit.groomTitle}</p>
                        <p className="text-xs" style={{ color: '#6B6B6B' }}>{event.dressCodeSplit.groomDesc}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-sm" style={{ color: '#3D3D3D' }}>{event.dressCode}</p>
                      {event.dressCodeNote && (
                        <p className="text-xs mt-1" style={{ color: '#6B6B6B' }}>{event.dressCodeNote}</p>
                      )}
                    </>
                  )}
                  {event.colorPalette && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {event.colorPalette.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                  {event.outfitInspoLinks && event.outfitInspoLinks.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs mb-1" style={{ color: '#9B9B9B' }}>Outfit Inspo:</p>
                      <div className="flex flex-wrap gap-2">
                        {event.outfitInspoLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="text-xs flex items-center gap-1 px-2 py-1 rounded-full hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                          >
                            {link.label} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {(event.outfitInspoUrl || event.outfitInspoUrl2) && !event.outfitInspoLinks && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {event.outfitInspoUrl && (
                        <a
                          href={event.outfitInspoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                          className="text-xs flex items-center gap-1 hover:underline"
                          style={{ color: event.color }}
                        >
                          Outfit Inspiration <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {event.venueType && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${event.color}20` }}
                  >
                    <Building2 className="w-4 h-4" style={{ color: event.color }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide mb-0.5" style={{ color: '#9B9B9B' }}>Venue</p>
                    <p className="font-medium text-sm" style={{ color: '#3D3D3D' }}>{event.venueType}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Calendar */}
            <div className="mt-4 flex justify-center" onClick={handleLinkClick}>
              <AddToCalendar event={event.calendarEvent} />
            </div>

            {/* Footer */}
            <p className="text-xs text-center mt-3 flex items-center justify-center gap-1" style={{ color: '#9B9B9B' }}>
              <Sparkles className="w-3 h-3" />
              Tap to flip back
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-8 min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #F5EDE5, #E8F0E2)',
      }}
    >
      <div className="container-wedding">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className="font-script text-3xl sm:text-5xl md:text-7xl mb-4"
            style={{ color: '#3D3D3D' }}
          >
            Our Celebrations
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B6B6B' }}>
            Five beautiful days of love, traditions, and togetherness. Tap each card to discover the details.
          </p>
        </motion.div>

        {/* Event Cards - Vertical Stack */}
        <div className="flex flex-col items-center gap-10 md:gap-14 max-w-md mx-auto">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
