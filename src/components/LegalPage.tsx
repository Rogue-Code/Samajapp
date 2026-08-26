import { ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LAST_UPDATED } from "@/lib/legal";

/**
 * Shared shell for the Terms of Use and Privacy Policy pages. Both are reached
 * from the login screen before a session exists, so neither may call
 * useRequireAuth — they have to render for signed-out visitors.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-8 pb-10">
        <button
          onClick={() => router.history.back()}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="mt-6 fade-up">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">{intro}</p>
          <p className="text-xs text-muted-foreground mt-3">Last updated {LAST_UPDATED}</p>
        </div>

        <div className="mt-8 space-y-7 fade-up" style={{ animationDelay: "60ms" }}>
          {children}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-bold text-foreground text-base mb-2">{heading}</h2>
      <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

/** Call-out for the disclosures a member is most likely to be surprised by. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-4 text-sm text-foreground leading-relaxed">
      {children}
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-1.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-[0.55rem] w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
