import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { useGoBack } from "@/hooks/use-go-back";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  Bell,
  Home as HomeIcon,
  Building,
  HandHeart,
  User,
  Users,
  Share2,
  TrendingUp,
  Award,
  Plus,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { useT } from "@/lib/i18n";
import type { StringKey } from "@/lib/translations";

export const Route = createLazyFileRoute("/fundraiser")({
  component: FundraiserPage,
});

type Campaign = {
  id: number;
  titleKey: StringKey;
  descKey: StringKey | null;
  target: number;
  raised: number;
  donors: number;
  status: "Active" | "Completed" | "Closed";
  emoji: string;
  bg: string;
};

// Everything on this page is placeholder content — see the note further down
// by the "Donations are not open yet" notice. Translated the same as any
// other UI copy on this page (a StringKey, not a machine-translated DB
// field), since none of it is real data yet.
const activeCampaign: Campaign = {
  id: 1,
  titleKey: "fundraiser.mock.activeCampaignTitle",
  descKey: "fundraiser.mock.activeCampaignDesc",
  target: 2500000,
  raised: 1250000,
  donors: 542,
  status: "Active",
  emoji: "🎓",
  bg: "from-primary via-accent-saffron to-warning",
};

const pastCampaigns: Campaign[] = [
  {
    id: 2,
    titleKey: "fundraiser.mock.pastCampaign1Title",
    descKey: null,
    target: 2000000,
    raised: 2400000,
    donors: 612,
    status: "Completed",
    emoji: "📚",
    bg: "from-success to-primary",
  },
  {
    id: 3,
    titleKey: "fundraiser.mock.pastCampaign2Title",
    descKey: null,
    target: 5000000,
    raised: 5300000,
    donors: 1024,
    status: "Completed",
    emoji: "🏛️",
    bg: "from-warning to-accent-saffron",
  },
  {
    id: 4,
    titleKey: "fundraiser.mock.pastCampaign3Title",
    descKey: null,
    target: 500000,
    raised: 480000,
    donors: 287,
    status: "Closed",
    emoji: "🏥",
    bg: "from-destructive to-accent-saffron",
  },
];

type MockDonation = {
  id: number;
  nameKey: StringKey;
  amount: number;
  timeKey: StringKey;
  anonymous: boolean;
};

