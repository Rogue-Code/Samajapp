import { Fragment, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LanguageToggle } from "@/components/LanguageToggle";
import { localeFor, useLanguage } from "@/lib/i18n";
import {
  COMMUNITY_NAME,
  CONTACT_EMAIL,
  DATA_REGION,
  GRIEVANCE_OFFICER,
  LAST_UPDATED_ISO,
  OPERATOR_NAME,
} from "@/lib/legal";
import { legalDoc, type LegalBlock, type LegalDocKind } from "@/lib/legal-content";

/**
 * Renders the Terms of Use or Privacy Policy in the reader's language.
 *
 * Reached from the login screen before a session exists, so this must never
 * call useRequireAuth — it has to render for signed-out visitors. It carries its
 * own LanguageToggle for the same reason: someone reading the terms before they
 * sign up has no other way to switch, and these are the two screens where being
 * able to read the text actually matters.
 */

/** Values for the `{placeholder}` names used in the document text. */
const PLACEHOLDERS: Record<string, string> = {
  operator: OPERATOR_NAME,
  community: COMMUNITY_NAME,
  email: CONTACT_EMAIL,
  officer: GRIEVANCE_OFFICER,
  region: DATA_REGION,
};

function fill(text: string) {
  let out = text;
  for (const [name, value] of Object.entries(PLACEHOLDERS)) {
    out = out.split(`{${name}}`).join(value);
  }
  return out;
}

/**
 * Resolves placeholders, then renders `**bold**` spans.
 *
 * Deliberately not a Markdown parser: the documents only ever need emphasis,
 * and shipping a parser to an old Android WebView to bold four phrases would be
 * a poor trade. An unpaired `**` renders literally rather than swallowing the
 * rest of the paragraph.
 */
function renderText(text: string): ReactNode {
  const parts = fill(text).split("**");
  if (parts.length < 3) return fill(text);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-foreground">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "p") return <p>{renderText(block.text)}</p>;

  if (block.kind === "bullets") {
    return (
      <ul className="space-y-1.5 pl-1">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-[0.55rem] w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
            <span>{renderText(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-4 text-sm text-foreground leading-relaxed">
      <p className="font-semibold mb-2">{renderText(block.title)}</p>
      <p>{renderText(block.text)}</p>
    </div>
  );
}

export function LegalPage({ kind }: { kind: LegalDocKind }) {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const doc = legalDoc(kind, lang);

  // Falls back to the ISO string if the WebView has no ICU data for the locale,
  // which is readable rather than blank. See localeFor() on the same trade.
  let updated = LAST_UPDATED_ISO;
  try {
    updated = new Intl.DateTimeFormat(localeFor(lang), {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${LAST_UPDATED_ISO}T00:00:00`));
  } catch {
    // keep the ISO string
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-8 pb-10">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => router.history.back()}
            className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition shrink-0"
            aria-label={t("common.back")}
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <LanguageToggle />
        </div>

        <div className="mt-6 fade-up">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{doc.title}</h1>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">{doc.intro}</p>
          <p className="text-xs text-muted-foreground mt-3">
            {t("legal.lastUpdated", { date: updated })}
          </p>
        </div>

        <div className="mt-8 space-y-7 fade-up" style={{ animationDelay: "60ms" }}>
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-bold text-foreground text-base mb-2">{section.heading}</h2>
              <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
