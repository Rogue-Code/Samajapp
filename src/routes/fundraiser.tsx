import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fundraiser")({
  head: () => ({ meta: [{ title: "Fundraiser — Sangath" }] })
});
