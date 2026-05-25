import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search, Bell, Home, Users, Briefcase, Calendar, User,
  Heart, MessageCircle, Share2, MapPin, ChevronRight, Newspaper, Megaphone,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Home — Samaj Connect" }] }),
});

const hero = [
  { tag: "Festival", title: "Navratri Garba Night 2025", sub: "9 nights of music & devotion", emoji: "🪔", bg: "from-accent-saffron to-destructive" },
  { tag: "Announcement", title: "New Temple Inauguration", sub: "Join the ceremony this Sunday", emoji: "🛕", bg: "from-primary to-accent-saffron" },
  { tag: "Event", title: "Community Health Camp", sub: "Free checkups · 15 Nov", emoji: "🏥", bg: "from-success to-primary" },
];

const news = [
  { title: "Samaj Annual Meeting Concludes Successfully", time: "2h ago", reads: "1.2k", emoji: "📰" },
  { title: "Scholarship Program for 200+ Students Launched", time: "5h ago", reads: "890", emoji: "🎓" },
];

const events = [
  { date: "15", month: "NOV", title: "Diwali Celebration", place: "Community Hall, Anand", going: 248 },
  { date: "22", month: "NOV", title: "Youth Cricket Tournament", place: "Sardar Stadium", going: 64 },
];

const jobs = [
  { role: "Marketing Manager", company: "Patel Industries", location: "Ahmedabad", salary: "₹8-12 LPA", emoji: "💼" },
  { role: "Software Engineer", company: "TechSamaj", location: "Remote", salary: "₹15-25 LPA", emoji: "💻" },
];

function HomePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % hero.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white font-bold shadow-card">R</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">Good Morning 👋</div>
                <div className="font-semibold text-foreground truncate">Ramesh Patel</div>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 h-11 px-4 bg-muted rounded-2xl">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input placeholder="Search people, events, news..." className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70" />
            </div>
          </div>
        </div>

        <div className="flex-1 pb-28">
          {/* Hero carousel */}
          <div className="px-5 mt-5 fade-up">
            <div className="relative h-44 rounded-3xl overflow-hidden shadow-card">
              {hero.map((h, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-gradient-to-br ${h.bg} p-5 flex flex-col justify-end transition-opacity duration-500 ${slide === i ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="absolute top-4 right-4 text-6xl opacity-30">{h.emoji}</div>
                  <span className="self-start text-[10px] font-bold uppercase tracking-wider bg-white/25 text-white px-2 py-1 rounded-full backdrop-blur">{h.tag}</span>
                  <h3 className="text-xl font-bold text-white mt-2 leading-tight">{h.title}</h3>
                  <p className="text-sm text-white/85">{h.sub}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1.5 mt-3">
              {hero.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${slide === i ? "w-6 bg-primary" : "w-1.5 bg-border"}`} />
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="px-5 mt-6 grid grid-cols-4 gap-3">
            {[
              { icon: Users, label: "Members", color: "bg-primary-soft text-primary" },
              { icon: Calendar, label: "Events", color: "bg-warning-soft text-warning" },
              { icon: Megaphone, label: "Notices", color: "bg-success-soft text-success" },
              { icon: Briefcase, label: "Jobs", color: "bg-accent text-accent-foreground" },
            ].map((q) => (
              <button key={q.label} className="flex flex-col items-center gap-1.5">
                <div className={`w-14 h-14 rounded-2xl ${q.color} flex items-center justify-center`}>
                  <q.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-medium text-foreground">{q.label}</span>
              </button>
            ))}
          </div>

          {/* News */}
          <Section icon={Newspaper} title="Latest News" />
          <div className="px-5 space-y-3">
            {news.map((n, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-4 flex gap-3 shadow-soft">
                <div className="w-14 h-14 rounded-xl bg-primary-soft flex items-center justify-center text-2xl shrink-0">{n.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm leading-snug line-clamp-2">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">{n.time} · {n.reads} reads</div>
                </div>
              </div>
            ))}
          </div>

          {/* Community post */}
          <Section icon={Users} title="Community Posts" />
          <div className="px-5">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-primary flex items-center justify-center text-white font-bold text-sm">M</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Mahesh Bhai</div>
                  <div className="text-[11px] text-muted-foreground">President · 3h ago</div>
                </div>
              </div>
              <p className="text-sm text-foreground mt-3 leading-relaxed">
                Heartfelt thanks to all 500+ families who attended our annual gathering. Together we build a stronger samaj. 🙏
              </p>
              <div className="mt-3 h-32 rounded-xl bg-gradient-to-br from-accent-saffron/30 to-primary/20 flex items-center justify-center text-4xl">🎉</div>
              <div className="flex items-center gap-5 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-destructive transition"><Heart className="w-4 h-4" /> 234</button>
                <button className="flex items-center gap-1.5 hover:text-primary transition"><MessageCircle className="w-4 h-4" /> 42</button>
                <button className="flex items-center gap-1.5 hover:text-primary transition ml-auto"><Share2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Events */}
          <Section icon={Calendar} title="Upcoming Events" />
          <div className="px-5 space-y-3">
            {events.map((e, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-4 flex gap-3 shadow-soft items-center">
                <div className="w-14 h-16 rounded-xl bg-gradient-to-b from-primary to-accent-saffron text-white flex flex-col items-center justify-center shrink-0">
                  <div className="text-xl font-bold leading-none">{e.date}</div>
                  <div className="text-[10px] font-semibold tracking-wider mt-1">{e.month}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm">{e.title}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" /> {e.place}
                  </div>
                  <div className="text-[11px] text-success font-semibold mt-1">{e.going} going</div>
                </div>
                <button className="px-4 h-9 rounded-xl bg-primary-soft text-primary text-xs font-semibold">RSVP</button>
              </div>
            ))}
          </div>

          {/* Jobs */}
          <Section icon={Briefcase} title="Job Opportunities" />
          <div className="px-5 space-y-3">
            {jobs.map((j, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">{j.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-sm">{j.role}</div>
                    <div className="text-xs text-muted-foreground">{j.company} · {j.location}</div>
                    <div className="text-xs font-semibold text-success mt-1">{j.salary}</div>
                  </div>
                  <button className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">Apply</button>
                </div>
              </div>
            ))}
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
                <button key={n.id} onClick={() => setTab(n.id)} className="flex flex-col items-center gap-1 py-1 px-3 relative">
                  {active && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
                  <n.icon className={`w-5 h-5 transition ${active ? "text-primary" : "text-muted-foreground"}`} strokeWidth={active ? 2.5 : 2} />
                  <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>{n.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Section({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="px-5 mt-7 mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <h2 className="font-bold text-foreground">{title}</h2>
      </div>
      <button className="text-xs font-semibold text-primary flex items-center gap-0.5">
        See all <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
