import { useEffect, useMemo, useRef, useState } from "react";
import { SheetPortal } from "@/components/PhoneFrame";
import { Check, MapPin, Search, X } from "lucide-react";
import { searchPlaces } from "@/data/india-places";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Village/city field backed by a searchable list of Indian places.
 *
 * Opens as a sheet rather than an inline dropdown so the list stays usable once the
 * soft keyboard is up. Free text is allowed — the bundled list cannot cover every
 * village in India, so a member can always enter their own.
 */
export function PlacePicker({
  label,
  value,
  onChange,
  placeholder = "Search your village or city",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchPlaces(query, 60), [query]);
  const trimmed = query.trim();
  // Offer the typed text when it is not already an exact match in the list.
  const showCustom =
    trimmed.length > 1 && !results.some((p) => p.label.toLowerCase() === trimmed.toLowerCase());

  useEffect(() => {
    if (!open) return;
    // Let the sheet paint before focusing, otherwise Android opens the keyboard
    // against an element that is still animating in.
    const t = window.setTimeout(() => searchRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
    setQuery("");
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft text-left active:scale-[0.99] transition-all"
      >
        <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
        <span
          className={`flex-1 truncate ${value ? "text-foreground" : "text-muted-foreground/60"}`}
        >
          {value || placeholder}
        </span>
      </button>

      {open && (
        <SheetPortal>
          <div className="fixed md:absolute inset-0 z-50 flex flex-col justify-end">
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <div className="relative bg-background rounded-t-3xl max-h-[80%] flex flex-col shadow-elevated">
              <div className="px-5 pt-4 pb-3 border-b border-border/60">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-foreground">{label}</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-12 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a village, city or state"
                    autoComplete="off"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                  {query && (
                    <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto overscroll-contain px-2 py-2">
                {showCustom && (
                  <button
                    type="button"
                    onClick={() => choose(trimmed)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left active:bg-muted transition"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-foreground truncate">Use “{trimmed}”</span>
                      <span className="block text-xs text-muted-foreground">Not in the list</span>
                    </span>
                  </button>
                )}

                {results.map((place) => (
                  <button
                    key={place.label}
                    type="button"
                    onClick={() => choose(place.label)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left active:bg-muted transition"
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block text-foreground truncate">{place.name}</span>
                      <span className="block text-xs text-muted-foreground truncate">
                        {place.state}
                      </span>
                    </span>
                    {value === place.label && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                ))}

                {!showCustom && results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No places matched. Keep typing to enter your own.
                  </p>
                )}
              </div>
            </div>
          </div>
        </SheetPortal>
      )}
    </div>
  );
}
