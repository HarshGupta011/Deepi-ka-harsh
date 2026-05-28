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
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
        style={{
          background: '#9CAF88',
          color: 'white',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#7A9268')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#9CAF88')}
      >
        <Calendar className="w-4 h-4" />
        Add to Calendar
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50"
            style={{ border: '1px solid #E8F0E2' }}
          >
            <a
              href={googleUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 transition-colors text-sm"
              style={{ color: '#3D3D3D' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#E8F0E2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">📅</span>
              Google Calendar
            </a>
            <a
              href={outlookUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 transition-colors text-sm"
              style={{ color: '#3D3D3D', borderTop: '1px solid #E8F0E2' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#E8F0E2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">📧</span>
              Outlook Calendar
            </a>
            <a
              href={icsContent()}
              download={`${event.title.replace(/\s+/g, '-')}.ics`}
              className="flex items-center gap-3 px-4 py-3 transition-colors text-sm"
              style={{ color: '#3D3D3D', borderTop: '1px solid #E8F0E2' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#E8F0E2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">🍎</span>
              Apple Calendar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
