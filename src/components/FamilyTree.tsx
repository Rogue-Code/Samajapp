import { ChevronRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import type { TFunction } from "@/lib/i18n";
import { relationLabel } from "@/lib/profile-options";

export type FamilyNode = {
  id: string;
  full_name: string;
  relation: string;
  birth_year: number | null;
  status: string;
  linked_profile_id: string | null;
  avatar_url: string | null;
};

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

/**
 * Which row of the tree a relation belongs on. Lower numbers are older
 * generations, so the tree reads top-to-bottom like a conventional one.
 */
const GENERATION: Record<string, number> = {
  Grandfather: 0,
  Grandmother: 0,
  Father: 1,
  Mother: 1,
  Spouse: 2,
  Brother: 2,
  Sister: 2,
  Son: 3,
  Daughter: 3,
};

const GENERATION_KEY: Record<number, "grandparents" | "parents" | "same" | "children" | "other"> = {
  0: "grandparents",
  1: "parents",
  2: "same",
  3: "children",
  4: "other",
};

function generationLabel(gen: number, t: TFunction): string {
  return t(`familyTree.generation.${GENERATION_KEY[gen] ?? "other"}`);
}

const STATUS_META: Record<string, { icon: typeof CheckCircle2; className: string }> = {
  verified: { icon: CheckCircle2, className: "text-success" },
  pending: { icon: Clock, className: "text-warning" },
  approval: { icon: AlertCircle, className: "text-destructive" },
};

function statusLabel(status: string, t: TFunction): string {
  return t(`familyStatus.${status in STATUS_META ? status : "pending"}` as never);
}

function ageFromYear(year: number | null) {
  return year ? new Date().getFullYear() - year : null;
}

function generationOf(relation: string) {
  return GENERATION[relation] ?? 4;
}

/**
 * Generational family tree. The member being viewed is rendered inline at
 * their own generation so the relations read against a fixed point.
 */
export function FamilyTree({
  members,
  selfName,
  selfAvatarUrl,
  onOpen,
}: {
  members: FamilyNode[];
  selfName: string;
  selfAvatarUrl: string | null;
  onOpen: (profileId: string) => void;
}) {
  const t = useT();
  const rows = [0, 1, 2, 3, 4]
    .map((gen) => ({ gen, people: members.filter((m) => generationOf(m.relation) === gen) }))
    // Generation 2 always renders, since the member themself sits there.
    .filter((row) => row.people.length > 0 || row.gen === 2);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-4">
      {rows.map((row, rowIndex) => (
        <div key={row.gen}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-2">
            {generationLabel(row.gen, t)}
          </div>

          <div className="flex flex-wrap gap-2">
            {row.gen === 2 && <SelfCard name={selfName} avatarUrl={selfAvatarUrl} />}
            {row.people.map((m) => (
              <PersonCard key={m.id} person={m} onOpen={onOpen} />
            ))}
          </div>

          {rowIndex < rows.length - 1 && <Connector />}
        </div>
      ))}
    </div>
  );
}

/** Vertical rule joining one generation to the next. */
function Connector() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <svg width="14" height="26" viewBox="0 0 14 26" className="text-border">
        <line x1="7" y1="0" x2="7" y2="19" stroke="currentColor" strokeWidth="1.5" />
        <polyline
          points="3,15 7,20 11,15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SelfCard({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  const t = useT();
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border-2 border-primary bg-primary-soft px-3 py-2.5 min-w-[46%] flex-1">
      <div className="w-9 h-9 rounded-xl overflow-hidden bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          (name.trim()[0] ?? "?").toUpperCase()
        )}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{name}</div>
        <div className="text-[11px] text-primary font-medium">{t("familyTree.thisMember")}</div>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  onOpen,
}: {
  person: FamilyNode;
  onOpen: (profileId: string) => void;
}) {
  const t = useT();
  const age = ageFromYear(person.birth_year);
  const status = STATUS_META[person.status] ?? STATUS_META.pending;
  const StatusIcon = status.icon;
  const linked = person.linked_profile_id;

  const body = (
    <>
      <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center text-lg shrink-0">
        {person.avatar_url ? (
          <img src={person.avatar_url} alt="" className="w-full h-full object-cover" />
        ) : (
          (RELATION_EMOJI[person.relation] ?? "🧑")
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground truncate flex items-center gap-1">
          <span className="truncate">{person.full_name}</span>
          <StatusIcon
            className={`w-3 h-3 shrink-0 ${status.className}`}
            aria-label={statusLabel(person.status, t)}
          />
        </div>
        <div className="text-[11px] text-muted-foreground truncate">
          {relationLabel(person.relation, t)}
          {age !== null && ` · ${t("family.yearsOld", { count: age })}`}
        </div>
      </div>
      {linked && <ChevronRight className="w-4 h-4 text-primary shrink-0" />}
    </>
  );

  if (!linked) {
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-background px-3 py-2.5 min-w-[46%] flex-1">
        {body}
      </div>
    );
  }

  return (
    <button
      onClick={() => onOpen(linked)}
      className="flex items-center gap-2.5 rounded-2xl border border-primary/40 bg-background px-3 py-2.5 min-w-[46%] flex-1 text-left active:scale-[0.98] transition hover:border-primary"
    >
      {body}
    </button>
  );
}
