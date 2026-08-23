import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search, ArrowLeft, MapPin, Phone, Navigation, Bookmark,
  ChevronDown, BadgeCheck, Home as HomeIcon, Building, HandHeart, User,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { categoryStyle, states, categories, cities, type Facility } from "@/lib/facilities-data";

export const Route = createFileRoute("/facilities")({
  component: FacilitiesPage,
  head: () => ({
    meta: [
      { title: "Facilities Directory — Sangath" },
      { name: "description", content: "Search community schools, hospitals, hostels, banks and more." },
    ],
  }),
});

function FacilitiesPage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [state, setState] = useState("All States");
  const [category, setCategory] = useState<string>("All Categories");
  const [city, setCity] = useState("All Cities");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const [list, bookmarks] = await Promise.all([
        supabase.from("facilities").select("*").order("name"),
        supabase.from("saved_facilities").select("facility_id").eq("user_id", session.user.id),
      ]);
      if (cancelled) return;
      if (list.error) {
        setError(friendlyAuthError(list.error.message));
      } else {
        setFacilities(list.data ?? []);
      }
      if (bookmarks.data) {
        setSaved(new Set(bookmarks.data.map((b) => b.facility_id)));
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const toggleSaved = async (facilityId: string) => {
    if (!session) return;
    const wasSaved = saved.has(facilityId);
    // Optimistic — the row is tiny and reverting on error keeps the list responsive.
    setSaved((prev) => {
      const next = new Set(prev);
      if (wasSaved) next.delete(facilityId);
      else next.add(facilityId);
      return next;
    });
    const { error: saveError } = wasSaved
      ? await supabase
          .from("saved_facilities")
          .delete()
          .eq("user_id", session.user.id)
          .eq("facility_id", facilityId)
      : await supabase
          .from("saved_facilities")
          .insert({ user_id: session.user.id, facility_id: facilityId });
    if (saveError) {
      setSaved((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.add(facilityId);
        else next.delete(facilityId);
        return next;
      });
      setError(friendlyAuthError(saveError.message));
    }
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return facilities.filter((f) => {
      if (
        term &&
        ![f.name, f.category, f.city, f.state, f.head ?? ""].some((v) => v.toLowerCase().includes(term))
      )
        return false;
      if (state !== "All States" && f.state !== state) return false;
      if (category !== "All Categories" && f.category !== category) return false;
      if (city !== "All Cities" && f.city !== city) return false;
      if (verifiedOnly && !f.verified) return false;
      return true;
    });
  }, [facilities, q, state, category, city, verifiedOnly]);

  if (checking || loading) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Sticky header */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => navigate({ to: "/home" })} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-foreground text-lg leading-tight">Facilities</h1>
                <p className="text-[11px] text-muted-foreground">{filtered.length} of {facilities.length} listings</p>
              </div>
            </div>
            <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-2xl shadow-soft">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search facilities, schools, hospitals, hostels..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto pt-3 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              <DropdownChip label={state} options={states} onSelect={setState} open={openDrop === "state"} setOpen={(o) => setOpenDrop(o ? "state" : null)} />
              <DropdownChip label={category} options={categories as string[]} onSelect={setCategory} open={openDrop === "cat"} setOpen={(o) => setOpenDrop(o ? "cat" : null)} />
              <DropdownChip label={city} options={cities} onSelect={setCity} open={openDrop === "city"} setOpen={(o) => setOpenDrop(o ? "city" : null)} />
              <ToggleChip active={verifiedOnly} onClick={() => setVerifiedOnly((v) => !v)} icon={<BadgeCheck className="w-3.5 h-3.5" />} label="Verified" />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-5xl mb-4">🔍</div>
              <p className="font-semibold text-foreground">
                {facilities.length === 0 ? "No facilities listed yet" : "No facilities found"}
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-[260px]">
                {facilities.length === 0
                  ? "The community directory hasn't been set up yet."
                  : "Try changing your search or filters."}
              </p>
            </div>
          )}
          {filtered.map((f) => {
            const isSaved = saved.has(f.id);
            const style = categoryStyle(f.category);
            return (
              <Link
                key={f.id}
                to="/facilities/$id"
                params={{ id: f.id }}
                className="block rounded-2xl bg-card border border-border shadow-card overflow-hidden active:scale-[0.99] transition"
              >
                <div className="flex">
                  <div className={`w-24 shrink-0 bg-gradient-to-br ${style.bg} flex items-center justify-center text-4xl`}>
                    {style.emoji}
                  </div>
                  <div className="flex-1 min-w-0 p-3">
                    <div className="flex items-start gap-1.5">
                      <h3 className="flex-1 font-semibold text-foreground text-sm leading-tight line-clamp-2">{f.name}</h3>
                      {f.verified && <BadgeCheck className="w-4 h-4 text-primary shrink-0" />}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">{f.category}</span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {f.city}, {f.state}</span>
                    </div>
                    <p className="text-[11.5px] text-muted-foreground mt-1.5 line-clamp-2 leading-snug">{f.description}</p>
                  </div>
                </div>
                <div className="flex border-t border-border/60">
                  {f.phone && (
                    <ActionBtn icon={<Phone className="w-3.5 h-3.5" />} label="Call" onClick={(e) => { e.preventDefault(); window.location.href = `tel:${f.phone}`; }} />
                  )}
                  <ActionBtn icon={<Navigation className="w-3.5 h-3.5" />} label="Directions" onClick={(e) => { e.preventDefault(); window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.address)}`); }} />
                  <ActionBtn
                    icon={<Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-primary text-primary" : ""}`} />}
                    label={isSaved ? "Saved" : "Save"}
                    onClick={(e) => { e.preventDefault(); void toggleSaved(f.id); }}
                  />
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

function DropdownChip({ label, options, onSelect, open, setOpen }: {
  label: string; options: string[]; onSelect: (v: string) => void; open: boolean; setOpen: (v: boolean) => void;
}) {
  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="h-8 px-3 rounded-full bg-card border border-border text-xs font-semibold text-foreground flex items-center gap-1 shadow-soft"
      >
        {label} <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-10 left-0 z-40 min-w-[160px] bg-card border border-border rounded-xl shadow-elevated py-1 max-h-60 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onSelect(o); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-muted text-foreground"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ToggleChip({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 transition shadow-soft border ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 h-10 flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground border-r last:border-r-0 border-border/60 active:bg-muted transition"
    >
      {icon} {label}
    </button>
  );
}

export function BottomNav({ active }: { active: "home" | "facilities" | "fundraiser" | "profile" }) {
  const navigate = useNavigate();
  const items = [
    { id: "home", icon: HomeIcon, label: "Home", to: "/home" as const },
    { id: "facilities", icon: Building, label: "Facilities", to: "/facilities" as const },
    { id: "fundraiser", icon: HandHeart, label: "Fundraiser", to: "/fundraiser" as const },
    { id: "profile", icon: User, label: "Profile", to: "/account" as const },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
      <div className="flex items-center justify-around">
        {items.map((n) => {
          const isActive = active === n.id;
          return (
            <button key={n.id} onClick={() => navigate({ to: n.to })} className="flex flex-col items-center gap-1 py-1 px-4 relative">
              {isActive && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
              <n.icon className={`w-5 h-5 transition ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10.5px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
