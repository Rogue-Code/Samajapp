import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Avatar } from "@/components/Avatar";
import { useGoBack } from "@/hooks/use-go-back";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  UserPlus,
  Loader2,
  Trash2,
  X,
  Link as LinkIcon,
  Search,
  MapPin,
} from "lucide-react";
import { PhoneFrame, SheetPortal } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { useT } from "@/lib/i18n";
import type { TFunction } from "@/lib/i18n";
import { RELATIONS, relationLabel } from "@/lib/profile-options";

export const Route = createLazyFileRoute("/family")({
  component: FamilyPage,
});

type Status = "verified" | "pending" | "approval";

interface Member {
  id: string;
  full_name: string;
  relation: string;
  dob: string | null;
  status: string;
  linked_profile_id: string | null;
}

interface MemberSearchResult {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  village: string | null;
  city: string | null;
}

interface JoinRequest {
  id: string;
  requester_id: string;
  full_name: string | null;
  avatar_url: string | null;
  village: string | null;
  city: string | null;
  relation: string;
}

const RELATION_EMOJI: Record<string, string> = {
  Father: "👨",
  Mother: "👩",
  Spouse: "💑",
  Son: "👦",
  Daughter: "👧",
  Brother: "🧑",
  Sister: "👧",
  Grandfather: "👴",
  Grandmother: "👵",
  Other: "🧑",
};

