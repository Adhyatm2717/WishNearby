import type { User, Need, Comment, Notification, BusinessClaim } from "@/types";

// ─── Simple inline avatar SVGs ───────────────────────────────────────────────
const AVATAR_BLUE = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#1E3A8A"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">R</text></svg>`;
const AVATAR_PURPLE = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#7C3AED"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">P</text></svg>`;
const AVATAR_GREEN = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#059669"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">A</text></svg>`;
const AVATAR_ORANGE = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#EA580C"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">S</text></svg>`;

// Anonymous avatars (animal-themed)
const ANON_WOLF = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#312e81"/><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-size="22">🐺</text></svg>`;
const ANON_FOX  = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#92400e"/><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-size="22">🦊</text></svg>`;
const ANON_OWL  = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#1e3a5f"/><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-size="22">🦉</text></svg>`;

export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    email: "rahul@example.com",
    full_name: "Rahul Sharma",
    avatar_svg: AVATAR_BLUE,
    bio: "Food enthusiast from Madhya Pradesh living in Pune. Always on the hunt for authentic local flavours.",
    location: "Lohegaon, Pune",
    reputation: 847,
    is_entrepreneur: false,
    is_admin: false,
    universe: "fantasy",
    anonymous_name: "North Wolf",
    anonymous_username: "north.wolf",
    anonymous_avatar_svg: ANON_WOLF,
    created_at: "2025-08-15T10:00:00Z",
  },
  {
    id: "user-2",
    email: "priya@example.com",
    full_name: "Priya Patel",
    avatar_svg: AVATAR_PURPLE,
    bio: "Serial entrepreneur. I turn community needs into real businesses. Founder of 3 local ventures.",
    location: "Koregaon Park, Pune",
    reputation: 1234,
    is_entrepreneur: true,
    is_admin: false,
    universe: "magic",
    anonymous_name: "Crimson Fox",
    anonymous_username: "crimson.fox",
    anonymous_avatar_svg: ANON_FOX,
    created_at: "2025-06-20T10:00:00Z",
  },
  {
    id: "user-3",
    email: "amit@example.com",
    full_name: "Amit Desai",
    avatar_svg: AVATAR_GREEN,
    bio: "Community organizer. If my neighbourhood needs it, I'll make noise until someone builds it.",
    location: "Viman Nagar, Pune",
    reputation: 562,
    is_entrepreneur: false,
    is_admin: false,
    universe: "sci-fi",
    anonymous_name: "Silent Owl",
    anonymous_username: "silent.owl",
    anonymous_avatar_svg: ANON_OWL,
    created_at: "2025-09-01T10:00:00Z",
  },
  {
    id: "user-4",
    email: "sneha@example.com",
    full_name: "Sneha Kulkarni",
    avatar_svg: AVATAR_ORANGE,
    bio: "Software engineer & weekend marathoner. I care about walkable neighbourhoods and good coffee.",
    location: "Kharadi, Pune",
    reputation: 391,
    is_entrepreneur: false,
    is_admin: false,
    universe: "adventure",
    anonymous_name: "Storm Eagle",
    anonymous_username: "storm.eagle",
    anonymous_avatar_svg: ANON_FOX,
    created_at: "2025-11-10T10:00:00Z",
  },
  {
    id: "admin-1",
    email: "admin@wishnearby.org",
    full_name: "WishNearby Admin",
    reputation: 0,
    is_entrepreneur: false,
    is_admin: true,
    created_at: "2025-01-01T10:00:00Z",
  },
];

