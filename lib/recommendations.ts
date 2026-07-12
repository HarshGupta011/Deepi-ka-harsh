// Guest-recommendations backend: same Google Apps Script deployment as the
// RSVP form (apps-script/Code.gs), using dedicated "Recommendations" and
// "Replies" tabs. No env vars required — the deployed URL is a committed
// default (env var overrides if set), matching components/RSVPForm.tsx.
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwjbQgc2IKQxT8aafz4x0qeA5uZS7NvfG8dILClUwgNp0nfzRiTXoZQI7UFskI6qbWPjQ/exec';

export type Recommendation = {
  id: string;
  city: 'bangalore' | 'kolkata' | 'general';
  title: string;
  body: string;
  author_name: string;
  created_at: string;
};

export type Reply = {
  id: string;
  recommendation_id: string;
  body: string;
  author_name: string;
  created_at: string;
};

interface ListResult {
  ok: boolean;
  recommendations?: Recommendation[];
  replies?: Reply[];
}

// JSONP fallback: Apps Script GET reads are flaky cross-origin in some
// browsers, so if a plain fetch fails we load the response via a <script> +
// global callback. Mirrors the lookup helper in components/RSVPForm.tsx.
let jsonpCounter = 0;
function fetchViaJsonp(url: string, timeoutMs: number): Promise<ListResult> {
  return new Promise((resolve, reject) => {
    const cb = `__recsLookup${jsonpCounter++}`;
    const script = document.createElement('script');
    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[cb];
      script.remove();
      clearTimeout(timer);
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('jsonp timeout'));
    }, timeoutMs);
    (window as unknown as Record<string, unknown>)[cb] = (data: ListResult) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error('jsonp error'));
    };
    script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${cb}`;
    document.body.appendChild(script);
  });
}

export async function fetchRecommendations(): Promise<ListResult> {
  const url = `${GOOGLE_SCRIPT_URL}?action=listRecommendations`;
  try {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return (await res.json()) as ListResult;
  } catch {
    return fetchViaJsonp(url, 8000);
  }
}

// Writes go through mode: 'no-cors', so the response is opaque — the promise
// still resolves only once the Apps Script call completes, but we can't read
// success/failure from it. Callers treat completion as success and re-fetch.
async function post(payload: Record<string, unknown>): Promise<void> {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function postRecommendation(rec: {
  city: Recommendation['city'];
  title: string;
  body: string;
  author_name: string;
}): Promise<void> {
  return post({ type: 'recommendation', ...rec });
}

export function postReply(reply: {
  recommendation_id: string;
  body: string;
  author_name: string;
}): Promise<void> {
  return post({ type: 'reply', ...reply });
}
