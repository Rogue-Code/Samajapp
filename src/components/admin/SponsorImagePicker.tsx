import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageCropSheet } from "@/components/ImageCropSheet";

/** Uploaded edge length. Sponsor artwork is square and shown at most ~440px wide. */
const OUTPUT = 1024;

/**
 * Sponsor artwork picker for the admin console.
 *
 * The banner is square, so the crop frame is too — but the admin still positions
 * and zooms the image rather than getting an automatic centre crop, because
 * sponsor artwork often has the logo off-centre and a blind crop can cut it.
 */
export function SponsorImagePicker({
  value,
  onChange,
}: {
  value: string | null;
  /**
   * Both files: the square crop for the Home banner, and the untouched upload for
   * the sponsor detail page, which has room to show the whole poster.
   */
  onChange: (urls: { image_url: string | null; image_original_url: string | null }) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError("");
    setPending(file);
  };

  const close = () => {
    setPending(null);
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const upload = async (blob: Blob) => {
    if (!pending) return;
    setBusy(true);
    setError("");

    const stamp = Date.now();
    const publicUrl = async (path: string, body: Blob | File, type: string) => {
      const { error: uploadError } = await supabase.storage
        .from("sponsors")
        .upload(path, body, { contentType: type, upsert: true });
      if (uploadError) throw new Error(uploadError.message || "Upload failed. Please try again.");
      return supabase.storage.from("sponsors").getPublicUrl(path).data.publicUrl;
    };

    try {
      const square = await publicUrl(`sponsor-${stamp}.jpg`, blob, "image/jpeg");
      // Best effort: losing the original costs the detail page its full-size
      // poster, which is not worth failing the whole save over.
      let original: string | null = null;
      try {
        const ext = (pending.name.split(".").pop() || "jpg").toLowerCase();
        original = await publicUrl(
          `sponsor-${stamp}-original.${ext}`,
          pending,
          pending.type || "image/jpeg",
        );
      } catch {
        original = null;
      }
      onChange({ image_url: square, image_original_url: original });
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
        Banner photo
      </label>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label={value ? "Replace banner photo" : "Add banner photo"}
          className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center active:scale-95 transition"
        >
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-6 h-6 text-muted-foreground" />
          )}
        </button>

        <div className="min-w-0">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="h-9 px-3 rounded-xl bg-muted text-foreground text-xs font-semibold active:scale-95 transition"
          >
            {value ? "Replace photo" : "Choose photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange({ image_url: null, image_original_url: null })}
              className="ml-2 h-9 px-3 rounded-xl text-destructive text-xs font-semibold inline-flex items-center gap-1.5 active:scale-95 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          )}
          <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
            Shown as a square. You can reposition and zoom before saving. The emoji is used when no
            photo is set.
          </p>
        </div>
      </div>

      {error && !pending && <p className="text-xs text-destructive mt-2">{error}</p>}

      {pending && (
        <ImageCropSheet
          file={pending}
          shape="square"
          output={OUTPUT}
          saving={busy}
          error={error}
          onCancel={close}
          onConfirm={(blob) => void upload(blob)}
        />
      )}
    </div>
  );
}