export const MOCK_NEEDS: Need[] = [
  // ── 1. PUBLIC ──────────────────────────────────────────────────────────────
  {
    id: "need-1",
    title: "Authentic MP-style samosa with green chutney",
    description:
      "Missing the authentic Madhya Pradesh style samosas with that perfect green chutney from back home. The ones available here are too oily and use the wrong filling. We need someone who can bring the real Indori taste to Lohegaon — the kind where the crust is thin and the filling has proper dry matar.",
    category: "food",
    location_name: "Lohegaon, Pune",
    lat: 18.5975,
    lng: 73.9089,
    price_min: 15,
    price_max: 30,
    support_count: 186,
    comment_count: 5,
    growth_rate: 34,
    author_id: "user-1",
    status: "active",
    created_at: "2026-01-15T08:30:00Z",
    updated_at: "2026-06-20T14:00:00Z",
    distance_km: 0.3,
  },

  // ── 2. PUBLIC ──────────────────────────────────────────────────────────────
  {
    id: "need-2",
    title: "24/7 affordable laundry pickup & delivery",
    description:
      "Working professionals in Viman Nagar need a reliable 24/7 laundry pickup and delivery service. Current options are either too expensive (₹300+ per kg) or close by 8 PM. A simple app-based service with 24-hour turnaround at ₹80–100/kg would solve this for thousands of techies.",
    category: "services",
    location_name: "Viman Nagar, Pune",
    lat: 18.5679,
    lng: 73.9143,
    price_min: 80,
    price_max: 120,
    support_count: 94,
    comment_count: 4,
    growth_rate: 22,
    author_id: "user-3",
    status: "active",
    created_at: "2026-02-10T11:00:00Z",
    updated_at: "2026-06-18T09:00:00Z",
    distance_km: 2.1,
    business_stage: 2,
    entrepreneur_id: "user-2",
  },

  // ── 3. PUBLIC ──────────────────────────────────────────────────────────────
  {
    id: "need-3",
    title: "Weekend coding bootcamp for kids (age 8–14)",
    description:
      "Parents in Koregaon Park want an affordable weekend coding bootcamp for children aged 8–14. Something fun, project-based and not just boring theory — think building simple games or apps. Fees should be under ₹2,000/month. Existing institutes are either too far or too expensive.",
    category: "education",
    location_name: "Koregaon Park, Pune",
    lat: 18.5362,
    lng: 73.8958,
    price_min: 1200,
    price_max: 2000,
    support_count: 67,
    comment_count: 4,
    growth_rate: 18,
    author_id: "user-2",
    status: "active",
    created_at: "2026-03-05T14:00:00Z",
    updated_at: "2026-06-15T16:00:00Z",
    distance_km: 4.5,
  },

  // ── 4. PUBLIC ──────────────────────────────────────────────────────────────
  {
    id: "need-4",
    title: "Affordable dental clinic open until 9 PM",
    description:
      "Many of us work 9 to 6 and literally cannot visit dentists during the day. We need an affordable dental clinic that stays open until 9 PM in the Lohegaon–Dhanori area. Basic procedures like cleaning and fillings should not cost more than ₹500. This is a public health gap.",
    category: "healthcare",
    location_name: "Lohegaon, Pune",
    lat: 18.5998,
    lng: 73.9121,
    support_count: 143,
    comment_count: 4,
    growth_rate: 28,
    author_id: "user-1",
    status: "active",
    created_at: "2026-01-28T09:00:00Z",
    updated_at: "2026-06-22T11:00:00Z",
    distance_km: 0.8,
  },

  // ── 5. PUBLIC (business claimed, stage 3) ─────────────────────────────────
  {
    id: "need-5",
    title: "Shared electric scooter rental hub near airport",
    description:
      "Last-mile connectivity from Lohegaon to Pune Airport and the nearby IT parks (Magarpatta, Phursungi) is a daily nightmare. A shared e-scooter rental hub with 20+ scooters, ₹15/km pricing and app-based unlock would solve this for thousands of commuters every single day.",
    category: "transportation",
    location_name: "Lohegaon, Pune",
    lat: 18.5821,
    lng: 73.9198,
    support_count: 211,
    comment_count: 4,
    growth_rate: 45,
    author_id: "user-3",
    status: "active",
    created_at: "2025-12-10T07:00:00Z",
    updated_at: "2026-06-25T08:00:00Z",
    distance_km: 1.2,
    business_stage: 3,
    entrepreneur_id: "user-2",
  },

  // ── 6. ANONYMOUS ──────────────────────────────────────────────────────────
  {
    id: "need-6",
    title: "Mental health counsellor available on weekends",
    description:
      "There's a serious shortage of affordable mental health professionals in Pune East. Most charge ₹1,500–2,000 per session which is simply out of reach. We need a qualified counsellor offering weekend slots for ₹300–500 per session, possibly via a hybrid in-person/online model.",
    category: "healthcare",
    location_name: "Dhanori, Pune",
    lat: 18.6102,
    lng: 73.9023,
    support_count: 128,
    comment_count: 4,
    growth_rate: 38,
    author_id: "user-4",
    is_anonymous: true,
    anonymous_name: "Storm Eagle",
    anonymous_avatar_svg: ANON_FOX,
    status: "active",
    created_at: "2026-02-20T20:00:00Z",
    updated_at: "2026-06-21T10:00:00Z",
    distance_km: 1.9,
  },

  // ── 7. ANONYMOUS ──────────────────────────────────────────────────────────
  {
    id: "need-7",
    title: "Safe well-lit running track for women",
    description:
      "As a woman who enjoys running, finding a safe, well-lit space to jog after work (6–8 PM) is nearly impossible. Parks close or have poor lighting. We need a dedicated 400m track with lights, CCTV, and possibly a women-only hour in the morning. This is a safety need, not a luxury.",
    category: "sports",
    location_name: "Viman Nagar, Pune",
    lat: 18.5700,
    lng: 73.9180,
    support_count: 174,
    comment_count: 5,
    growth_rate: 41,
    author_id: "user-4",
    is_anonymous: true,
    anonymous_name: "Storm Eagle",
    anonymous_avatar_svg: ANON_FOX,
    status: "active",
    created_at: "2026-03-10T19:30:00Z",
    updated_at: "2026-06-24T08:00:00Z",
    distance_km: 2.4,
  },

  // ── 8. PUBLIC ──────────────────────────────────────────────────────────────
  {
    id: "need-8",
    title: "Indoor badminton courts with online hourly booking",
    description:
      "Badminton is massive in this area but finding quality indoor courts with reliable online booking is nearly impossible. Courts fill up fast and there's no system — you just show up and wait. We need 4–6 professional-grade courts with PVC flooring, good lighting, and an app to book slots.",
    category: "sports",
    location_name: "Wagholi, Pune",
    lat: 18.5812,
    lng: 73.9876,
    price_min: 200,
    price_max: 400,
    support_count: 78,
    comment_count: 3,
    growth_rate: 12,
    author_id: "user-3",
    status: "active",
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-06-10T12:00:00Z",
    distance_km: 6.3,
  },

  // ── 9. ANONYMOUS ──────────────────────────────────────────────────────────
  {
    id: "need-9",
    title: "Proper coworking space under ₹3,000/month",
    description:
      "Freelancers and startup folks in the Lohegaon–Viman Nagar belt are paying ₹6,000–12,000/month for coworking. That's insane for solopreneurs just starting out. We need a no-frills coworking space — stable WiFi, power, a few meeting rooms, 24/7 access — at ₹2,500–3,000/month. The demand is real.",
    category: "services",
    location_name: "Lohegaon, Pune",
    lat: 18.5960,
    lng: 73.9070,
    price_min: 2500,
    price_max: 3500,
    support_count: 93,
    comment_count: 4,
    growth_rate: 27,
    author_id: "user-1",
    is_anonymous: true,
    anonymous_name: "North Wolf",
    anonymous_avatar_svg: ANON_WOLF,
    status: "active",
    created_at: "2026-04-18T11:00:00Z",
    updated_at: "2026-06-19T09:00:00Z",
    distance_km: 0.5,
  },

  // ── 10. PUBLIC ─────────────────────────────────────────────────────────────
  {
    id: "need-10",
    title: "South Indian breakfast joint open by 7 AM",
    description:
      "Office workers catching early cabs need proper breakfast before 7:30 AM. Most idli-dosa joints open at 8:30 or 9 AM. A small tiffin centre near Lohegaon Chowk opening at 6:30 or 7 AM with fresh idli, vada, dosa and filter coffee would be mobbed every single day. The demand is enormous.",
    category: "food",
    location_name: "Lohegaon, Pune",
    lat: 18.5980,
    lng: 73.9095,
    price_min: 40,
    price_max: 100,
    support_count: 152,
    comment_count: 5,
    growth_rate: 36,
    author_id: "user-4",
    status: "active",
    created_at: "2026-03-22T06:45:00Z",
    updated_at: "2026-06-26T07:00:00Z",
    distance_km: 0.4,
  },

  // ── 11. ANONYMOUS ─────────────────────────────────────────────────────────
  {
    id: "need-11",
    title: "Night pharmacy open past midnight",
    description:
      "Medical emergencies don't respect pharmacy hours. After 11 PM there is not a single pharmacy open within 5 km. This has caused real problems for families with young children or elderly relatives. A 24/7 pharmacy — or at minimum one open until 2 AM — is urgently needed in Dhanori or Lohegaon.",
    category: "healthcare",
    location_name: "Dhanori, Pune",
    lat: 18.6115,
    lng: 73.9010,
    support_count: 219,
    comment_count: 5,
    growth_rate: 52,
    author_id: "user-3",
    is_anonymous: true,
    anonymous_name: "Silent Owl",
    anonymous_avatar_svg: ANON_OWL,
    status: "active",
    created_at: "2026-01-05T02:10:00Z",
    updated_at: "2026-06-28T01:00:00Z",
    distance_km: 2.0,
  },

  // ── 12. PUBLIC ─────────────────────────────────────────────────────────────
  {
    id: "need-12",
    title: "Local Hindi medium school with quality English lab",
    description:
      "Many families in this area want quality English education for their kids but can't afford expensive English-medium schools. A Hindi-medium CBSE school with a dedicated English language lab and spoken English programme would be a game-changer for first-generation learners. Fees under ₹15,000/year.",
    category: "education",
    location_name: "Dhanori, Pune",
    lat: 18.6085,
    lng: 73.9040,
    price_min: 10000,
    price_max: 15000,
    support_count: 108,
    comment_count: 4,
    growth_rate: 23,
    author_id: "user-1",
    status: "active",
    created_at: "2026-02-28T10:00:00Z",
    updated_at: "2026-06-17T12:00:00Z",
    distance_km: 2.6,
  },

  // ── 13. ANONYMOUS ─────────────────────────────────────────────────────────
  {
    id: "need-13",
    title: "Crèche & day-care centre for infants (3–18 months)",
    description:
      "Working parents in Viman Nagar are desperate for a trusted, government-registered crèche for infants between 3–18 months. Most day-care centres only take kids from 2 years. Both parents working full-time with a newborn and no family support is a real crisis. Rates under ₹6,000/month with CCTV access for parents.",
    category: "services",
    location_name: "Viman Nagar, Pune",
    lat: 18.5690,
    lng: 73.9150,
    price_min: 4000,
    price_max: 6500,
    support_count: 163,
    comment_count: 5,
    growth_rate: 44,
    author_id: "user-4",
    is_anonymous: true,
    anonymous_name: "Storm Eagle",
    anonymous_avatar_svg: ANON_FOX,
    status: "active",
    created_at: "2026-02-14T09:00:00Z",
    updated_at: "2026-06-25T11:00:00Z",
    distance_km: 2.2,
  },

  // ── 14. PUBLIC ─────────────────────────────────────────────────────────────
  {
    id: "need-14",
    title: "Live music open-mic venue every Friday night",
    description:
      "Pune has incredible local musical talent but nowhere affordable to perform. A small venue — 80–120 capacity — that hosts open-mic nights every Friday with no cover charge (or under ₹100) and decent sound equipment would fill up immediately. Local artists, craft beer, good vibes. The city needs this.",
    category: "entertainment",
    location_name: "Kalyani Nagar, Pune",
    lat: 18.5467,
    lng: 73.9034,
    price_min: 0,
    price_max: 150,
    support_count: 87,
    comment_count: 4,
    growth_rate: 19,
    author_id: "user-2",
    status: "active",
    created_at: "2026-05-02T18:00:00Z",
    updated_at: "2026-06-23T20:00:00Z",
    distance_km: 7.1,
  },

  // ── 15. ANONYMOUS ─────────────────────────────────────────────────────────
  {
    id: "need-15",
    title: "BRTS/bus route connecting Lohegaon to Hinjewadi",
    description:
      "Thousands of IT employees travel daily from Lohegaon and Dhanori to Hinjewadi Phase 1, 2 & 3. The current route requires two or three bus changes and takes 2+ hours each way. A direct BRTS or express bus service on this corridor would transform the daily commute for at least 15,000 people. PMPML needs to hear this.",
    category: "government",
    location_name: "Lohegaon, Pune",
    lat: 18.5965,
    lng: 73.9080,
    support_count: 302,
    comment_count: 5,
    growth_rate: 67,
    author_id: "user-3",
    is_anonymous: true,
    anonymous_name: "Silent Owl",
    anonymous_avatar_svg: ANON_OWL,
    status: "active",
    created_at: "2025-11-20T08:00:00Z",
    updated_at: "2026-06-28T09:00:00Z",
    distance_km: 0.6,
  },
];

