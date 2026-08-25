import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronLeft, Bell, Home as HomeIcon, Building, HandHeart, User,
  Users, Share2, TrendingUp, Award, Plus, Sparkles, AlertTriangle,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";

export const Route = createLazyFileRoute("/fundraiser")({
  component: FundraiserPage,
});

type Campaign = {
  id: number;
  title: string;
  desc: string;
  target: number;
  raised: number;
  donors: number;
  status: "Active" | "Completed" | "Closed";
  emoji: string;
  bg: string;
};

const activeCampaign: Campaign = {
  id: 1,
  title: "Education Scholarship Fund 2026",
  desc: "Supporting 200+ meritorious students of the community with tuition, books, and exam fees for the 2026-27 academic year.",
  target: 2500000,
  raised: 1250000,
  donors: 542,
  status: "Active",
  emoji: "🎓",
  bg: "from-primary via-accent-saffron to-warning",
};

const pastCampaigns: Campaign[] = [
  { id: 2, title: "Scholarship Fund 2025", desc: "", target: 2000000, raised: 2400000, donors: 612, status: "Completed", emoji: "📚", bg: "from-success to-primary" },
  { id: 3, title: "Community Hall Renovation", desc: "", target: 5000000, raised: 5300000, donors: 1024, status: "Completed", emoji: "🏛️", bg: "from-warning to-accent-saffron" },
  { id: 4, title: "Medical Assistance Drive", desc: "", target: 500000, raised: 480000, donors: 287, status: "Closed", emoji: "🏥", bg: "from-destructive to-accent-saffron" },
];

const recentDonations = [
  { id: 1, name: "Ramesh Patel", amount: 1001, time: "2 hours ago", anonymous: false },
  { id: 2, name: "Mahesh Shah", amount: 5001, time: "Yesterday", anonymous: false },
  { id: 3, name: "Anonymous Donor", amount: 2501, time: "Yesterday", anonymous: true },
  { id: 4, name: "Nirav Mehta", amount: 501, time: "2 days ago", anonymous: false },
  { id: 5, name: "Priya Joshi", amount: 11000, time: "3 days ago", anonymous: false },
];

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function shortINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return formatINR(n);
}

