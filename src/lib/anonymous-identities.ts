// Utility for generating anonymous identities and premium SVG avatars

export type GenderType = "male" | "female" | "neutral" | "other";
export type UniverseType = "fantasy" | "magic" | "sci-fi" | "mythology" | "adventure";
export type AvatarStyle = "male" | "female" | "neutral" | "cute" | "minimal" | "3d" | "illustrated";

export interface AnonymousIdentity {
  name: string;
  username: string;
  universe: UniverseType;
  badgeColor: string;
  badgeBg: string;
  avatarSvg: string;
}

const ADJECTIVES: Record<UniverseType, string[]> = {
  fantasy: ["Silver", "Golden", "Emerald", "Obsidian", "Frost", "Elven", "Shadow", "Runic", "Mystic", "Ironwood"],
  magic: ["Arcane", "Astral", "Lunar", "Solar", "Crimson", "Ethereal", "Hallowed", "Cosmic", "Spellbound", "Enchanted"],
  "sci-fi": ["Cyber", "Nova", "Quantum", "Stellar", "Vector", "Helix", "Matrix", "Chrono", "Aero", "Pulse"],
  mythology: ["Azure", "Solar", "Thunder", "Valiant", "Aeon", "Olimpian", "Abyssal", "Titan", "Ragnarok", "Apex"],
  adventure: ["Storm", "Wild", "Canyon", "Alpine", "Ocean", "Summit", "Forest", "Trail", "Ridge", "Drift"],
};

const NOUNS: Record<UniverseType, string[]> = {
  fantasy: ["Wolf", "Stag", "Griffin", "Dragon", "Elf", "Knight", "Drake", "Sentinel", "Faun", "Dryad"],
  magic: ["Wizard", "Sage", "Sorcerer", "Mage", "Owl", "Warlock", "Oracle", "Seer", "Alchemist", "Acolyte"],
  "sci-fi": ["Raven", "Ranger", "Pilot", "Phantom", "Hawk", "Cyborg", "Specter", "Android", "Nexus", "Sentinel"],
  mythology: ["Phoenix", "Pegasus", "Titan", "Valkyrie", "Leviathan", "Drake", "Centaur", "Gorgon", "Chimera", "Wyvern"],
  adventure: ["Rider", "Tracker", "Ranger", "Sherpa", "Nomad", "Scout", "Pathfinder", "Wanderer", "Explorer", "Pioneer"],
};

const THEMES: Record<UniverseType, { color: string; bg: string; gradient: [string, string] }> = {
  fantasy: { color: "#D4AF37", bg: "rgba(212, 175, 55, 0.15)", gradient: ["#6D28D9", "#4C1D95"] }, // Purple & Gold
  magic: { color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.15)", gradient: ["#1E3A8A", "#8B5CF6"] }, // Deep Blue & Violet
  "sci-fi": { color: "#06B6D4", bg: "rgba(6, 182, 212, 0.15)", gradient: ["#0F172A", "#06B6D4"] }, // Navy & Cyan
  mythology: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)", gradient: ["#EF4444", "#F59E0B"] }, // Red & Amber
  adventure: { color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", gradient: ["#065F46", "#10B981"] }, // Emerald & Green
};

