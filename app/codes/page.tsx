import { Metadata } from "next";
import codesData from "@/data/codes.json";
import { CodesPageClient } from "@/components/codes-page-client";

export const metadata: Metadata = {
  title: "Evomon Codes (Active Today) - Evomon.club",
  description:
    "See all active Evomon codes for free gems, rewards, and boosts. Updated daily with last verified time. Redeem through official Roblox channels.",
  alternates: {
    canonical: "https://evomon.club/codes",
  },
};

export default function CodesPage() {
  const activeCodes = codesData.codes.filter((c) => c.status === "active");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Evomon Codes (Active Today)",
    datePublished: "2026-07-05",
    dateModified: codesData.updated_at,
    author: { "@type": "Organization", name: "Evomon.club" },
    publisher: { "@type": "Organization", name: "Evomon.club" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CodesPageClient activeCodes={activeCodes} />
    </>
  );
}