// ─── Comments ─────────────────────────────────────────────────────────────────
export const MOCK_COMMENTS: Comment[] = [
  // need-1 — Samosa
  { id: "c-1-1", need_id: "need-1", user_id: "user-3", content: "YES! I've been craving these since I moved from Bhopal. The ones here are nothing like the real deal. Count me in! 🙏", created_at: "2026-01-16T10:00:00Z" },
  { id: "c-1-2", need_id: "need-1", user_id: "user-2", content: "My grandmother's recipe is exactly this — thin crust, dry peas filling, and that green chutney with coriander and ginger. I might actually take this on as a business!", created_at: "2026-01-17T14:30:00Z" },
  { id: "c-1-3", need_id: "need-1", user_id: "user-4", content: "186 supporters already! The demand is undeniable. Someone please make this happen before I fly back to Indore just for samosas 😂", created_at: "2026-06-20T14:00:00Z" },
  { id: "c-1-4", need_id: "need-1", user_id: "user-1", content: "To anyone considering this — the margins on street food are actually great if you target office crowds at morning snack time. This could be a 1,000-unit-a-day business easily.", created_at: "2026-06-21T09:30:00Z" },
  { id: "c-1-5", need_id: "need-1", user_id: "user-3", content: "Also please do the hing-flavoured version! That's what makes MP samosas different from everywhere else.", created_at: "2026-06-22T11:00:00Z" },

  // need-2 — Laundry
  { id: "c-2-1", need_id: "need-2", user_id: "user-1", content: "I pay ₹350/kg at the current place and they damage my clothes half the time. Please someone build this!", created_at: "2026-02-12T08:00:00Z" },
  { id: "c-2-2", need_id: "need-2", user_id: "user-4", content: "Priya has already claimed this — any update on when the service goes live? The pickup routing stage seems like it could be done in a month.", created_at: "2026-06-10T10:00:00Z" },
  { id: "c-2-3", need_id: "need-2", user_id: "user-2", content: "Hi everyone! I'm actively working on this. Routes are being finalised. Should be live by end of July. Will post updates here! 🙌", created_at: "2026-06-18T09:30:00Z" },
  { id: "c-2-4", need_id: "need-2", user_id: "user-3", content: "Please also support dry cleaning and ironing-only options. Not everyone needs full wash every time.", created_at: "2026-06-19T15:00:00Z" },

  // need-3 — Coding bootcamp
  { id: "c-3-1", need_id: "need-3", user_id: "user-4", content: "My 10-year-old is obsessed with Scratch and Minecraft. A proper course would be amazing. Koregaon Park residents — let's make this happen!", created_at: "2026-03-08T16:00:00Z" },
  { id: "c-3-2", need_id: "need-3", user_id: "user-1", content: "I'm a senior software engineer and would love to volunteer as a mentor for a few hours on weekends. Anyone building this, reach out!", created_at: "2026-03-15T12:30:00Z" },
  { id: "c-3-3", need_id: "need-3", user_id: "user-3", content: "This could also be done at a local school facility on weekends. Many schools rent space. That solves the venue problem cheaply.", created_at: "2026-05-01T09:00:00Z" },
  { id: "c-3-4", need_id: "need-3", user_id: "user-2", content: "I'm evaluating this as a business opportunity. Looking at a franchise model from a Bangalore-based ed-tech brand. More updates coming soon.", created_at: "2026-06-01T14:00:00Z" },

  // need-4 — Dental clinic
  { id: "c-4-1", need_id: "need-4", user_id: "user-3", content: "I had a dental emergency at 8:30 PM last month. Had to drive 18 km to find a dentist. This is a genuine crisis.", created_at: "2026-01-30T22:00:00Z" },
  { id: "c-4-2", need_id: "need-4", user_id: "user-4", content: "Even regular cleaning takes months to book during working hours. Evening slots would completely solve this for most working people.", created_at: "2026-02-05T19:00:00Z" },
  { id: "c-4-3", need_id: "need-4", user_id: "user-2", content: "Dental clinics have high setup costs (₹8–15L for equipment) but the ROI at evening pricing is excellent. This is viable for an entrepreneur.", created_at: "2026-03-20T10:00:00Z" },
  { id: "c-4-4", need_id: "need-4", user_id: "user-1", content: "143 supporters! Please someone step up. Even one dentist doing evening shifts out of an existing clinic space would work.", created_at: "2026-06-22T09:00:00Z" },

  // need-5 — E-scooter
  { id: "c-5-1", need_id: "need-5", user_id: "user-1", content: "The airport is 3 km from my place but an Ola/Uber charges ₹120–150 for that short distance. E-scooters at ₹15/km would be a life changer.", created_at: "2025-12-15T08:00:00Z" },
  { id: "c-5-2", need_id: "need-5", user_id: "user-4", content: "Please also include helmets with each scooter! Safety is non-negotiable. And the docking stations need covered parking.", created_at: "2026-01-10T11:00:00Z" },
  { id: "c-5-3", need_id: "need-5", user_id: "user-2", content: "Fleet of 20 Yulu-style scooters arriving next week! We're almost ready for the soft launch. Thank you all for the 211 supporters — this is because of you! 🛴🙏", created_at: "2026-06-25T08:00:00Z" },
  { id: "c-5-4", need_id: "need-5", user_id: "user-3", content: "Incredible news! Will there be student/monthly pass discounts? A lot of college students in this area would benefit massively.", created_at: "2026-06-25T09:30:00Z" },

  // need-6 — Mental health (ANONYMOUS)
  { id: "c-6-1", need_id: "need-6", user_id: "user-1", content: "This is so important. I've been waiting 6 weeks for an appointment at an affordable clinic. Demand way outstrips supply here.", created_at: "2026-02-22T21:00:00Z" },
  { id: "c-6-2", need_id: "need-6", user_id: "user-3", content: "Online counselling platforms like iCall charge ₹200–400 per session and are actually excellent. Could someone build a local chapter or referral system?", created_at: "2026-03-01T19:30:00Z" },
  { id: "c-6-3", need_id: "need-6", user_id: "user-4", content: "The stigma makes people reluctant to seek help but affordable access is the first step. Supporting this fully. 128 people agree — that's a clear signal.", created_at: "2026-06-10T10:00:00Z" },
  { id: "c-6-4", need_id: "need-6", user_id: "user-2", content: "I know two clinical psychologists from Symbiosis who do private practice. Will connect them to this thread. This is doable.", created_at: "2026-06-21T14:00:00Z" },

  // need-7 — Women's running track (ANONYMOUS)
  { id: "c-7-1", need_id: "need-7", user_id: "user-4", content: "I stopped running after dark because of harassment. This is a real safety issue, not just a fitness request. 💪", created_at: "2026-03-12T20:00:00Z" },
  { id: "c-7-2", need_id: "need-7", user_id: "user-1", content: "A women's-only slot from 6–8 AM would also help enormously. Even the Viman Nagar garden doesn't feel safe post-sunset.", created_at: "2026-03-15T07:00:00Z" },
  { id: "c-7-3", need_id: "need-7", user_id: "user-2", content: "There's a PMC-owned plot near the Viman Nagar water tank that's under-used. Could petition them to convert it. I can draft the letter if people sign on.", created_at: "2026-04-20T11:00:00Z" },
  { id: "c-7-4", need_id: "need-7", user_id: "user-3", content: "We need to bring this to the local corporator's attention. 174 supporters is enough political weight. Let's organise a petition drive.", created_at: "2026-06-24T09:00:00Z" },
  { id: "c-7-5", need_id: "need-7", user_id: "user-4", content: "I'll help coordinate the petition! DM me through the app. This is long overdue.", created_at: "2026-06-24T11:30:00Z" },

  // need-8 — Badminton courts
  { id: "c-8-1", need_id: "need-8", user_id: "user-1", content: "We tried 4 courts in Wagholi last Sunday — all full, no booking system, had to wait 90 minutes. This is ridiculous in 2026.", created_at: "2026-04-05T10:30:00Z" },
  { id: "c-8-2", need_id: "need-8", user_id: "user-4", content: "Even ₹300–400/hour for a proper indoor court is fine if it's clean and the lights are good. Bad courts are worse than no courts.", created_at: "2026-04-10T15:00:00Z" },
  { id: "c-8-3", need_id: "need-8", user_id: "user-2", content: "Badminton court setups have decent ROI — roughly ₹8–12L per court and breakeven in 18–24 months at full utilisation. Happy to discuss with anyone interested in building this.", created_at: "2026-06-01T13:00:00Z" },

  // need-9 — Coworking space (ANONYMOUS)
  { id: "c-9-1", need_id: "need-9", user_id: "user-4", content: "I've been working from McDonald's for 3 months because I can't afford ₹8,000/month coworking. This is not sustainable for early-stage freelancers.", created_at: "2026-04-20T10:30:00Z" },
  { id: "c-9-2", need_id: "need-9", user_id: "user-2", content: "The model works — WeWork-lite spaces at ₹2,500/month with 50 members = ₹1.25L MRR. Lohegaon has the demand. Just needs someone to take the plunge.", created_at: "2026-04-25T12:00:00Z" },
  { id: "c-9-3", need_id: "need-9", user_id: "user-3", content: "Please include a small phone booth for calls! Open-plan spaces are useless for client calls and video meetings.", created_at: "2026-05-15T09:00:00Z" },
  { id: "c-9-4", need_id: "need-9", user_id: "user-1", content: "93 supporters already — the demand is proven. Someone here should seriously explore converting a large flat or ground floor shop into this.", created_at: "2026-06-19T10:00:00Z" },

  // need-10 — South Indian breakfast
  { id: "c-10-1", need_id: "need-10", user_id: "user-3", content: "I skip breakfast entirely because nothing opens before my cab at 7:15 AM. A proper South Indian tiffin at 6:30 AM would change my life.", created_at: "2026-03-24T07:00:00Z" },
  { id: "c-10-2", need_id: "need-10", user_id: "user-2", content: "Filter coffee alone would be a hit! Instant coffee culture needs to end. This kind of breakfast joint has minimal setup cost and extremely high repeat footfall.", created_at: "2026-03-28T08:30:00Z" },
  { id: "c-10-3", need_id: "need-10", user_id: "user-1", content: "The owner of the current Darshini near Lohegaon signal has been thinking of expanding. Someone should share this need with him directly!", created_at: "2026-04-10T09:00:00Z" },
  { id: "c-10-4", need_id: "need-10", user_id: "user-4", content: "Also please do proper set-dosa, uttapam and bisibelebath — not just plain dosa! Authentic menu is what will make people loyal.", created_at: "2026-06-05T08:00:00Z" },
  { id: "c-10-5", need_id: "need-10", user_id: "user-3", content: "152 supporters in just 3 months. If a business doesn't open here soon I'm going to learn to cook idli myself 😅", created_at: "2026-06-26T07:30:00Z" },

  // need-11 — Night pharmacy (ANONYMOUS)
  { id: "c-11-1", need_id: "need-11", user_id: "user-1", content: "My toddler had a fever at 1 AM and I couldn't find Calpol anywhere within 8 km. Had to drive to Kalyani Nagar. This is a genuine emergency gap.", created_at: "2026-01-07T01:30:00Z" },
  { id: "c-11-2", need_id: "need-11", user_id: "user-4", content: "Even one pharmacy with a WhatsApp ordering system and 2 AM delivery would solve 80% of cases. The technology is trivial — it's just willingness.", created_at: "2026-01-15T22:00:00Z" },
  { id: "c-11-3", need_id: "need-11", user_id: "user-3", content: "Pharmacy margins are decent and the investment is low. I'd love to see an entrepreneur here take this. 219 supporters means guaranteed footfall.", created_at: "2026-03-10T10:00:00Z" },
  { id: "c-11-4", need_id: "need-11", user_id: "user-2", content: "I've spoken to two pharmacists who are interested. The challenge is the night shift security. Anyone know if PCMC has a night shift subsidy for essential services?", created_at: "2026-06-20T14:00:00Z" },
  { id: "c-11-5", need_id: "need-11", user_id: "user-1", content: "Let's also raise this with the local MLA's office. 219 votes is a strong case for a late-night essential services licence. I'll draft the letter.", created_at: "2026-06-28T09:00:00Z" },

  // need-12 — Hindi-medium school
  { id: "c-12-1", need_id: "need-12", user_id: "user-3", content: "This is exactly the gap in education equity. Most parents here want quality for their kids but English-only schools are out of reach financially AND linguistically.", created_at: "2026-03-01T09:30:00Z" },
  { id: "c-12-2", need_id: "need-12", user_id: "user-4", content: "A Spoken English lab with a dedicated IELTS/communication teacher would be transformative for kids from Hindi-medium backgrounds. My sibling missed out on great jobs because of this.", created_at: "2026-03-10T12:00:00Z" },
  { id: "c-12-3", need_id: "need-12", user_id: "user-2", content: "There are NGOs like Teach For India that can supply trained teachers to partner schools at subsidised rates. This is financeable if the right structure is in place.", created_at: "2026-04-05T11:00:00Z" },
  { id: "c-12-4", need_id: "need-12", user_id: "user-1", content: "108 supporters — parents here are serious. Even a weekend Spoken English batch as a pilot before a full school would prove the demand.", created_at: "2026-06-17T10:00:00Z" },

  // need-13 — Crèche (ANONYMOUS)
  { id: "c-13-1", need_id: "need-13", user_id: "user-1", content: "My wife and I nearly had to quit our jobs when our daughter was born because we couldn't find a crèche for a 4-month-old. This need is absolutely real.", created_at: "2026-02-16T21:00:00Z" },
  { id: "c-13-2", need_id: "need-13", user_id: "user-3", content: "Government Aanganwadis exist but they're overcrowded and not equipped for infants under 1 year. A private crèche with trained caregivers and CCTV is the only real option.", created_at: "2026-02-20T10:00:00Z" },
  { id: "c-13-3", need_id: "need-13", user_id: "user-4", content: "If this service also offered pickup from nearby housing societies, I'd pay ₹7,000/month without a second thought. The convenience premium is worth it.", created_at: "2026-03-15T08:30:00Z" },
  { id: "c-13-4", need_id: "need-13", user_id: "user-2", content: "163 supporters — this is one of the highest-demand needs in the area. I'm exploring a micro-crèche franchise model. Would any parents be interested in a survey call?", created_at: "2026-06-25T12:00:00Z" },
  { id: "c-13-5", need_id: "need-13", user_id: "user-1", content: "Please do include emergency contact and live CCTV access on a parent app. That's the trust layer that will make people actually sign up.", created_at: "2026-06-25T14:00:00Z" },

  // need-14 — Open-mic venue
  { id: "c-14-1", need_id: "need-14", user_id: "user-4", content: "I've been playing guitar for 6 years and have never once performed in public because there's nowhere affordable to do so. This would be life-changing for local musicians.", created_at: "2026-05-04T19:30:00Z" },
  { id: "c-14-2", need_id: "need-14", user_id: "user-1", content: "Even a small bar or café that dedicates Friday nights to open-mic — no special venue needed! The atmosphere and regulars will build themselves.", created_at: "2026-05-10T20:00:00Z" },
  { id: "c-14-3", need_id: "need-14", user_id: "user-3", content: "Rantara in Koregaon Park used to do this pre-COVID and it was always packed. There's proven demand — someone just needs to revive it.", created_at: "2026-05-20T18:00:00Z" },
  { id: "c-14-4", need_id: "need-14", user_id: "user-2", content: "The economics work with a ₹200 cover + drinks margin. Kalyani Nagar has the demographics for this. I'm scouting a 100-seat space currently.", created_at: "2026-06-10T12:00:00Z" },

  // need-15 — BRTS Lohegaon–Hinjewadi (ANONYMOUS)
  { id: "c-15-1", need_id: "need-15", user_id: "user-4", content: "I spend ₹120/day on cabs to Hinjewadi. That's ₹3,000+ a month, purely on commute. A direct bus at ₹35–50 would save me ₹25,000 a year.", created_at: "2025-11-25T08:00:00Z" },
  { id: "c-15-2", need_id: "need-15", user_id: "user-1", content: "PMPML route 150 exists but goes via Hadapsar adding 45 minutes. A Lohegaon–Wakad–Hinjewadi express route is all we're asking for.", created_at: "2025-12-10T09:00:00Z" },
  { id: "c-15-3", need_id: "need-15", user_id: "user-3", content: "IT park residents should collectively write to Divisional Commissioner. 302 signatures is serious — this is PMPML's job and we should demand it loudly.", created_at: "2026-02-01T11:00:00Z" },
  { id: "c-15-4", need_id: "need-15", user_id: "user-2", content: "I know someone at PCMC planning division. Sharing this need with them. Also check the PMPML suggestion portal — they do actually respond to volume.", created_at: "2026-04-10T14:00:00Z" },
  { id: "c-15-5", need_id: "need-15", user_id: "user-4", content: "302 supporters and counting! Can we coordinate a representation to the local MLA? This needs political pressure not just online petitions.", created_at: "2026-06-28T10:00:00Z" },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-1",
    type: "support",
    title: "🎉 New supporters!",
    message: "12 people supported your samosa need today — you're trending!",
    need_id: "need-1",
    read: false,
    created_at: "2026-06-27T08:00:00Z",
  },
  {
    id: "notif-2",
    user_id: "user-1",
    type: "comment",
    title: "💬 New comment",
    message: "Priya Patel commented on your samosa need",
    need_id: "need-1",
    read: false,
    created_at: "2026-06-26T16:00:00Z",
  },
  {
    id: "notif-3",
    user_id: "user-1",
    type: "business_claim",
    title: "🚀 Entrepreneur interested!",
    message: "Priya Patel is planning to open a laundry service based on your need",
    need_id: "need-2",
    read: false,
    created_at: "2026-06-20T10:00:00Z",
  },
  {
    id: "notif-4",
    user_id: "user-1",
    type: "business_open",
    title: "✅ Need fulfilled!",
    message: "The e-scooter hub is launching soon in Lohegaon — you helped make this happen!",
    need_id: "need-5",
    read: true,
    created_at: "2026-06-25T08:00:00Z",
  },
  {
    id: "notif-5",
    user_id: "user-1",
    type: "weekly_update",
    title: "📍 Weekly community digest",
    message: "5 new needs in Lohegaon this week. 2 businesses in progress. 302 people want a direct bus to Hinjewadi!",
    read: true,
    created_at: "2026-06-23T09:00:00Z",
  },
];

export const MOCK_BUSINESS_CLAIMS: BusinessClaim[] = [
  {
    id: "claim-1",
    need_id: "need-2",
    entrepreneur_id: "user-2",
    stage: 2,
    estimated_investment: 150000,
    notes: "Setting up pickup routes, folding equipment and hiring 3 part-time staff. App integration underway.",
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-06-18T09:00:00Z",
  },
  {
    id: "claim-2",
    need_id: "need-5",
    entrepreneur_id: "user-2",
    stage: 3,
    estimated_investment: 500000,
    notes: "Fleet of 20 Yulu Pro e-scooters arriving next week. Docking stations at 3 locations confirmed. App soft launch in 2 weeks.",
    created_at: "2026-03-15T10:00:00Z",
    updated_at: "2026-06-25T08:00:00Z",
  },
];

export const CURRENT_USER_ID = "user-1";

export function getMockUser(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

export function enrichNeed(need: Need): Need {
  return {
    ...need,
    author: getMockUser(need.author_id),
  };
}

export function enrichComment(comment: Comment): Comment {
  return {
    ...comment,
    user: getMockUser(comment.user_id),
  };
}
