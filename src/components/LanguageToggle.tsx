import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/**
 * Switches the app between English and Gujarati.
 *
 * Shows the language it will switch *to*, which is what makes a two-language
 * toggle readable without a dropdown: an English speaker sees "ગુજરાતી" and a
 * Gujarati reader sees "EN".
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLanguage();
  const next = lang === "en" ? "ગુજરાતી" : "EN";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "en" ? "ગુજરાતીમાં બદલો" : "Switch to English"}
      className={`flex items-center gap-1.5 text-xs text-muted-foreground px-3.5 h-9 rounded-full bg-muted active:scale-95 transition ${className}`}
    >
      <Globe className="w-3.5 h-3.5 shrink-0" />
      {next}
    </button>
  );
}
