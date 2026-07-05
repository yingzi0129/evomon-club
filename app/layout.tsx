import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Evomon Guide & Codes | Active Today - Evomon.club",
  description:
    "Get active Evomon codes today, check the latest tier list, and browse all creatures. Fast, mobile-friendly fan-made guide for Roblox players.",
  keywords: ["evomon", "evomon codes", "evomon tier list", "evomon guide", "evomon creatures"],
  metadataBase: new URL("https://evomon.club"),
  openGraph: {
    title: "Evomon Guide & Codes | Active Today - Evomon.club",
    description:
      "Get active Evomon codes today, check the latest tier list, and browse all creatures. Fast, mobile-friendly fan-made guide for Roblox players.",
    type: "website",
    url: "https://evomon.club",
    siteName: "Evomon.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evomon Guide & Codes | Active Today - Evomon.club",
    description:
      "Get active Evomon codes today, check the latest tier list, and browse all creatures. Fast, mobile-friendly fan-made guide for Roblox players.",
  },
  alternates: {
    canonical: "https://evomon.club",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col font-body bg-background text-foreground">
        <Navbar />
        <main className="flex-grow pt-20 md:pt-24">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
