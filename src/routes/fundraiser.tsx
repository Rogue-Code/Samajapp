import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronLeft, Bell, Home as HomeIcon, Building, HandHeart, User,
  Users, Copy, Check, Share2, Shield, TrendingUp, Award, Heart,
  Plus, X, QrCode, Smartphone, ChevronRight, Sparkles, Building2,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/fundraiser")({
  component: FundraiserPage,
  head: () => ({ meta: [{ title: "Fundraiser — Sangath" }] }),
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

const QUICK_AMOUNTS = [101, 501, 1001, 5001];

const UPI_APPS = [
  { id: "gpay", label: "Google Pay", color: "from-success to-primary", emoji: "G" },
  { id: "phonepe", label: "PhonePe", color: "from-accent-foreground to-primary", emoji: "P" },
  { id: "paytm", label: "Paytm", color: "from-primary to-accent-saffron", emoji: "P" },
  { id: "bhim", label: "BHIM", color: "from-warning to-accent-saffron", emoji: "B" },
];

const BANK = {
  accountName: "Samaj Education Trust",
  bankName: "HDFC Bank",
  accountNumber: "50100123456789",
  ifsc: "HDFC0001234",
  branch: "Navrangpura, Ahmedabad",
};

const UPI_ID = "educationtrust@upi";

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
  const [amount, setAmount] = useState<number | "">("");
  const [showPay, setShowPay] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const isAuthorized = true;

  const progress = useMemo(
    () => Math.min(100, Math.round((activeCampaign.raised / activeCampaign.target) * 100)),
    [],
  );

  const copy = async (label: string, value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try { await navigator.clipboard.writeText(value); } catch {}
    }
    setCopied(label);
    setTimeout(() => setCopied((c) => (c === label ? null : c)), 1800);
  };

  const copyBankDetails = () => {
    const text = `${BANK.accountName}\n${BANK.bankName}\nA/C: ${BANK.accountNumber}\nIFSC: ${BANK.ifsc}\nBranch: ${BANK.branch}`;
    copy("bank", text);
  };

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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
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

          {/* Donate – QR + UPI */}
          <section className="px-5 pt-5">
            <SectionHeader title="Donate via UPI" />
            <div className="mt-3 rounded-2xl bg-card border border-border shadow-card p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-44 h-44 rounded-2xl bg-background border-2 border-border p-3 flex items-center justify-center shadow-soft">
                  <QrPlaceholder />
                </div>
                <div className="mt-3 text-sm font-semibold text-foreground">{BANK.accountName}</div>
                <button
                  onClick={() => copy("upi", UPI_ID)}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-foreground text-[12px] font-medium"
                >
                  <span className="font-mono">{UPI_ID}</span>
                  {copied === "upi" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-success">
                  <Shield className="w-3 h-3" /> Verified Trust · 80G Eligible
                </div>
              </div>
            </div>
          </section>

          {/* Quick amounts + custom */}
          <section className="px-5 pt-5">
            <SectionHeader title="Choose an Amount" />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((a) => {
                const active = amount === a;
                return (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`h-14 rounded-xl border-2 text-sm font-bold transition ${
                      active
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    ₹{a.toLocaleString("en-IN")}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center gap-2 h-14 px-4 rounded-xl bg-muted border border-border">
              <span className="text-lg font-bold text-muted-foreground">₹</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={amount === "" ? "" : amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                placeholder="Enter custom amount"
                className="flex-1 bg-transparent outline-none text-base font-semibold"
              />
            </div>

            <button
              onClick={() => setShowPay(true)}
              disabled={!amount || Number(amount) < 1}
              className="mt-4 w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-elevated active:scale-[0.98] transition disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-primary-foreground" />
              Donate {amount ? `${formatINR(Number(amount))}` : "Now"}
            </button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Donations are tax-deductible under Section 80G
            </p>
          </section>

          {/* Bank details */}
          <section className="px-5 pt-6">
            <SectionHeader title="Bank Transfer Details" />
            <div className="mt-3 rounded-2xl bg-card border border-border shadow-card p-4 space-y-3">
              <BankRow label="Account Name" value={BANK.accountName} />
              <BankRow label="Bank Name" value={BANK.bankName} />
              <BankRow label="Account Number" value={BANK.accountNumber} mono />
              <BankRow label="IFSC Code" value={BANK.ifsc} mono />
              <BankRow label="Branch" value={BANK.branch} />
              <button
                onClick={copyBankDetails}
                className="w-full h-11 rounded-xl bg-muted text-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                {copied === "bank" ? (
                  <><Check className="w-4 h-4 text-success" /> Details Copied</>
                ) : (
                  <><Copy className="w-4 h-4" /> Copy All Bank Details</>
                )}
              </button>
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
        {isAuthorized && (
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

        {showPay && (
          <PaySheet
            amount={Number(amount) || 0}
            upiId={UPI_ID}
            onClose={() => setShowPay(false)}
            onCopy={(v) => copy("upi", v)}
            copied={copied === "upi"}
          />
        )}
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

function BankRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-[11.5px] text-muted-foreground">{label}</div>
      <div className={`text-sm font-semibold text-foreground text-right truncate ${mono ? "font-mono" : ""}`}>
        {value}
      </div>
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

function QrPlaceholder() {
  // Decorative QR mosaic — keeps the page self-contained without external assets.
  const cells = Array.from({ length: 25 * 25 }, (_, i) => {
    const r = Math.floor(i / 25);
    const c = i % 25;
    const corner =
      (r < 7 && c < 7) || (r < 7 && c > 17) || (r > 17 && c < 7);
    const filled = corner ? (r > 0 && r < 6 && c > 0 && c < 6 ? false : true) : (i * 31 + r * 7) % 5 < 2;
    return filled;
  });
  return (
    <div className="grid grid-cols-25 gap-px w-full h-full" style={{ gridTemplateColumns: "repeat(25, 1fr)" }}>
      {cells.map((on, i) => (
        <div key={i} className={on ? "bg-foreground" : "bg-transparent"} />
      ))}
    </div>
  );
}

function PaySheet({
  amount, upiId, onClose, onCopy, copied,
}: {
  amount: number;
  upiId: string;
  onClose: () => void;
  onCopy: (value: string) => void;
  copied: boolean;
}) {
  const buildUpiLink = (scheme: string) =>
    `${scheme}://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Samaj Education Trust")}&am=${amount}&cu=INR&tn=${encodeURIComponent("Community Donation")}`;

  const handleApp = (id: string) => {
    const scheme = id === "gpay" ? "tez" : id === "phonepe" ? "phonepe" : id === "paytm" ? "paytmmp" : "upi";
    if (typeof window !== "undefined") window.location.href = buildUpiLink(scheme);
  };

  return (
    <div className="absolute inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center">
      <div className="w-full md:max-w-md bg-card rounded-t-3xl md:rounded-3xl shadow-elevated">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Choose Payment App</h3>
            <p className="text-[11.5px] text-muted-foreground">Donating {formatINR(amount)}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="grid grid-cols-4 gap-3">
            {UPI_APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => handleApp(a.id)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white font-bold text-lg shadow-card`}>
                  {a.emoji}
                </div>
                <span className="text-[11px] font-medium text-foreground text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-muted p-3 flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-muted-foreground">UPI App not installed?</div>
              <div className="text-sm font-mono font-semibold text-foreground truncate">{upiId}</div>
            </div>
            <button
              onClick={() => onCopy(upiId)}
              className="h-9 px-3 rounded-lg bg-card border border-border text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? <><Check className="w-3.5 h-3.5 text-success" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Building2 className="w-3.5 h-3.5" /> Payment goes directly to Samaj Education Trust
          </div>
        </div>

        <div className="border-t border-border px-5 py-3">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-muted text-foreground text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
