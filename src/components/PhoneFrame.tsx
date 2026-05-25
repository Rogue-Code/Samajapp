import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-soft via-background to-accent flex items-center justify-center md:p-8">
      <div className="relative w-full max-w-[440px] md:max-w-[420px] min-h-screen md:min-h-[860px] md:max-h-[900px] md:rounded-[2.5rem] bg-background md:shadow-elevated overflow-hidden md:border-8 md:border-foreground/90">
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
