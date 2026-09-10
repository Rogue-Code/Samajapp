import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft, MapPin, Phone, BadgeCheck, UserCircle2 } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { categoryLabel, categoryStyle, type Facility } from "@/lib/facilities-data";
import { BottomNav } from "@/components/BottomNav";
import { useT } from "@/lib/i18n";

export const Route = createLazyFileRoute("/facilities")({
  component: FacilitiesPage,
});

function FacilitiesPage() {
  const navigate = useNavigate();
  const t = useT();
  const { checking, session } = useRequireAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const list = await supabase.from("facilities").select("*").order("name");
      if (cancelled) return;
      if (list.error) {
        setError(friendlyAuthError(list.error.message));
      } else {
        setFacilities(list.data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return facilities.filter((f) => {
      if (
        term &&
        ![f.name, f.category, f.city, f.state, f.head ?? ""].some((v) =>
          v.toLowerCase().includes(term),
        )
      )
        return false;
      return true;
    });
  }, [facilities, q]);

  if (checking || loading) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Sticky header */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => navigate({ to: "/home" })}
                aria-label={t("common.back")}
                className="w-11 h-11 rounded-full bg-muted flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-foreground text-lg leading-tight">
                  {t("nav.facilities")}
                </h1>
                <p className="text-[11px] text-muted-foreground">
                  {t("facilities.countLine", { shown: filtered.length, total: facilities.length })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-2xl shadow-soft">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("facilities.searchPlaceholder")}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div
          className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-3"
          style={{ scrollbarWidth: "none" }}
        >
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-5xl mb-4">
                🔍
              </div>
              <p className="font-semibold text-foreground">
                {t(facilities.length === 0 ? "facilities.noneYet" : "facilities.noMatch")}
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-[260px]">
                {t(facilities.length === 0 ? "facilities.noneYetHint" : "facilities.noMatchHint")}
              </p>
            </div>
          )}
          {filtered.map((f) => {
            const style = categoryStyle(f.category);
            return (
              <Link
                key={f.id}
                to="/facilities/$id"
                params={{ id: f.id }}
                className="block rounded-2xl bg-card border border-border shadow-card overflow-hidden active:scale-[0.99] transition"
              >
                <div className="flex">
                  <div
                    className={`w-24 shrink-0 bg-gradient-to-br ${style.bg} flex items-center justify-center text-4xl`}
                  >
                    {style.emoji}
                  </div>
                  <div className="flex-1 min-w-0 p-3">
                    <div className="flex items-start gap-1.5">
                      <h3 className="flex-1 font-semibold text-foreground text-sm leading-tight line-clamp-2">
                        {f.name}
                      </h3>
                      {f.verified && <BadgeCheck className="w-4 h-4 text-primary shrink-0" />}
                    </div>
                    <span className="mt-1.5 inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {categoryLabel(f.category, t)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-snug">
                      {f.description}
                    </p>
                    {/* Office details — what the previous city/state line was
                        replaced with: the office's actual address, phone and
                        the person who runs it, rather than a coarse location. */}
                    <div className="mt-2 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="line-clamp-1">{f.address}</span>
                      </div>
                      {f.phone && (
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Phone className="w-3 h-3 shrink-0" />
                          <span className="truncate">{f.phone}</span>
                        </div>
                      )}
                      {f.head && (
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <UserCircle2 className="w-3 h-3 shrink-0" />
                          <span className="truncate">{f.head}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom nav */}
        <BottomNav active="facilities" />
      </div>
    </PhoneFrame>
  );
}
