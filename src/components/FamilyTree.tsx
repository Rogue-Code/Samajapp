import { ChevronRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export type FamilyNode = {
  id: string;
  full_name: string;
  relation: string;
  birth_year: number | null;
  status: string;
  linked_profile_id: string | null;
};

const RELATION_EMOJI: Record<string, string> = {
  Father: "👨", Mother: "👩", Spouse: "💑", Son: "👦", Daughter: "👧",
  Brother: "🧑", Sister: "👧", Grandfather: "👴", Grandmother: "👵", Other: "🧑",
};

/**
 * Which row of the tree a relation belongs on. Lower numbers are older
 * generations, so the tree reads top-to-bottom like a conventional one.
 */
const GENERATION: Record<string, number> = {
  Grandfather: 0, Grandmother: 0,
  Father: 1, Mother: 1,
  Spouse: 2, Brother: 2, Sister: 2,
  Son: 3, Daughter: 3,
};

const GENERATION_LABEL: Record<number, string> = {
  0: "Grandparents",
  1: "Parents",
  2: "Same generation",
  3: "Children",
  4: "Other relatives",
};

const STATUS_META: Record<string, { icon: typeof CheckCircle2; className: string; label: string }> = {
  verified: { icon: CheckCircle2, className: "text-success", label: "Verified" },
  pending: { icon: Clock, className: "text-warning", label: "Pending" },
  approval: { icon: AlertCircle, className: "text-destructive", label: "Needs approval" },
};

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
  members, selfName, onOpen,
}: {
  members: FamilyNode[];
  selfName: string;
  onOpen: (profileId: string) => void;
}) {
  const rows = [0, 1, 2, 3, 4]
    .map((gen) => ({ gen, people: members.filter((m) => generationOf(m.relation) === gen) }))
    // Generation 2 always renders, since the member themself sits there.
    .filter((row) => row.people.length > 0 || row.gen === 2);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-4">
      {rows.map((row, rowIndex) => (
        <div key={row.gen}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-2">
            {GENERATION_LABEL[row.gen]}
          </div>

          <div className="flex flex-wrap gap-2">
            {row.gen === 2 && <SelfCard name={selfName} />}
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

function SelfCard({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border-2 border-primary bg-primary-soft px-3 py-2.5 min-w-[46%] flex-1">
      <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
        {(name.trim()[0] ?? "?").toUpperCase()}
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-foreground truncate">{name}</div>
        <div className="text-[10px] text-primary font-medium">This member</div>
      </div>
    </div>
  );
}

function PersonCard({
  person, onOpen,
}: {
  person: FamilyNode;
  onOpen: (profileId: string) => void;
}) {
  const age = ageFromYear(person.birth_year);
  const status = STATUS_META[person.status] ?? STATUS_META.pending;
  const StatusIcon = status.icon;
  const linked = person.linked_profile_id;

  const body = (
    <>
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center text-lg shrink-0">
        {RELATION_EMOJI[person.relation] ?? "🧑"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-foreground truncate flex items-center gap-1">
          <span className="truncate">{person.full_name}</span>
          <StatusIcon className={`w-3 h-3 shrink-0 ${status.className}`} aria-label={status.label} />
        </div>
        <div className="text-[10px] text-muted-foreground truncate">
          {person.relation}
          {age !== null && ` · ${age} yrs`}
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
