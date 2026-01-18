'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Send, Heart, MessageCircle, BookOpen } from 'lucide-react';
import ElegantDivider from '@/components/ElegantDivider';

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    name: 'Priya & Rahul',
    message: 'Congratulations to the most beautiful couple! We\'re so excited to celebrate with you. Wishing you a lifetime of love and happiness!',
    date: 'January 10, 2025',
  },
  {
    id: 2,
    name: 'Mom & Dad',
    message: 'Our dearest Deepi and soon-to-be son Harsh, words cannot express how happy we are. You two are perfect for each other. We love you both!',
    date: 'January 8, 2025',
  },
  {
    id: 3,
    name: 'The Sharma Family',
    message: 'So happy for you both! Can\'t wait to dance the night away at your wedding. Here\'s to a beautiful future together!',
    date: 'January 5, 2025',
  },
  {
    id: 4,
    name: 'Anjali',
    message: 'Deepi, you\'re going to be the most stunning bride! And Harsh, you better take care of my best friend. Love you both so much!',
    date: 'January 3, 2025',
  },
];

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMessage: Message = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setMessages([newMessage, ...messages]);
    setFormData({ name: '', message: '' });
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

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
                <BookOpen className="w-8 h-8" style={{ color: '#7BA3B5' }} />
              </motion.div>
            </motion.div>

            <h1
              className="font-script text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{ color: '#3D3D3D' }}
            >
              Guest Book
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B6B6B' }}>
              Leave us a message with your well wishes, advice for married life,
              or just let us know you&apos;re excited to celebrate!
            </p>

            <ElegantDivider variant="line" className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Leave a Message Form - Warm Cream */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F5EDE5',
        }}
      >
        <div className="container-wedding relative z-10">
          <SectionHeader
            title="Sign Our Guest Book"
            subtitle="Share your love and well wishes with us."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="rounded-2xl p-6 md:p-8 card-elegant">
              <form onSubmit={handleSubmit}>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg flex items-center gap-3"
                    style={{
                      background: 'rgba(156, 175, 136, 0.15)',
                      border: '1px solid rgba(156, 175, 136, 0.3)',
                    }}
                  >
                    <Heart className="w-5 h-5" fill="currentColor" style={{ color: '#9CAF88' }} />
                    <span style={{ color: '#3D3D3D' }}>Thank you for your message! We can&apos;t wait to read it.</span>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#3D3D3D' }}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg input-elegant"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#3D3D3D' }}
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg resize-none input-elegant"
                      placeholder="Share your well wishes, advice, or a favorite memory..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 btn-dusty-blue"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 rounded-full"
                          style={{ border: '2px solid rgba(255, 255, 255, 0.3)', borderTopColor: '#fff' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Leave Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Messages Section - Blush Pastel */}
      <section
        className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
        style={{
          background: '#F8F0EE',
        }}
      >
        <div className="container-wedding relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(232, 213, 211, 0.3)',
                border: '1px solid rgba(232, 213, 211, 0.5)',
              }}
            >
              <MessageCircle className="w-8 h-8" style={{ color: '#7BA3B5' }} />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3D3D3D' }}>
              Messages from Our Loved Ones
            </h2>
            <ElegantDivider variant="simple" className="mt-6 max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-xl p-6 card-elegant"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(232, 213, 211, 0.3)',
                      border: '1px solid rgba(232, 213, 211, 0.5)',
                    }}
                  >
                    <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: '#3D3D3D' }}>{msg.name}</h3>
                    <p className="mb-2" style={{ color: '#6B6B6B' }}>{msg.message}</p>
                    <p className="text-sm" style={{ color: '#7BA3B5' }}>{msg.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#C9B896' }}
            />
            <div
              className="w-3 h-3 rotate-45"
              style={{ background: '#7BA3B5' }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5" style={{ color: '#E8D5D3' }} fill="currentColor" />
            </motion.div>
            <div
              className="w-3 h-3 rotate-45"
              style={{ background: '#7BA3B5' }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#C9B896' }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
