import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus, CheckCircle2, Clock, AlertCircle, ChevronDown, UserPlus } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";

export const Route = createFileRoute("/family")({
  component: FamilyPage,
  head: () => ({ meta: [{ title: "Family Verification — Sangath" }] }),
});

type Status = "verified" | "pending" | "approval";
interface Member { id: number; name: string; relation: string; age: number; emoji: string; status: Status; }

const initial: Member[] = [
  { id: 1, name: "Suresh Patel", relation: "Father", age: 58, emoji: "👨", status: "verified" },
  { id: 2, name: "Mira Patel", relation: "Mother", age: 54, emoji: "👩", status: "verified" },
  { id: 3, name: "Priya Patel", relation: "Spouse", age: 32, emoji: "👩‍💼", status: "pending" },
  { id: 4, name: "Aarav Patel", relation: "Son", age: 8, emoji: "👦", status: "approval" },
  { id: 5, name: "Diya Patel", relation: "Daughter", age: 5, emoji: "👧", status: "verified" },
];

const statusMap = {
  verified: { label: "Verified", icon: CheckCircle2, color: "text-success", bg: "bg-success-soft" },
  pending: { label: "Pending", icon: Clock, color: "text-warning", bg: "bg-warning-soft" },
  approval: { label: "Needs Approval", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

function FamilyPage() {
  const navigate = useNavigate();
  const { checking } = useRequireAuth();
  const [expanded, setExpanded] = useState<number | null>(1);

  if (checking) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px]">
        <div className="px-6 pt-8 pb-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate({ to: "/profile" })} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-xs font-semibold text-muted-foreground">Step 3 of 4 · 75%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent-saffron rounded-full" />
          </div>
        </div>

        <div className="flex-1 px-6 py-6 pb-32 fade-up">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Family Members</h1>
          <p className="text-sm text-muted-foreground mt-1">Verify and manage your family connections.</p>

          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className="bg-success-soft rounded-2xl p-3 text-center">
              <div className="text-xl font-bold text-success">3</div>
              <div className="text-[10px] font-medium text-success/80">Verified</div>
            </div>
            <div className="bg-warning-soft rounded-2xl p-3 text-center">
              <div className="text-xl font-bold text-warning">1</div>
              <div className="text-[10px] font-medium text-warning/80">Pending</div>
            </div>
            <div className="bg-destructive/10 rounded-2xl p-3 text-center">
              <div className="text-xl font-bold text-destructive">1</div>
              <div className="text-[10px] font-medium text-destructive/80">Approval</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {initial.map((m) => {
              const s = statusMap[m.status];
              const open = expanded === m.id;
              return (
                <div key={m.id} className="bg-card border border-border rounded-3xl shadow-soft overflow-hidden transition-all">
                  <button
                    onClick={() => setExpanded(open ? null : m.id)}
                    className="w-full flex items-center gap-3 p-4 active:bg-muted/50 transition"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center text-2xl shrink-0">
                      {m.emoji}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground truncate">{m.name}</span>
                        {m.status === "verified" && <CheckCircle2 className="w-4 h-4 text-success shrink-0" />}
                      </div>
                      <div className="text-xs text-muted-foreground">{m.relation} · {m.age} yrs</div>
                      <div className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full ${s.bg} ${s.color} text-[10px] font-semibold`}>
                        <s.icon className="w-3 h-3" /> {s.label}
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="px-4 pb-4 pt-1 border-t border-border/50 fade-up">
                      <div className="grid grid-cols-2 gap-3 text-xs mt-3">
                        <div><div className="text-muted-foreground">Relation</div><div className="font-medium text-foreground mt-0.5">{m.relation}</div></div>
                        <div><div className="text-muted-foreground">DOB</div><div className="font-medium text-foreground mt-0.5">12 Mar {2025 - m.age}</div></div>
                      </div>
                      {m.status !== "verified" && (
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Verify Now</button>
                          <button className="px-4 h-10 rounded-xl bg-muted text-foreground text-sm font-medium">Remind</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button className="mt-4 w-full h-14 rounded-2xl border-2 border-dashed border-border text-muted-foreground font-medium flex items-center justify-center gap-2 active:bg-muted transition">
            <UserPlus className="w-4 h-4" /> Add Family Member
          </button>
        </div>

        <button className="absolute right-6 bottom-28 w-14 h-14 rounded-full bg-accent-saffron text-white shadow-elevated flex items-center justify-center active:scale-95 transition">
          <Plus className="w-6 h-6" />
        </button>

        <div className="sticky bottom-0 px-6 py-4 bg-background/90 backdrop-blur-xl border-t border-border/50">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated active:scale-[0.98] transition"
          >
            Complete Verification
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
