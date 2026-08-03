import type { User, Need, Comment, Notification, BusinessClaim } from "@/types";

// ─────────────────────────────────────────────
// USERS (5 realistic community members)
// ─────────────────────────────────────────────
export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    email: "rahul@example.com",
    full_name: "Rahul Sharma",
    avatar_url: undefined,
    bio: "Food enthusiast from Madhya Pradesh living in Pune. Always hunting for authentic flavours.",
    location: "Lohegaon, Pune",
    reputation: 847,
    is_entrepreneur: false,
    is_admin: false,
    created_at: "2025-08-15T10:00:00Z",
  },
  {
    id: "user-2",
    email: "priya@example.com",
    full_name: "Priya Patel",
    bio: "Local entrepreneur passionate about turning community needs into real businesses.",
    location: "Koregaon Park, Pune",
    reputation: 1234,
    is_entrepreneur: true,
    is_admin: false,
    created_at: "2025-06-20T10:00:00Z",
  },
  {
    id: "user-3",
    email: "amit@example.com",
    full_name: "Amit Desai",
    bio: "Community organizer and local champion. Tech-park professional who misses home food.",
    location: "Viman Nagar, Pune",
    reputation: 562,
    is_entrepreneur: false,
    is_admin: false,
    created_at: "2025-09-01T10:00:00Z",
  },
  {
    id: "user-4",
    email: "sneha@example.com",
    full_name: "Sneha Kulkarni",
    bio: "Startup founder | fitness junkie | mom of two. Building solutions for everyday Pune problems.",
    location: "Wagholi, Pune",
    reputation: 390,
    is_entrepreneur: true,
    is_admin: false,
    created_at: "2025-11-10T10:00:00Z",
  },
  {
    id: "user-5",
    email: "rohan@example.com",
    full_name: "Rohan Mehta",
    bio: "Software engineer, weekend cyclist, and strong believer in hyperlocal economies.",
    location: "Kharadi, Pune",
    reputation: 215,
    is_entrepreneur: false,
    is_admin: false,
    created_at: "2026-01-05T10:00:00Z",
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

// ─────────────────────────────────────────────
// 15 SAMPLE NEEDS
// 9 public, 6 anonymous — various categories
// ─────────────────────────────────────────────
export const MOCK_NEEDS: Need[] = [
  // ── NEED 1 ── PUBLIC | Food | High demand
  {
    id: "need-1",
    title: "Authentic MP-style samosa with green chutney",
    description:
      "Missing the authentic Madhya Pradesh style samosas with that perfect green chutney from back home. The ones here use maida and too much oil — we need someone to bring the real khasta taste to Lohegaon! Even a small cart near the IT offices would be perfect.",
    category: "food",
    location_name: "Lohegaon, Pune",
    lat: 18.5975,
    lng: 73.9089,
    price_min: 15,
    price_max: 30,
    support_count: 186,
    comment_count: 6,
    growth_rate: 34,
    author_id: "user-1",
    status: "active",
    is_anonymous: false,
    created_at: "2026-01-15T08:30:00Z",
    updated_at: "2026-06-20T14:00:00Z",
    distance_km: 0.3,
  },

  // ── NEED 2 ── PUBLIC | Services | Business Stage 2
  {
    id: "need-2",
    title: "24/7 affordable laundry pickup & delivery",
    description:
      "Working professionals in Viman Nagar need a reliable 24/7 laundry pickup and delivery service. Current options are either too expensive (Rs 200+ per kg) or close by 8 PM. A Rs 80-120/kg model with next-day delivery would be a game changer for this area.",
    category: "services",
    location_name: "Viman Nagar, Pune",
    lat: 18.5679,
    lng: 73.9143,
    price_min: 80,
    price_max: 120,
    support_count: 94,
    comment_count: 5,
    growth_rate: 22,
    author_id: "user-3",
    status: "active",
    is_anonymous: false,
    created_at: "2026-02-10T11:00:00Z",
    updated_at: "2026-06-18T09:00:00Z",
    distance_km: 2.1,
    business_stage: 2,
    entrepreneur_id: "user-2",
  },

  // ── NEED 3 ── ANONYMOUS | Education | Medium demand
  {
    id: "need-3",
    title: "Weekend coding bootcamp for kids aged 8-14",
    description:
      "Parents in Koregaon Park want an affordable weekend coding bootcamp for children. Something fun, project-based — games, apps, animations — not just dry theory. Rs 500-800 per month, Saturday mornings would be ideal. My son is bored and needs productive engagement.",
    category: "education",
    location_name: "Koregaon Park, Pune",
    lat: 18.5362,
    lng: 73.8958,
    price_min: 500,
    price_max: 800,
    support_count: 67,
    comment_count: 4,
    growth_rate: 18,
    author_id: "user-2",
    status: "active",
    is_anonymous: true,
    anonymous_name: "Silent Owl",
    created_at: "2026-03-05T14:00:00Z",
    updated_at: "2026-06-15T16:00:00Z",
    distance_km: 4.5,
  },

  // ── NEED 4 ── PUBLIC | Healthcare | High demand
  {
    id: "need-4",
    title: "Affordable dental clinic with evening hours",
    description:
      "Many of us work 9-6 and simply cannot visit dentists during the day. We need an affordable dental clinic open until 9 PM in Lohegaon area. Basic cleaning, fillings and check-ups under Rs 300. The nearest evening clinic is in Viman Nagar, 5 km away.",
    category: "healthcare",
    location_name: "Lohegaon, Pune",
    lat: 18.5998,
    lng: 73.9121,
    price_min: 150,
    price_max: 500,
    support_count: 143,
    comment_count: 4,
    growth_rate: 28,
    author_id: "user-1",
    status: "active",
    is_anonymous: false,
    created_at: "2026-01-28T09:00:00Z",
    updated_at: "2026-06-22T11:00:00Z",
    distance_km: 0.8,
  },

  // ── NEED 5 ── PUBLIC | Transportation | Highest demand | Business Stage 3
  {
    id: "need-5",
    title: "Shared electric scooter rental hub near airport",
    description:
      "Last-mile connectivity from Lohegaon to the airport and nearby tech parks (EON, Zensar) is terrible. Auto-rickshaws overcharge Rs 80-120 for 2 km. A shared e-scooter rental hub with Rs 2-3/min pricing would solve this for thousands of daily commuters.",
    category: "transportation",
    location_name: "Lohegaon, Pune",
    lat: 18.5821,
    lng: 73.9198,
    price_min: 20,
    price_max: 80,
    support_count: 211,
    comment_count: 6,
    growth_rate: 45,
    author_id: "user-3",
    status: "active",
    is_anonymous: false,
    created_at: "2025-12-10T07:00:00Z",
    updated_at: "2026-06-25T08:00:00Z",
    distance_km: 1.2,
    business_stage: 3,
    entrepreneur_id: "user-4",
  },

  // ── NEED 6 ── ANONYMOUS | Sports | Medium demand
  {
    id: "need-6",
    title: "Indoor badminton courts with hourly online booking",
    description:
      "Badminton is huge in Wagholi but finding quality indoor courts with online hourly booking is nearly impossible. We need 4-6 courts with PU flooring, good lighting and a simple app to book. Rs 150-200 per hour per court. Currently driving 8 km to Kalyani Nagar.",
    category: "sports",
    location_name: "Wagholi, Pune",
    lat: 18.5812,
    lng: 73.9876,
    price_min: 150,
    price_max: 200,
    support_count: 78,
    comment_count: 3,
    growth_rate: 12,
    author_id: "user-3",
    status: "active",
    is_anonymous: true,
    anonymous_name: "Midnight Falcon",
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-06-10T12:00:00Z",
    distance_km: 6.3,
  },

  // ── NEED 7 ── PUBLIC | Shopping | FULFILLED Stage 4
  {
    id: "need-7",
    title: "Organic farmers market every Sunday morning",
    description:
      "We want a dedicated organic farmers market every Sunday where local farmers sell directly to consumers. No middlemen, fair prices for both sides. Kharadi has the space — the ground near EON Free Zone is perfect. Chemical-free produce, fresh eggs, honey, millets!",
    category: "shopping",
    location_name: "Kharadi, Pune",
    lat: 18.5512,
    lng: 73.9445,
    price_min: 40,
    price_max: 200,
    support_count: 156,
    comment_count: 4,
    growth_rate: 31,
    author_id: "user-2",
    status: "fulfilled",
    is_anonymous: false,
    created_at: "2025-10-20T08:00:00Z",
    updated_at: "2026-05-01T10:00:00Z",
    distance_km: 5.8,
    business_stage: 4,
    entrepreneur_id: "user-2",
  },

  // ── NEED 8 ── ANONYMOUS | Entertainment | Low demand
  {
    id: "need-8",
    title: "Community cinema room for indie films and documentaries",
    description:
      "A small community cinema room for indie films, documentaries, and local filmmaker showcases. Think 50 seats, cozy atmosphere, no popcorn markup robbery. Kalyani Nagar has enough young professionals who'd pay Rs 80-120 for a curated screening experience.",
    category: "entertainment",
    location_name: "Kalyani Nagar, Pune",
    lat: 18.5467,
    lng: 73.9034,
    price_min: 80,
    price_max: 120,
    support_count: 45,
    comment_count: 3,
    growth_rate: 8,
    author_id: "user-1",
    status: "active",
    is_anonymous: true,
    anonymous_name: "Cosmic Raven",
    created_at: "2026-05-15T16:00:00Z",
    updated_at: "2026-06-08T14:00:00Z",
    distance_km: 7.1,
  },

  // ── NEED 9 ── PUBLIC | Food | Trending | Business Stage 1
  {
    id: "need-9",
    title: "Healthy tiffin service for gym-goers and diabetics",
    description:
      "There is zero healthy tiffin option in Wagholi for people with dietary needs — gym folks needing high protein, or diabetics needing low glycemic meals. Keto, diabetic-friendly, high-protein meal plans delivered by 7 AM and 1 PM. Rs 120-180 per meal. I'd subscribe instantly.",
    category: "food",
    location_name: "Wagholi, Pune",
    lat: 18.5798,
    lng: 73.9852,
    price_min: 120,
    price_max: 180,
    support_count: 132,
    comment_count: 5,
    growth_rate: 38,
    author_id: "user-4",
    status: "active",
    is_anonymous: false,
    created_at: "2026-02-20T06:30:00Z",
    updated_at: "2026-06-24T08:00:00Z",
    distance_km: 6.8,
    business_stage: 1,
    entrepreneur_id: "user-2",
  },

  // ── NEED 10 ── ANONYMOUS | Government | Medium demand
  {
    id: "need-10",
    title: "Street lights on Lohegaon-Dhanori road after 10 PM",
    description:
      "The stretch between Lohegaon Chowk and Dhanori bridge is completely dark after 10 PM. Two accidents have already happened here this year. Women returning from night shifts are scared. This is a basic civic need — we pay taxes and deserve safe streets.",
    category: "government",
    location_name: "Lohegaon-Dhanori, Pune",
    lat: 18.6015,
    lng: 73.9201,
    support_count: 89,
    comment_count: 4,
    growth_rate: 20,
    author_id: "user-5",
    status: "active",
    is_anonymous: true,
    anonymous_name: "Iron Shield",
    created_at: "2026-03-18T21:00:00Z",
    updated_at: "2026-06-20T10:00:00Z",
    distance_km: 1.5,
  },

  // ── NEED 11 ── PUBLIC | Services | Business Stage 2
  {
    id: "need-11",
    title: "On-demand home cleaning with background-verified staff",
    description:
      "We need a trustworthy home cleaning app in Wagholi and Kharadi. Background-verified staff, hourly pricing (Rs 250-350/hr), proper ratings. Current options either cancel last minute or send unverified strangers. Trust is everything when someone enters your home.",
    category: "services",
    location_name: "Kharadi, Pune",
    lat: 18.5521,
    lng: 73.9456,
    price_min: 250,
    price_max: 350,
    support_count: 73,
    comment_count: 4,
    growth_rate: 16,
    author_id: "user-5",
    status: "active",
    is_anonymous: false,
    created_at: "2026-04-12T11:00:00Z",
    updated_at: "2026-06-21T13:00:00Z",
    distance_km: 5.2,
    business_stage: 2,
    entrepreneur_id: "user-4",
  },

  // ── NEED 12 ── ANONYMOUS | Healthcare | High demand
  {
    id: "need-12",
    title: "Mental health counsellor with sliding scale fees",
    description:
      "Therapy in Pune costs Rs 1500-3000 per session — completely unaffordable for most young working people. We need a mental health counsellor in Viman Nagar offering sliding scale fees (Rs 200-600 based on income). Online sessions acceptable too. The pandemic broke a lot of us mentally.",
    category: "healthcare",
    location_name: "Viman Nagar, Pune",
    lat: 18.5671,
    lng: 73.9138,
    price_min: 200,
    price_max: 600,
    support_count: 118,
    comment_count: 5,
    growth_rate: 26,
    author_id: "user-3",
    status: "active",
    is_anonymous: true,
    anonymous_name: "Gentle Storm",
    created_at: "2026-04-28T09:00:00Z",
    updated_at: "2026-06-23T10:00:00Z",
    distance_km: 2.4,
  },

  // ── NEED 13 ── PUBLIC | Education | Low-Medium
  {
    id: "need-13",
    title: "Spoken English and confidence class for working adults",
    description:
      "Many colleagues are technically brilliant but held back in careers because of communication hesitation. We need affordable spoken English and presentation skills classes — evenings or weekends, small batch (15 people max), practical not textbook. Rs 800-1200/month.",
    category: "education",
    location_name: "Lohegaon, Pune",
    lat: 18.5961,
    lng: 73.9074,
    price_min: 800,
    price_max: 1200,
    support_count: 54,
    comment_count: 3,
    growth_rate: 14,
    author_id: "user-1",
    status: "active",
    is_anonymous: false,
    created_at: "2026-05-02T17:00:00Z",
    updated_at: "2026-06-17T12:00:00Z",
    distance_km: 0.6,
  },

  // ── NEED 14 ── PUBLIC | Shopping | Medium demand
  {
    id: "need-14",
    title: "Stationery and craft supply store for students and artists",
    description:
      "The nearest decent stationery and art supply store is in Camp, 18 km away. Students doing engineering, architecture, design — and hobby artists — desperately need a local store with proper drawing sheets, markers, watercolours, 3D printing supplies.",
    category: "shopping",
    location_name: "Viman Nagar, Pune",
    lat: 18.5688,
    lng: 73.9155,
    price_min: 50,
    price_max: 1000,
    support_count: 61,
    comment_count: 3,
    growth_rate: 11,
    author_id: "user-5",
    status: "active",
    is_anonymous: false,
    created_at: "2026-05-22T14:00:00Z",
    updated_at: "2026-06-18T16:00:00Z",
    distance_km: 2.8,
  },

  // ── NEED 15 ── ANONYMOUS | Others | Medium demand
  {
    id: "need-15",
    title: "Co-working space with creche facility for working parents",
    description:
      "Single parents and couples where both partners work have NO affordable co-working space that also has a safe on-site creche. A space with a supervised play area for kids aged 1-6 while parents work nearby (Rs 3000-5000/month). Koregaon Park has the density — this would fill up in weeks.",
    category: "others",
    location_name: "Koregaon Park, Pune",
    lat: 18.5358,
    lng: 73.8951,
    price_min: 3000,
    price_max: 5000,
    support_count: 87,
    comment_count: 4,
    growth_rate: 24,
    author_id: "user-4",
    status: "active",
    is_anonymous: true,
    anonymous_name: "Silver Fox",
    created_at: "2026-05-30T10:00:00Z",
    updated_at: "2026-06-25T09:00:00Z",
    distance_km: 4.1,
  },
];

// ─────────────────────────────────────────────
// COMMENTS — 45 rich discussions across needs
// ─────────────────────────────────────────────
export const MOCK_COMMENTS: Comment[] = [
  // Need 1 — Samosa (6 comments)
  { id: "c-1-1", need_id: "need-1", user_id: "user-3", content: "YES! I've been craving these since I moved from Bhopal three years ago. The ones at local chai stalls use frozen filling. Count me in the moment someone opens!", created_at: "2026-01-16T10:00:00Z" },
  { id: "c-1-2", need_id: "need-1", user_id: "user-2", content: "My grandmother's recipe is literally this — atta pastry, coarse potato filling with fennel seeds, and fresh green chutney with mint and coriander. I might actually take this on as a business. 186 supporters is more than enough validation!", created_at: "2026-01-17T14:30:00Z" },
  { id: "c-1-3", need_id: "need-1", user_id: "user-5", content: "The evening samosa rush near IT offices would be MASSIVE. There are 3000+ people working within 500m. Even a cart doing 300 pieces a day would be profitable.", created_at: "2026-02-05T18:00:00Z" },
  { id: "c-1-4", need_id: "need-1", user_id: "user-4", content: "Priya please take this forward! I'll be your first regular customer. Even a cloud kitchen model with delivery would work.", created_at: "2026-03-12T12:00:00Z" },
  { id: "c-1-5", need_id: "need-1", user_id: "user-1", content: "Update: 186 supporters now! The demand is undeniable. Someone please make this happen! I'd pay Rs 30 happily for the real thing.", created_at: "2026-06-20T14:00:00Z" },
  { id: "c-1-6", need_id: "need-1", user_id: "user-3", content: "A chai-samosa cart near Lohegaon bus stop would be packed from 5 PM every day. Proven business model, just missing authentic taste here.", created_at: "2026-06-21T08:30:00Z" },

  // Need 2 — Laundry (5 comments)
  { id: "c-2-1", need_id: "need-2", user_id: "user-1", content: "I literally sent laundry to my parents in Nagpur last month because nothing here works properly. A 24/7 service would change my life.", created_at: "2026-02-12T09:00:00Z" },
  { id: "c-2-2", need_id: "need-2", user_id: "user-2", content: "I'm looking into this seriously. Planning pickup routes for Viman Nagar, Lohegaon and Kharadi. Need about Rs 1.5 lakh in equipment to start. Any investors interested, reach out!", created_at: "2026-04-01T11:00:00Z" },
  { id: "c-2-3", need_id: "need-2", user_id: "user-4", content: "Important feature request: please add dry-cleaning for formal wear. Most services skip this entirely.", created_at: "2026-04-15T15:00:00Z" },
  { id: "c-2-4", need_id: "need-2", user_id: "user-5", content: "If you offer a monthly unlimited plan (say Rs 999 for up to 10 kg/month), I'll subscribe without hesitation.", created_at: "2026-05-10T10:00:00Z" },
  { id: "c-2-5", need_id: "need-2", user_id: "user-3", content: "Update from Priya: Equipment has been ordered. Expecting to soft-launch by August! Great news for everyone.", created_at: "2026-06-18T09:00:00Z" },

  // Need 3 — Coding bootcamp (4 comments)
  { id: "c-3-1", need_id: "need-3", user_id: "user-1", content: "My 10-year-old has been begging to learn game development. Every coding class I've tried just teaches Python syntax with no context. Something project-based would actually stick.", created_at: "2026-03-07T11:00:00Z" },
  { id: "c-3-2", need_id: "need-3", user_id: "user-5", content: "I'm a software engineer and would genuinely volunteer to co-teach this on Saturdays. Just need someone to handle the admin/business side. Let's connect.", created_at: "2026-03-15T16:00:00Z" },
  { id: "c-3-3", need_id: "need-3", user_id: "user-4", content: "Scratch, MIT App Inventor, then Python with Pygame — that's the curriculum structure that works for 8-14 age group. Happy to help design the syllabus.", created_at: "2026-04-02T10:00:00Z" },
  { id: "c-3-4", need_id: "need-3", user_id: "user-2", content: "67 parents have said yes. I know a space in Koregaon Park that's free on weekends. Someone needs to just START — even with 10 kids.", created_at: "2026-05-20T14:00:00Z" },

  // Need 4 — Dental (4 comments)
  { id: "c-4-1", need_id: "need-4", user_id: "user-5", content: "I've been putting off a root canal for 8 months because I cannot take a half-day for it. Evening clinic is not a luxury — it's a necessity for working people.", created_at: "2026-01-30T20:00:00Z" },
  { id: "c-4-2", need_id: "need-4", user_id: "user-3", content: "Any dentists reading this — the market is completely open. 143 people here who will definitely book. I'd pay a slightly higher fee for guaranteed evening slots.", created_at: "2026-02-14T18:30:00Z" },
  { id: "c-4-3", need_id: "need-4", user_id: "user-4", content: "Dental subscription model — Rs 1500/year covering 2 check-ups, cleaning and emergency consultations. Sustainable for both doctor and patient.", created_at: "2026-03-22T09:00:00Z" },
  { id: "c-4-4", need_id: "need-4", user_id: "user-2", content: "I've spoken to two dentists about this opportunity. One is interested in opening a satellite clinic here! Will update the community soon. Stay tuned!", created_at: "2026-06-22T11:00:00Z" },

  // Need 5 — E-scooter (6 comments)
  { id: "c-5-1", need_id: "need-5", user_id: "user-1", content: "The auto mafia near the airport entrance charges Rs 120 for a 1.5 km ride. It's robbery. An e-scooter hub right outside Gate 2 of EON would be used by hundreds of people daily.", created_at: "2025-12-12T08:00:00Z" },
  { id: "c-5-2", need_id: "need-5", user_id: "user-3", content: "I've been using Yulu in Pune city but it's not available in Lohegaon at all. We're clearly in the coverage gap. Any mobility startup reading this — come here!", created_at: "2026-01-05T07:30:00Z" },
  { id: "c-5-3", need_id: "need-5", user_id: "user-4", content: "Working on this! I have 15 e-scooters from a supplier. The main blocker is the parking permit from Pune Municipal. Application submitted — expected in 6-8 weeks.", created_at: "2026-04-10T11:00:00Z" },
  { id: "c-5-4", need_id: "need-5", user_id: "user-5", content: "Sneha, please prioritize the Lohegaon-Viman Nagar corridor. That 4 km stretch has the worst last-mile problem in the area.", created_at: "2026-05-01T09:00:00Z" },
  { id: "c-5-5", need_id: "need-5", user_id: "user-2", content: "211 supporters! This is the most supported need in the area. Sneha you're doing great — let us know if you need community volunteers for launch day.", created_at: "2026-06-10T14:00:00Z" },
  { id: "c-5-6", need_id: "need-5", user_id: "user-4", content: "Update: Fleet of 20 e-scooters arriving next week! Soft launch planned for July 15th from the Lohegaon Bus Stand point. Follow us for live updates!", created_at: "2026-06-25T08:00:00Z" },

  // Need 6 — Badminton (3 comments)
  { id: "c-6-1", need_id: "need-6", user_id: "user-1", content: "Driving to Kalyani Nagar every Sunday for courts is exhausting. Wagholi has the population to support a dedicated badminton facility easily.", created_at: "2026-04-03T15:00:00Z" },
  { id: "c-6-2", need_id: "need-6", user_id: "user-5", content: "78 supporters already and it's been live for just 2 days. Squash or table tennis courts alongside would make the business case even stronger.", created_at: "2026-04-04T10:00:00Z" },
  { id: "c-6-3", need_id: "need-6", user_id: "user-2", content: "A 6-court facility needs about Rs 40-60 lakh investment but breaks even in 18 months at 60% occupancy. The demand here clearly exceeds that threshold.", created_at: "2026-05-15T16:00:00Z" },

  // Need 7 — Farmers market (4 comments)
  { id: "c-7-1", need_id: "need-7", user_id: "user-1", content: "This actually happened!! Visited last Sunday — 22 farmers, incredible variety of millets, fresh vegetables, and the honey stall was sold out by 9 AM. So proud of this community!", created_at: "2026-05-05T11:00:00Z" },
  { id: "c-7-2", need_id: "need-7", user_id: "user-5", content: "The millet roti lady at stall 7 is running out every week. She needs to bring double the quantity!", created_at: "2026-05-12T09:30:00Z" },
  { id: "c-7-3", need_id: "need-7", user_id: "user-3", content: "Suggestion: add a composting counter where people drop kitchen waste and get a discount coupon. Circular economy vibes!", created_at: "2026-05-19T08:00:00Z" },
  { id: "c-7-4", need_id: "need-7", user_id: "user-4", content: "This is what community-driven business looks like. WishNearby made this happen. More platforms should take notes!", created_at: "2026-06-01T10:00:00Z" },

  // Need 8 — Cinema (3 comments)
  { id: "c-8-1", need_id: "need-8", user_id: "user-5", content: "I went to a screening like this in Bengaluru — an 8-seater room showing Satyajit Ray films. Completely sold out every week. Kalyani Nagar has exactly this audience.", created_at: "2026-05-17T19:00:00Z" },
  { id: "c-8-2", need_id: "need-8", user_id: "user-2", content: "Combine this with a post-screening discussion and serve good chai and snacks. That's the experience people will pay Rs 120 for over Netflix.", created_at: "2026-05-20T21:00:00Z" },
  { id: "c-8-3", need_id: "need-8", user_id: "user-3", content: "Partner with local filmmakers for premiere events. This builds the creative economy in Pune, not just entertainment.", created_at: "2026-06-01T18:00:00Z" },

  // Need 9 — Healthy tiffin (5 comments)
  { id: "c-9-1", need_id: "need-9", user_id: "user-3", content: "Type 2 diabetic here. I track every gram of carbs I eat. There is NOTHING in Wagholi I can safely order. Low GI meals delivered to my door would be life-changing.", created_at: "2026-02-22T07:00:00Z" },
  { id: "c-9-2", need_id: "need-9", user_id: "user-1", content: "For gym-goers: 40g protein per meal is the benchmark. Achievable with paneer/eggs/legumes. Please partner with a nutritionist to design the menu properly.", created_at: "2026-03-10T13:00:00Z" },
  { id: "c-9-3", need_id: "need-9", user_id: "user-2", content: "I'm in early planning stage. Looking at a central kitchen in Wagholi, delivery radius of 5 km. Menu will have 3 plans: Diabetic-friendly, High-Protein, and Balanced. First 50 subscribers get 30% off!", created_at: "2026-04-20T11:00:00Z" },
  { id: "c-9-4", need_id: "need-9", user_id: "user-5", content: "Please include a weekly menu rotation so it doesn't get boring. That's why most tiffin services fail — same dal-rice every day.", created_at: "2026-05-15T09:00:00Z" },
  { id: "c-9-5", need_id: "need-9", user_id: "user-4", content: "Tiffin trial happening next week! 10 test customers selected. Waitlist open soon on Instagram @healthytiffinwagholi!", created_at: "2026-06-24T08:00:00Z" },

  // Need 10 — Street lights (4 comments)
  { id: "c-10-1", need_id: "need-10", user_id: "user-1", content: "I've written to the municipal ward office twice. No response. This needs collective pressure. Can someone draft a petition we can all sign?", created_at: "2026-03-20T22:00:00Z" },
  { id: "c-10-2", need_id: "need-10", user_id: "user-3", content: "I can help draft the formal petition to the Pune Municipal Corporation. 200+ signatures with voter ID area mentioned and they are legally required to respond within 30 days.", created_at: "2026-03-21T08:00:00Z" },
  { id: "c-10-3", need_id: "need-10", user_id: "user-4", content: "Shared this on local WhatsApp groups. 50 more neighbors have seen it in 2 hours. The anger about this road is very real.", created_at: "2026-04-01T19:00:00Z" },
  { id: "c-10-4", need_id: "need-10", user_id: "user-5", content: "The Maharashtra government's 'My Government' portal creates a complaint ticket with a deadline. Let's use that alongside the petition.", created_at: "2026-04-05T11:00:00Z" },

  // Need 11 — Home cleaning (4 comments)
  { id: "c-11-1", need_id: "need-11", user_id: "user-1", content: "Urban Company in Kharadi is a disaster — booked 4 times, cancelled 3 times on the day. We need a local provider with actual accountability.", created_at: "2026-04-14T10:00:00Z" },
  { id: "c-11-2", need_id: "need-11", user_id: "user-3", content: "Background verification is the key differentiator. Even if it costs slightly more, people will pay for trust when someone enters their home.", created_at: "2026-04-16T14:00:00Z" },
  { id: "c-11-3", need_id: "need-11", user_id: "user-4", content: "Setting up the verification pipeline — police clearance + local reference check. First 30 cleaners onboarded by July. Soft launch in Kharadi first!", created_at: "2026-05-25T11:00:00Z" },
  { id: "c-11-4", need_id: "need-11", user_id: "user-2", content: "Add a 'same team every time' option — families hate explaining their home layout to a new person every week. Consistency is the premium product.", created_at: "2026-06-21T13:00:00Z" },

  // Need 12 — Mental health (5 comments)
  { id: "c-12-1", need_id: "need-12", user_id: "user-3", content: "Mental health support is not a luxury. The fact that it costs more than a day's salary for many people is a public health crisis.", created_at: "2026-04-30T10:00:00Z" },
  { id: "c-12-2", need_id: "need-12", user_id: "user-5", content: "Online sessions via video call would dramatically expand access. Many people find in-person first sessions very intimidating.", created_at: "2026-05-02T16:00:00Z" },
  { id: "c-12-3", need_id: "need-12", user_id: "user-1", content: "118 supporters in a month. That number tells a story about how much quiet suffering there is in this community. Any therapists reading this — we need you here.", created_at: "2026-05-28T09:00:00Z" },
  { id: "c-12-4", need_id: "need-12", user_id: "user-4", content: "Looking into partnering with psychology graduate students doing supervised hours — legally qualified and much lower cost. Win-win for both sides.", created_at: "2026-06-05T11:00:00Z" },
  { id: "c-12-5", need_id: "need-12", user_id: "user-2", content: "Some NIMHANS-affiliated NGOs provide free counselling in Pune. Will post the contact list soon for anyone who needs immediate help.", created_at: "2026-06-23T10:00:00Z" },

  // Need 13 — Spoken English (3 comments)
  { id: "c-13-1", need_id: "need-13", user_id: "user-3", content: "My colleague got passed over for a promotion despite better technical skills, purely because of presentation confidence. This is real. This matters.", created_at: "2026-05-05T18:00:00Z" },
  { id: "c-13-2", need_id: "need-13", user_id: "user-5", content: "Small batch is key — group classes of 30 people make it impossible to practice speaking. 12-15 max, with regular mock presentations.", created_at: "2026-05-10T11:00:00Z" },
  { id: "c-13-3", need_id: "need-13", user_id: "user-4", content: "I've run corporate communication training before. If someone organizes the venue, I'm open to piloting a 4-week batch at affordable rates. DM me.", created_at: "2026-06-17T12:00:00Z" },

  // Need 14 — Stationery store (3 comments)
  { id: "c-14-1", need_id: "need-14", user_id: "user-1", content: "Architecture student here. I travel 40 minutes each way to buy tracing paper and Staedtler markers. A store here would save me hours every week.", created_at: "2026-05-24T17:00:00Z" },
  { id: "c-14-2", need_id: "need-14", user_id: "user-3", content: "Also include Kindle-compatible pens, planners, and journaling supplies — there's a huge stationery enthusiast community that buys online because there's no local option.", created_at: "2026-05-25T14:00:00Z" },
  { id: "c-14-3", need_id: "need-14", user_id: "user-2", content: "Low capital to start — Rs 3-5 lakh for a 200 sq ft shop with good inventory. The closest competition is genuinely 15+ km away. Margin on stationery is excellent.", created_at: "2026-06-18T16:00:00Z" },

  // Need 15 — Co-working creche (4 comments)
  { id: "c-15-1", need_id: "need-15", user_id: "user-1", content: "As a single parent with a 3-year-old, I would cry with gratitude if this existed. Right now my options are: expensive crèche far away, or no career. This fills a massive gap.", created_at: "2026-06-01T11:00:00Z" },
  { id: "c-15-2", need_id: "need-15", user_id: "user-3", content: "Both parents working remotely — we've been looking for exactly this for 8 months. Every co-working space either bans kids or has zero supervision.", created_at: "2026-06-03T14:00:00Z" },
  { id: "c-15-3", need_id: "need-15", user_id: "user-5", content: "The crèche needs to be Montessori-inspired — not a babysitting jail. Kids learn, parents work, everyone wins. Koregaon Park demographic will absolutely pay for this.", created_at: "2026-06-15T10:00:00Z" },
  { id: "c-15-4", need_id: "need-15", user_id: "user-2", content: "87 supporters in under a month! Doing a feasibility study for this. Koregaon Park has two spaces that could work. Anyone with early childcare certification — let's talk.", created_at: "2026-06-25T09:00:00Z" },
];

// ─────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "notif-1", user_id: "user-1", type: "support", title: "New supporters!", message: "12 more people supported your samosa need today", need_id: "need-1", read: false, created_at: "2026-06-27T08:00:00Z" },
  { id: "notif-2", user_id: "user-1", type: "comment", title: "New comment on your need", message: "Priya Patel commented on your samosa need", need_id: "need-1", read: false, created_at: "2026-06-26T16:00:00Z" },
  { id: "notif-3", user_id: "user-1", type: "business_open", title: "Business opened nearby!", message: "Organic farmers market is now fully operational in Kharadi", need_id: "need-7", read: true, created_at: "2026-05-01T10:00:00Z" },
  { id: "notif-4", user_id: "user-1", type: "weekly_update", title: "Weekly community update", message: "7 new needs in Lohegaon this week. 2 businesses in progress!", read: true, created_at: "2026-06-23T09:00:00Z" },
  { id: "notif-5", user_id: "user-1", type: "business_claim", title: "Entrepreneur claimed your need!", message: "Someone is working on bringing a dental clinic to Lohegaon", need_id: "need-4", read: false, created_at: "2026-06-22T11:00:00Z" },
];

