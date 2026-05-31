# Supabase setup (one-time)

The Kredibaba `/app` dashboard talks to Supabase for **auth + data + document storage**.
Do these steps once, then the app works end-to-end.

## 1. Create a project
1. Go to <https://supabase.com> → **New project** (free tier is fine).
2. Pick a name + database password, choose a region near you, and create it.

## 2. Get your keys → put them in `.env`
1. In the project: **Project Settings → API**.
2. Copy **Project URL** and the **`anon` / public** key.
3. In the repo root, edit `.env`:
   ```
   VITE_SUPABASE_URL=https://<your-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
   ```
4. Restart the dev server (`npm run dev`) so Vite picks up the new env vars.

## 3. Create the database + storage
1. In the project: **SQL Editor → New query**.
2. Paste the entire contents of [`schema.sql`](./schema.sql) and click **Run**.
   This creates all tables, row-level-security policies, the private `documents`
   storage bucket, and a trigger that auto-creates a profile row on signup.

## 4. (Optional) Enable Google sign-in
The Auth screen has a "Continue with Google" button. To make it work:
1. **Authentication → Providers → Google** → enable.
2. Add your Google OAuth client ID + secret (from Google Cloud console).
3. Add your site URL (e.g. `http://localhost:5173`) under
   **Authentication → URL Configuration → Redirect URLs**.

Email/password sign-up works without this step. (By default Supabase requires
email confirmation — for quick local testing you can turn that off under
**Authentication → Providers → Email → Confirm email**.)

## What lives where
- Tables: `profiles`, `plans`, `properties`, `residences`, `employment`,
  `additional_income`, `assets`, `documents` — all row-level-secured to the owner.
- Files: private `documents` bucket, paths namespaced as `<user-id>/<filename>`.
