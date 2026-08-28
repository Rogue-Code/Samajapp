import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // The APK bundle mounts the router into <div id="root"> instead of rendering a
  // document, so the root route must not emit <html>/<head>/<body>. See RootShell.
  define: {
    __CAPACITOR_SPA__: "true",
  },

  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Vite's default target assumes an evergreen browser. An APK runs against
    // whatever Android System WebView the device happens to have, which on older
    // handsets can be years behind — a POCO F1 on MIUI 12 shipped Chrome 83, and
    // the default output's logical-assignment operators (??=, ||=) failed to
    // parse, so the bundle died with "Unexpected token '='" and rendered nothing.
    // es2019 transpiles those away and still covers every WebView worth caring
    // about. Raise it only with a device that old to test against.
    target: "es2019",
  },

  server: {
    historyApiFallback: true,
  },
});
