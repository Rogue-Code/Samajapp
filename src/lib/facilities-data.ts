import { Share } from "@capacitor/share";
import type { Database } from "@/integrations/supabase/types";
import type { Lang, TFunction } from "@/lib/i18n";
import type { StringKey } from "@/lib/translations";
import { pickLang } from "@/lib/format";

export type Facility = Database["public"]["Tables"]["facilities"]["Row"];

export type FacilityCategory =
  | "School"
  | "College"
  | "Hostel"
  | "Hospital"
  | "Bank"
  | "Community Hall"
  | "Dharamshala"
  | "Trust"
  | "Coaching Center"
  | "Business Center";

/** Categories an admin can assign. "All Categories" is the directory-wide default. */
export const categories: (FacilityCategory | "All Categories")[] = [
  "All Categories",
  "School",
  "College",
  "Hostel",
  "Hospital",
  "Bank",
  "Community Hall",
  "Dharamshala",
  "Trust",
  "Coaching Center",
  "Business Center",
];

/** Presentation only — the icon and gradient a facility gets from its category. */
const CATEGORY_STYLE: Record<string, { emoji: string; bg: string }> = {
  School: { emoji: "🏫", bg: "from-primary via-accent-saffron to-warning" },
  College: { emoji: "🎓", bg: "from-primary to-success" },
  Hostel: { emoji: "🏨", bg: "from-success via-primary to-accent-saffron" },
  Hospital: { emoji: "🏥", bg: "from-destructive via-accent-saffron to-warning" },
  Bank: { emoji: "🏦", bg: "from-success to-primary" },
  "Community Hall": { emoji: "🏛️", bg: "from-warning via-accent-saffron to-destructive" },
  Dharamshala: { emoji: "🛕", bg: "from-accent-saffron to-destructive" },
  Trust: { emoji: "🤝", bg: "from-warning to-accent-saffron" },
  "Coaching Center": { emoji: "📚", bg: "from-primary to-success" },
  "Business Center": { emoji: "🏢", bg: "from-primary to-accent-saffron" },
};

const FALLBACK_STYLE = { emoji: "📍", bg: "from-primary to-accent-saffron" };

export function categoryStyle(category: string) {
  return CATEGORY_STYLE[category] ?? FALLBACK_STYLE;
}

/** Display label per category. The value stored on the row stays English. */
const CATEGORY_KEY: Record<string, StringKey> = {
  School: "facilityCat.School",
  College: "facilityCat.College",
  Hostel: "facilityCat.Hostel",
  Hospital: "facilityCat.Hospital",
  Bank: "facilityCat.Bank",
  "Community Hall": "facilityCat.CommunityHall",
  Dharamshala: "facilityCat.Dharamshala",
  Trust: "facilityCat.Trust",
  "Coaching Center": "facilityCat.CoachingCenter",
  "Business Center": "facilityCat.BusinessCenter",
  "All Categories": "facilityCat.AllCategories",
};

/** A category outside the list is shown exactly as it was stored. */
export function categoryLabel(category: string, t: TFunction) {
  const key = CATEGORY_KEY[category];
  return key ? t(key) : category;
}

/**
 * "shared" — the native OS share sheet opened; that is its own confirmation,
 * whether the member picked an app or dismissed it. "copied" — no share sheet
 * was available, so the details went to the clipboard instead and the caller
 * should say so, since a clipboard write is otherwise invisible.
 */
export type ShareOutcome = "shared" | "copied" | "failed";

/**
 * Open the native share sheet, falling back to the clipboard.
 *
 * The Web Share API (`navigator.share`) is absent in this app's Android
 * WebView, so the real "share anywhere" chooser comes from Capacitor's Share
 * plugin, which bridges to an Android ACTION_SEND intent. The clipboard path
 * is the fallback for anywhere that has neither (a plain desktop browser).
 *
 * Shared by the directory list and the facility detail page rather than each
 * carrying its own copy.
 */
export async function shareFacility(f: Facility, lang: Lang): Promise<ShareOutcome> {
  const name = pickLang(f.name, f.name_gu, lang);
  const text = `${name}\n${f.address}${f.phone ? `\n${f.phone}` : ""}`;

  let canNativeShare = false;
  try {
    canNativeShare = (await Share.canShare()).value;
  } catch {
    canNativeShare = false;
  }

  if (canNativeShare) {
    try {
      await Share.share({ title: name, text, dialogTitle: name });
    } catch {
      // The sheet opened and the member dismissed it — a complete interaction.
      // Don't also copy to the clipboard behind their back.
    }
    return "shared";
  }

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      // Clipboard blocked; nothing useful left to try.
    }
  }
  return "failed";
}
