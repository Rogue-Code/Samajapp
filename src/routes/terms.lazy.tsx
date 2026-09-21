import { createLazyFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createLazyFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return <LegalPage kind="terms" />;
}
