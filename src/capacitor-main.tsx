import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { setupMobileKeyboardViewport } from "./lib/mobile-keyboard";
import { setupAndroidBackButton } from "./lib/android-back";
import "./styles.css";

setupMobileKeyboardViewport();
setupAndroidBackButton();

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
