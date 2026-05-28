import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(url && anonKey);

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
