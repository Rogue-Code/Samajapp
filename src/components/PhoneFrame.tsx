import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SHEET_LAYER_ID = "sangath-sheet-layer";
const NAV_LAYER_ID = "sangath-nav-layer";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-viewport w-full bg-gradient-to-br from-primary-soft via-background to-accent flex md:items-center md:justify-center md:p-8">
      {/*
        Two boxes, deliberately. The outer frame never scrolls, which is what
        makes it a usable anchor for bottom sheets: anchoring a sheet to a
        scroll container makes the sheet scroll away with the content, and
        anchoring it to a route's own wrapper stretches it to the full page
        height. Sheets go through <SheetPortal> into the layer below, so they
        resolve against this box and nothing else.
      */}
      <div className="relative flex flex-col w-full max-w-[440px] md:max-w-[420px] min-h-full md:min-h-0 md:h-[860px] mx-auto">
        <div
          className="keyboard-scroll-region flex-1 w-full bg-background overflow-y-auto md:rounded-[2.5rem] md:shadow-elevated md:border-8 md:border-foreground/90"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
        </div>
        {/*
          display:contents so the layers themselves lay out nothing. The nav
          layer comes first so sheets (z-50) stack above the bottom bar (z-30).
        */}
        <div id={NAV_LAYER_ID} style={{ display: "contents" }} />
        <div id={SHEET_LAYER_ID} style={{ display: "contents" }} />
      </div>
    </div>
  );
}

/**
 * Renders a bottom sheet into the PhoneFrame's sheet layer, outside the
 * scrolling content.
 *
 * Sheets used to render in place with `fixed md:absolute inset-0`. At mobile
 * widths that is correct — the body scrolls, so only `fixed` stays put. At
 * desktop widths `absolute` resolved against whichever route wrapper happened
 * to be `relative`, which stretches to the full page height, so the sheet's
 * buttons rendered below the fold and could not be reached. Portalling here
 * makes `absolute` resolve against the fixed-height frame instead.
 */
export function SheetPortal({ children }: { children: ReactNode }) {
  return <LayerPortal id={SHEET_LAYER_ID}>{children}</LayerPortal>;
}

/**
 * Renders the bottom navigation into the frame's nav layer.
 *
 * Same reasoning as SheetPortal: rendered in place, `absolute bottom-0` resolved
 * against the route's own wrapper, which grows with its content — so the bar sat
 * at the bottom of the *page* and scrolled out of view instead of staying put.
 */
export function NavPortal({ children }: { children: ReactNode }) {
  return <LayerPortal id={NAV_LAYER_ID}>{children}</LayerPortal>;
}

function LayerPortal({ id, children }: { id: string; children: ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  // The layer is rendered by PhoneFrame in the same commit, so it exists by the
  // time effects run — but not during SSR or the first render pass.
  useEffect(() => {
    setTarget(document.getElementById(id));
  }, [id]);

  if (!target) return null;
  return createPortal(children, target);
}