// Generates standard avatar SVG based on style
export function getStandardAvatar(style: AvatarStyle, seed: string): string {
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color1 = `hsl(${hash % 360}, 65%, 45%)`;
  const color2 = `hsl(${(hash + 120) % 360}, 75%, 35%)`;
  
  switch (style) {
    case "male":
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="url(#male-grad-${hash})" />
          <path d="M50 25 C40 25 35 32 35 42 C35 52 42 55 50 55 C58 55 65 52 65 42 C65 32 60 25 50 25 Z" fill="#FCE7F3" />
          <path d="M50 20 C42 20 33 24 33 34 C35 32 40 30 50 30 C60 30 65 32 67 34 C67 24 58 20 50 20 Z" fill="#1E293B" />
          <path d="M25 85 C25 70 35 62 50 62 C65 62 75 70 75 85 Z" fill="#1E3A8A" />
          <defs>
            <linearGradient id="male-grad-${hash}" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stop-color="${color1}" />
              <stop offset="100%" stop-color="${color2}" />
            </linearGradient>
          </defs>
        </svg>
      `;
    case "female":
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="url(#fem-grad-${hash})" />
          <path d="M50 25 C42 25 37 32 37 42 C37 52 43 55 50 55 C57 55 63 52 63 42 C63 32 58 25 50 25 Z" fill="#FEE2E2" />
          <path d="M50 18 C35 18 32 28 32 40 C32 50 35 55 35 55 C38 42 42 38 50 38 C58 38 62 42 65 55 C65 55 68 50 68 40 C68 28 65 18 50 18 Z" fill="#475569" />
          <path d="M28 85 C28 72 38 63 50 63 C62 63 72 72 72 85 Z" fill="#EF4444" />
          <defs>
            <linearGradient id="fem-grad-${hash}" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stop-color="${color2}" />
              <stop offset="100%" stop-color="${color1}" />
            </linearGradient>
          </defs>
        </svg>
      `;
    case "cute":
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="url(#cute-grad-${hash})" />
          <circle cx="50" cy="45" r="18" fill="#FFEDD5" />
          <!-- Cute Rosy Cheeks -->
          <circle cx="39" cy="48" r="3" fill="#F87171" opacity="0.6" />
          <circle cx="61" cy="48" r="3" fill="#F87171" opacity="0.6" />
          <!-- Big Eyes -->
          <circle cx="42" cy="42" r="2.5" fill="#1E293B" />
          <circle cx="58" cy="42" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="41" r="0.8" fill="#FFFFFF" />
          <circle cx="59" cy="41" r="0.8" fill="#FFFFFF" />
          <!-- Smile -->
          <path d="M47 48 Q50 51 53 48" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" fill="none" />
          <!-- Animal Hood -->
          <path d="M50 24 C36 24 30 32 30 45 C30 50 32 55 35 58 C38 48 42 46 50 46 C58 46 62 48 65 58 C68 55 70 50 70 45 C70 32 64 24 50 24 Z" fill="#4F46E5" opacity="0.15" />
          <path d="M26 85 C26 71 36 62 50 62 C64 62 74 71 74 85 Z" fill="#6366F1" />
          <defs>
            <linearGradient id="cute-grad-${hash}" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stop-color="#F472B6" />
              <stop offset="100%" stop-color="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      `;
    case "minimal":
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#0F172A" />
          <circle cx="50" cy="50" r="24" stroke="#FFFFFF" stroke-width="2" />
          <circle cx="50" cy="50" r="12" fill="#FFFFFF" />
          <path d="M30 78 C35 68 42 64 50 64 C58 64 65 68 70 78" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;
    case "3d":
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="url(#bg-3d-${hash})" />
          <circle cx="50" cy="50" r="28" fill="url(#sphere-3d-${hash})" filter="url(#shadow-3d)" />
          <circle cx="40" cy="40" r="6" fill="#FFFFFF" opacity="0.15" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.3" stroke-dasharray="4 8" />
          <defs>
            <filter id="shadow-3d" x="10%" y="10%" width="150%" height="150%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
            </filter>
            <linearGradient id="bg-3d-${hash}" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stop-color="#0F172A" />
              <stop offset="100%" stop-color="#1E3A8A" />
            </linearGradient>
            <radialGradient id="sphere-3d-${hash}" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FB7185" />
              <stop offset="60%" stop-color="#E11D48" />
              <stop offset="100%" stop-color="#881337" />
            </radialGradient>
          </defs>
        </svg>
      `;
    case "illustrated":
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#FAF9F6" stroke="#E2E8F0" stroke-width="2" />
          <path d="M50 15 Q30 20 40 45 T50 75 Q60 50 60 45 T50 15 Z" fill="#F59E0B" opacity="0.8" />
          <circle cx="50" cy="40" r="12" fill="#3B82F6" opacity="0.7" />
          <polygon points="50,60 30,85 70,85" fill="#10B981" opacity="0.7" />
        </svg>
      `;
    case "neutral":
    default:
      return `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="url(#neut-grad-${hash})" />
          <circle cx="50" cy="40" r="15" fill="#FFFFFF" opacity="0.85" />
          <path d="M26 80 C26 66 36 58 50 58 C64 58 74 66 74 80 Z" fill="#FFFFFF" opacity="0.85" />
          <defs>
            <linearGradient id="neut-grad-${hash}" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stop-color="#475569" />
              <stop offset="100%" stop-color="#0F172A" />
            </linearGradient>
          </defs>
        </svg>
      `;
  }
}

