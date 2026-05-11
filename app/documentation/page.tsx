import type { Metadata } from "next";
import DocsPage from "./components/DocsPage";

export const metadata: Metadata = {
  title: "PII Firewall Documentation",
  description:
    "Complete PII Firewall docs: architecture, setup, API reference, backends, profiles, extensions, and compliance workflows.",
};

export default function DocumentationRoute() {
  return <DocsPage />;
}
