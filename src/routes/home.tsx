import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Search, Bell, Home as HomeIcon, Building, HandHeart, User,
  Calendar, MapPin, ChevronRight, ArrowRight, ChevronLeft, Check,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Home \u2014 Sangath" }] }),
});

type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  location: string | null;
  emoji: string;
};

type Sponsor = {
  id: string;
  name: string;
  description: string | null;
  emoji: string;
  link_url: string | null;
  facility_id: string | null;
};

type NewsRow = {
  id: string;
  title: string;
  content: string;
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

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function formatEventDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function HomePage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const [tab, setTab] = useState("home");
  const [adIndex, setAdIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  const [sponsored, setSponsored] = useState<Sponsor[]>([]);
  const [news, setNews] = useState<NewsRow[]>([]);

  const load = useCallback(async () => {
    if (!session) return;
    const nowIso = new Date().toISOString();
    const [profile, eventList, rsvpList, sponsorList, newsList] = await Promise.all([
      supabase.from("profiles").select("full_name").eq("id", session.user.id).maybeSingle(),
      supabase
        .from("events")
        .select("id, title, starts_at, location, emoji")
        .gte("starts_at", nowIso)
        .order("starts_at", { ascending: true })
        .limit(10),
      supabase.from("event_rsvps").select("event_id").eq("user_id", session.user.id),
      supabase
        .from("sponsors")
        .select("id, name, description, emoji, link_url, facility_id")
        .order("sort_order", { ascending: true }),
      supabase
        .from("posts")
        .select("id, title, content, category, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
    ]);
    setFullName(profile.data?.full_name ?? null);
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
    const t = setInterval(nextAd, 10000);
    return () => clearInterval(t);
  }, [nextAd, sponsored.length]);

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
      ? await supabase.from("event_rsvps").delete().eq("user_id", session.user.id).eq("event_id", eventId)
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
  const displayName = fullName?.trim() || "there";
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
                <div className="text-xs text-muted-foreground">{greeting()} 👋</div>
                <div className="font-semibold text-foreground truncate">{displayName}</div>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => navigate({ to: "/account" })}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white font-bold shadow-card ring-2 ring-background"
                aria-label="Profile"
              >
                {initial}
              </button>
            </div>
            <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-2xl shadow-soft">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                placeholder="Search people, families, businesses, events..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
          {/* Upcoming Events */}
          {events.length > 0 && (
            <section className="pt-5">
              <SectionHeader title="Upcoming Events" />
              <div className="flex gap-3 overflow-x-auto px-5 pb-2 pt-3 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                {events.map((e, i) => {
                  const going = rsvps.has(e.id);
                  return (
                    <article key={e.id} className="snap-start shrink-0 w-[260px] rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                      <div className={`h-28 bg-gradient-to-br ${gradientFor(i)} relative flex items-center justify-center`}>
                        <span className="text-5xl opacity-90">{e.emoji}</span>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">{e.title}</h3>
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Calendar className="w-3 h-3" /> {formatEventDate(e.starts_at)}
                        </div>
                        {e.location && (
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="w-3 h-3" /> <span className="truncate">{e.location}</span>
                          </div>
                        )}
                        <button
                          onClick={() => void toggleRsvp(e.id)}
                          className={`mt-2.5 w-full h-9 rounded-xl text-xs font-semibold active:scale-[0.98] transition flex items-center justify-center gap-1.5 ${
                            going
                              ? "bg-success-soft text-success"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {going ? (<><Check className="w-3.5 h-3.5" strokeWidth={3} /> Going</>) : "Register"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Sponsored Banner Carousel */}
          {ad && (
            <section className="pt-6">
              <SectionHeader title="Sponsored" />
              <div className="px-5 pt-3">
                <article
                  onClick={() => openSponsor(ad, navigate)}
                  className="relative rounded-3xl overflow-hidden shadow-card border border-border bg-card cursor-pointer active:scale-[0.99] transition"
                >
                  <div className={`relative h-[240px] bg-gradient-to-br ${gradientFor(adIndex)} flex items-center justify-center`}>
                    <span className="text-8xl opacity-90 drop-shadow-lg">{ad.emoji}</span>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                      Sponsored
                    </span>
                    {sponsored.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevAd(); }}
                          aria-label="Previous"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur flex items-center justify-center shadow-soft active:scale-95 transition"
                        >
                          <ChevronLeft className="w-5 h-5 text-foreground" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextAd(); }}
                          aria-label="Next"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur flex items-center justify-center shadow-soft active:scale-95 transition"
                        >
                          <ChevronRight className="w-5 h-5 text-foreground" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3.5">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-foreground truncate">{ad.name}</div>
                      {ad.description && (
                        <div className="text-[11px] text-muted-foreground truncate">{ad.description}</div>
                      )}
                    </div>
                    {(ad.facility_id || ad.link_url) && (
                      <button
                        onClick={(e) => { e.stopPropagation(); openSponsor(ad, navigate); }}
                        className="shrink-0 h-9 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold active:scale-[0.98] transition"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </article>
                {sponsored.length > 1 && (
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    {sponsored.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => setAdIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === adIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Latest News */}
          <section className="pt-6">
            <SectionHeader title="Latest News" onViewAll={() => navigate({ to: "/news" })} />
            <div className="px-5 pt-3 space-y-3">
              {news.length === 0 && (
                <div className="text-center py-10 px-6 rounded-2xl border-2 border-dashed border-border">
                  <div className="text-3xl mb-2">📰</div>
                  <p className="text-sm font-semibold text-foreground">No announcements yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Community news will show up here.
                  </p>
                </div>
              )}
              {news.map((n, i) => (
                <article
                  key={n.id}
                  onClick={() => navigate({ to: "/news" })}
                  className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex cursor-pointer active:scale-[0.99] transition"
                >
                  <div className={`w-24 shrink-0 bg-gradient-to-br ${gradientFor(i)} flex items-center justify-center`}>
                    <span className="text-4xl opacity-90">📣</span>
                  </div>
                  <div className="flex-1 min-w-0 p-3">
                    <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">{n.title}</h3>
                    <p className="text-[11.5px] text-muted-foreground mt-1 line-clamp-2 leading-snug">{n.content}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{relativeTime(n.created_at)}</span>
                      <span className="text-[11px] font-semibold text-primary flex items-center gap-0.5">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center text-xs text-muted-foreground py-6">You're all caught up ✨</div>
          </section>
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
          <div className="flex items-center justify-around">
            {[
              { id: "home", icon: HomeIcon, label: "Home" },
              { id: "facilities", icon: Building, label: "Facilities" },
              { id: "fundraiser", icon: HandHeart, label: "Fundraiser" },
              { id: "profile", icon: User, label: "Profile" },
            ].map((n) => {
              const active = tab === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    setTab(n.id);
                    if (n.id === "facilities") navigate({ to: "/facilities" });
                    if (n.id === "fundraiser") navigate({ to: "/fundraiser" });
                    if (n.id === "profile") navigate({ to: "/account" });
                  }}
                  className="flex flex-col items-center gap-1 py-1 px-4 relative"
                >
                  {active && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
                  <n.icon
                    className={`w-5 h-5 transition ${active ? "text-primary" : "text-muted-foreground"}`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  <span className={`text-[10.5px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                    {n.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/** A sponsor links either to a facility in the directory or to an external site. */
function openSponsor(sponsor: Sponsor, navigate: ReturnType<typeof useNavigate>) {
  if (sponsor.facility_id) {
    navigate({ to: "/facilities/$id", params: { id: sponsor.facility_id } });
    return;
  }
  if (sponsor.link_url) {
    window.open(sponsor.link_url, "_blank", "noopener,noreferrer");
  }
}

function SectionHeader({ title, onViewAll }: { title: string; onViewAll?: () => void }) {
  return (
    <div className="px-5 flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {onViewAll && (
        <button onClick={onViewAll} className="text-xs font-semibold text-primary flex items-center gap-0.5">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
