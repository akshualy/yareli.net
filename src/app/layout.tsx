import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "../components/navbar";
import { ThemeProvider } from "../components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "yareli.net",
    template: "%s | yareli.net",
  },
  description:
    "Community tools for Warframe players - find relays, manage blessings, and more.",
  metadataBase: new URL("https://yareli.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yareli.net",
    siteName: "yareli.net",
    title: "yareli.net",
    description:
      "Community tools for Warframe players - find relays, manage blessings, and more.",
    images: [
      {
        url: "https://yareli.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "yareli.net",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "yareli.net",
    description:
      "Community tools for Warframe players - find relays, manage blessings, and more.",
    images: [
      {
        url: "https://yareli.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "yareli.net",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} min-w-64 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <NuqsAdapter>
            <div className="p-4 sm:p-8">{children}</div>
            <Toaster position="top-center" />
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
