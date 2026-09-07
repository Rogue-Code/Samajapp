import { useRef, useState } from "react";
import { Camera, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageCropSheet } from "@/components/ImageCropSheet";
import { useT } from "@/lib/i18n";

/** Exported avatar size. Keeps uploads small without looking soft on a phone. */
const OUTPUT = 512;

interface Props {
  userId: string;
  value: string | null;
  onChange: (url: string) => void;
  /**
   * Smaller circle with no caption, for sitting inside an existing layout such as
   * the Account header card. Profile Setup uses the default, where the picker is
   * the focus of the screen.
   */
  compact?: boolean;
}

/**
 * Profile photo picker: opens the device gallery, then lets the member position
 * the image inside a circular frame before uploading.
 *
 * The framing UI lives in <ImageCropSheet>, shared with the admin sponsor picker.
 */
export function AvatarPicker({ userId, value, onChange, compact = false }: Props) {
  const t = useT();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(t("photo.notAnImage"));
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
    setBusy(true);
    setError("");

    // Path must start with the user id — the storage policies check that segment.
    const path = `${userId}/avatar-${Date.now()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, blob, { contentType: "image/jpeg", upsert: true });

    if (uploadError) {
      setError(uploadError.message || t("photo.uploadFailed"));
      setBusy(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    onChange(data.publicUrl);
    close();
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={`relative ${compact ? "w-20 h-20" : "w-28 h-28"} rounded-full overflow-hidden border-4 border-card shadow-card active:scale-95 transition`}
        aria-label={value ? t("photo.changeAria") : t("photo.addAria")}
      >
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="w-full h-full bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center">
            <User className={compact ? "w-9 h-9 text-primary" : "w-12 h-12 text-primary"} />
          </span>
        )}
        <span
          className={`absolute bottom-0 inset-x-0 ${compact ? "h-6" : "h-8"} bg-foreground/55 flex items-center justify-center`}
        >
          <Camera className={compact ? "w-3.5 h-3.5 text-background" : "w-4 h-4 text-background"} />
        </span>
      </button>

      {!compact && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-2 text-sm font-medium text-primary"
        >
          {value ? t("photo.change") : t("photo.add")}
        </button>
      )}

      {error && !pending && <p className="mt-2 text-sm text-destructive text-center">{error}</p>}

      {pending && (
        <ImageCropSheet
          file={pending}
          shape="circle"
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
