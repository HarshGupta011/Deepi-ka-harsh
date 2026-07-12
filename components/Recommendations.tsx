'use client';

import { useEffect, useState, useCallback, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import {
  fetchRecommendations,
  postRecommendation,
  postReply,
  Recommendation,
  Reply,
} from '@/lib/recommendations';

type CityFilter = 'all' | 'bangalore' | 'kolkata' | 'general';

const cityLabels: Record<Recommendation['city'], string> = {
  bangalore: 'Bangalore',
  kolkata: 'Kolkata',
  general: 'General',
};

const cityColors: Record<Recommendation['city'], string> = {
  bangalore: '#7BA3B5',
  kolkata: '#9CAF88',
  general: '#C9B896',
};

// Auto-scroll speed for the recommendations marquee, in pixels/second.
const MARQUEE_SPEED = 36;
// How long after the user stops interacting before auto-scroll resumes.
const RESUME_DELAY_MS = 1800;

function formatTime(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// A chevron that gently bounces to signal "there's more here, tap me" while
// closed, and settles into a plain rotated arrow once opened.
function BouncyChevron({ open, color }: { open: boolean; color: string }) {
  return (
    <motion.div
      animate={{ rotate: open ? 180 : 0, y: open ? 0 : [0, 4, 0] }}
      transition={{
        rotate: { duration: 0.2 },
        y: { duration: 1.1, repeat: open ? 0 : Infinity, ease: 'easeInOut' },
      }}
    >
      <ChevronDown className="w-5 h-5" style={{ color }} />
    </motion.div>
  );
}

export default function Recommendations() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [filter, setFilter] = useState<CityFilter>('all');
  const [loading, setLoading] = useState(true);
  const [openReplyFor, setOpenReplyFor] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);

  // Composer state
  const [name, setName] = useState('');
  const [city, setCity] = useState<Recommendation['city']>('bangalore');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { recommendations, replies: repliesData } = await fetchRecommendations();
      setRecs(recommendations ?? []);
      const grouped: Record<string, Reply[]> = {};
      (repliesData ?? []).forEach((r) => {
        if (!grouped[r.recommendation_id]) grouped[r.recommendation_id] = [];
        grouped[r.recommendation_id].push(r);
      });
      setReplies(grouped);
    } catch {
      // leave existing state; the list below falls back to an empty state
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const visibleRecs = recs.filter((r) => filter === 'all' || r.city === filter);

  // --- Marquee: continuously auto-scrolls, pauses on any touch/mouse
  // interaction (so guests can freely scroll left/right or read a card),
  // and resumes on its own a moment after the user lets go.
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openReplyForRef = useRef<string | null>(null);

  useEffect(() => {
    openReplyForRef.current = openReplyFor;
  }, [openReplyFor]);

  const pauseMarquee = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || visibleRecs.length === 0) return;

    let raf = 0;
    let lastTs: number | null = null;

    const step = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      if (!pausedRef.current && !openReplyForRef.current) {
        const half = track.scrollWidth / 2;
        track.scrollLeft += (MARQUEE_SPEED * dt) / 1000;
        if (half > 0 && track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visibleRecs.length]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const cleanName = name.trim();
    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    if (!cleanName || !cleanTitle || !cleanBody) {
      setSubmitError('Please fill out your name, a title, and a description.');
      return;
    }

    setSubmitting(true);
    try {
      await postRecommendation({
        city,
        title: cleanTitle,
        body: cleanBody,
        author_name: cleanName,
      });
      setTitle('');
      setBody('');
      await fetchAll();
    } catch {
      setSubmitError('Something went wrong posting your recommendation. Please try again.');
    }
    setSubmitting(false);
  }

  // Duplicate the list so the marquee can loop seamlessly (scrollLeft wraps
  // at the halfway point, right where the duplicate picks up).
  const marqueeRecs = visibleRecs.length > 0 ? [...visibleRecs, ...visibleRecs] : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Composer — collapsed by default so recommendations are visible right away */}
      <div className="rounded-2xl card-elegant overflow-hidden mb-8">
        <button
          onClick={() => setComposerOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 p-5 md:p-6"
          aria-expanded={composerOpen}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" style={{ color: '#9CAF88' }} />
            <h3 className="font-serif text-xl" style={{ color: '#3D3D3D' }}>
              Share a recommendation
            </h3>
          </div>
          <BouncyChevron open={composerOpen} color="#9CAF88" />
        </button>

        <AnimatePresence initial={false}>
          {composerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="px-5 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    maxLength={60}
                    className="w-full rounded-lg px-4 py-2.5 border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: 'rgba(123, 163, 181, 0.3)',
                      background: 'white',
                      color: '#3D3D3D',
                    }}
                  />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as Recommendation['city'])}
                    className="w-full rounded-lg px-4 py-2.5 border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: 'rgba(123, 163, 181, 0.3)',
                      background: 'white',
                      color: '#3D3D3D',
                    }}
                  >
                    <option value="bangalore">Bangalore</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="general">General / India tips</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Title — e.g. "Best dosa in Bengaluru"'
                  maxLength={120}
                  className="w-full rounded-lg px-4 py-2.5 border focus:outline-none focus:ring-2 mb-3"
                  style={{
                    borderColor: 'rgba(123, 163, 181, 0.3)',
                    background: 'white',
                    color: '#3D3D3D',
                  }}
                />

                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Tell us about it — where, why you love it, any tips…"
                  maxLength={1500}
                  rows={3}
                  className="w-full rounded-lg px-4 py-2.5 border focus:outline-none focus:ring-2 resize-none mb-3"
                  style={{
                    borderColor: 'rgba(123, 163, 181, 0.3)',
                    background: 'white',
                    color: '#3D3D3D',
                  }}
                />

                {submitError && (
                  <p className="text-sm mb-3" style={{ color: '#C25C5C' }}>
                    {submitError}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                  style={{
                    background: '#7BA3B5',
                    color: 'white',
                  }}
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Posting…' : 'Post recommendation'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {(['all', 'bangalore', 'kolkata', 'general'] as CityFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
            style={{
              background: filter === f ? '#7BA3B5' : 'transparent',
              color: filter === f ? 'white' : '#3D3D3D',
              borderColor: filter === f ? '#7BA3B5' : 'rgba(123, 163, 181, 0.3)',
            }}
          >
            {f === 'all' ? 'All' : f === 'general' ? 'General' : cityLabels[f as Recommendation['city']]}
          </button>
        ))}
      </div>

      {/* Recommendations marquee */}
      {loading ? (
        <p className="text-center py-8" style={{ color: '#6B6B6B' }}>
          Loading recommendations…
        </p>
      ) : visibleRecs.length === 0 ? (
        <p className="text-center py-8" style={{ color: '#6B6B6B' }}>
          No recommendations yet — be the first!
        </p>
      ) : (
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto py-2 px-1 -mx-1"
          style={{ scrollBehavior: 'auto', touchAction: 'pan-x' }}
          onMouseEnter={pauseMarquee}
          onMouseLeave={scheduleResume}
          onTouchStart={pauseMarquee}
          onTouchEnd={scheduleResume}
          onPointerDown={pauseMarquee}
          onPointerUp={scheduleResume}
        >
          {marqueeRecs.map((rec, i) => {
            const recReplies = replies[rec.id] ?? [];
            const isReplyOpen = openReplyFor === rec.id;
            return (
              <div
                key={`${rec.id}-${i}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-xl p-5 card-elegant"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${cityColors[rec.city]}25`,
                      color: cityColors[rec.city],
                    }}
                  >
                    <MapPin className="w-3 h-3" />
                    {cityLabels[rec.city]}
                  </span>
                  <span className="text-xs flex-shrink-0" style={{ color: '#9B9B9B' }}>
                    {formatTime(rec.created_at)}
                  </span>
                </div>
                <h4 className="font-serif text-lg mb-2" style={{ color: '#3D3D3D' }}>
                  {rec.title}
                </h4>
                <p
                  className="text-sm leading-relaxed mb-3 whitespace-pre-wrap line-clamp-4"
                  style={{ color: '#4D4D4D' }}
                >
                  {rec.body}
                </p>
                <p className="text-xs mb-3" style={{ color: '#6B6B6B' }}>
                  — {rec.author_name}
                </p>

                {/* Replies */}
                {recReplies.length > 0 && (
                  <div
                    className="pl-3 mt-4 space-y-3 border-l-2 max-h-40 overflow-y-auto"
                    style={{ borderColor: 'rgba(123, 163, 181, 0.2)' }}
                  >
                    {recReplies.map((r) => (
                      <div key={r.id}>
                        <p className="text-sm whitespace-pre-wrap" style={{ color: '#4D4D4D' }}>
                          {r.body}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#9B9B9B' }}>
                          — {r.author_name} · {formatTime(r.created_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply toggle / form */}
                <div className="mt-4">
                  {isReplyOpen ? (
                    <ReplyForm
                      recommendationId={rec.id}
                      onPosted={() => {
                        setOpenReplyFor(null);
                        fetchAll();
                      }}
                      onCancel={() => setOpenReplyFor(null)}
                    />
                  ) : (
                    <button
                      onClick={() => setOpenReplyFor(rec.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-70"
                      style={{ color: '#7BA3B5' }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {recReplies.length > 0 ? `Reply (${recReplies.length})` : 'Reply'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ReplyForm({
  recommendationId,
  onPosted,
  onCancel,
}: {
  recommendationId: string;
  onPosted: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanBody = body.trim();
    if (!cleanName || !cleanBody) {
      setError('Please add your name and a reply.');
      return;
    }

    setPosting(true);
    try {
      await postReply({
        recommendation_id: recommendationId,
        body: cleanBody,
        author_name: cleanName,
      });
      onPosted();
    } catch {
      setError('Something went wrong posting your reply. Please try again.');
    }
    setPosting(false);
  }

  return (
    <form onSubmit={submit} className="space-y-2" onPointerDown={(e) => e.stopPropagation()}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        maxLength={60}
        className="w-full rounded-lg px-3 py-2 border text-sm focus:outline-none focus:ring-2"
        style={{
          borderColor: 'rgba(123, 163, 181, 0.3)',
          background: 'white',
          color: '#3D3D3D',
        }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add your reply…"
        maxLength={1000}
        rows={2}
        className="w-full rounded-lg px-3 py-2 border text-sm focus:outline-none focus:ring-2 resize-none"
        style={{
          borderColor: 'rgba(123, 163, 181, 0.3)',
          background: 'white',
          color: '#3D3D3D',
        }}
      />
      {error && (
        <p className="text-xs" style={{ color: '#C25C5C' }}>
          {error}
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={posting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
          style={{ background: '#7BA3B5', color: 'white' }}
        >
          <Send className="w-3.5 h-3.5" />
          {posting ? 'Posting…' : 'Post reply'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm"
          style={{ color: '#6B6B6B' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
