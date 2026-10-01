import { useState } from "react";
import { SheetPortal } from "@/components/PhoneFrame";
import { CheckCircle2, Loader2, Mail, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/legal";

/**
 * In-app feedback mechanism required by Google Play's Child Safety Standards
 * policy: Play review rejected the production release because the only
 * contact path (a mailto: link on the login screen) hands off to an external
 * email app rather than working "without leaving the app".
 *
 * Reachable signed in or signed out — submit_support_message() accepts both,
 * since this sheet is opened from the login screen before a session exists.
 * It is a one-way mailbox: nothing submitted here can be read back through
 * the API, by the sender or anyone else, only by the operator via the
 * Supabase dashboard — so there is no "your messages" list to build here.
 */
export function SupportSheet({ onClose }: { onClose: () => void }) {
  const t = useT();
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const canSend = message.trim().length > 0 && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    setError("");
    setSending(true);

    const { error: rpcError } = await supabase.rpc("submit_support_message", {
      message_text: message.trim(),
      contact: contact.trim() || undefined,
    });

    setSending(false);
    if (rpcError) {
      setError(t("support.error"));
      return;
    }
    setSent(true);
  };

  return (
    <SheetPortal>
      <div className="fixed md:absolute inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center">
        <div className="w-full md:max-w-md bg-card rounded-t-3xl md:rounded-3xl shadow-elevated max-h-[90%] flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" /> {t("support.sheetTitle")}
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
              aria-label={t("common.close")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            style={{ scrollbarWidth: "none" }}
          >
            {sent ? (
              <div className="flex flex-col items-center text-center gap-3 py-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
                <p className="text-sm text-foreground leading-relaxed">{t("support.success")}</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("support.sheetIntro")}
                </p>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    {t("support.messageLabel")}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("support.messagePlaceholder")}
                    rows={4}
                    className="mt-1 w-full px-3 py-2.5 rounded-xl bg-muted border border-border outline-none text-sm resize-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    {t("support.contactLabel")}
                  </label>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t("support.contactPlaceholder")}
                    className="mt-1 w-full h-11 px-3 rounded-xl bg-muted border border-border outline-none text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>

                {error && <p className="text-sm text-destructive leading-relaxed">{error}</p>}
              </>
            )}
          </div>

          <div className="px-5 py-4 border-t border-border space-y-2">
            {sent ? (
              <button
                onClick={onClose}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition"
              >
                {t("support.done")}
              </button>
            ) : (
              <button
                onClick={() => void handleSend()}
                disabled={!canSend}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition disabled:opacity-40"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {t("support.sending")}
                  </>
                ) : (
                  t("support.submit")
                )}
              </button>
            )}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-center text-xs text-muted-foreground hover:text-foreground transition"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </SheetPortal>
  );
}
