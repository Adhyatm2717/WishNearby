# 💚 WishNearby

**From "I wish…" to "It exists."**

🌐 **Live site: [wishnearby.tech](https://wishnearby.tech/)**

WishNearby (formerly *Demandly*) is an early-stage, open-source, community-first Progressive Web App that makes unmet local needs visible. Residents post what their neighbourhood is missing, such as a quiet study library, a nearby diagnostics centre or affordable meals, and neighbours add their support with one tap. Entrepreneurs can then see where real, community-backed demand exists before they invest.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Status: Early stage](https://img.shields.io/badge/status-early--stage-orange)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

<!-- Add a screenshot or GIF of the map and "Count Me In" flow here:
![WishNearby demo](docs/demo.gif)
-->

> **Status:** Early-stage and maintained by a single developer. The app is deployed at [wishnearby.tech](https://wishnearby.tech/). Locally it runs on mock data (localStorage) by default, and Supabase is optional. Security hardening, automated tests and scalability work are in progress and have **not** been independently verified. See the [Roadmap](#-roadmap).

---

## 🎯 The Problem

In small towns and neighbourhoods, requests for missing services are scattered across WhatsApp groups, conversations and word of mouth. A single complaint is hard to tell apart from real community demand, and would-be entrepreneurs have no structured way to find out what residents actually want in a particular place.

Existing tools show businesses that already exist (directories, maps) or host open-ended discussion. WishNearby is built around a different question: **what is this place missing?**

## 💡 How It Works

1. **Share a need.** A resident posts a missing service or facility and where it is needed.
2. **Count Me In.** Neighbours back an existing need with one tap, turning individual wishes into visible community support.
3. **Demand becomes visible.** Needs can be explored on a map and ranked by the support they have gathered.
4. **Entrepreneurs investigate.** Entrepreneurs review needs by location and decide what is worth exploring.
5. **Potential launch.** An entrepreneur can signal that they plan to serve a need and keep the community updated on progress.

---

## ✨ Features

### For residents
- **Interactive map** of local needs, built on Leaflet and OpenStreetMap
- **Add a need** with duplicate and spam detection to keep the feed clean
- **"Count Me In"** support on other people's needs
- **Discussions** with comments and updates on each need
- **Profiles** with reputation points and badges

### For entrepreneurs and creators
- **Opportunity feed** of local needs sorted by demand score
- **Demand heatmaps** to see where demand clusters
- **Opportunity claiming** to signal an intent to launch
- **Progress tracking** across four launch stages

### Platform
- **Installable PWA** for iOS, Android and desktop
- **Notification preferences** (push, email, SMS)
- **Admin dashboard** with moderation queue, user management and analytics
- **Dark mode**

> Some platform features are scaffolded and still being completed. The [Roadmap](#-roadmap) lists what is in progress.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) with a custom design system |
| UI components | shadcn/ui-style components on [Radix UI](https://www.radix-ui.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Database and auth | [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage) |
| Maps | [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/) |
| PWA | `@ducanh2912/next-pwa` |

---

## 📦 Project Structure

```text
├── design-system/     # Brand design tokens and guidelines
├── public/            # PWA manifest, service workers, static assets
├── src/
│   ├── app/           # Next.js App Router (pages, layouts, API routes)
│   ├── components/    # Reusable UI components and layout wrappers
│   ├── contexts/      # React contexts (auth, experience mode)
│   ├── lib/           # Utilities, data layer, Supabase clients
│   └── types/         # TypeScript type definitions
└── supabase/
    └── migrations/    # PostgreSQL schema migrations
```

---

## ⚙️ Getting Started

**Requirements:** Node.js 18.18 or newer and npm.

### 1. Clone and install

```bash
git clone https://github.com/Adhyatm2717/WishNearby.git
cd WishNearby
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). By default the app uses **mock data stored in localStorage**, so you can try every flow without a backend.

### 3. (Optional) Connect Supabase

1. Create a project at [supabase.com](https://supabase.com/).
2. Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor.
3. Copy the example environment file and add your keys:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

> ⚠️ Never commit `.env.local` or any Supabase `service_role` key. Only the public URL and anon key belong in client-side environment variables.

---

## 🗺️ Roadmap

Planned work, roughly in priority order:

- [ ] Row Level Security policies on every Supabase table, plus a security review
- [ ] Automated tests (unit and integration) and a CI workflow for lint, type-check and build
- [ ] Complete and test notification delivery (push, email, SMS)
- [ ] Performance and scalability testing
- [ ] Accessibility and multilingual support
- [ ] Expanded documentation for self-hosting

Have an idea? [Open an issue](https://github.com/Adhyatm2717/WishNearby/issues).

---

## 🤝 Contributing

Contributions are welcome, whether code, design, docs, translations or bug reports.

1. Fork the repository and create a branch: `git checkout -b feature/your-feature`
2. Make your changes and run `npm run lint`
3. Open a pull request describing what you changed and why

Look for issues labelled **`good first issue`** to get started. Please be respectful and constructive in all discussions.

---

## 💬 Business Model (Proposed)

Sharing needs and "Count Me In" are free for residents and will stay free. WishNearby is not a marketplace and takes no commissions. Paid insights or location-based demand reports for entrepreneurs are a **proposed** future model and have not been validated. The core platform in this repository is open source.

---

## 📄 License

Released under the [MIT License](LICENSE).

---

<p align="center">Built to make local needs visible. 💚<br><a href="https://wishnearby.tech/">wishnearby.tech</a></p>
