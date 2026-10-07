import type { Metadata } from "next";

const description =
  "A companion app for Warframe on Linux and Windows. Shows your inventory, foundry, relics, rivens, mastery and more. Integrates with warframe.market and in-game overlays.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/merframe",
  },
  title: "Merframe",
  description,
  openGraph: {
    title: "Merframe",
    description,
    images: [
      {
        url: "https://yareli.net/merframe/social.png",
        width: 1280,
        height: 640,
        alt: "Merframe",
      },
    ],
  },
};

export default function MerframeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
