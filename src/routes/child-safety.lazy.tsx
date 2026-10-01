import { createLazyFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createLazyFileRoute("/child-safety")({
  component: ChildSafetyPage,
});

function ChildSafetyPage() {
  return <LegalPage kind="childSafety" />;
}
