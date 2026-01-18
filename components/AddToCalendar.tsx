'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface AddToCalendarProps {
  event: CalendarEvent;
}

export default function AddToCalendar({ event }: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const googleUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      location: event.location,
      dates: `${formatDate(event.startDate)}/${formatDate(event.endDate)}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const outlookUrl = () => {
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      body: event.description,
      location: event.location,
      startdt: event.startDate,
      enddt: event.endDate,
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const icsContent = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(event.startDate)}`,
      `DTEND:${formatDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-lg transition-colors"
      >
        <Calendar className="w-4 h-4" />
        Add to Calendar
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-sage-100 overflow-hidden z-20"
          >
            <a
              href={googleUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sage-700 hover:bg-sage-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Google Calendar
            </a>
            <a
              href={outlookUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sage-700 hover:bg-sage-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Outlook Calendar
            </a>
            <a
              href={icsContent()}
              download={`${event.title.replace(/\s+/g, '-')}.ics`}
              className="block px-4 py-3 text-sage-700 hover:bg-sage-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Apple Calendar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