const recentDonations: MockDonation[] = [
  {
    id: 1,
    nameKey: "fundraiser.mock.donor1Name",
    amount: 1001,
    timeKey: "fundraiser.mock.time2HoursAgo",
    anonymous: false,
  },
  {
    id: 2,
    nameKey: "fundraiser.mock.donor2Name",
    amount: 5001,
    timeKey: "fundraiser.mock.timeYesterday",
    anonymous: false,
  },
  {
    id: 3,
    nameKey: "fundraiser.mock.donor3Name",
    amount: 2501,
    timeKey: "fundraiser.mock.timeYesterday",
    anonymous: true,
  },
  {
    id: 4,
    nameKey: "fundraiser.mock.donor4Name",
    amount: 501,
    timeKey: "fundraiser.mock.time2DaysAgo",
    anonymous: false,
  },
  {
    id: 5,
    nameKey: "fundraiser.mock.donor5Name",
    amount: 11000,
    timeKey: "fundraiser.mock.time3DaysAgo",
    anonymous: false,
  },
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
  const goBack = useGoBack();
  const t = useT();
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
              onClick={goBack}
              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center"
              aria-label={t("common.back")}
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">{t("fundraiser.eyebrow")}</div>
              <div className="font-semibold text-foreground truncate">{t("fundraiser.header")}</div>
            </div>
            <button className="relative w-11 h-11 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
          {/* Hero campaign */}
          <section className="px-5 pt-4">
            <article className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
              <div
                className={`relative h-40 bg-gradient-to-br ${activeCampaign.bg} flex items-center justify-center`}
              >
                <span className="text-7xl opacity-90">{activeCampaign.emoji}</span>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/95 text-[11px] font-bold uppercase tracking-wider text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  {t("fundraiser.activeCampaignBadge")}
                </span>
                <button className="absolute top-3 right-3 w-11 h-11 rounded-full bg-card/95 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-foreground leading-snug">
                  {t(activeCampaign.titleKey)}
                </h2>
                {activeCampaign.descKey && (
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {t(activeCampaign.descKey)}
                  </p>
                )}

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      {t("fundraiser.raised")}
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {shortINR(activeCampaign.raised)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-muted-foreground">{t("fundraiser.goal")}</div>
                    <div className="text-sm font-semibold text-foreground">
                      {shortINR(activeCampaign.target)}
                    </div>
                  </div>
                </div>

                <div className="mt-2 h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent-saffron rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <TrendingUp className="w-3.5 h-3.5" />{" "}
                    {t("fundraiser.percentFunded", { percent: progress })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />{" "}
                    {t("fundraiser.contributors", { count: activeCampaign.donors })}
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
                  <h2 className="text-sm font-bold text-foreground">
                    {t("fundraiser.notOpenTitle")}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {t("fundraiser.notOpenBody1")}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t("fundraiser.notOpenBody2")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent contributions */}
          <section className="px-5 pt-6">
            <SectionHeader title={t("fundraiser.recentContributions")} />
            <div className="mt-3 rounded-2xl bg-card border border-border shadow-card divide-y divide-border overflow-hidden">
              {recentDonations.map((d) => {
                const name = t(d.nameKey);
                const initial = d.anonymous ? "?" : name.charAt(0);
                return (
                  <div key={d.id} className="flex items-center gap-3 p-3.5">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shadow-soft ${
                        d.anonymous
                          ? "bg-muted-foreground"
                          : "bg-gradient-to-br from-primary to-accent-saffron"
                      }`}
                    >
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{name}</div>
                      <div className="text-[11px] text-muted-foreground">{t(d.timeKey)}</div>
                    </div>
                    <div className="text-sm font-bold text-success">+{formatINR(d.amount)}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Past campaigns */}
          <section className="px-5 pt-6">
            <SectionHeader title={t("fundraiser.pastCampaigns")} />
            <div className="mt-3 space-y-3">
              {pastCampaigns.map((c) => {
                const pct = Math.min(100, Math.round((c.raised / c.target) * 100));
                const success = c.raised >= c.target;
                return (
                  <article
                    key={c.id}
                    className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex"
                  >
                    <div
                      className={`w-20 shrink-0 bg-gradient-to-br ${c.bg} flex items-center justify-center`}
                    >
                      <span className="text-3xl opacity-90">{c.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">
                          {t(c.titleKey)}
                        </h3>
                        <span
                          className={`shrink-0 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            c.status === "Completed"
                              ? "bg-success-soft text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {t(`fundraiser.status.${c.status}`)}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>
                          {t("fundraiser.raised")}{" "}
                          <span className="text-foreground font-semibold">
                            {shortINR(c.raised)}
                          </span>
                        </span>
                        <span>
                          {t("fundraiser.goal")} {shortINR(c.target)}
                        </span>
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
            <SectionHeader title={t("fundraiser.ourImpact")} />
            <div className="mt-3 rounded-2xl bg-gradient-to-br from-primary to-accent-saffron text-primary-foreground p-4 shadow-elevated">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider opacity-90">
                <Sparkles className="w-3.5 h-3.5" /> {t("fundraiser.togetherRaised")}
              </div>
              <div className="mt-1 text-3xl font-bold">
                {t("fundraiser.mock.totalRaisedDisplay")}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <ImpactStat icon={Award} label={t("fundraiser.campaigns")} value="35" />
                <ImpactStat icon={Users} label={t("fundraiser.beneficiaries")} value="2,100" />
              </div>
            </div>
          </section>

          <div className="text-center text-xs text-muted-foreground py-6">
            {t("fundraiser.thankYou")}
          </div>
        </div>

        {/* Admin FAB */}
        {canPublish && (
          <button className="absolute right-5 bottom-24 z-30 h-14 px-5 rounded-full bg-foreground text-background font-semibold shadow-elevated flex items-center gap-2 active:scale-95 transition">
            <Plus className="w-5 h-5" /> {t("fundraiser.campaignFab")}
          </button>
        )}

        <BottomNav active="fundraiser" />
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

function ImpactStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Award;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-primary-foreground/15 backdrop-blur-sm p-3">
      <Icon className="w-4 h-4 opacity-90" />
      <div className="mt-1 text-lg font-bold leading-tight">{value}</div>
      <div className="text-[11px] opacity-90">{label}</div>
    </div>
  );
}
