import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — Sangath" }] })
});
