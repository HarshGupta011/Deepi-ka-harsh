'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Timeline from '@/components/Timeline';
import Image from 'next/image';
import ElegantDivider from '@/components/ElegantDivider';

const timelineEvents = [
  {
    date: '2016',
    title: 'The Beginning — Bangalore Days',
    description:
      "Deepika, a Bangalore girl. Harsh, straight out of Kolkata.\n\nThey met during undergrad in Bangalore, where it all started with friendship, group projects, random conversations, and spending way too much time together “just as friends.”\n\nSomewhere between classes, chai breaks, and campus life… they started liking each other a little more than expected.",
    image: '/images/first-meeting.png',
    imagePosition: 'center top',
  },
  {
    date: '2018',
    title: 'From Friends to Something More',
    description:
      "What started as an easy friendship slowly turned into late-night calls, inside jokes, constant food plans, and becoming each other’s favorite person.\n\nCollege may have given them degrees, but it also gave them this.",
    image: '/images/gallery/d570c152-af13-4e3f-9394-690f0e7c7c9b_Original.jpg',
    imagePosition: 'center bottom',
  },
  {
    date: '2020',
    title: 'The Big Move — USA Era Begins',
    description:
      "Deepika moved to the US to pursue her higher studies in Arizona.\n\nAnd Harsh? Well… let’s just say he coincidentally also decided America sounded like a great idea.\n\nHe moved to Colorado for his studies, and suddenly their story became one of airports, countdowns, FaceTimes, and figuring life out together from different states.",
    image: '/images/graduation.jpg',
    imagePosition: 'center',
  },
  {
    date: '2021 – 2023',
    title: 'Growing Together, Miles Apart',
    description:
      "Arizona and Colorado eventually turned into Austin and California. Different cities. Different jobs. Different time zones sometimes — but somehow, never different priorities.\n\nThrough career changes, stressful days, cross-country flights, and endless “when are you visiting next?” conversations, they kept showing up for each other.\n\nLong distance didn’t make them drift apart. It made them stronger.",
    image: '/images/cowboy.jpg',
    imagePosition: 'center',
  },
  {
    date: 'September 2024',
    title: 'The Proposal',
    description:
      "After years of growing together through every phase of life, Harsh finally asked the question Deepika already knew the answer to.\n\nA beautiful proposal, a very emotional “yes,” and the easiest decision they’ve ever made.",
    image: '/images/proposal.jpg',
    imagePosition: 'center 40%',
  },
  {
    date: '2025 – 2026',
    title: 'California, Finally',
    description:
      "After years of different cities and long-distance flights, life finally brought them both to California.\n\nNo more airport goodbyes. No more countdown apps. Just the two of them, building a life together in the same city at last.",
    image: '/images/waterfall-hug.jpg',
    imagePosition: 'center',
  },
  {
    date: 'December 2026',
    title: 'The Wedding Knot',
    description:
      "From Bangalore to Kolkata. From Arizona to Colorado. From Austin to California.\n\nA story built across cities, time zones, careers, and years of growing together — now leading to forever.\n\nAnd now… they’re finally ready to tie the knot.\n\nDeepi-ka-Harsh ♡",
    image: '/images/helicopter-ring.jpg',
    imagePosition: 'center',
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero Section with User's Photo */}
      <section
        className="relative py-12 md:py-16 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/our-story-hero.jpg"
            alt="Deepika and Harsh"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 35%' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.4), rgba(250, 248, 245, 0.5), rgba(250, 248, 245, 0.7))',
            }}
          />
        </div>

        <div className="container-wedding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#2D2D2D' }}
            >
              Our Story
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-8 font-medium" style={{ color: '#2D2D2D' }}>
              Nothing dramatic. Just real moments, real love, and the parts we can finally talk about.
            </p>

            <ElegantDivider variant="line" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - Sage Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#E8F0E2',
        }}
      >
        <div className="container-wedding relative z-10">
          <Timeline events={timelineEvents} />
        </div>
      </section>

    </>
  );
}
