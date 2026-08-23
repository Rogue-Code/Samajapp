import { useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}

/** Six individual OTP boxes with auto-focus, paste support and auto-advance. */
export function OtpInput({ value, onChange, error }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const setAt = (i: number, ch: string) => {
    const next = digits.slice();
    next[i] = ch;
    onChange(next.join("").slice(0, 6));
  };

  const handleChange = (i: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");
    if (clean.length > 1) {
      const merged = (value.slice(0, i) + clean).replace(/\D/g, "").slice(0, 6);
      onChange(merged);
      refs.current[Math.min(merged.length, 5)]?.focus();
      return;
    }
    setAt(i, clean.slice(-1));
    if (clean && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div className={`flex gap-2 ${error ? "shake" : ""}`}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          autoFocus={i === 0}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
            if (!pasted) return;
            onChange(pasted);
            refs.current[Math.min(pasted.length, 5)]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          className={`w-full aspect-square text-center text-2xl font-bold rounded-2xl border-2 bg-card outline-none transition-all ${
            error
              ? "border-destructive text-destructive"
              : d
                ? "border-primary text-primary bg-primary-soft"
                : "border-border text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
          }`}
        />
      ))}
    </div>
  );
}
