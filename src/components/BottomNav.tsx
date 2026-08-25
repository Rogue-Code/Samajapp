import { useNavigate } from "@tanstack/react-router";
import { Home as HomeIcon, Building, HandHeart, User } from "lucide-react";

export function BottomNav({ active }: { active: "home" | "facilities" | "fundraiser" | "profile" }) {
  const navigate = useNavigate();
  const items = [
    { id: "home", icon: HomeIcon, label: "Home", to: "/home" as const },
    { id: "facilities", icon: Building, label: "Facilities", to: "/facilities" as const },
    { id: "fundraiser", icon: HandHeart, label: "Fundraiser", to: "/fundraiser" as const },
    { id: "profile", icon: User, label: "Profile", to: "/account" as const },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
      <div className="flex items-center justify-around">
        {items.map((n) => {
          const isActive = active === n.id;
          return (
            <button key={n.id} onClick={() => navigate({ to: n.to })} className="flex flex-col items-center gap-1 py-1 px-4 relative">
              {isActive && <span className="absolute -top-2 w-8 h-1 rounded-full bg-primary" />}
              <n.icon className={`w-5 h-5 transition ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10.5px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
