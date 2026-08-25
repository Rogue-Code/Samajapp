import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/members_/$id")({
  head: () => ({ meta: [{ title: "Member — Sangath" }] })
});
