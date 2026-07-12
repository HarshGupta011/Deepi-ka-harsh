'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, MapPin, Sparkles } from 'lucide-react';
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

export default function Recommendations() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [filter, setFilter] = useState<CityFilter>('all');
  const [loading, setLoading] = useState(true);
  const [openReplyFor, setOpenReplyFor] = useState<string | null>(null);

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

  return (
    <div className="max-w-3xl mx-auto">
      {/* Composer */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-6 md:p-8 card-elegant mb-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <Sparkles className="w-5 h-5" style={{ color: '#9CAF88' }} />
          <h3 className="font-serif text-xl" style={{ color: '#3D3D3D' }}>
            Share a recommendation
          </h3>
        </div>

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
      </motion.form>

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

      {/* Recommendations list */}
      {loading ? (
        <p className="text-center py-8" style={{ color: '#6B6B6B' }}>
          Loading recommendations…
        </p>
      ) : visibleRecs.length === 0 ? (
        <p className="text-center py-8" style={{ color: '#6B6B6B' }}>
          No recommendations yet — be the first!
        </p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {visibleRecs.map((rec) => {
              const recReplies = replies[rec.id] ?? [];
              return (
                <motion.div
                  key={rec.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl p-5 md:p-6 card-elegant"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
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
                    </div>
                    <span className="text-xs" style={{ color: '#9B9B9B' }}>
                      {formatTime(rec.created_at)}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg mb-2" style={{ color: '#3D3D3D' }}>
                    {rec.title}
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap" style={{ color: '#4D4D4D' }}>
                    {rec.body}
                  </p>
                  <p className="text-xs mb-3" style={{ color: '#6B6B6B' }}>
                    — {rec.author_name}
                  </p>

                  {/* Replies */}
                  {recReplies.length > 0 && (
                    <div
                      className="pl-4 mt-4 space-y-3 border-l-2"
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
                    {openReplyFor === rec.id ? (
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
                        {recReplies.length > 0
                          ? `Reply (${recReplies.length})`
                          : 'Reply'}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
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
    <form onSubmit={submit} className="space-y-2">
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
