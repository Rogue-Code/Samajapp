import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-soft via-background to-accent flex md:items-center md:justify-center md:p-8">
      <div className="relative w-full max-w-[440px] md:max-w-[420px] min-h-screen md:min-h-[860px] md:h-[860px] md:rounded-[2.5rem] bg-background md:shadow-elevated md:overflow-hidden md:border-8 md:border-foreground/90 mx-auto">
        {children}
      </div>
    </div>
  );
}
