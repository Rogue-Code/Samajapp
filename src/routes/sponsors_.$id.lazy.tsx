import { createLazyFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Globe, Phone, UserCircle2 } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";

export const Route = createLazyFileRoute("/sponsors_/$id")({
  component: SponsorDetailPage,
  notFoundComponent: NotFound,
});

type Sponsor = {
  id: string;
  name: string;
  description: string | null;
  emoji: string;
  image_url: string | null;
  image_original_url: string | null;
  owner_name: string | null;
  phone: string | null;
  link_url: string | null;
  facility_id: string | null;
};

const SELECT =
  "id, name, description, emoji, image_url, image_original_url, owner_name, phone, link_url, facility_id";

function NotFound() {
  const navigate = useNavigate();
  const t = useT();
  return (
    <PhoneFrame>
      <div className="flex flex-col items-center justify-center min-h-screen md:min-h-[860px] px-8 text-center">
        <div className="text-6xl mb-4">📣</div>
        <h2 className="font-bold text-foreground">{t("sponsor.notFound")}</h2>
        <button
          onClick={() => navigate({ to: "/home" })}
          className="mt-4 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          {t("sponsor.backToHome")}
        </button>
      </div>
    </PhoneFrame>
  );
}

function SponsorDetailPage() {
  const { id } = useParams({ from: "/sponsors_/$id" });
  const navigate = useNavigate();
  const t = useT();
  const { checking, session } = useRequireAuth();
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("sponsors").select(SELECT).eq("id", id).maybeSingle();
      if (cancelled) return;
      setSponsor((data as Sponsor) ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id, session]);

  if (checking || loading) return <LoadingScreen />;
  if (!sponsor) return <NotFound />;

  // The banner stores a square crop; this page has room for the whole poster, so
  // it prefers the original when one was kept.
  const artwork = sponsor.image_original_url ?? sponsor.image_url;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/*
          A real header rather than controls floated over the artwork — same
          reasoning as the Home banner: sponsor designs carry their own logo and
          text in the corners.
        */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/home" })}
              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
              aria-label={t("common.back")}
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-muted-foreground">{t("home.sponsored")}</div>
              <h1 className="font-bold text-foreground leading-tight truncate">{sponsor.name}</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-8" style={{ scrollbarWidth: "none" }}>
          {/* Artwork, whole. object-contain rather than cover so a portrait poster
              is readable instead of re-cropped. */}
          <div className="px-5 pt-4">
            <div className="rounded-2xl overflow-hidden border border-border bg-muted shadow-card">
              {artwork ? (
                <img src={artwork} alt={sponsor.name} className="w-full h-auto object-contain" />
              ) : (
                <div className="aspect-square w-full flex items-center justify-center text-7xl">
                  {sponsor.emoji}
                </div>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 px-1">{t("sponsor.disclosure")}</p>
          </div>

          {sponsor.description && (
            <Section title={t("common.about")}>
              <p className="text-sm text-foreground leading-relaxed">{sponsor.description}</p>
            </Section>
          )}

          {(sponsor.owner_name || sponsor.phone) && (
            <Section title={t("common.contact")}>
              {sponsor.owner_name && (
                <Row
                  icon={<UserCircle2 className="w-4 h-4" />}
                  label={t("sponsor.owner")}
                  value={sponsor.owner_name}
                />
              )}
              {sponsor.phone && (
                <a
                  href={`tel:${sponsor.phone}`}
                  className="flex items-center gap-3 py-2 first:pt-0 last:pb-0 border-b last:border-b-0 border-border/60"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-muted-foreground">{t("common.phone")}</div>
                    <div className="text-sm font-medium text-foreground truncate">
                      {sponsor.phone}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                </a>
              )}
            </Section>
          )}

          {/*
            No Call button and no share icon: the Phone row in Contact is itself a
            tel: link, so a second control did the same thing, and the header
            share duplicated the platform's own share sheet.
          */}
          {(sponsor.link_url || sponsor.facility_id) && (
            <div className="px-5 pt-5 space-y-2.5">
              {sponsor.link_url && (
                <a
                  href={sponsor.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
                >
                  <Globe className="w-4 h-4" /> {t("sponsor.visitWebsite")}
                </a>
              )}
              {sponsor.facility_id && (
                <button
                  onClick={() =>
                    navigate({ to: "/facilities/$id", params: { id: sponsor.facility_id! } })
                  }
                  className="w-full h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
                >
                  <ExternalLink className="w-4 h-4" /> {t("sponsor.viewFacility")}
                </button>
              )}
            </div>
          )}
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

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 first:pt-0 last:pb-0 border-b last:border-b-0 border-border/60">
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}
