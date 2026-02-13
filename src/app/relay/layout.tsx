import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relay Robber",
  description:
    "Find the best Warframe relay instance for your blessing based on player count, region, and language.",
  openGraph: {
    title: "Relay Robber - Find Best Relay Instances",
    description:
      "Find the best Warframe relay instance for your blessing based on player count, region, and language.",
  },
};

export default function RelayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
