import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft, Plus, Pencil, Trash2, ShieldCheck, Building, Calendar,
  Megaphone, Users, BadgeCheck,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { categories } from "@/lib/facilities-data";
import { AdminField, AdminSelect, AdminSheet } from "@/components/admin/AdminForm";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Sangath" }] }),
});

type Tab = "facilities" | "events" | "sponsors" | "members";

type FacilityRow = {
  id: string; name: string; category: string; city: string; state: string;
  address: string; description: string | null; long_description: string | null;
  phone: string | null; email: string | null; website: string | null;
  head: string | null; established: number | null; capacity: string | null;
  timings: string | null; verified: boolean;
};
type EventRow = {
  id: string; title: string; starts_at: string; location: string | null; emoji: string;
};
type SponsorRow = {
  id: string; name: string; description: string | null; emoji: string;
  facility_id: string | null; link_url: string | null; active: boolean; sort_order: number;
};
type MemberRow = { id: string; full_name: string | null; village: string | null; role: string };

const FACILITY_CATEGORIES = categories.filter((c) => c !== "All Categories") as string[];
const ROLES = ["member", "committee", "admin"] as const;

/** "2026-08-24T10:30" for a datetime-local input, in the viewer's own timezone. */
function toLocalInput(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function AdminPage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const { isAdmin, canPublish, loading: roleLoading } = useProfileRole(session);
  const [tab, setTab] = useState<Tab>("facilities");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [facilities, setFacilities] = useState<FacilityRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [sponsors, setSponsors] = useState<SponsorRow[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);

  const [editFacility, setEditFacility] = useState<Partial<FacilityRow> | null>(null);
  const [editEvent, setEditEvent] = useState<Partial<EventRow> | null>(null);
  const [editSponsor, setEditSponsor] = useState<Partial<SponsorRow> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!session) return;
    const [f, e, s, m] = await Promise.all([
      supabase.from("facilities").select("*").order("name"),
      supabase.from("events").select("id, title, starts_at, location, emoji").order("starts_at"),
      supabase.from("sponsors").select("id, name, description, emoji, facility_id, link_url, active, sort_order").order("sort_order"),
      supabase.from("profiles").select("id, full_name, village, role").order("full_name"),
    ]);
    setFacilities(f.data ?? []);
    setEvents(e.data ?? []);
    setSponsors(s.data ?? []);
    setMembers(m.data ?? []);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    void load();
  }, [load]);

  // Supabase query builders are thenable but not real Promises, so accept both.
  const run = async (action: () => PromiseLike<{ error: { message: string } | null }>) => {
    setSaving(true);
    const { error: actionError } = await action();
    setSaving(false);
    if (actionError) {
      setError(friendlyAuthError(actionError.message));
      return false;
    }
    setError("");
    await load();
    return true;
  };

  const saveFacility = async () => {
    if (!editFacility?.name || !editFacility.address) return;
    const id = editFacility.id ?? slugify(editFacility.name);
    const payload = {
      id,
      name: editFacility.name,
      category: editFacility.category ?? FACILITY_CATEGORIES[0],
      city: editFacility.city ?? "",
      state: editFacility.state ?? "",
      address: editFacility.address,
      description: editFacility.description || null,
      long_description: editFacility.long_description || null,
      phone: editFacility.phone || null,
      email: editFacility.email || null,
      website: editFacility.website || null,
      head: editFacility.head || null,
      established: editFacility.established ? Number(editFacility.established) : null,
      capacity: editFacility.capacity || null,
      timings: editFacility.timings || null,
      verified: editFacility.verified ?? false,
    };
    const ok = await run(() => supabase.from("facilities").upsert(payload));
    if (ok) setEditFacility(null);
  };

  const saveEvent = async () => {
    if (!editEvent?.title || !editEvent.starts_at) return;
    const payload = {
      title: editEvent.title,
      starts_at: new Date(editEvent.starts_at).toISOString(),
      location: editEvent.location || null,
      emoji: editEvent.emoji || "📅",
      created_by: session?.user.id ?? null,
    };
    const ok = await run(() =>
      editEvent.id
        ? supabase.from("events").update(payload).eq("id", editEvent.id)
        : supabase.from("events").insert(payload),
    );
    if (ok) setEditEvent(null);
  };

  const saveSponsor = async () => {
    if (!editSponsor?.name) return;
    const payload = {
      name: editSponsor.name,
      description: editSponsor.description || null,
      emoji: editSponsor.emoji || "🏢",
      facility_id: editSponsor.facility_id || null,
      link_url: editSponsor.link_url || null,
      active: editSponsor.active ?? true,
      sort_order: Number(editSponsor.sort_order) || 0,
    };
    const ok = await run(() =>
      editSponsor.id
        ? supabase.from("sponsors").update(payload).eq("id", editSponsor.id)
        : supabase.from("sponsors").insert(payload),
    );
    if (ok) setEditSponsor(null);
  };

  const changeRole = async (memberId: string, role: string) => {
    await run(async () => {
      const { error: rpcError } = await supabase.rpc("set_member_role", {
        target_id: memberId,
        new_role: role,
      });
      return { error: rpcError };
    });
  };

  if (checking || roleLoading || loading) return <LoadingScreen />;

  if (!canPublish) {
    return (
      <PhoneFrame>
        <div className="flex flex-col items-center justify-center min-h-screen md:min-h-[860px] px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShieldCheck className="w-9 h-9 text-muted-foreground" />
          </div>
          <h1 className="font-bold text-foreground text-lg">Admin access only</h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-[280px]">
            This area is for committee members and administrators.
          </p>
          <button
            onClick={() => navigate({ to: "/home" })}
            className="mt-6 h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            Back to Home
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const TABS: { id: Tab; label: string; icon: typeof Building; adminOnly: boolean }[] = [
    { id: "facilities", label: "Facilities", icon: Building, adminOnly: true },
    { id: "events", label: "Events", icon: Calendar, adminOnly: false },
    { id: "sponsors", label: "Sponsors", icon: Megaphone, adminOnly: true },
    { id: "members", label: "Members", icon: Users, adminOnly: true },
  ];
  const visibleTabs = TABS.filter((t) => isAdmin || !t.adminOnly);
  const activeTab = visibleTabs.some((t) => t.id === tab) ? tab : visibleTabs[0].id;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px] bg-background">
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/home" })}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-foreground text-lg leading-tight">Admin</h1>
              <p className="text-[11px] text-muted-foreground">
                {isAdmin ? "Administrator" : "Committee member"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 pb-3" style={{ scrollbarWidth: "none" }}>
            {visibleTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 h-9 px-3.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition ${
                  activeTab === t.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border"
                }`}
              >
                <t.icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-3" style={{ scrollbarWidth: "none" }}>
          {error && <p className="text-sm text-destructive">{error}</p>}

          {activeTab === "facilities" && (
            <>
              <AddButton label="Add Facility" onClick={() => setEditFacility({ verified: false })} />
              {facilities.map((f) => (
                <RowCard
                  key={f.id}
                  title={f.name}
                  subtitle={`${f.category} · ${f.city}, ${f.state}`}
                  badge={f.verified ? "Verified" : undefined}
                  onEdit={() => setEditFacility(f)}
                  onDelete={() => void run(() => supabase.from("facilities").delete().eq("id", f.id))}
                />
              ))}
              {facilities.length === 0 && (
                <EmptyNote
                  title="No facilities listed yet"
                  text="Add the community's schools, hospitals, hostels, banks and halls here. Each one gets its own page with contact details and directions."
                />
              )}
            </>
          )}

          {activeTab === "events" && (
            <>
              <AddButton label="Add Event" onClick={() => setEditEvent({ emoji: "📅" })} />
              {events.map((e) => (
                <RowCard
                  key={e.id}
                  title={`${e.emoji} ${e.title}`}
                  subtitle={`${new Date(e.starts_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}${e.location ? ` · ${e.location}` : ""}`}
                  onEdit={() => setEditEvent(e)}
                  onDelete={() => void run(() => supabase.from("events").delete().eq("id", e.id))}
                />
              ))}
              {events.length === 0 && (
                <EmptyNote
                  title="No events scheduled"
                  text="Add gatherings, camps and meetings. They show on the Home dashboard with a Register button until the date passes."
                />
              )}
            </>
          )}

          {activeTab === "sponsors" && (
            <>
              <AddButton label="Add Sponsor" onClick={() => setEditSponsor({ emoji: "🏢", active: true, sort_order: sponsors.length + 1 })} />
              {sponsors.map((s) => (
                <RowCard
                  key={s.id}
                  title={`${s.emoji} ${s.name}`}
                  subtitle={s.description ?? "No description"}
                  badge={s.active ? undefined : "Hidden"}
                  onEdit={() => setEditSponsor(s)}
                  onDelete={() => void run(() => supabase.from("sponsors").delete().eq("id", s.id))}
                />
              ))}
              {sponsors.length === 0 && (
                <EmptyNote
                  title="No sponsors configured"
                  text="Add local businesses or partners to feature in the Home banner. The section stays hidden while this is empty."
                />
              )}
            </>
          )}

          {activeTab === "members" && (
            <>
              <p className="text-xs text-muted-foreground px-0.5">
                Committee members can post news and manage events. Admins can also manage the
                directory, sponsors, and roles. You cannot change your own role.
              </p>
              {members.map((m) => {
                const isSelf = m.id === session?.user.id;
                return (
                  <div key={m.id} className="rounded-2xl bg-card border border-border shadow-soft p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white font-bold shrink-0">
                        {(m.full_name?.trim()?.[0] ?? "?").toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {m.full_name ?? "Unnamed member"}
                          {isSelf && <span className="text-[10px] text-muted-foreground font-normal"> (you)</span>}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate">{m.village ?? "—"}</div>
                      </div>
                      {m.role !== "member" && (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                          <BadgeCheck className="w-3 h-3" /> {m.role}
                        </span>
                      )}
                    </div>
                    <div className="mt-2.5 grid grid-cols-3 gap-1.5 p-1 bg-muted rounded-xl">
                      {ROLES.map((r) => (
                        <button
                          key={r}
                          disabled={isSelf || m.role === r || saving}
                          onClick={() => void changeRole(m.id, r)}
                          className={`h-8 rounded-lg text-[11px] font-semibold capitalize transition disabled:opacity-40 ${
                            m.role === r ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {editFacility && (
          <AdminSheet
            title={editFacility.id ? "Edit Facility" : "Add Facility"}
            onClose={() => setEditFacility(null)}
            onSave={() => void saveFacility()}
            saving={saving}
            canSave={!!editFacility.name && !!editFacility.address}
          >
            <FormNote text="Fields marked * are required. Everything else can be filled in later — empty fields are simply hidden from members rather than shown blank." />

            <AdminField
              required
              label="Name"
              value={editFacility.name ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, name: v })}
              placeholder="e.g. Samaj Community Hall"
              hint="Official name of the facility, as members would recognise it."
            />
            <AdminSelect
              label="Category"
              value={editFacility.category ?? FACILITY_CATEGORIES[0]}
              onChange={(v) => setEditFacility({ ...editFacility, category: v })}
              options={FACILITY_CATEGORIES}
              hint="Decides the icon and colour, and lets members filter the directory."
            />
            <AdminField
              required
              label="City"
              value={editFacility.city ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, city: v })}
              placeholder="e.g. Anand"
              hint="Shown on the listing card and used by the city filter."
            />
            <AdminField
              required
              label="State"
              value={editFacility.state ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, state: v })}
              placeholder="e.g. Gujarat"
            />
            <AdminField
              required
              label="Address"
              value={editFacility.address ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, address: v })}
              textarea
              placeholder="e.g. Station Road, Near Town Hall, Anand, Gujarat 388001"
              hint="Full postal address. This is what the Directions button sends to Google Maps, so keep it accurate."
            />
            <AdminField
              label="Short description"
              value={editFacility.description ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, description: v })}
              textarea
              placeholder="e.g. Providing quality English medium education since 1995."
              hint="One line shown under the name in the directory list. Aim for under 100 characters."
            />
            <AdminField
              label="Full description"
              value={editFacility.long_description ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, long_description: v })}
              textarea
              placeholder="Services offered, who it serves, any member benefits..."
              hint="The longer 'About' section on the facility's own page."
            />
            <AdminField
              label="Phone"
              value={editFacility.phone ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, phone: v })}
              placeholder="e.g. +91 2692 245 678"
              hint="Powers the Call button. Leave blank if there is no public number."
            />
            <AdminField
              label="Email"
              type="email"
              value={editFacility.email ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, email: v })}
              placeholder="e.g. info@example.org"
            />
            <AdminField
              label="Website"
              value={editFacility.website ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, website: v })}
              placeholder="e.g. example.org"
              hint="Domain only, without https://"
            />
            <AdminField
              label="Head / in charge"
              value={editFacility.head ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, head: v })}
              placeholder="e.g. Dr. Rakesh Patel (Principal)"
              hint="Name and role of the person responsible. Also searchable."
            />
            <AdminField
              label="Established"
              type="number"
              value={editFacility.established ? String(editFacility.established) : ""}
              onChange={(v) => setEditFacility({ ...editFacility, established: v ? Number(v) : null })}
              placeholder="e.g. 1995"
              hint="Year only."
            />
            <AdminField
              label="Capacity"
              value={editFacility.capacity ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, capacity: v })}
              placeholder="e.g. 150 beds / 2,400 students / 18 branches"
              hint="Free text — use whatever unit suits this kind of facility."
            />
            <AdminField
              label="Timings"
              value={editFacility.timings ?? ""}
              onChange={(v) => setEditFacility({ ...editFacility, timings: v })}
              placeholder="e.g. Mon–Sat, 10 AM – 5 PM"
            />
            <label className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-muted">
              <input
                type="checkbox"
                checked={editFacility.verified ?? false}
                onChange={(e) => setEditFacility({ ...editFacility, verified: e.target.checked })}
                className="w-4 h-4 accent-primary mt-0.5"
              />
              <span className="text-sm font-medium text-foreground">
                Verified by the community
                <span className="block text-[11px] font-normal text-muted-foreground mt-0.5">
                  Only tick this once someone has confirmed the details are correct — members
                  rely on this badge.
                </span>
              </span>
            </label>
          </AdminSheet>
        )}

        {editEvent && (
          <AdminSheet
            title={editEvent.id ? "Edit Event" : "Add Event"}
            onClose={() => setEditEvent(null)}
            onSave={() => void saveEvent()}
            saving={saving}
            canSave={!!editEvent.title && !!editEvent.starts_at}
          >
            <FormNote text="Events appear on the Home dashboard, where members can tap Register to RSVP. Only future events are shown." />

            <AdminField
              required
              label="Title"
              value={editEvent.title ?? ""}
              onChange={(v) => setEditEvent({ ...editEvent, title: v })}
              placeholder="e.g. Annual Samaj Gathering"
            />
            <AdminField
              required
              label="Date & time"
              type="datetime-local"
              value={editEvent.starts_at ? toLocalInput(editEvent.starts_at) : ""}
              onChange={(v) => setEditEvent({ ...editEvent, starts_at: v })}
              hint="When the event starts. Once this passes, it drops off the Home dashboard automatically."
            />
            <AdminField
              label="Location"
              value={editEvent.location ?? ""}
              onChange={(v) => setEditEvent({ ...editEvent, location: v })}
              placeholder="e.g. Community Hall, Ahmedabad"
              hint="Venue name and city, shown under the date."
            />
            <AdminField
              label="Emoji"
              value={editEvent.emoji ?? ""}
              onChange={(v) => setEditEvent({ ...editEvent, emoji: v })}
              placeholder="🎊"
              hint="A single emoji used as the event's artwork. Defaults to 📅."
            />
          </AdminSheet>
        )}

        {editSponsor && (
          <AdminSheet
            title={editSponsor.id ? "Edit Sponsor" : "Add Sponsor"}
            onClose={() => setEditSponsor(null)}
            onSave={() => void saveSponsor()}
            saving={saving}
            canSave={!!editSponsor.name}
          >
            <FormNote text="Sponsors rotate in the banner carousel on the Home dashboard. Members see a 'Sponsored' label on each one." />

            <AdminField
              required
              label="Name"
              value={editSponsor.name ?? ""}
              onChange={(v) => setEditSponsor({ ...editSponsor, name: v })}
              placeholder="e.g. Patel Jewellers"
              hint="Business or organisation being promoted."
            />
            <AdminField
              label="Description"
              value={editSponsor.description ?? ""}
              onChange={(v) => setEditSponsor({ ...editSponsor, description: v })}
              textarea
              placeholder="e.g. Diwali collection — 25% off making charges."
              hint="One line under the banner. Keep it short; it truncates."
            />
            <AdminField
              label="Emoji"
              value={editSponsor.emoji ?? ""}
              onChange={(v) => setEditSponsor({ ...editSponsor, emoji: v })}
              placeholder="💎"
              hint="A single emoji used as the banner artwork. Defaults to 🏢."
            />
            <AdminSelect
              label="Link to a facility"
              value={editSponsor.facility_id ?? ""}
              onChange={(v) => setEditSponsor({ ...editSponsor, facility_id: v || null })}
              options={["", ...facilities.map((f) => f.id)]}
              optionLabel={(v) => facilities.find((f) => f.id === v)?.name ?? "None"}
              hint={
                facilities.length === 0
                  ? "No facilities exist yet — add one first, or use an external link below."
                  : "Sends members to that facility's page when they tap the banner."
              }
            />
            <AdminField
              label="External link"
              value={editSponsor.link_url ?? ""}
              onChange={(v) => setEditSponsor({ ...editSponsor, link_url: v })}
              placeholder="https://example.com"
              hint="Used only when no facility is linked above. Opens in a new tab."
            />
            <AdminField
              label="Sort order"
              type="number"
              value={String(editSponsor.sort_order ?? 0)}
              onChange={(v) => setEditSponsor({ ...editSponsor, sort_order: Number(v) })}
              hint="Lower numbers appear first in the carousel."
            />
            <label className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-muted">
              <input
                type="checkbox"
                checked={editSponsor.active ?? true}
                onChange={(e) => setEditSponsor({ ...editSponsor, active: e.target.checked })}
                className="w-4 h-4 accent-primary mt-0.5"
              />
              <span className="text-sm font-medium text-foreground">
                Show on Home
                <span className="block text-[11px] font-normal text-muted-foreground mt-0.5">
                  Untick to hide without deleting — useful when a sponsorship period ends.
                </span>
              </span>
            </label>
          </AdminSheet>
        )}
      </div>
    </PhoneFrame>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition"
    >
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

function FormNote({ text }: { text: string }) {
  return (
    <p className="text-[11.5px] text-muted-foreground bg-muted/60 rounded-xl px-3 py-2.5 leading-relaxed">
      {text}
    </p>
  );
}

function EmptyNote({ title, text }: { title: string; text: string }) {
  return (
    <div className="text-center py-10 px-6 rounded-2xl border-2 border-dashed border-border">
      <p className="font-semibold text-foreground text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{text}</p>
    </div>
  );
}

function RowCard({
  title, subtitle, badge, onEdit, onDelete,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-3.5">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">{title}</div>
          <div className="text-[11px] text-muted-foreground line-clamp-2">{subtitle}</div>
          {badge && (
            <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase">
              {badge}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button onClick={onEdit} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center" aria-label="Edit">
            <Pencil className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>
        </div>
      </div>
      {confirming && (
        <div className="mt-3 pt-3 border-t border-border/60">
          <p className="text-xs text-foreground">Delete this permanently?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setConfirming(false); onDelete(); }}
              className="flex-1 h-9 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold"
            >
              Delete
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="flex-1 h-9 rounded-lg bg-muted text-foreground text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