function FundraiserPage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const { canPublish } = useProfileRole(session);

  const progress = useMemo(
    () => Math.min(100, Math.round((activeCampaign.raised / activeCampaign.target) * 100)),
    [],
  );

  if (checking) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px] bg-background">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/home" })}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">Give Back</div>
              <div className="font-semibold text-foreground truncate">Fundraiser & Donations</div>
            </div>
            <button className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
          {/* Hero campaign */}
          <section className="px-5 pt-4">
            <article className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
              <div className={`relative h-40 bg-gradient-to-br ${activeCampaign.bg} flex items-center justify-center`}>
                <span className="text-7xl opacity-90">{activeCampaign.emoji}</span>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/95 text-[10.5px] font-bold uppercase tracking-wider text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Active Campaign
                </span>
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/95 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-foreground leading-snug">{activeCampaign.title}</h2>
                <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{activeCampaign.desc}</p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[11px] text-muted-foreground">Raised</div>
                    <div className="text-xl font-bold text-foreground">{shortINR(activeCampaign.raised)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-muted-foreground">Goal</div>
                    <div className="text-sm font-semibold text-foreground">{shortINR(activeCampaign.target)}</div>
                  </div>
                </div>

                <div className="mt-2 h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent-saffron rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11.5px] text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <TrendingUp className="w-3.5 h-3.5" /> {progress}% funded
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {activeCampaign.donors} contributors
                  </span>
                </div>
              </div>
            </article>
          </section>

          {/* Payment details — deliberately not wired up yet. See the notice below. */}
          <section className="px-5 pt-5">
            <div className="rounded-2xl border-2 border-dashed border-warning/50 bg-warning-soft/40 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-foreground">Donations are not open yet</h2>
                  <p className="mt-1.5 text-[12.5px] text-muted-foreground leading-relaxed">
                    This page is still being built. Payment details will be published here once the
                    committee has confirmed the account to collect into.
                  </p>
                  <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">
                    Please do not send money based on anything shown on this screen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent contributions */}
          <section className="px-5 pt-6">
            <SectionHeader title="Recent Contributions" />
            <div className="mt-3 rounded-2xl bg-card border border-border shadow-card divide-y divide-border overflow-hidden">
              {recentDonations.map((d) => {
                const initial = d.anonymous ? "?" : d.name.charAt(0);
                return (
                  <div key={d.id} className="flex items-center gap-3 p-3.5">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-soft ${
                      d.anonymous ? "bg-muted-foreground" : "bg-gradient-to-br from-primary to-accent-saffron"
                    }`}>
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{d.name}</div>
                      <div className="text-[11px] text-muted-foreground">{d.time}</div>
                    </div>
                    <div className="text-sm font-bold text-success">+{formatINR(d.amount)}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Past campaigns */}
          <section className="px-5 pt-6">
            <SectionHeader title="Past Campaigns" />
            <div className="mt-3 space-y-3">
              {pastCampaigns.map((c) => {
                const pct = Math.min(100, Math.round((c.raised / c.target) * 100));
                const success = c.raised >= c.target;
                return (
                  <article key={c.id} className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex">
                    <div className={`w-20 shrink-0 bg-gradient-to-br ${c.bg} flex items-center justify-center`}>
                      <span className="text-3xl opacity-90">{c.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground text-[13.5px] leading-tight line-clamp-1">{c.title}</h3>
                        <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          c.status === "Completed"
                            ? "bg-success-soft text-success"
                            : "bg-muted text-muted-foreground"
                        }`}>{c.status}</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Raised <span className="text-foreground font-semibold">{shortINR(c.raised)}</span></span>
                        <span>Goal {shortINR(c.target)}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${success ? "bg-success" : "bg-accent-saffron"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Impact */}
          <section className="px-5 pt-6">
            <SectionHeader title="Our Impact" />
            <div className="mt-3 rounded-2xl bg-gradient-to-br from-primary to-accent-saffron text-primary-foreground p-4 shadow-elevated">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider opacity-90">
                <Sparkles className="w-3.5 h-3.5" /> Together we have raised
              </div>
              <div className="mt-1 text-3xl font-bold">₹2.4 Crore</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <ImpactStat icon={Award} label="Campaigns" value="35" />
                <ImpactStat icon={Users} label="Beneficiaries" value="2,100" />
              </div>
            </div>
          </section>

          <div className="text-center text-xs text-muted-foreground py-6">
            Thank you for your generosity 🙏
          </div>
        </div>

        {/* Admin FAB */}
        {canPublish && (
          <button
            className="absolute right-5 bottom-24 z-30 h-14 px-5 rounded-full bg-foreground text-background font-semibold shadow-elevated flex items-center gap-2 active:scale-95 transition"
          >
            <Plus className="w-5 h-5" /> Campaign
          </button>
        )}

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
          <div className="flex items-center justify-around">
            {[
              { id: "home", icon: HomeIcon, label: "Home", to: "/home" as const, active: false },
              { id: "facilities", icon: Building, label: "Facilities", to: "/facilities" as const, active: false },
              { id: "fundraiser", icon: HandHeart, label: "Fundraiser", to: "/fundraiser" as const, active: true },
              { id: "profile", icon: User, label: "Profile", to: "/account" as const, active: false },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => navigate({ to: n.to })}
                className="flex flex-col items-center gap-1 py-1 px-4 relative"
              >
                {n.active && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
                <n.icon className={`w-5 h-5 ${n.active ? "text-primary" : "text-muted-foreground"}`} strokeWidth={n.active ? 2.5 : 2} />
                <span className={`text-[10.5px] font-medium ${n.active ? "text-primary" : "text-muted-foreground"}`}>
                  {n.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </PhoneFrame>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
    </div>
  );
}

function ImpactStat({ icon: Icon, label, value }: { icon: typeof Award; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-primary-foreground/15 backdrop-blur-sm p-3">
      <Icon className="w-4 h-4 opacity-90" />
      <div className="mt-1 text-lg font-bold leading-tight">{value}</div>
      <div className="text-[11px] opacity-90">{label}</div>
    </div>
  );
}
