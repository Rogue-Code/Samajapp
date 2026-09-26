import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { Avatar } from "@/components/Avatar";
import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Home as HomeIcon,
  Building,
  HandHeart,
  User,
  Calendar,
  MapPin,
  ChevronRight,
  ArrowRight,
  ChevronLeft,
  Check,
  X,
  Loader2,
  Phone,
  Briefcase,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, type TFunction } from "@/lib/i18n";
import { formatEventDate, pickLang, relativeTime } from "@/lib/format";
import { getCachedProfile, setCachedProfile } from "@/lib/cached-profile";

export const Route = createLazyFileRoute("/home")({
  component: HomePage,
});

type EventRow = {
  id: string;
  title: string;
  title_gu: string | null;
  starts_at: string;
  location: string | null;
  emoji: string;
};

type Sponsor = {
  id: string;
  name: string;
  description: string | null;
  emoji: string;
  /** Square (1:1) artwork. Falls back to the emoji when a sponsor has no photo. */
  image_url: string | null;
  link_url: string | null;
  facility_id: string | null;
};

type MemberResult = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  village: string | null;
  city: string | null;
  occupation: string | null;
  mobile: string | null;
  birth_year: number | null;
  role: string;
};

type NewsRow = {
  id: string;
  title: string;
  title_gu: string | null;
  content: string;
  content_gu: string | null;
  category: string;
  created_at: string;
};

/** Rotating gradients so consecutive cards stay visually distinct. */
const CARD_GRADIENTS = [
  "from-primary via-accent-saffron to-warning",
  "from-success via-primary to-accent-saffron",
  "from-warning via-accent-saffron to-destructive",
  "from-destructive via-accent-saffron to-warning",
  "from-primary to-success",
];

function gradientFor(index: number) {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length];
}

/** How long each sponsor stays on screen before the carousel advances. */
const AD_ROTATE_MS = 5000;

function greeting(t: TFunction) {
  const hour = new Date().getHours();
  if (hour < 12) return t("home.morning");
  if (hour < 17) return t("home.afternoon");
  return t("home.evening");
}

