import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description:
    "View and analyze your Warframe account information including mastery rank, platinum, and more.",
  openGraph: {
    title: "Warframe Account Viewer",
    description:
      "View and analyze your Warframe account information including mastery rank, platinum, and more.",
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
