import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Only construct a client when both values are present. When they are not
// (e.g. the standalone preview build), the app still renders and the sign-in
// flow reports a clear "backend not configured" message instead of crashing.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

export type Profile = {
  id: string;
  wallet_address: string;
  username: string;
  created_at: string;
};
