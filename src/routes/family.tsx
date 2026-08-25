import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/family")({
  head: () => ({ meta: [{ title: "Family Members — Sangath" }] })
});
