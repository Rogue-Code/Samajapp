import { localeFor, type Lang, type TFunction } from "@/lib/i18n";

/** "2 hours ago" style stamp; falls back to a date once it is over a week old. */
export function relativeTime(iso: string, t: TFunction, lang: Lang) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return t("time.justNow");
  if (mins < 60) return t(mins === 1 ? "time.minAgoOne" : "time.minAgo", { count: mins });
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t(hours === 1 ? "time.hourAgoOne" : "time.hourAgo", { count: hours });
  const days = Math.floor(hours / 24);
  if (days === 1) return t("time.yesterday");
  if (days < 7) return t("time.daysAgo", { count: days });
  return new Date(iso).toLocaleDateString(localeFor(lang), {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Short weekday + day + month, for event cards. */
export function formatEventDate(iso: string, lang: Lang) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(localeFor(lang), {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
