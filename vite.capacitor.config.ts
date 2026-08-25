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
  },

  server: {
    historyApiFallback: true,
  },
});
