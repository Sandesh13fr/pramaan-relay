import type { Metadata } from "next";
import { RelayApp } from "@/components/relay-app";

export const metadata: Metadata = {
  title: "Live Relay | Pramaan Relay",
  description: "Try four synthetic Digital Life Certificate handoff situations and see who is responsible next.",
};

type PageProps = { searchParams: Promise<{ variant?: string }> };

export default async function RelayPage({ searchParams }: PageProps) {
  const { variant } = await searchParams;
  return <RelayApp messageVariant={variant === "direct" ? "direct" : "story"} />;
}
