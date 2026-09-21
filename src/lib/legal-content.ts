import type { Lang } from "./i18n";
import { EN_LEGAL } from "./legal-content.en";
import { GU_LEGAL } from "./legal-content.gu";

/**
 * The Terms of Use and Privacy Policy as data rather than JSX.
 *
 * These are long-form legal documents, not UI labels, so they live apart from
 * `translations.ts`: a reviewer has to be able to read a whole document in one
 * language and compare it against the other, which a flat key table makes
 * impossible. Keeping them structured also means the two languages cannot drift
 * apart in *shape* — a missing section shows up as a type error or a visibly
 * short document rather than a silently untranslated paragraph.
 *
 * Text may contain `**bold**` spans and `{placeholder}` names, both resolved at
 * render by `LegalPage`. The placeholders come from `legal.ts`, which stays the
 * single source of truth for who operates the app and how to reach them.
 */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] }
  /** Call-out for the disclosures a member is most likely to be surprised by. */
  | { kind: "highlight"; title: string; text: string };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalBundle {
  terms: LegalDoc;
  privacy: LegalDoc;
}

export type LegalDocKind = keyof LegalBundle;

const BUNDLES: Record<Lang, LegalBundle> = {
  en: EN_LEGAL,
  gu: GU_LEGAL,
};

/**
 * The requested document in the requested language.
 *
 * Unlike `t()`, this does not fall back key-by-key. A half-English document
 * would be worse than either language alone — a member could not tell which
 * parts they had actually been told. Languages are whole documents or nothing.
 */
export function legalDoc(kind: LegalDocKind, lang: Lang): LegalDoc {
  return (BUNDLES[lang] ?? BUNDLES.en)[kind];
}

/**
 * Warns in development when the two languages have drifted apart structurally.
 *
 * The shared `LegalBundle` type guarantees both documents exist and are shaped
 * alike, but not that they say the same number of things: adding a section to
 * the English and forgetting the Gujarati type-checks cleanly and ships a
 * document that quietly omits a clause. That is the failure worth catching, and
 * it is cheap to catch here rather than in review.
 *
 * Wording is not checked — nothing automatic can — so this is a floor, not a
 * substitute for reading both documents when either changes.
 */
if (import.meta.env?.DEV) {
  const shapeOf = (doc: LegalDoc) =>
    doc.sections.map((s) => s.blocks.map((b) => b.kind).join(",")).join(" | ");

  for (const kind of ["terms", "privacy"] as LegalDocKind[]) {
    const en = shapeOf(EN_LEGAL[kind]);
    const gu = shapeOf(GU_LEGAL[kind]);
    if (en !== gu) {
      console.warn(
        `[legal] The English and Gujarati "${kind}" documents no longer have the same structure. ` +
          `One language is missing a section or a block — update both in the same commit.\n` +
          `  en: ${en}\n  gu: ${gu}`,
      );
    }
  }
}
