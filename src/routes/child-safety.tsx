import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/child-safety")({
  head: () => ({ meta: [{ title: "Child Safety Standards — Sangath" }] })
});