// Generates anonymous avatar SVG based on universe
export function getAnonymousAvatar(universe: UniverseType, seed: string): string {
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const theme = THEMES[universe];
  
  // Custom graphics based on universe
  let pathGraphic = "";
  if (universe === "fantasy") {
    // Elegant crescent / shield
    pathGraphic = `<path d="M50 25 C36 25 32 34 32 46 C32 60 42 75 50 78 C58 75 68 60 68 46 C68 34 64 25 50 25 Z" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linecap="round" />
                   <circle cx="50" cy="48" r="6" fill="#D4AF37" />`;
  } else if (universe === "magic") {
    // Mystic star/spark
    pathGraphic = `<path d="M50 22 L54 38 L70 42 L54 46 L50 62 L46 46 L30 42 L46 38 Z" fill="#8B5CF6" />
                   <circle cx="50" cy="42" r="3" fill="#FFFFFF" />`;
  } else if (universe === "sci-fi") {
    // Planetary ring/orbit
    pathGraphic = `<circle cx="50" cy="45" r="12" fill="#06B6D4" />
                   <ellipse cx="50" cy="45" rx="22" ry="5" stroke="#FFFFFF" stroke-width="2.5" fill="none" transform="rotate(-15 50 45)" />`;
  } else if (universe === "mythology") {
    // Winged crest / sunburst
    pathGraphic = `<circle cx="50" cy="45" r="14" fill="#F59E0B" />
                   <path d="M30 45 C35 32 45 42 50 45 C55 42 65 32 70 45 C65 52 55 46 50 45 C45 46 35 52 30 45 Z" fill="#EF4444" opacity="0.9" />`;
  } else {
    // Adventure compass/mountain
    pathGraphic = `<path d="M50 25 L70 65 L50 55 L30 65 Z" fill="#10B981" stroke="#FFFFFF" stroke-width="2" />
                   <circle cx="50" cy="47" r="4" fill="#D4AF37" />`;
  }

  return `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="url(#anon-grad-${hash})" />
      <circle cx="50" cy="45" r="32" stroke="white" stroke-width="1" stroke-dasharray="3 6" opacity="0.3" />
      ${pathGraphic}
      <defs>
        <linearGradient id="anon-grad-${hash}" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stop-color="${theme.gradient[0]}" />
          <stop offset="100%" stop-color="${theme.gradient[1]}" />
        </linearGradient>
      </defs>
    </svg>
  `;
}

// Generates a fully qualified anonymous identity
export function generateAnonymousIdentity(universe: UniverseType, gender: GenderType): AnonymousIdentity {
  const adjs = ADJECTIVES[universe];
  const nouns = NOUNS[universe];
  
  const adjIdx = Math.floor(Math.random() * adjs.length);
  const nounIdx = Math.floor(Math.random() * nouns.length);
  
  const name = `${adjs[adjIdx]} ${nouns[nounIdx]}`;
  const username = name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(100 + Math.random() * 900);
  const theme = THEMES[universe];
  const avatarSvg = getAnonymousAvatar(universe, name);

  return {
    name,
    username,
    universe,
    badgeColor: theme.color,
    badgeBg: theme.bg,
    avatarSvg,
  };
}