const statusMap: Record<Status, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  verified: { icon: CheckCircle2, color: "text-success", bg: "bg-success-soft" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning-soft" },
  approval: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

function statusLabel(status: Status, t: TFunction): string {
  return t(`familyStatus.${status}` as never);
}

function statusOf(value: string): Status {
  return value === "verified" || value === "approval" ? value : "pending";
}

/** Whole years between a date and today; null when the date is missing or unparseable. */
function ageFrom(dob: string | null): number | null {
  if (!dob) return null;
  const born = new Date(dob);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  const beforeBirthday =
    now.getMonth() < born.getMonth() ||
    (now.getMonth() === born.getMonth() && now.getDate() < born.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

function formatDob(dob: string | null) {
  if (!dob) return "—";
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function FamilyPage() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const t = useT();
  const { checking, session } = useRequireAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [requestBusyId, setRequestBusyId] = useState<string | null>(null);
  const [linking, setLinking] = useState<Member | null>(null);

  const load = useCallback(async () => {
    if (!session) return;
    const [{ data, error: loadError }, { data: requests }] = await Promise.all([
      supabase
        .from("family_members")
        .select("id, full_name, relation, dob, status, linked_profile_id")
        .eq("owner_id", session.user.id)
        .order("created_at", { ascending: true }),
      supabase.rpc("list_family_join_requests"),
    ]);
    if (loadError) {
      setError(friendlyAuthError(loadError.message));
    } else {
      setMembers(data ?? []);
      setError("");
    }
    setJoinRequests((requests ?? []) as JoinRequest[]);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    void load();
  }, [load]);

  const respondToRequest = async (id: string, approve: boolean) => {
    setRequestBusyId(id);
    const { error: respondError } = await supabase.rpc("respond_family_join_request", {
      request_id: id,
      approve,
    });
    setRequestBusyId(null);
    if (respondError) {
      setError(friendlyAuthError(respondError.message));
      return;
    }
    await load();
  };

  const addMember = async (input: { full_name: string; relation: string; dob: string }) => {
    if (!session) return;
    const { error: insertError } = await supabase.from("family_members").insert({
      owner_id: session.user.id,
      full_name: input.full_name,
      relation: input.relation,
      dob: input.dob || null,
    });
    if (insertError) {
      setError(friendlyAuthError(insertError.message));
      return;
    }
    setShowAdd(false);
    await load();
  };

  const setLink = async (id: string, profileId: string | null) => {
    setBusyId(id);
    const { error: linkError } = await supabase
      .from("family_members")
      .update({ linked_profile_id: profileId })
      .eq("id", id);
    setBusyId(null);
    if (linkError) {
      setError(friendlyAuthError(linkError.message));
      return;
    }
    setLinking(null);
    await load();
  };

  const markVerified = async (id: string) => {
    setBusyId(id);
    const { error: updateError } = await supabase
      .from("family_members")
      .update({ status: "verified" })
      .eq("id", id);
    setBusyId(null);
    if (updateError) {
      setError(friendlyAuthError(updateError.message));
      return;
    }
    await load();
  };

  const removeMember = async (id: string) => {
    setBusyId(id);
    const { error: deleteError } = await supabase.from("family_members").delete().eq("id", id);
    setBusyId(null);
    if (deleteError) {
      setError(friendlyAuthError(deleteError.message));
      return;
    }
    await load();
  };

  if (checking || loading) return <LoadingScreen />;

  const counts = {
    verified: members.filter((m) => statusOf(m.status) === "verified").length,
    pending: members.filter((m) => statusOf(m.status) === "pending").length,
    approval: members.filter((m) => statusOf(m.status) === "approval").length,
  };

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px]">
        <div className="px-6 pt-8 pb-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-border/50">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
              aria-label={t("common.back")}
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-xs font-semibold text-muted-foreground">
              {t(members.length === 1 ? "family.memberCountOne" : "family.memberCount", {
                count: members.length,
              })}
            </span>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto px-6 py-6 pb-32 fade-up"
          style={{ scrollbarWidth: "none" }}
        >
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("family.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("family.subtitle")}</p>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          {joinRequests.length > 0 && (
            <div className="mt-5 space-y-2">
              <h2 className="text-sm font-bold text-foreground px-1">
                {t("family.joinRequests", { count: joinRequests.length })}
              </h2>
              {joinRequests.map((r) => (
                <div
                  key={r.id}
                  className="bg-card border border-border rounded-2xl p-3 flex items-center gap-3"
                >
                  <Avatar url={r.avatar_url} name={r.full_name} className="w-11 h-11 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">
                      {r.full_name ?? t("family.unnamedMember")}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {t("family.wantsToJoinAs", { relation: relationLabel(r.relation, t) })}
                      {r.village && ` · ${r.village}`}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => void respondToRequest(r.id, true)}
                      disabled={requestBusyId === r.id}
                      className="w-9 h-9 rounded-xl bg-success-soft text-success flex items-center justify-center disabled:opacity-50"
                      aria-label={t("family.approve")}
                    >
                      {requestBusyId === r.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => void respondToRequest(r.id, false)}
                      disabled={requestBusyId === r.id}
                      className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center disabled:opacity-50"
                      aria-label={t("family.reject")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className="bg-success-soft rounded-2xl p-3 text-center">
              <div className="text-xl font-bold text-success">{counts.verified}</div>
              <div className="text-[11px] font-medium text-success/80">
                {t("family.statVerified")}
              </div>
            </div>
            <div className="bg-warning-soft rounded-2xl p-3 text-center">
              <div className="text-xl font-bold text-warning">{counts.pending}</div>
              <div className="text-[11px] font-medium text-warning/80">
                {t("family.statPending")}
              </div>
            </div>
            <div className="bg-destructive/10 rounded-2xl p-3 text-center">
              <div className="text-xl font-bold text-destructive">{counts.approval}</div>
              <div className="text-[11px] font-medium text-destructive/80">
                {t("family.statApproval")}
              </div>
            </div>
          </div>

          {members.length === 0 ? (
            <div className="mt-8 text-center py-10 px-6 rounded-3xl border-2 border-dashed border-border">
              <div className="text-4xl mb-3">👨‍👩‍👧</div>
              <p className="font-semibold text-foreground">{t("family.emptyTitle")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("family.emptyHint")}</p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {members.map((m) => {
                const status = statusOf(m.status);
                const s = statusMap[status];
                const open = expanded === m.id;
                const age = ageFrom(m.dob);
                return (
                  <div
                    key={m.id}
                    className="bg-card border border-border rounded-3xl shadow-soft overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpanded(open ? null : m.id)}
                      className="w-full flex items-center gap-3 p-4 active:bg-muted/50 transition"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center text-2xl shrink-0">
                        {RELATION_EMOJI[m.relation] ?? "🧑"}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground truncate">
                            {m.full_name}
                          </span>
                          {status === "verified" && (
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {relationLabel(m.relation, t)}
                          {age !== null && ` · ${t("family.yearsOld", { count: age })}`}
                        </div>
                        <div
                          className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full ${s.bg} ${s.color} text-[11px] font-semibold`}
                        >
                          <s.icon className="w-3 h-3" /> {statusLabel(status, t)}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open && (
                      <div className="px-4 pb-4 pt-1 border-t border-border/50 fade-up">
                        <div className="grid grid-cols-2 gap-3 text-xs mt-3">
                          <div>
                            <div className="text-muted-foreground">{t("family.relationLabel")}</div>
                            <div className="font-medium text-foreground mt-0.5">
                              {relationLabel(m.relation, t)}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">{t("family.dobLabel")}</div>
                            <div className="font-medium text-foreground mt-0.5">
                              {formatDob(m.dob)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {status !== "verified" && (
                            <button
                              onClick={() => void markVerified(m.id)}
                              disabled={busyId === m.id}
                              className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-1.5"
                            >
                              {busyId === m.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                              {t("family.markVerified")}
                            </button>
                          )}
                          <button
                            onClick={() => void removeMember(m.id)}
                            disabled={busyId === m.id}
                            className="px-4 h-10 rounded-xl bg-destructive/10 text-destructive text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-1.5"
                          >
                            <Trash2 className="w-4 h-4" /> {t("family.remove")}
                          </button>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="text-[11px] text-muted-foreground mb-1.5">
                            {t("family.sangathAccount")}
                          </div>
                          {m.linked_profile_id ? (
                            <div className="flex items-center gap-2">
                              <span className="flex-1 inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                                <LinkIcon className="w-3.5 h-3.5" /> {t("family.linkedHint")}
                              </span>
                              <button
                                onClick={() => void setLink(m.id, null)}
                                disabled={busyId === m.id}
                                className="px-3 h-8 rounded-lg bg-muted text-foreground text-[11px] font-semibold disabled:opacity-50"
                              >
                                {t("family.unlink")}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setLinking(m)}
                              className="w-full h-10 rounded-xl bg-muted text-foreground text-sm font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition"
                            >
                              <LinkIcon className="w-4 h-4" /> {t("family.linkToAccount")}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={() => setShowAdd(true)}
            className="mt-4 w-full h-14 rounded-2xl border-2 border-dashed border-border text-muted-foreground font-medium flex items-center justify-center gap-2 active:bg-muted transition"
          >
            <UserPlus className="w-4 h-4" /> {t("family.addMember")}
          </button>
        </div>

        <div className="sticky bottom-0 px-6 py-4 bg-background/90 backdrop-blur-xl border-t border-border/50">
          <button
            onClick={goBack}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated active:scale-[0.98] transition"
          >
            {t("family.done")}
          </button>
        </div>

        {showAdd && <AddMemberSheet onClose={() => setShowAdd(false)} onSave={addMember} />}

        {linking && (
          <LinkAccountSheet
            member={linking}
            onClose={() => setLinking(null)}
            onPick={(profileId) => void setLink(linking.id, profileId)}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

function AddMemberSheet({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (input: { full_name: string; relation: string; dob: string }) => Promise<void>;
}) {
  const t = useT();
  const [name, setName] = useState("");
  const [relation, setRelation] = useState<string>(RELATIONS[0]);
  const [dob, setDob] = useState("");
  const [saving, setSaving] = useState(false);

  const canSave = name.trim().length > 1 && !saving;

  const submit = async () => {
    if (!canSave) return;
    setSaving(true);
    await onSave({ full_name: name.trim(), relation, dob });
    setSaving(false);
  };

  return (
    <SheetPortal>
      <div className="fixed md:absolute inset-0 z-40 flex items-end">
        <button
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
          aria-label={t("common.close")}
        />
        <div className="relative w-full bg-card rounded-t-3xl border-t border-border p-6 pb-8 fade-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-foreground text-lg">{t("family.addSheetTitle")}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              aria-label={t("common.close")}
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                {t("family.fullName")}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("family.fullNamePlaceholder")}
                autoComplete="off"
                className="w-full bg-background border border-border rounded-2xl px-4 h-12 outline-none text-foreground text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                {t("family.relationLabel")}
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl px-4 h-12 outline-none text-foreground text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              >
                {RELATIONS.map((r) => (
                  <option key={r} value={r}>
                    {relationLabel(r, t)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                {t("family.dobLabel")}
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl px-4 h-12 outline-none text-foreground text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <button
            onClick={() => void submit()}
            disabled={!canSave}
            className="mt-6 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> {t("family.adding")}
              </>
            ) : (
              t("family.addMemberButton")
            )}
          </button>
        </div>
      </div>
    </SheetPortal>
  );
}

/**
 * Connects a family member row to an existing Sangath account, so their card
 * in the public family tree becomes a link to that member's profile.
 */
function LinkAccountSheet({
  member,
  onClose,
  onPick,
}: {
  member: Member;
  onClose: () => void;
  onPick: (profileId: string) => void;
}) {
  const t = useT();
  const [term, setTerm] = useState(member.full_name);
  const [results, setResults] = useState<MemberSearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const q = term.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    const handle = setTimeout(async () => {
      const { data } = await supabase.rpc("search_members", { term: q });
      setResults((data ?? []) as MemberSearchResult[]);
      setSearching(false);
    }, 300);
    return () => clearTimeout(handle);
  }, [term]);

  return (
    <SheetPortal>
      <div className="fixed md:absolute inset-0 z-40 flex items-end">
        <button
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
          aria-label={t("common.close")}
        />
        <div className="relative w-full bg-card rounded-t-3xl border-t border-border max-h-[85%] flex flex-col fade-up">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="min-w-0">
              <h2 className="font-bold text-foreground">
                {t("family.linkSheetTitle", { name: member.full_name })}
              </h2>
              <p className="text-[11px] text-muted-foreground">{t("family.linkSheetSubtitle")}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"
              aria-label={t("common.close")}
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          <div className="px-5 pt-4">
            <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-2xl">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={t("family.searchByNameOrVillage")}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-2"
            style={{ scrollbarWidth: "none" }}
          >
            {searching && (
              <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {!searching && term.trim().length >= 2 && results.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                {t("family.noMatchingAccount")}
              </p>
            )}
            {!searching &&
              results.map((r) => {
                const place = [r.village, r.city].filter(Boolean).join(", ");
                return (
                  <button
                    key={r.id}
                    onClick={() => onPick(r.id)}
                    className="w-full text-left rounded-2xl border border-border bg-background p-3 flex items-center gap-3 active:scale-[0.99] transition"
                  >
                    <Avatar url={r.avatar_url} name={r.full_name} className="w-10 h-10" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {r.full_name}
                      </div>
                      {place && (
                        <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" /> {place}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </SheetPortal>
  );
}
