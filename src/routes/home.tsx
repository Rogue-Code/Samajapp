import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search, Bell, Home, Users, Briefcase, Calendar, User,
  Heart, MessageCircle, Share2, HandCoins, Building2, LifeBuoy, ChevronRight,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Home — Samaj Connect" }] }),
});

const ads = [
  {
    tag: "Sponsored",
    title: "Patel Jewellers — Diwali Collection",
    sub: "Up to 25% off on gold making charges",
    emoji: "💎",
    bg: "from-accent-saffron to-destructive",
    cta: "Shop Now",
  },
  {
    tag: "Promotion",
    title: "Samaj Wedding Hall Bookings Open",
    sub: "Reserve dates for 2026 season",
    emoji: "🎊",
    bg: "from-primary to-accent-saffron",
    cta: "Book Now",
  },
  {
    tag: "Featured",
    title: "Shah Travels — Char Dham Yatra",
    sub: "Special community discount · 12 days",
    emoji: "🛕",
    bg: "from-success to-primary",
    cta: "Enquire",
  },
];

const communityPost = {
  author: "Mahesh Bhai",
  role: "President",
  time: "3h ago",
  text: "Heartfelt thanks to all 500+ families who attended our annual gathering. Together we build a stronger samaj. 🙏",
};

function HomePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % ads.length), 3500);
    return () => clearInterval(t);
  }, []);

  const quickTiles = [
    { id: "fundraiser", icon: HandCoins, label: "Fundraiser", sub: "Donate & support", grad: "from-destructive/15 to-accent-saffron/15", icon_bg: "bg-destructive/10 text-destructive" },
    { id: "events", icon: Calendar, label: "Upcoming Events", sub: "Festivals & meets", grad: "from-primary/15 to-success/10", icon_bg: "bg-primary/10 text-primary" },
    { id: "facilities", icon: Building2, label: "Facilities", sub: "Halls & services", grad: "from-warning/15 to-accent-saffron/15", icon_bg: "bg-warning/15 text-warning" },
    { id: "support", icon: LifeBuoy, label: "Support", sub: "Help & contact", grad: "from-success/15 to-primary/10", icon_bg: "bg-success/15 text-success" },
  ];

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3">
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
            <div className="mt-3 flex items-center gap-2 h-11 px-4 bg-muted rounded-2xl">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search people, events, news..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 pb-28">
          {/* Advertisement Posts */}
          <div className="px-5 mt-5 fade-up">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-foreground">Featured Posts</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">Ads</span>
            </div>
            <div className="relative h-44 rounded-3xl overflow-hidden shadow-card">
              {ads.map((h, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-gradient-to-br ${h.bg} p-5 flex flex-col justify-end transition-opacity duration-500 ${slide === i ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="absolute top-4 right-4 text-6xl opacity-30">{h.emoji}</div>
                  <span className="self-start text-[10px] font-bold uppercase tracking-wider bg-white/25 text-white px-2 py-1 rounded-full backdrop-blur">
                    {h.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 leading-tight">{h.title}</h3>
                  <p className="text-sm text-white/85">{h.sub}</p>
                  <button className="mt-3 self-start px-4 h-9 rounded-xl bg-white text-foreground text-xs font-semibold shadow-card">
                    {h.cta}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1.5 mt-3">
              {ads.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${slide === i ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
          </div>

          {/* Community Post */}
          <div className="px-5 mt-6">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-primary flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{communityPost.author}</div>
                  <div className="text-[11px] text-muted-foreground">{communityPost.role} · {communityPost.time}</div>
                </div>
              </div>
              <p className="text-sm text-foreground mt-3 leading-relaxed">{communityPost.text}</p>
              <div className="mt-3 h-32 rounded-xl bg-gradient-to-br from-accent-saffron/30 to-primary/20 flex items-center justify-center text-4xl">
                🎉
              </div>
              <div className="flex items-center gap-5 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-destructive transition">
                  <Heart className="w-4 h-4" /> 234
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition">
                  <MessageCircle className="w-4 h-4" /> 42
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition ml-auto">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 4-square quick access */}
          <div className="px-5 mt-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-foreground">Quick Access</h2>
              <button className="text-xs font-semibold text-primary flex items-center gap-0.5">
                See all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickTiles.map((t) => (
                <button
                  key={t.id}
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${t.grad} border border-border p-4 flex flex-col justify-between text-left shadow-soft hover:shadow-card transition active:scale-[0.98]`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${t.icon_bg} flex items-center justify-center`}>
                    <t.icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="font-bold text-foreground leading-tight">{t.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{t.sub}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground absolute top-4 right-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
          <div className="flex items-center justify-around">
            {[
              { id: "home", icon: Home, label: "Home" },
              { id: "committee", icon: Users, label: "Committee" },
              { id: "jobs", icon: Briefcase, label: "Jobs" },
              { id: "events", icon: Calendar, label: "Events" },
              { id: "profile", icon: User, label: "Profile" },
            ].map((n) => {
              const active = tab === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setTab(n.id)}
                  className="flex flex-col items-center gap-1 py-1 px-3 relative"
                >
                  {active && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
                  <n.icon
                    className={`w-5 h-5 transition ${active ? "text-primary" : "text-muted-foreground"}`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
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
