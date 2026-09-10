import { createLazyFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Share2,
  Check,
  BadgeCheck,
  Phone,
  Mail,
  Globe,
  MapPin,
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
import { categoryLabel, categoryStyle, shareFacility, type Facility } from "@/lib/facilities-data";
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
  // Whether the sticky Share button just copied the facility's details to the
  // clipboard, so the tap has a visible result — see the note on shareFacility.
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const detail = await supabase.from("facilities").select("*").eq("id", id).maybeSingle();
      if (cancelled) return;
      setF(detail.data ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id, session]);

  if (checking || loading) return <LoadingScreen />;
  if (!f) return <NotFound />;

  const style = categoryStyle(f.category);

  const handleShare = async () => {
    const outcome = await shareFacility(f);
    if (outcome !== "copied") return;
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    setCopied(true);
    copiedTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Hero */}
        <div
          className={`relative h-64 bg-gradient-to-br ${style.bg} flex items-center justify-center`}
        >
          <span className="text-[140px] opacity-90 select-none">{style.emoji}</span>
          <div className="absolute top-8 left-0 right-0 px-5">
            <button
              onClick={() => navigate({ to: "/facilities" })}
              className="w-11 h-11 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
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
              <span className="mt-2 inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {categoryLabel(f.category, t)}
              </span>
            </div>
          </div>

          {/* Office Details — the practical basics for reaching this facility:
              where it is, its phone number, and who runs it. Always present,
              since address is required data; phone and head appear only when
              the admin set them. This is what a member sees on every listing,
              not just the ones with a full profile filled in. */}
          <Section title={t("facility.officeDetails")}>
            <InfoText
              icon={<MapPin className="w-4 h-4" />}
              label={t("facility.address")}
              value={f.address}
              wrap
            />
            {f.phone && (
              <InfoRow
                icon={<Phone className="w-4 h-4" />}
                label={t("common.phone")}
                value={f.phone}
                href={`tel:${f.phone}`}
              />
            )}
            {f.head && (
              <InfoText
                icon={<UserCircle2 className="w-4 h-4" />}
                label={t("facility.head")}
                value={f.head}
              />
            )}
          </Section>

          {/* Contact */}
          {(f.email || f.website) && (
            <Section title={t("common.contact")}>
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

          {/* About */}
          {f.long_description && (
            <Section title={t("common.about")}>
              <p className="text-sm text-foreground leading-relaxed">{f.long_description}</p>
            </Section>
          )}

          {/* Key Info */}
          {(f.established !== null || f.capacity || f.timings) && (
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
              </div>
            </Section>
          )}
        </div>

        {/* Sticky action bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-4 py-3 pb-5">
          <button
            onClick={() => void handleShare()}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" /> {t("common.copiedToClipboard")}
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" /> {t("common.share")}
              </>
            )}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
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

/**
 * Same row shape as InfoRow, minus the link — for details a member can read
 * but there's nothing useful to tap through to (an address with no maps
 * shortcut, the name of who runs the place).
 */
function InfoText({
  icon,
  label,
  value,
  wrap = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  wrap?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2 first:pt-0 last:pb-0 border-b last:border-b-0 border-border/60">
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div
          className={`text-sm font-medium text-foreground ${wrap ? "leading-relaxed" : "truncate"}`}
        >
          {value}
        </div>
      </div>
    </div>
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
