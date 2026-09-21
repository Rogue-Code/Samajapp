import { useState } from "react";
import { SheetPortal } from "@/components/PhoneFrame";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { requestAccountDeletion } from "@/lib/account-deletion-helpers";
import { useT } from "@/lib/i18n";

const CONFIRM_WORD = "DELETE";

/**
 * Irreversible account deletion. Two things make this more than a button:
 *
 * 1. Avatar files live in a *public* storage bucket and have no foreign key to
 *    auth.users, so nothing cascades them. They are removed through the storage
 *    API here — which reclaims the actual object — before the row is deleted.
 *    This is the only cleanup path: delete_my_account() cannot carry a SQL-level
 *    backstop, because Supabase rejects any raw DELETE against storage.objects
 *    outright ("Use storage API instead") — it isn't conditional on a matching
 *    row, so an unconditional backstop statement there previously broke every
 *    deletion, not just ones with a leftover file. If this call fails, the file
 *    is left behind under a login that no longer exists rather than a readable
 *    photo — an acceptable trade next to the RPC never running at all.
 *
 * 2. The session outlives the user. A JWT stays cryptographically valid until
 *    it expires, so the local session has to be torn down explicitly once the
 *    row is gone, and signOut() itself may fail against a deleted user.
 *
 * 3. Deletion no longer stops at Supabase. A member who signs in by mobile also
 *    has a Firebase user holding that number, and removing it needs
 *    service-account credentials — so the delete runs server-side, through
 *    requestAccountDeletion(), rather than calling the RPC from here. See
 *    account-deletion.functions.ts for why Supabase is deleted first.
 */
export function DeleteAccountSheet({
  userId,
  onClose,
  onDeleted,
}: {
  userId: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const t = useT();
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const canDelete = confirmText.trim().toUpperCase() === CONFIRM_WORD && !deleting;

  const handleDelete = async () => {
    if (!canDelete) return;
    setError("");
    setDeleting(true);

    // Best effort: a storage failure must not block someone exercising their
    // right to erasure, and the function cleans up behind us either way.
    const { data: files } = await supabase.storage.from("avatars").list(userId);
    if (files && files.length > 0) {
      await supabase.storage.from("avatars").remove(files.map((f) => `${userId}/${f.name}`));
    }

    const result = await requestAccountDeletion();
    if (!result.ok) {
      // "refused" carries the database guard's own message (for example, being
      // the only admin left), which the member needs in order to act on it.
      setError(result.reason === "refused" ? result.message : t("delete.failed"));
      setDeleting(false);
      return;
    }

    // The row is gone, so this call has nothing to revoke server-side; it is
    // here to clear the stored session. Failure is expected and harmless.
    await supabase.auth.signOut().catch(() => undefined);
    onDeleted();
  };

  return (
    <SheetPortal>
      <div className="fixed md:absolute inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center">
        <div className="w-full md:max-w-md bg-card rounded-t-3xl md:rounded-3xl shadow-elevated max-h-[90%] flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-base font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {t("account.deleteAccount")}
            </h3>
            <button
              onClick={onClose}
              disabled={deleting}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center disabled:opacity-40"
              aria-label={t("common.close")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            style={{ scrollbarWidth: "none" }}
          >
            <p className="text-sm text-foreground leading-relaxed">{t("delete.warning")}</p>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                {t("delete.permanentlyDeleted")}
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {(
                  [
                    "delete.itemProfile",
                    "delete.itemFamily",
                    "delete.itemPhoto",
                    "delete.itemSaved",
                  ] as const
                ).map((key) => (
                  <li key={key} className="flex gap-2.5">
                    <span className="mt-[0.55rem] w-1 h-1 rounded-full bg-destructive/70 shrink-0" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                {t("delete.keptTitle")}
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {(["delete.keptNews", "delete.keptEvents"] as const).map((key) => (
                  <li key={key} className="flex gap-2.5">
                    <span className="mt-[0.55rem] w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                {t("delete.confirmLabel", { word: CONFIRM_WORD })}
              </label>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={CONFIRM_WORD}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                className="mt-1 w-full h-11 px-3 rounded-xl bg-muted border border-border outline-none text-sm tracking-widest focus:ring-2 focus:ring-destructive"
              />
            </div>

            {error && <p className="text-sm text-destructive leading-relaxed">{error}</p>}
          </div>

          <div className="px-5 py-4 border-t border-border space-y-2">
            <button
              onClick={() => void handleDelete()}
              disabled={!canDelete}
              className="w-full h-12 rounded-2xl bg-destructive text-destructive-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition disabled:opacity-40"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> {t("delete.deleting")}
                </>
              ) : (
                t("delete.confirmButton")
              )}
            </button>
            <button
              onClick={onClose}
              disabled={deleting}
              className="w-full h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold active:scale-[0.98] transition disabled:opacity-40"
            >
              {t("delete.keep")}
            </button>
          </div>
        </div>
      </div>
    </SheetPortal>
  );
}
