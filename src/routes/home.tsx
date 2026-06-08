import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Bell, Home, Users, Briefcase, Calendar, User,
  Heart, MessageCircle, Share2, HandCoins, Building2, LifeBuoy, Bookmark, MoreHorizontal,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Home — Samaj Connect" }] }),
});

type Post = {
  id: number;
  author: string;
  role: string;
  time: string;
  avatarGrad: string;
  avatarInitial: string;
  tag?: string;
  title: string;
  body: string;
  emoji: string;
  bg: string;
  likes: number;
  comments: number;
};

const feed: Post[] = [
  {
    id: 1,
    author: "Patel Jewellers",
    role: "Sponsored",
    time: "Promoted",
    avatarGrad: "from-accent-saffron to-destructive",
    avatarInitial: "P",
    tag: "Advertisement",
    title: "Diwali Collection 2025",
    body: "Up to 25% off on gold making charges. Visit our showroom this festive season.",
    emoji: "💎",
    bg: "from-accent-saffron via-destructive to-primary",
    likes: 482,
    comments: 36,
  },
  {
    id: 2,
    author: "Mahesh Bhai",
    role: "President · Samaj",
    time: "3h ago",
    avatarGrad: "from-success to-primary",
    avatarInitial: "M",
    title: "Annual Gathering — Thank You!",
    body: "Heartfelt thanks to all 500+ families who attended our annual gathering. Together we build a stronger samaj. 🙏",
    emoji: "🎉",
    bg: "from-primary via-accent-saffron to-warning",
    likes: 234,
    comments: 42,
  },
  {
    id: 3,
    author: "Shah Travels",
    role: "Sponsored",
    time: "Promoted",
    avatarGrad: "from-primary to-success",
    avatarInitial: "S",
    tag: "Advertisement",
    title: "Char Dham Yatra — 12 Days",
    body: "Special community discount. All inclusive package with experienced guides and comfortable stay.",
    emoji: "🛕",
    bg: "from-success via-primary to-accent-saffron",
    likes: 198,
    comments: 21,
  },
  {
    id: 4,
    author: "Samaj Wedding Hall",
    role: "Community Notice",
    time: "1d ago",
    avatarGrad: "from-warning to-accent-saffron",
    avatarInitial: "W",
    title: "Bookings open for 2026 season",
    body: "Reserve your preferred dates early. Members get priority booking and 15% discount.",
    emoji: "🎊",
    bg: "from-warning via-accent-saffron to-destructive",
    likes: 92,
    comments: 14,
  },
];

const quickTiles = [
  { id: "fundraiser", icon: HandCoins, label: "Fundraiser", grad: "from-destructive/15 to-accent-saffron/10", iconBg: "bg-destructive/10 text-destructive" },
  { id: "events", icon: Calendar, label: "Upcoming Events", grad: "from-primary/15 to-success/10", iconBg: "bg-primary/10 text-primary" },
  { id: "facilities", icon: Building2, label: "Facilities", grad: "from-warning/15 to-accent-saffron/10", iconBg: "bg-warning/15 text-warning" },
  { id: "support", icon: LifeBuoy, label: "Support", grad: "from-success/15 to-primary/10", iconBg: "bg-success/15 text-success" },
];

function HomePage() {
  const [tab, setTab] = useState("home");
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  // Heights: header ~150px, tiles ~140px, bottom nav ~76px
  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border/50">
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

        {/* Scrollable Instagram-style feed (only this scrolls) */}
        <div className="flex-1 overflow-y-auto pb-[220px]" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col">
            {feed.map((post) => {
              const isLiked = !!liked[post.id];
              const isSaved = !!saved[post.id];
              return (
                <article key={post.id} className="border-b border-border/60 pb-3 pt-4 animate-fade-in">
                  {/* Author row */}
                  <header className="flex items-center gap-3 px-5">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white font-bold text-sm shadow-soft`}>
                      {post.avatarInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground truncate">{post.author}</span>
                        {post.tag && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-accent-saffron bg-accent-saffron/10 px-1.5 py-0.5 rounded">
                            Ad
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{post.role} · {post.time}</div>
                    </div>
                    <button className="text-muted-foreground p-1"><MoreHorizontal className="w-5 h-5" /></button>
                  </header>

                  {/* Media */}
                  <div className={`mt-3 mx-5 h-72 rounded-2xl bg-gradient-to-br ${post.bg} relative overflow-hidden flex items-end p-4 shadow-card`}>
                    <div className="absolute inset-0 flex items-center justify-center text-[140px] opacity-25 select-none">{post.emoji}</div>
                    <div className="relative">
                      <h3 className="text-white text-lg font-bold leading-tight drop-shadow">{post.title}</h3>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 px-5 pt-3">
                    <button
                      onClick={() => setLiked((s) => ({ ...s, [post.id]: !s[post.id] }))}
                      className="transition active:scale-90"
                      aria-label="Like"
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? "fill-destructive text-destructive" : "text-foreground"}`} strokeWidth={2} />
                    </button>
                    <button aria-label="Comment"><MessageCircle className="w-6 h-6 text-foreground" strokeWidth={2} /></button>
                    <button aria-label="Share"><Share2 className="w-6 h-6 text-foreground" strokeWidth={2} /></button>
                    <button
                      onClick={() => setSaved((s) => ({ ...s, [post.id]: !s[post.id] }))}
                      className="ml-auto transition active:scale-90"
                      aria-label="Save"
                    >
                      <Bookmark className={`w-6 h-6 ${isSaved ? "fill-foreground text-foreground" : "text-foreground"}`} strokeWidth={2} />
                    </button>
                  </div>

                  {/* Meta */}
                  <div className="px-5 mt-2">
                    <div className="text-sm font-semibold text-foreground">
                      {(post.likes + (isLiked ? 1 : 0)).toLocaleString()} likes
                    </div>
                    <p className="text-sm text-foreground mt-1 leading-relaxed">
                      <span className="font-semibold mr-1.5">{post.author}</span>
                      {post.body}
                    </p>
                    <button className="text-xs text-muted-foreground mt-1.5">View all {post.comments} comments</button>
                  </div>
                </article>
              );
            })}
            <div className="text-center text-xs text-muted-foreground py-6">You're all caught up ✨</div>
          </div>
        </div>

        {/* Static 4-tile grid (above bottom nav) */}
        <div className="absolute bottom-[76px] left-0 right-0 z-10 bg-card/95 backdrop-blur-xl border-t border-border px-4 py-3">
          <div className="grid grid-cols-4 gap-2.5">
            {quickTiles.map((t) => (
              <button
                key={t.id}
                className={`relative rounded-2xl bg-gradient-to-br ${t.grad} border border-border/70 p-2.5 flex flex-col items-center gap-1.5 active:scale-95 transition shadow-soft`}
              >
                <div className={`w-10 h-10 rounded-xl ${t.iconBg} flex items-center justify-center`}>
                  <t.icon className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <span className="text-[10.5px] font-semibold text-foreground text-center leading-tight">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
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
