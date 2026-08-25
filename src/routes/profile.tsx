import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile Setup — Sangath" }] })
});
