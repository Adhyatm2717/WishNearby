# 💚 WishNearby

**WishNearby** (formerly *Demandly*) is a production-ready, community-first Progressive Web App (PWA) designed to bridge the gap between local community needs and entrepreneurial solutions. 

This is a non-profit, commission-free platform built to help neighborhoods voice what they need, and help local businesses or creators validate demand before investing capital.

---

## 🚀 Mission

1. **Empower Communities**: Give residents a platform to express and rally support for unmet local needs (e.g., a bakery, a daycare, or better lighting).
2. **Support Entrepreneurs**: Help local businesses discover genuine, pre-validated opportunities backed by real demand.
3. **Reduce Business Failure**: Lower the risk of new business ventures by proving demand *before* investment.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Custom premium design system
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/)-style components powered by [Radix UI](https://www.radix-ui.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and page transitions
* **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, GoTrue Auth, Storage)
* **Maps**: [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) for interactive demand heatmaps
* **PWA**: Installable web app support via `@ducanh2912/next-pwa`

---

## ✨ Features

### 👤 For Residents (Community Explorers)
* **Interactive Map**: View local needs geographically and find what's missing nearby.
* **Add a Need**: Submit neighborhood requests with **AI-assisted duplicate and spam detection** to keep the feed clean.
* **"Count Me In" (Voting)**: Rally behind other neighbors' requests to show collective demand.
* **Discussions**: Comment, share updates, and discuss local improvements.
* **Gamified Profiles**: Earn reputation points and community badges for active participation.

### 💼 For Entrepreneurs & Creators
* **Business Opportunity Feed**: View aggregated, high-demand local requests sorted by demand score.
* **Demand Heatmaps**: Visualize where demand clusters are located to choose the best location.
* **Opportunity Claiming**: Signal to the community that you are planning to launch a business to solve their need.
* **Business Progress Tracking**: Update the community on your launch progress through 4 distinct stages.

### 🛡️ Core Features
* **Progressive Web App (PWA)**: Fully installable on iOS, Android, and Desktop.
* **Notifications**: Built-in preferences for push, email, and SMS notifications.
* **Admin Dashboard**: Moderation queue, user management, and platform analytics.
* **Dark Mode**: Complete, seamless dark mode integration.

---

## 📦 Project Structure

```text
├── .cursor/           # Custom AI agent guidelines and skills
├── design-system/     # Brand design tokens and guidelines
├── public/            # PWA manifest, service workers, and static assets
├── src/
│   ├── app/           # Next.js App Router (Pages, Layouts, and API Routes)
│   ├── components/    # Reusable UI components and layout wrappers
│   ├── contexts/      # React Contexts (Auth, Experience mode)
│   ├── lib/           # Utilities, data layer, Supabase clients
│   └── types/         # TypeScript type definitions
└── supabase/
    └── migrations/    # PostgreSQL schema migrations
```

---

## ⚙️ Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Adhyatm2717/WishNearby.git
cd WishNearby
npm install
```

### 2. Configure Environment
By default, the app runs using **mock data in localStorage** so you can test all flows immediately without a backend. 

To connect your own production Supabase instance:
1. Create a project on [Supabase](https://supabase.com/).
2. Run the SQL schema in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 License

This is a community-first, non-profit open-source platform.
