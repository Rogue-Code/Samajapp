import { Loader2 } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export function LoadingScreen({ label = "Loading Sangath…" }: { label?: string }) {
  return (
    <PhoneFrame>
      <div className="flex min-h-screen md:min-h-[860px] flex-col items-center justify-center gap-3 px-6">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </PhoneFrame>
  );
}
