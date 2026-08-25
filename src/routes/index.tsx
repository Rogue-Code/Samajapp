import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sangath — Login" },
      { name: "description", content: "Connect with your family & community digitally." },
    ]
  })
});
