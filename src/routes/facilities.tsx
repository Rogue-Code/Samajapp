import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities Directory — Sangath" },
      { name: "description", content: "Search community schools, hospitals, hostels, banks and more." },
    ]
  })
});
