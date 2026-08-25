import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Sangath" }] })
});
