import { createLazyFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  BadgeCheck,
  Phone,
  Mail,
  Globe,
  MapPin,
  Navigation,
  Calendar,
  Users,
  Clock,
  UserCircle2,
  ExternalLink,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabel, categoryStyle, type Facility } from "@/lib/facilities-data";
import { useT } from "@/lib/i18n";

export const Route = createLazyFileRoute("/facilities_/$id")({
  component: FacilityDetailPage,
  notFoundComponent: NotFound,
});

function NotFound() {
  const navigate = useNavigate();
  const t = useT();
  return (
    <PhoneFrame>
      <div className="flex flex-col items-center justify-center min-h-screen md:min-h-[860px] px-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="font-bold text-foreground">{t("facility.notFound")}</h2>
        <button
          onClick={() => navigate({ to: "/facilities" })}
          className="mt-4 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          {t("facility.backToDirectory")}
        </button>
      </div>
    </PhoneFrame>
  );
}

function FacilityDetailPage() {
  const { id } = useParams({ from: "/facilities_/$id" });
  const navigate = useNavigate();
  const t = useT();
  const { checking, session } = useRequireAuth();
  const [f, setF] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const [detail, bookmark] = await Promise.all([
        supabase.from("facilities").select("*").eq("id", id).maybeSingle(),
        supabase
          .from("saved_facilities")
          .select("facility_id")
          .eq("user_id", session.user.id)
          .eq("facility_id", id)
          .maybeSingle(),
      ]);
      if (cancelled) return;
      setF(detail.data ?? null);
      setIsSaved(!!bookmark.data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id, session]);

  const toggleSaved = async () => {
    if (!session || !f) return;
    const wasSaved = isSaved;
    setIsSaved(!wasSaved);
    const { error } = wasSaved
      ? await supabase
          .from("saved_facilities")
          .delete()
          .eq("user_id", session.user.id)
          .eq("facility_id", f.id)
      : await supabase
          .from("saved_facilities")
          .insert({ user_id: session.user.id, facility_id: f.id });
    if (error) setIsSaved(wasSaved);
  };

  if (checking || loading) return <LoadingScreen />;
  if (!f) return <NotFound />;

  const style = categoryStyle(f.category);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.address)}`;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Hero */}
        <div
          className={`relative h-64 bg-gradient-to-br ${style.bg} flex items-center justify-center`}
        >
          <span className="text-[140px] opacity-90 select-none">{style.emoji}</span>
          <div className="absolute top-8 left-0 right-0 px-5 flex items-center justify-between">
            <button
              onClick={() => navigate({ to: "/facilities" })}
              className="w-11 h-11 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => void toggleSaved()}
              className="w-11 h-11 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center"
              aria-label={t(isSaved ? "facility.removeBookmark" : "facility.saveFacility")}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? "fill-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Scrollable */}
        <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
          <div className="px-5 pt-4 relative">
            <div className="rounded-2xl bg-card border border-border shadow-card p-4">
              <div className="flex items-start gap-2">
                <h1 className="flex-1 font-bold text-foreground text-lg leading-tight">{f.name}</h1>
                {f.verified && (
                  <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-success/10 text-success px-2 py-1 rounded-full">
                    <BadgeCheck className="w-3 h-3" /> {t("facility.verified")}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {categoryLabel(f.category, t)}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" /> {f.city}, {f.state}
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          {(f.phone || f.email || f.website) && (
            <Section title={t("common.contact")}>
              {f.phone && (
                <InfoRow
                  icon={<Phone className="w-4 h-4" />}
                  label={t("common.phone")}
                  value={f.phone}
                  href={`tel:${f.phone}`}
                />
              )}
              {f.email && (
                <InfoRow
                  icon={<Mail className="w-4 h-4" />}
                  label={t("facility.email")}
                  value={f.email}
                  href={`mailto:${f.email}`}
                />
              )}
              {f.website && (
                <InfoRow
                  icon={<Globe className="w-4 h-4" />}
                  label={t("facility.website")}
                  value={f.website}
                  href={`https://${f.website}`}
                />
              )}
            </Section>
          )}

          {/* Address */}
          <Section title={t("facility.address")}>
            <p className="text-sm text-foreground leading-relaxed">{f.address}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold w-full"
            >
              <ExternalLink className="w-4 h-4" /> {t("facility.openInMaps")}
            </a>
          </Section>

          {/* About */}
          {f.long_description && (
            <Section title={t("common.about")}>
              <p className="text-sm text-foreground leading-relaxed">{f.long_description}</p>
            </Section>
          )}

          {/* Key Info */}
          {(f.established !== null || f.capacity || f.timings || f.head) && (
            <Section title={t("facility.keyInfo")}>
              <div className="grid grid-cols-2 gap-2.5">
                {f.established !== null && (
                  <KeyInfo
                    icon={<Calendar className="w-4 h-4" />}
                    label={t("facility.established")}
                    value={String(f.established)}
                  />
                )}
                {f.capacity && (
                  <KeyInfo
                    icon={<Users className="w-4 h-4" />}
                    label={t("facility.capacity")}
                    value={f.capacity}
                  />
                )}
                {f.timings && (
                  <KeyInfo
                    icon={<Clock className="w-4 h-4" />}
                    label={t("facility.timings")}
                    value={f.timings}
                  />
                )}
                {f.head && (
                  <KeyInfo
                    icon={<UserCircle2 className="w-4 h-4" />}
                    label={t("facility.head")}
                    value={f.head}
                  />
                )}
              </div>
            </Section>
          )}

          {/* Map preview */}
          <Section title={t("facility.location")}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl overflow-hidden border border-border shadow-card"
            >
              <div className="h-40 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary-soft),var(--color-muted))] relative flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative w-12 h-12 rounded-full bg-destructive text-white flex items-center justify-center shadow-elevated">
                  <MapPin className="w-6 h-6 fill-white" />
                </div>
              </div>
              <div className="p-3 bg-card flex items-center justify-between">
                <span className="text-xs text-muted-foreground truncate">{f.address}</span>
                <ExternalLink className="w-4 h-4 text-primary shrink-0 ml-2" />
              </div>
            </a>
          </Section>
        </div>

        {/* Sticky action bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-4 py-3 pb-5 flex gap-2">
          {f.phone && (
            <a
              href={`tel:${f.phone}`}
              className="flex-1 h-12 rounded-xl bg-success text-success-foreground text-sm font-semibold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" /> {t("common.callNow")}
            </a>
          )}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-4 h-4" /> {t("facilities.directions")}
          </a>
          <button
            onClick={() => void shareFacility(f)}
            className="w-12 h-12 rounded-xl bg-muted text-foreground flex items-center justify-center"
            aria-label={t("common.share")}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

/** Native share sheet where available, clipboard otherwise. */
async function shareFacility(f: Facility) {
  const text = `${f.name}\n${f.address}${f.phone ? `\n${f.phone}` : ""}`;
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: f.name, text });
      return;
    } catch {
      // User dismissed the share sheet — fall through to the clipboard copy.
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked; nothing useful left to try.
    }
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 pt-5">
      <h2 className="font-bold text-foreground text-sm mb-2.5">{title}</h2>
      <div className="rounded-2xl bg-card border border-border shadow-soft p-4">{children}</div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 py-2 first:pt-0 last:pb-0 border-b last:border-b-0 border-border/60"
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground truncate">{value}</div>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
    </a>
  );
}

function KeyInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-2.5">
      <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground leading-tight">{value}</div>
    </div>
  );
}
