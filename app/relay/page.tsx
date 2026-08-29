import type { Metadata } from "next";
import { RelayApp } from "@/components/relay-app";

export const metadata: Metadata = {
  title: "Check Certificate Status | Pramaan Relay",
  description: "Follow a synthetic citizen journey from a delayed Digital Life Certificate handoff to a clear pension-office decision.",
};

type PageProps = { searchParams: Promise<{ variant?: string; view?: string }> };

export default async function RelayPage({ searchParams }: PageProps) {
  const { variant, view } = await searchParams;
  return (
    <RelayApp
      messageVariant={variant === "direct" ? "direct" : "story"}
      viewMode={view === "reviewer" ? "reviewer" : "citizen"}
    />
  );
}
