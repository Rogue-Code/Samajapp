import { useEffect, useRef, useState } from "react";
import { SheetPortal } from "@/components/PhoneFrame";
import { Camera, Loader2, User, X, ZoomIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/** Displayed size of the square crop window, in CSS pixels. */
const VIEW = 264;
/** Exported avatar size. Keeps uploads small without looking soft on a phone. */
const OUTPUT = 512;

interface Props {
  userId: string;
  value: string | null;
  onChange: (url: string) => void;
}

/**
 * Profile photo picker: opens the device gallery, then lets the member position the
 * image inside a circular frame before uploading.
 *
 * The photo auto-fits on selection (centred, scaled to cover the frame), so doing
 * nothing already gives a sensible result; dragging and the zoom slider are there
 * for members who want to adjust it themselves.
 */
export function AvatarPicker({ userId, value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Scale that makes the shorter edge exactly fill the frame.
  const baseScale = natural ? VIEW / Math.min(natural.w, natural.h) : 1;
  const drawnW = natural ? natural.w * baseScale * zoom : 0;
  const drawnH = natural ? natural.h * baseScale * zoom : 0;

  const clamp = (x: number, y: number) => ({
    x: Math.min(0, Math.max(VIEW - drawnW, x)),
    y: Math.min(0, Math.max(VIEW - drawnH, y)),
  });

  // Re-centre whenever the zoom changes so the image never drifts off the frame.
  useEffect(() => {
    if (!natural) return;
    setOffset((prev) => clamp(prev.x, prev.y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, natural]);

  useEffect(() => {
    return () => {
      if (src) URL.revokeObjectURL(src);
    };
  }, [src]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError("");
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      const scale = VIEW / Math.min(img.naturalWidth, img.naturalHeight);
      setZoom(1);
      setOffset({
        x: (VIEW - img.naturalWidth * scale) / 2,
        y: (VIEW - img.naturalHeight * scale) / 2,
      });
      setSrc(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError("That image could not be opened. Try another one.");
    };
    img.src = url;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    setOffset(
      clamp(drag.originX + (e.clientX - drag.startX), drag.originY + (e.clientY - drag.startY)),
    );
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  };

  const close = () => {
    if (src) URL.revokeObjectURL(src);
    setSrc(null);
    setNatural(null);
    imageRef.current = null;
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = async () => {
    const img = imageRef.current;
    if (!img || !natural || busy) return;
    setBusy(true);
    setError("");

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Could not process the image on this device.");
      setBusy(false);
      return;
    }

    // Same geometry as the preview, scaled up from frame size to output size.
    const ratio = OUTPUT / VIEW;
    ctx.drawImage(img, offset.x * ratio, offset.y * ratio, drawnW * ratio, drawnH * ratio);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9),
    );
    if (!blob) {
      setError("Could not process the image on this device.");
      setBusy(false);
      return;
    }

    // Path must start with the user id — the storage policies check that segment.
    const path = `${userId}/avatar-${Date.now()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, blob, { contentType: "image/jpeg", upsert: true });

    if (uploadError) {
      setError(uploadError.message || "Upload failed. Please try again.");
      setBusy(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    onChange(data.publicUrl);
    setBusy(false);
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
        className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-card shadow-card active:scale-95 transition"
        aria-label={value ? "Change profile photo" : "Add profile photo"}
      >
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="w-full h-full bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </span>
        )}
        <span className="absolute bottom-0 inset-x-0 h-8 bg-foreground/55 flex items-center justify-center">
          <Camera className="w-4 h-4 text-background" />
        </span>
      </button>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="mt-2 text-sm font-medium text-primary"
      >
        {value ? "Change photo" : "Add photo"}
      </button>

      {error && !src && <p className="mt-2 text-sm text-destructive text-center">{error}</p>}

      {src && natural && (
        <SheetPortal>
          <div className="fixed md:absolute inset-0 z-50 flex flex-col justify-end">
            <button
              type="button"
              aria-label="Cancel"
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={close}
            />

            <div className="relative bg-background rounded-t-3xl shadow-elevated px-5 pt-4 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Adjust photo</h2>
                <button
                  type="button"
                  onClick={close}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                  aria-label="Cancel"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                Drag to reposition, or use the slider to zoom.
              </p>

              <div className="flex justify-center">
                <div
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  className="relative rounded-full overflow-hidden bg-muted cursor-grab active:cursor-grabbing touch-none"
                  style={{ width: VIEW, height: VIEW }}
                >
                  <img
                    src={src}
                    alt=""
                    draggable={false}
                    className="absolute max-w-none select-none"
                    style={{
                      left: offset.x,
                      top: offset.y,
                      width: drawnW,
                      height: drawnH,
                    }}
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/70" />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <ZoomIn className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-primary"
                  aria-label="Zoom"
                />
              </div>

              {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  type="button"
                  onClick={close}
                  className="py-3.5 rounded-2xl border border-border bg-card font-semibold text-foreground active:scale-[0.98] transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={busy}
                  className="py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-elevated disabled:opacity-40 active:scale-[0.98] transition flex items-center justify-center gap-2"
                >
                  {busy ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving
                    </>
                  ) : (
                    "Use photo"
                  )}
                </button>
              </div>
            </div>
          </div>
        </SheetPortal>
      )}
    </div>
  );
}
