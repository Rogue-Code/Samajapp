import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-viewport w-full bg-gradient-to-br from-primary-soft via-background to-accent flex md:items-center md:justify-center md:p-8">
      <div
        className="keyboard-scroll-region relative w-full max-w-[440px] md:max-w-[420px] min-h-full md:min-h-0 md:h-[860px] bg-background md:rounded-[2.5rem] md:shadow-elevated overflow-y-auto md:border-8 md:border-foreground/90 mx-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
    </div>
  );
}
