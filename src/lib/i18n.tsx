import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { STRINGS, type StringKey } from "./translations";

export type Lang = "en" | "gu";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "gu", label: "ગુજરાતી" },
];

const STORAGE_KEY = "sangath.lang";

/**
 * App language.
 *
 * Deliberately hand-rolled rather than pulling in an i18n library: the app ships
 * to Android WebViews old enough that bundle size matters (see the es2019 build
 * target), and the needs here are two languages and simple interpolation.
 *
 * Only the app's own text is translated. Member-entered content — names, event
 * titles, posts — stays exactly as it was typed, and values persisted to the
 * database (gender, marital status) stay in English regardless of display language.
 */
interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  toggle: () => void;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
}

/** The translate function, for helpers that take it as an argument. */
export type TFunction = LanguageValue["t"];

/**
 * BCP 47 tag for date and number formatting.
 *
 * WebViews without Gujarati ICU data fall back to English formatting on their
 * own, which is a readable result rather than an error.
 */
export function localeFor(lang: Lang) {
  return lang === "gu" ? "gu-IN" : "en-IN";
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStored(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    return localStorage.getItem(STORAGE_KEY) === "gu" ? "gu" : "en";
  } catch {
    // Private browsing and some WebView configurations throw on access.
    return "en";
  }
}

/**
 * Layout effects do not run on the server, and React warns about them there.
 * On the client this runs before paint, so adopting the stored language causes
 * no visible flash of English.
 */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Starts English rather than reading storage during render: the server has no
  // access to the preference, and rendering Gujarati on the first client pass
  // would be a hydration mismatch. The stored choice is adopted below, before
  // the browser paints.
  const [lang, setLangState] = useState<Lang>("en");
  const [adopted, setAdopted] = useState(false);

  useBeforePaint(() => {
    const stored = readStored();
    if (stored !== "en") setLangState(stored);
    setAdopted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    // Writing before the stored value has been read would persist the English
    // default over a saved Gujarati choice.
    if (!adopted) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Preference is lost on reload, which is survivable; the UI still switches.
    }
  }, [lang, adopted]);

  const t = useCallback(
    (key: StringKey, vars?: Record<string, string | number>) => {
      // Fall back to English for anything not yet translated, so a missing
      // Gujarati string shows real text rather than a raw key.
      const table = STRINGS[lang] as Partial<Record<StringKey, string>>;
      let out = table[key] ?? STRINGS.en[key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          out = out.split(`{${name}}`).join(String(value));
        }
      }
      return out;
    },
    [lang],
  );

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "en" ? "gu" : "en")),
      t,
    }),
    [lang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** Shorthand for components that only need the translate function. */
export function useT() {
  return useLanguage().t;
}
