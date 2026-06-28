# Demandly

A production-ready Progressive Web App for discovering real local community demand. Non-profit. No marketplace. No commissions.

## Mission

Help communities express unmet local demand. Help entrepreneurs discover genuine opportunities. Reduce business failure by validating demand before investment.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** + custom design system
- **shadcn/ui**-style components (Radix UI)
- **Framer Motion** for subtle animations
- **Supabase** (Auth, PostgreSQL, Storage) — schema included
- **Leaflet + OpenStreetMap** for interactive maps
- **PWA** via `@ducanh2912/next-pwa`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs with rich mock data out of the box. Connect Supabase for production:

1. Create a Supabase project
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Copy `.env.example` to `.env.local` and add your keys

## Features

- Landing page with hero, live stats, map preview, testimonials
- Home feed with nearby/trending/newest/popular filters
- Category filtering (Food, Services, Education, etc.)
- Post a Need with AI duplicate/spam detection
- Need detail pages with supporters, comments, timeline, map
- Full-screen demand map with heatmap and radius filter
- Entrepreneur dashboard with business potential scoring
- Business progress tracking (4 stages)
- User profiles with badges and gamification
- Push/email/SMS notification preferences
- Admin panel for moderation and analytics
- Dark mode support
- Responsive mobile bottom nav + desktop sidebar
- PWA installable on mobile and desktop

## Deploy to Vercel

```bash
npm run build
```

Deploy via Vercel with environment variables from `.env.example`.

## Project Structure

```
src/
  app/           # Next.js App Router pages & API routes
  components/    # UI components, layout, feature modules
  lib/           # Utilities, data layer, Supabase clients
  types/         # TypeScript types
supabase/
  migrations/    # PostgreSQL schema
public/
  manifest.json  # PWA manifest
```

## License

Community-first non-profit platform.
