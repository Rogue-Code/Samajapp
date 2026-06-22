import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  Search, Bell, Home as HomeIcon, Building, HandHeart, User,
  Calendar, MapPin, ChevronRight, ArrowRight, ChevronLeft,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Home — Samaj Connect" }] }),
});

const events = [
  { id: 1, title: "Annual Samaj Gathering", date: "Sat, 15 Nov", location: "Community Hall, Ahmedabad", emoji: "🎊", bg: "from-primary via-accent-saffron to-warning" },
  { id: 2, title: "Youth Sports Tournament", date: "Sun, 23 Nov", location: "Samaj Ground, Surat", emoji: "🏏", bg: "from-success via-primary to-accent-saffron" },
  { id: 3, title: "Blood Donation Camp", date: "Mon, 1 Dec", location: "Samaj Hospital", emoji: "🩸", bg: "from-destructive via-accent-saffron to-warning" },
  { id: 4, title: "Community Meeting", date: "Fri, 12 Dec", location: "Samaj Office", emoji: "🤝", bg: "from-warning via-accent-saffron to-destructive" },
];

const sponsored = [
  { id: 1, name: "Patel Jewellers", desc: "Diwali collection — up to 25% off on gold making charges this festive season.", emoji: "💎", initial: "P", bg: "from-accent-saffron to-destructive", logoBg: "from-accent-saffron to-destructive" },
  { id: 2, name: "Shah Travels", desc: "Char Dham Yatra — 12 day all-inclusive package with community discount.", emoji: "🛕", initial: "S", bg: "from-primary to-success", logoBg: "from-primary to-success" },
  { id: 3, name: "Mehta Caterers", desc: "Authentic Gujarati thali for weddings, functions and events. Trusted since 1985.", emoji: "🍛", initial: "M", bg: "from-warning to-accent-saffron", logoBg: "from-warning to-accent-saffron" },
];

const news = [
  { id: 1, title: "Scholarship Program 2026 Announced", desc: "Committee announces ₹25 lakh scholarship fund for meritorious students of the community.", date: "2 hours ago", emoji: "🎓", bg: "from-primary to-success" },
  { id: 2, title: "Samaj Felicitates 10th Board Toppers", desc: "32 students felicitated at a special ceremony held at the community hall last Sunday.", date: "Yesterday", emoji: "🏆", bg: "from-warning to-accent-saffron" },
  { id: 3, title: "New Community Hall Opens in Vadodara", desc: "State-of-the-art facility with 1,200 person capacity now open for bookings.", date: "3 days ago", emoji: "🏛️", bg: "from-success to-primary" },
];

function HomePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  const [adIndex, setAdIndex] = useState(0);

  const nextAd = useCallback(() => setAdIndex((i) => (i + 1) % sponsored.length), []);
  const prevAd = useCallback(() => setAdIndex((i) => (i - 1 + sponsored.length) % sponsored.length), []);

  useEffect(() => {
    const t = setInterval(nextAd, 10000);
    return () => clearInterval(t);
  }, [nextAd, adIndex]);

  const ad = sponsored[adIndex];

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px] bg-background">
        {/* Sticky header with search */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">Good Morning 👋</div>
                <div className="font-semibold text-foreground truncate">Ramesh Patel</div>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
              </button>
              <button
                onClick={() => setTab("profile")}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white font-bold shadow-card ring-2 ring-background"
                aria-label="Profile"
              >
                R
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
          <section className="pt-5">
            <SectionHeader title="Upcoming Events" />
            <div className="flex gap-3 overflow-x-auto px-5 pb-2 pt-3 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
              {events.map((e) => (
                <article key={e.id} className="snap-start shrink-0 w-[260px] rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                  <div className={`h-28 bg-gradient-to-br ${e.bg} relative flex items-center justify-center`}>
                    <span className="text-5xl opacity-90">{e.emoji}</span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">{e.title}</h3>
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {e.date}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="w-3 h-3" /> <span className="truncate">{e.location}</span>
                    </div>
                    <button className="mt-2.5 w-full h-9 rounded-xl bg-primary text-primary-foreground text-xs font-semibold active:scale-[0.98] transition">
                      Register
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Sponsored Banner Carousel */}
          <section className="pt-6">
            <SectionHeader title="Sponsored" />
            <div className="px-5 pt-3">
              <article
                onClick={() => navigate({ to: "/facilities/$id", params: { id: String(ad.id) } })}
                className="relative rounded-3xl overflow-hidden shadow-card border border-border bg-card cursor-pointer active:scale-[0.99] transition"
              >
                <div className={`relative h-[240px] bg-gradient-to-br ${ad.bg} flex items-center justify-center`}>
                  <span className="text-8xl opacity-90 drop-shadow-lg">{ad.emoji}</span>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                    Sponsored
                  </span>
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
                </div>
                <div className="flex items-center justify-between gap-3 p-3.5">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-foreground truncate">{ad.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{ad.desc}</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate({ to: "/facilities/$id", params: { id: String(ad.id) } }); }}
                    className="shrink-0 h-9 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold active:scale-[0.98] transition"
                  >
                    View Details
                  </button>
                </div>
              </article>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {sponsored.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAdIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === adIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Latest News */}
          <section className="pt-6">
            <SectionHeader title="Latest News" onViewAll={() => navigate({ to: "/news" })} />
            <div className="px-5 pt-3 space-y-3">
              {news.map((n) => (
                <article key={n.id} className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex">
                  <div className={`w-24 shrink-0 bg-gradient-to-br ${n.bg} flex items-center justify-center`}>
                    <span className="text-4xl opacity-90">{n.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0 p-3">
                    <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">{n.title}</h3>
                    <p className="text-[11.5px] text-muted-foreground mt-1 line-clamp-2 leading-snug">{n.desc}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{n.date}</span>
                      <button className="text-[11px] font-semibold text-primary flex items-center gap-0.5">
                        Read More <ArrowRight className="w-3 h-3" />
                      </button>
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

function SectionHeader({ title, onViewAll }: { title: string; onViewAll?: () => void }) {
  return (
    <div className="px-5 flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      <button onClick={onViewAll} className="text-xs font-semibold text-primary flex items-center gap-0.5">
        View All <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
