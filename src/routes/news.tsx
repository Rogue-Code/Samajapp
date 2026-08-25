import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "Community News \u2014 Sangath" }] })
});
