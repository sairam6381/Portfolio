import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { profile } from "@/content/site";
import "./globals.css";

// Clash Display + Satoshi from Fontshare (ITF Free Font License), self-hosted.
const clash = localFont({
  variable: "--font-clash",
  src: [
    { path: "../fonts/Clash-Display-500.woff2", weight: "500" },
    { path: "../fonts/Clash-Display-600.woff2", weight: "600" },
    { path: "../fonts/Clash-Display-700.woff2", weight: "700" },
  ],
});

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500" },
    { path: "../fonts/Satoshi-700.woff2", weight: "700" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${profile.name} | ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${satoshi.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh">
        <SmoothScroll />
        {children}
        <div aria-hidden className="grain z-[60]" />
      </body>
    </html>
  );
}
