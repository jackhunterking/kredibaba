import { createClient } from "@supabase/supabase-js";

// Vite exposes only VITE_-prefixed env vars to the browser. See .env.example.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// `true` once real (non-placeholder) credentials are present. The UI uses this
// to show a friendly "connect Supabase" notice instead of throwing on boot.
export const isSupabaseConfigured =
  Boolean(url && anonKey) &&
  !url.includes("YOUR-PROJECT-ref") &&
  !anonKey.includes("YOUR-ANON");

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    "[kredibaba] Supabase is not configured yet. Copy .env.example to .env, " +
      "fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server."
  );
}

// Always create a client (with placeholders if needed) so imports never crash;
// calls simply fail until real keys are provided.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true, // needed for the Google OAuth redirect
    },
  }
);
