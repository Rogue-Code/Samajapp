import { useNavigate } from "@tanstack/react-router";
import { Home as HomeIcon, Building, HandHeart, User } from "lucide-react";
import { NavPortal } from "@/components/PhoneFrame";
import { useT } from "@/lib/i18n";

/**
 * Fixed bottom navigation.
 *
 * Goes through NavPortal into the frame's non-scrolling box. Rendered in place it
 * anchored to the route's own wrapper, which grows with content, so the bar sat at
 * the bottom of the page and scrolled out of view rather than staying put.
 */
export function BottomNav({
  active,
}: {
  active: "home" | "facilities" | "fundraiser" | "profile";
}) {
  const navigate = useNavigate();
  const t = useT();
  const items = [
    { id: "home", icon: HomeIcon, label: t("nav.home"), to: "/home" as const },
    { id: "facilities", icon: Building, label: t("nav.facilities"), to: "/facilities" as const },
    { id: "fundraiser", icon: HandHeart, label: t("nav.fundraiser"), to: "/fundraiser" as const },
    { id: "profile", icon: User, label: t("nav.profile"), to: "/account" as const },
  ];
  return (
    <NavPortal>
      {/*
        fixed at mobile, absolute at md — the same split the sheets use. Below md
        the frame grows with its content and the document scrolls, so an absolute
        bar sits at the bottom of the *page* and scrolls out of view. Above md the
        frame is a fixed-height box and absolute is what keeps the bar inside it.
        The width classes keep the fixed bar aligned to the frame rather than the
        whole viewport.
      */}
      <div className="fixed md:absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:right-0 md:translate-x-0 w-full max-w-[440px] md:max-w-none z-30 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
        <div className="flex items-center justify-around">
          {items.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => navigate({ to: n.to })}
                className="flex flex-col items-center gap-1 py-1 px-4 relative"
              >
                {isActive && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
                <n.icon
                  className={`w-5 h-5 transition ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[11px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
                >
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </NavPortal>
  );
}
