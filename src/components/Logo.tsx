import logoAsset from "@/assets/samaj-logo.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Samaj Connect brand mark. `className` controls the box size;
 * the image always fits inside without cropping or stretching.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Samaj Connect logo"
      className={cn("object-contain shrink-0", className)}
      loading="eager"
      decoding="async"
    />
  );
}
