import { useEffect, useRef, useState } from "react";
import { Loader2, X, ZoomIn } from "lucide-react";
import { SheetPortal } from "@/components/PhoneFrame";
import { useT } from "@/lib/i18n";

/** Displayed size of the square crop window, in CSS pixels. */
const VIEW = 264;

interface Props {
  /** The chosen file. The sheet owns its object URL for as long as it is open. */
  file: File;
  /** Frame outline. The crop itself is square either way — only the mask differs. */
  shape?: "circle" | "square";
  /** Exported edge length in pixels. */
  output: number;
  /** Set while the caller is uploading the confirmed blob. */
  saving?: boolean;
  /** Error from the caller's upload, shown above the buttons. */
  error?: string;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
}

/**
 * Lets someone position and zoom an image inside a square crop window before it
 * is uploaded.
 *
 * Shared by the profile photo picker and the admin sponsor picker: the geometry
 * (cover-fit, drag within bounds, zoom about the frame) is fiddly enough that a
 * second copy would drift from this one.
 *
 * The image auto-fits on open — centred and scaled to cover the frame — so doing
 * nothing already gives a sensible result.
 */
export function ImageCropSheet({
  file,
  shape = "circle",
  output,
  saving = false,
  error = "",
  onCancel,
  onConfirm,
}: Props) {
  const t = useT();
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
  const [loadError, setLoadError] = useState("");
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Scale that makes the shorter edge exactly fill the frame.
  const baseScale = natural ? VIEW / Math.min(natural.w, natural.h) : 1;
  const drawnW = natural ? natural.w * baseScale * zoom : 0;
  const drawnH = natural ? natural.h * baseScale * zoom : 0;

  const clamp = (x: number, y: number) => ({
    x: Math.min(0, Math.max(VIEW - drawnW, x)),
    y: Math.min(0, Math.max(VIEW - drawnH, y)),
  });

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      const scale = VIEW / Math.min(img.naturalWidth, img.naturalHeight);
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setZoom(1);
      setOffset({
        x: (VIEW - img.naturalWidth * scale) / 2,
        y: (VIEW - img.naturalHeight * scale) / 2,
      });
      setSrc(url);
    };
    img.onerror = () => setLoadError(t("photo.cannotOpen"));
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file, t]);

  // Re-centre whenever the zoom changes so the image never drifts off the frame.
  useEffect(() => {
    if (!natural) return;
    setOffset((prev) => clamp(prev.x, prev.y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, natural]);

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

  const handleConfirm = () => {
    const img = imageRef.current;
    if (!img || !natural || saving) return;

    const canvas = document.createElement("canvas");
    canvas.width = output;
    canvas.height = output;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setLoadError(t("photo.cannotProcess"));
      return;
    }

    // Same geometry as the preview, scaled up from frame size to output size.
    const ratio = output / VIEW;
    ctx.drawImage(img, offset.x * ratio, offset.y * ratio, drawnW * ratio, drawnH * ratio);

    canvas.toBlob(
      (blob) => (blob ? onConfirm(blob) : setLoadError(t("photo.cannotProcess"))),
      "image/jpeg",
      0.9,
    );
  };

  const mask = shape === "circle" ? "rounded-full" : "rounded-2xl";

  return (
    <SheetPortal>
      <div className="fixed md:absolute inset-0 z-50 flex flex-col justify-end">
        <button
          type="button"
          aria-label={t("common.cancel")}
          className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          onClick={onCancel}
        />

        <div className="relative bg-background rounded-t-3xl shadow-elevated px-5 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{t("photo.adjustTitle")}</h2>
            <button
              type="button"
              onClick={onCancel}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              aria-label={t("common.cancel")}
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground mb-3">{t("photo.adjustHint")}</p>

          <div className="flex justify-center">
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={`relative ${mask} overflow-hidden bg-muted cursor-grab active:cursor-grabbing touch-none`}
              style={{ width: VIEW, height: VIEW }}
            >
              {src && (
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  className="absolute max-w-none select-none"
                  style={{ left: offset.x, top: offset.y, width: drawnW, height: drawnH }}
                />
              )}
              <span
                className={`pointer-events-none absolute inset-0 ${mask} ring-2 ring-primary/70`}
              />
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
              aria-label={t("photo.zoom")}
            />
          </div>

          {(loadError || error) && (
            <p className="mt-3 text-sm text-destructive">{loadError || error}</p>
          )}

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={onCancel}
              className="py-3.5 rounded-2xl border border-border bg-card font-semibold text-foreground active:scale-[0.98] transition"
            >
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={saving || !natural}
              className="py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-elevated disabled:opacity-40 active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> {t("photo.saving")}
                </>
              ) : (
                t("photo.use")
              )}
            </button>
          </div>
        </div>
      </div>
    </SheetPortal>
  );
}
