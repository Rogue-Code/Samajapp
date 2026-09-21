import { createLazyFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createLazyFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalPage kind="privacy" />;
}