function HomePage() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { checking, session } = useRequireAuth();
  const { isAdmin } = useProfileRole(session);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<MemberResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [tab, setTab] = useState("home");
  const [adIndex, setAdIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  const [sponsored, setSponsored] = useState<Sponsor[]>([]);
  const [news, setNews] = useState<NewsRow[]>([]);

  const load = useCallback(async () => {
    if (!session) return;
    const nowIso = new Date().toISOString();
    const [profile, eventList, rsvpList, sponsorList, newsList] = await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", session.user.id)
        .maybeSingle(),
      supabase
        .from("events")
        .select("id, title, title_gu, starts_at, location, emoji")
        .gte("starts_at", nowIso)
        .order("starts_at", { ascending: true })
        .limit(10),
      supabase.from("event_rsvps").select("event_id").eq("user_id", session.user.id),
      supabase
        .from("sponsors")
        .select("id, name, description, emoji, image_url, link_url, facility_id")
        .order("sort_order", { ascending: true }),
      supabase
        .from("posts")
        .select("id, title, title_gu, content, content_gu, category, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
    ]);
    if (profile.data) {
      setFullName(profile.data.full_name ?? null);
      setAvatarUrl(profile.data.avatar_url ?? null);
      setCachedProfile(session.user.id, profile.data);
    } else {
      // profile.data is only ever empty here because the fetch itself failed
      // (offline) — a genuinely missing row would already have been caught
      // by useRequireAuth's own check before this page rendered at all. Fall
      // back to what this same member's name/avatar looked like last time,
      // rather than the generic "there" / "?" placeholder, which reads like
      // a different, anonymous account rather than their own with no signal.
      const cached = getCachedProfile(session.user.id);
      setFullName(cached?.full_name ?? null);
      setAvatarUrl(cached?.avatar_url ?? null);
    }
    setEvents(eventList.data ?? []);
    setRsvps(new Set((rsvpList.data ?? []).map((r) => r.event_id)));
    setSponsored(sponsorList.data ?? []);
    setNews(newsList.data ?? []);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    void load();
  }, [load]);

  const nextAd = useCallback(
    () => setAdIndex((i) => (sponsored.length ? (i + 1) % sponsored.length : 0)),
    [sponsored.length],
  );
  const prevAd = useCallback(
    () => setAdIndex((i) => (sponsored.length ? (i - 1 + sponsored.length) % sponsored.length : 0)),
    [sponsored.length],
  );

  useEffect(() => {
    if (sponsored.length < 2) return;
    const timer = setInterval(nextAd, AD_ROTATE_MS);
    return () => clearInterval(timer);
  }, [nextAd, sponsored.length]);

  // Debounced so typing does not fire a request per keystroke.
  useEffect(() => {
    const q = term.trim();
    if (q.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const handle = setTimeout(async () => {
      const { data } = await supabase.rpc("search_members", { term: q });
      setResults((data ?? []) as MemberResult[]);
      setSearching(false);
    }, 300);
    return () => clearTimeout(handle);
  }, [term]);

  const toggleRsvp = async (eventId: string) => {
    if (!session) return;
    const had = rsvps.has(eventId);
    setRsvps((prev) => {
      const next = new Set(prev);
      if (had) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
    const { error } = had
      ? await supabase
          .from("event_rsvps")
          .delete()
          .eq("user_id", session.user.id)
          .eq("event_id", eventId)
      : await supabase.from("event_rsvps").insert({ user_id: session.user.id, event_id: eventId });
    if (error) {
      setRsvps((prev) => {
        const next = new Set(prev);
        if (had) next.add(eventId);
        else next.delete(eventId);
        return next;
      });
    }
  };

  if (checking || loading) return <LoadingScreen />;

  const ad = sponsored[adIndex];
  const displayName = fullName?.trim() || t("home.friend");
  const initial = (fullName?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px] bg-background">
        {/* Sticky header with search */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3 mb-3">
              <Logo className="w-10 h-10" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{greeting(t)} 👋</div>
                <div className="font-semibold text-foreground truncate">{displayName}</div>
              </div>
              <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white font-bold shadow-card ring-2 ring-background shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  initial
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-2xl shadow-soft">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={t("home.searchPlaceholder")}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
              {term && (
                <button
                  onClick={() => setTerm("")}
                  className="text-muted-foreground"
                  aria-label={t("common.clearSearch")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search results take over the body while a query is active */}
        {term.trim().length >= 2 ? (
          <div
            className="flex-1 overflow-y-auto pb-24 px-5 pt-4"
            style={{ scrollbarWidth: "none" }}
          >
            {searching && (
              <div className="flex justify-center py-10">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {!searching && results.length === 0 && (
              <div className="text-center py-16 px-6">
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-semibold text-foreground">{t("home.noMembers")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("home.noMembersHint")}</p>
              </div>
            )}
            {!searching && results.length > 0 && (
              <div className="space-y-2.5">
                <p className="text-[11px] text-muted-foreground px-1">
                  {t(results.length === 1 ? "common.memberCountOne" : "common.memberCount", {
                    count: results.length,
                  })}
                </p>
                {results.map((m) => {
                  const place = [m.village, m.city].filter(Boolean).join(", ");
                  return (
                    <button
                      key={m.id}
                      onClick={() => navigate({ to: "/members/$id", params: { id: m.id } })}
                      className="w-full text-left rounded-2xl bg-card border border-border shadow-soft p-3.5 flex items-center gap-3 active:scale-[0.99] transition"
                    >
                      <Avatar url={m.avatar_url} name={m.full_name} className="w-11 h-11" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {m.full_name}
                        </div>
                        {place && (
                          <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3 shrink-0" /> {place}
                          </div>
                        )}
                        {m.occupation && (
                          <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                            <Briefcase className="w-3 h-3 shrink-0" /> {m.occupation}
                          </div>
                        )}
                      </div>
                      {m.mobile && <Phone className="w-4 h-4 text-success shrink-0" />}
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Scrollable body */
          <div className="flex-1 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
            {/* Upcoming Events */}
            {events.length === 0 && isAdmin && (
              <section className="pt-5">
                <SectionHeader title={t("home.upcomingEvents")} />
                <div className="px-5 pt-3">
                  <button
                    onClick={() => navigate({ to: "/admin" })}
                    className="w-full rounded-3xl border-2 border-dashed border-border py-10 px-6 text-center active:scale-[0.99] transition"
                  >
                    <div className="text-3xl mb-2">📅</div>
                    <p className="text-sm font-semibold text-foreground">{t("home.noEvents")}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {t("home.noEventsHint")}
                    </p>
                  </button>
                </div>
              </section>
            )}

            {events.length > 0 && (
              <section className="pt-5">
                <SectionHeader title={t("home.upcomingEvents")} />
                <div
                  className="flex gap-3 overflow-x-auto px-5 pb-2 pt-3 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none" }}
                >
                  {events.map((e, i) => {
                    const going = rsvps.has(e.id);
                    return (
                      <article
                        key={e.id}
                        className="snap-start shrink-0 w-[260px] rounded-2xl bg-card border border-border shadow-card overflow-hidden"
                      >
                        <div
                          className={`h-28 bg-gradient-to-br ${gradientFor(i)} relative flex items-center justify-center`}
                        >
                          <span className="text-5xl opacity-90">{e.emoji}</span>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">
                            {pickLang(e.title, e.title_gu, lang)}
                          </h3>
                          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Calendar className="w-3 h-3" /> {formatEventDate(e.starts_at, lang)}
                          </div>
                          {e.location && (
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin className="w-3 h-3" />{" "}
                              <span className="truncate">{e.location}</span>
                            </div>
                          )}
                          <button
                            onClick={() => void toggleRsvp(e.id)}
                            className={`mt-2.5 w-full h-10 rounded-xl text-xs font-semibold active:scale-[0.98] transition flex items-center justify-center gap-1.5 ${
                              going
                                ? "bg-success-soft text-success"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {going ? (
                              <>
                                <Check className="w-3.5 h-3.5" strokeWidth={3} /> {t("home.going")}
                              </>
                            ) : (
                              t("home.register")
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Sponsored Banner Carousel */}
            {!ad && isAdmin && (
              <section className="pt-6">
                <SectionHeader title={t("home.sponsored")} />
                <div className="px-5 pt-3">
                  <button
                    onClick={() => navigate({ to: "/admin" })}
                    className="w-full rounded-3xl border-2 border-dashed border-border py-10 px-6 text-center active:scale-[0.99] transition"
                  >
                    <div className="text-3xl mb-2">📣</div>
                    <p className="text-sm font-semibold text-foreground">{t("home.noSponsors")}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {t("home.noSponsorsHint")}
                    </p>
                  </button>
                </div>
              </section>
            )}

            {ad && (
              <section className="pt-6">
                <SectionHeader title={t("home.sponsored")} />
                <div className="px-5 pt-3">
                  {/*
                    Nothing overlays the artwork. Sponsors supply finished designs
                    with their own logo and text, and anything floated on top lands
                    on it — the "Sponsored" chip sat squarely over the logo. The
                    section heading above already carries that disclosure, and the
                    controls live under the image instead.
                  */}
                  <article
                    onClick={() => openSponsor(ad, navigate)}
                    className="relative rounded-3xl overflow-hidden shadow-card border border-border bg-card cursor-pointer active:scale-[0.99] transition"
                  >
                    <div
                      className={`relative aspect-square w-full bg-gradient-to-br ${gradientFor(adIndex)} flex items-center justify-center`}
                    >
                      {ad.image_url ? (
                        <img
                          src={ad.image_url}
                          alt={ad.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-8xl opacity-90 drop-shadow-lg">{ad.emoji}</span>
                      )}
                    </div>
                  </article>
                  {sponsored.length > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <button
                        onClick={prevAd}
                        aria-label={t("home.prevSlide")}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
                      >
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                      </button>
                      <div className="flex items-center gap-1.5">
                        {sponsored.map((s, i) => (
                          <button
                            key={s.id}
                            onClick={() => setAdIndex(i)}
                            aria-label={t("home.goToSlide", { n: i + 1 })}
                            className="h-9 flex items-center px-0.5"
                          >
                            <span
                              className={`block h-1.5 rounded-full transition-all ${i === adIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={nextAd}
                        aria-label={t("home.nextSlide")}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
                      >
                        <ChevronRight className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Latest News */}
            <section className="pt-6">
              <SectionHeader
                title={t("home.latestNews")}
                viewAllLabel={t("home.viewAll")}
                onViewAll={() => navigate({ to: "/news" })}
              />
              <div className="px-5 pt-3 space-y-3">
                {news.length === 0 && (
                  <div className="text-center py-10 px-6 rounded-2xl border-2 border-dashed border-border">
                    <div className="text-3xl mb-2">📰</div>
                    <p className="text-sm font-semibold text-foreground">{t("home.noNews")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("home.noNewsHint")}</p>
                  </div>
                )}
                {news.map((n, i) => (
                  <article
                    key={n.id}
                    onClick={() => navigate({ to: "/news" })}
                    className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex cursor-pointer active:scale-[0.99] transition"
                  >
                    <div
                      className={`w-24 shrink-0 bg-gradient-to-br ${gradientFor(i)} flex items-center justify-center`}
                    >
                      <span className="text-4xl opacity-90">📣</span>
                    </div>
                    <div className="flex-1 min-w-0 p-3">
                      <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                        {pickLang(n.title, n.title_gu, lang)}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-snug">
                        {pickLang(n.content, n.content_gu, lang)}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          {relativeTime(n.created_at, t, lang)}
                        </span>
                        <span className="text-[11px] font-semibold text-primary flex items-center gap-0.5">
                          {t("home.readMore")} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="text-center text-xs text-muted-foreground py-6">
                {t("common.caughtUp")} ✨
              </div>
            </section>
          </div>
        )}

        <BottomNav active="home" />
      </div>
    </PhoneFrame>
  );
}

/**
 * The banner always opens the sponsor's own page. It used to jump straight to a
 * linked facility or an external site, which meant the same tile did different
 * things for different sponsors; the facility link and website are buttons on
 * that page instead.
 */
function openSponsor(sponsor: Sponsor, navigate: ReturnType<typeof useNavigate>) {
  navigate({ to: "/sponsors/$id", params: { id: sponsor.id } });
}

function SectionHeader({
  title,
  viewAllLabel,
  onViewAll,
}: {
  title: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
}) {
  return (
    <div className="px-5 flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-primary flex items-center gap-0.5 -mr-2 px-2 py-2.5"
        >
          {viewAllLabel} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
