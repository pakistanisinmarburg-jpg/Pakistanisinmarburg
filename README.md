# Pakistani Community Marburg

React + Vite + TypeScript site with a Supabase backend (Postgres, Auth, Storage,
Edge Functions). Originally scaffolded in Lovable; this repo has been
de-coupled from Lovable-only services so it can be deployed with any
Supabase project + Vercel + GitHub.

## Stack

- Vite, React, TypeScript, Tailwind, shadcn-ui
- Supabase: Postgres database, Auth (email/password), Storage, Edge Functions (Deno)
- Vercel for hosting the frontend

## 1. Create your Supabase project

1. Go to https://supabase.com/dashboard and create a new project.
2. Once it's provisioned, open **Project Settings -> API** and copy:
   - Project URL
   - `anon` `public` API key
   - Project Reference ID
3. Open **SQL Editor -> New query**, paste the contents of
   [`supabase/full_schema.sql`](./supabase/full_schema.sql), and run it. This
   creates every table, RLS policy, function, trigger, and the `site-media`
   storage bucket used by the app.

## 2. Configure local env vars

```sh
cp .env.example .env
```

Fill in `.env` with the values from step 1 (`VITE_SUPABASE_URL`,
`VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`). `.env` is
git-ignored — never commit real keys.

## 3. Deploy the Edge Functions

The three functions in `supabase/functions/` (`community-chat`,
`send-form-notification`, `sheets-append`) no longer depend on Lovable's AI
gateway or connector proxy — they call third-party APIs directly. Install the
[Supabase CLI](https://supabase.com/docs/guides/cli), then:

```sh
supabase login
supabase link --project-ref YOUR-PROJECT-REF
supabase functions deploy community-chat
supabase functions deploy send-form-notification
supabase functions deploy sheets-append
```

Set the secrets each function needs:

```sh
# community-chat — AI chatbot, now via OpenRouter (openrouter.ai/keys)
supabase secrets set OPENROUTER_API_KEY=sk-or-...

# send-form-notification — email via Resend (resend.com)
supabase secrets set RESEND_API_KEY=re_...
# optional, once you verify your own domain in Resend:
supabase secrets set RESEND_FROM_EMAIL="Pakistanis in Marburg <notify@yourdomain.com>"
supabase secrets set RESEND_TO_EMAIL=you@yourdomain.com

# sheets-append — writes event RSVPs to a Google Sheet via a service account
supabase secrets set GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@xxx.iam.gserviceaccount.com
supabase secrets set GOOGLE_PRIVATE_KEY="$(cat service-account.json | jq -r .private_key)"
supabase secrets set GOOGLE_SHEETS_SPREADSHEET_ID=your-google-sheet-id
```

See the comments at the top of `supabase/functions/sheets-append/index.ts`
for the full Google Cloud service-account setup (create project → enable
Sheets API → create service account + JSON key → share the sheet with the
service account's email as Editor).

Also edit the `ALLOWED_ORIGINS` array near the top of each function file:
replace the `YOUR-VERCEL-PROJECT.vercel.app` placeholder with your actual
Vercel domain once you have it (step 5), then redeploy the functions.

## 4. First admin user

There's no seeded admin. After deploying:

1. Visit `/auth` on the running site and sign up with the email you want to
   administer the site with.
2. In the Supabase SQL Editor, find your user id:
   ```sql
   select id, email from auth.users order by created_at desc;
   ```
3. Grant yourself the admin role:
   ```sql
   insert into public.user_roles (user_id, role) values ('<your-uuid>', 'admin');
   ```
4. Log out and back in — `/admin` is now reachable for that account.

## 5. Push to GitHub and deploy to Vercel

```sh
git init   # if not already a repo
git add .
git commit -m "Migrate off Lovable to Supabase + Vercel"
git remote add origin <your-github-repo-url>
git push -u origin main
```

Then in [Vercel](https://vercel.com/new):

1. Import the GitHub repo.
2. Framework preset: **Vite** (auto-detected; `vercel.json` also pins build
   command/output dir and adds the SPA rewrite Vite apps need).
3. Add the three environment variables from your `.env` file
   (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`,
   `VITE_SUPABASE_PROJECT_ID`) under **Project Settings -> Environment
   Variables**.
4. Deploy. Once you have the `*.vercel.app` domain (and/or a custom domain),
   go back to step 3 and update `ALLOWED_ORIGINS` in each edge function,
   then redeploy the functions.

## Local development

```sh
npm install
npm run dev
```

## Notes / follow-ups

- `bun.lock` and `bun.lockb` are stale leftovers from Lovable's bun-based
  tooling; this project now standardizes on `npm` (`package-lock.json`).
  Safe to delete if you don't use bun.
- The favicon and social preview image in `index.html` are still hosted on
  Lovable's Google Cloud Storage bucket (`storage.googleapis.com/gpt-engineer-file-uploads/...`).
  They'll keep working, but consider moving them into `public/` and
  pointing to local paths so the site has no residual dependency on
  Lovable-owned infrastructure.
- `supabase/config.toml`'s `project_id` still points at the original Lovable
  Supabase project. Run `supabase link --project-ref YOUR-PROJECT-REF` (step
  3) to repoint the CLI at your new project — it'll update this file for you.
