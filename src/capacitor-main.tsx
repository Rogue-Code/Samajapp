import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { setupMobileKeyboardViewport } from "./lib/mobile-keyboard";
import { setupAndroidBackButton } from "./lib/android-back";
import "./styles.css";

setupMobileKeyboardViewport();

const router = getRouter();

// After getRouter: the back handler needs the router's own history, since the
// WebView's document history does not track client-side navigation reliably.
setupAndroidBackButton(router);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
