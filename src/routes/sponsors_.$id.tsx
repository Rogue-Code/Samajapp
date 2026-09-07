import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sponsors_/$id")({
  head: () => ({ meta: [{ title: "Sponsor — Sangath" }] }),
});
