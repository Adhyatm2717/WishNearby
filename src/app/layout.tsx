import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "WishNearby — Discover Local Community Demand",
    template: "%s | WishNearby",
  },
  description:
    "A non-profit community platform where people post things they wish existed nearby. Reveal real local demand. No marketplace. No commissions.",
  keywords: ["community", "local demand", "entrepreneur", "non-profit", "PWA"],
  authors: [{ name: "WishNearby" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WishNearby",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "WishNearby",
    title: "WishNearby — What do you wish existed near you?",
    description: "Help your community discover what people truly need.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WishNearby",
    description: "Discover real local community demand.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E3A8A" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
