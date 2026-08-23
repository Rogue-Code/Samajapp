import type { Database } from "@/integrations/supabase/types";

export type Facility = Database["public"]["Tables"]["facilities"]["Row"];

export type FacilityCategory =
  | "School" | "College" | "Hostel" | "Hospital" | "Bank"
  | "Community Hall" | "Dharamshala" | "Trust" | "Coaching Center" | "Business Center";

export const states = ["All States", "Gujarat", "Maharashtra", "Rajasthan", "Delhi"];

export const categories: (FacilityCategory | "All Categories")[] = [
  "All Categories", "School", "College", "Hostel", "Hospital", "Bank",
  "Community Hall", "Dharamshala", "Trust", "Coaching Center", "Business Center",
];

export const cities = ["All Cities", "Ahmedabad", "Surat", "Anand", "Vadodara", "Rajkot", "Dwarka", "Mumbai"];

/** Presentation only — the icon and gradient a facility gets from its category. */
const CATEGORY_STYLE: Record<string, { emoji: string; bg: string }> = {
  "School": { emoji: "🏫", bg: "from-primary via-accent-saffron to-warning" },
  "College": { emoji: "🎓", bg: "from-primary to-success" },
  "Hostel": { emoji: "🏨", bg: "from-success via-primary to-accent-saffron" },
  "Hospital": { emoji: "🏥", bg: "from-destructive via-accent-saffron to-warning" },
  "Bank": { emoji: "🏦", bg: "from-success to-primary" },
  "Community Hall": { emoji: "🏛️", bg: "from-warning via-accent-saffron to-destructive" },
  "Dharamshala": { emoji: "🛕", bg: "from-accent-saffron to-destructive" },
  "Trust": { emoji: "🤝", bg: "from-warning to-accent-saffron" },
  "Coaching Center": { emoji: "📚", bg: "from-primary to-success" },
  "Business Center": { emoji: "🏢", bg: "from-primary to-accent-saffron" },
};

const FALLBACK_STYLE = { emoji: "📍", bg: "from-primary to-accent-saffron" };

export function categoryStyle(category: string) {
  return CATEGORY_STYLE[category] ?? FALLBACK_STYLE;
}
