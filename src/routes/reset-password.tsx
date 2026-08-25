import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — Sangath" }] })
});