// ─────────────────────────────────────────────
// BUSINESS CLAIMS
// ─────────────────────────────────────────────
export const MOCK_BUSINESS_CLAIMS: BusinessClaim[] = [
  { id: "claim-1", need_id: "need-2", entrepreneur_id: "user-2", stage: 2, estimated_investment: 150000, notes: "Setting up pickup routes and hiring 3 delivery staff. Equipment ordered from Pune Industrial Estate.", created_at: "2026-04-01T10:00:00Z", updated_at: "2026-06-18T09:00:00Z" },
  { id: "claim-2", need_id: "need-5", entrepreneur_id: "user-4", stage: 3, estimated_investment: 500000, notes: "Fleet of 20 e-scooters arriving. Municipal parking permit approved. Charging stations installed at 3 hubs.", created_at: "2026-03-15T10:00:00Z", updated_at: "2026-06-25T08:00:00Z" },
  { id: "claim-3", need_id: "need-9", entrepreneur_id: "user-2", stage: 1, estimated_investment: 80000, notes: "Menu design with certified nutritionist complete. Trial batch of 10 customers running this week.", created_at: "2026-05-01T10:00:00Z", updated_at: "2026-06-24T08:00:00Z" },
  { id: "claim-4", need_id: "need-11", entrepreneur_id: "user-4", stage: 2, estimated_investment: 200000, notes: "30 background-verified cleaners onboarded. App in final testing. Kharadi soft-launch planned for July.", created_at: "2026-05-20T10:00:00Z", updated_at: "2026-06-21T13:00:00Z" },
  { id: "claim-5", need_id: "need-7", entrepreneur_id: "user-2", stage: 4, estimated_investment: 120000, notes: "Market fully operational every Sunday, 7 AM to 12 PM. 22+ farmers onboarded. 400+ weekly shoppers.", created_at: "2025-12-01T10:00:00Z", updated_at: "2026-05-01T10:00:00Z" },
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
