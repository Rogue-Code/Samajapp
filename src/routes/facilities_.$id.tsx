import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/facilities_/$id")({
  head: () => ({ meta: [{ title: "Facility — Sangath" }] }),
});
