import { X, Loader2 } from "lucide-react";

export function AdminField({
  label, value, onChange, placeholder, type = "text", textarea = false, hint, required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  /** Explains what belongs in the field and where members will see it. */
  hint?: string;
  required?: boolean;
}) {
  const className =
    "w-full bg-background border border-border rounded-xl px-3 outline-none text-foreground text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all";
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1 block px-0.5">
        {label}
        {required ? (
          <span className="text-destructive"> *</span>
        ) : (
          <span className="font-normal opacity-70"> · optional</span>
        )}
      </label>
      {hint && <p className="text-[11px] text-muted-foreground/80 mb-1.5 px-0.5 leading-snug">{hint}</p>}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${className} py-2.5 resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} h-11`}
        />
      )}
    </div>
  );
}

export function AdminSelect({
  label, value, onChange, options, hint, optionLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  hint?: string;
  /** Display text for an option, e.g. to render "" as "None". */
  optionLabel?: (value: string) => string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1 block px-0.5">{label}</label>
      {hint && <p className="text-[11px] text-muted-foreground/80 mb-1.5 px-0.5 leading-snug">{hint}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-xl px-3 h-11 outline-none text-foreground text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
      >
        {options.map((o) => (
          <option key={o} value={o}>{optionLabel ? optionLabel(o) : o}</option>
        ))}
      </select>
    </div>
  );
}

/**
 * Bottom sheet. Fixed on mobile so it tracks the viewport (the phone frame
 * grows with content there); absolute inside the fixed-height frame on desktop.
 */
export function AdminSheet({
  title, onClose, onSave, saving, canSave, children,
}: {
  title: string;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  canSave: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed md:absolute inset-0 z-50 flex items-end">
      <button className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative w-full bg-card rounded-t-3xl border-t border-border max-h-[88%] flex flex-col fade-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center" aria-label="Close">
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5" style={{ scrollbarWidth: "none" }}>
          {children}
        </div>
        <div className="border-t border-border px-5 py-3 flex gap-2">
          <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-muted text-foreground text-sm font-semibold">
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!canSave || saving}
            className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>) : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
