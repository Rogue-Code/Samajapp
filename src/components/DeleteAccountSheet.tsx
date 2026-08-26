import { useState } from "react";
import { SheetPortal } from "@/components/PhoneFrame";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CONFIRM_WORD = "DELETE";

/**
 * Irreversible account deletion. Two things make this more than a button:
 *
 * 1. Avatar files live in a *public* storage bucket and have no foreign key to
 *    auth.users, so nothing cascades them. They are removed through the storage
 *    API here — which reclaims the actual object — before the row is deleted.
 *    delete_my_account() also clears any leftover rows as a backstop, so a
 *    failure here degrades to an orphaned file rather than a readable photo.
 *
 * 2. The session outlives the user. A JWT stays cryptographically valid until
 *    it expires, so the local session has to be torn down explicitly once the
 *    row is gone, and signOut() itself may fail against a deleted user.
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

    const { error: rpcError } = await supabase.rpc("delete_my_account");
    if (rpcError) {
      setError(rpcError.message || "Could not delete your account. Please try again.");
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
              <AlertTriangle className="w-4 h-4" /> Delete Account
            </h3>
            <button
              onClick={onClose}
              disabled={deleting}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center disabled:opacity-40"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            style={{ scrollbarWidth: "none" }}
          >
            <p className="text-sm text-foreground leading-relaxed">
              This cannot be undone. Your login stops working immediately and you would have to sign
              up again from scratch.
            </p>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Permanently deleted
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[
                  "Your profile and every detail in it",
                  "Your family members and their details",
                  "Your profile photo",
                  "Your saved posts and saved facilities",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[0.55rem] w-1 h-1 rounded-full bg-destructive/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Kept, without your name
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[
                  "Community news you published stays in the feed, with the byline removed",
                  "Events you created stay on the calendar",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[0.55rem] w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                Type {CONFIRM_WORD} to confirm
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete my account permanently"
              )}
            </button>
            <button
              onClick={onClose}
              disabled={deleting}
              className="w-full h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold active:scale-[0.98] transition disabled:opacity-40"
            >
              Keep my account
            </button>
          </div>
        </div>
      </div>
    </SheetPortal>
  );
}
