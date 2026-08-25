import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home \u2014 Sangath" }] })
});
