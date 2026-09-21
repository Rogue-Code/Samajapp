// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Nitro auto-detects the root index.html as a static "renderer template" and,
  // for this nitro/TanStack Start version pairing, never upgrades it to the real
  // SSR handler — the upgrade check compares it against the client build's Rollup
  // input with `===`, but TanStack Start's input is an object
  // ({ index: "virtual:tanstack-start-client-entry" }), which can never equal a
  // string path. The result: every request (including server functions) got the
  // raw, unbuilt index.html served back verbatim instead of a real SSR response.
  // `renderer: false` disables that auto-detection entirely, which lets nitro's
  // other default (wiring the request straight to the built SSR service) apply
  // instead — see node_modules/nitro/dist/vite.mjs's buildEnvironments().
  //
  // @lovable.dev/vite-tanstack-config's own `nitro` type deliberately exposes
  // only a narrow, stable surface (its comment says as much) and doesn't list
  // `renderer` — but the option object is passed straight through to nitro's
  // own plugin at runtime, which does support it. Cast past the narrow type.
  nitro: {
    renderer: false,
  } as { preset?: string },
});
