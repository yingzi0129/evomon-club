import { Metadata } from "next";
import codesData from "@/data/codes.json";
import { CodesPageClient } from "@/components/codes-page-client";
import { Code } from "@/types";

export const metadata: Metadata = {
  title: "Active Evomon Codes Today (July 2026) - Evomon.club",
  description:
    "See all active Evomon codes for free gems, rewards, and boosts. Updated regularly with last verified time. Redeem through official Roblox channels.",
  alternates: {
    canonical: "https://evomon.club/codes",
  },
};

export default function CodesPage() {
  const activeCodes = codesData.codes.filter((c): c is Code =>
    c.status === "active"
  );
  const expiredCodes = codesData.codes.filter((c): c is Code =>
    c.status === "expired"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Evomon Codes (Active Today)",
    datePublished: "2026-07-05",
    dateModified: codesData.updated_at,
    author: { "@type": "Organization", name: "Evomon.club" },
    publisher: { "@type": "Organization", name: "Evomon.club" },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Redeem Evomon Codes",
    description:
      "A step-by-step guide to redeeming Evomon codes inside the official Roblox game.",
    step: [
      {
        "@type": "HowToStep",
        name: "Launch Evomon on Roblox",
        text: "Open Roblox and start the official Evomon experience.",
      },
      {
        "@type": "HowToStep",
        name: "Find the Codes menu",
        text: "Look for the menu or settings icon, then select the Codes option.",
      },
      {
        "@type": "HowToStep",
        name: "Enter an active code",
        text: "Type or paste one of the active codes from our list exactly as shown.",
      },
      {
        "@type": "HowToStep",
        name: "Claim your reward",
        text: "Press redeem and the reward will be added to your account. Each code can usually only be redeemed once.",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are Evomon codes free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Evomon codes are free rewards released by the developers. Redeem them only through official Roblox / Evomon channels.",
        },
      },
      {
        "@type": "Question",
        name: "How often are Evomon codes updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We check official Discord, Twitter/X, and trusted sources regularly. Each code shows a last verified time, but codes can expire at any time.",
        },
      },
      {
        "@type": "Question",
        name: "Do Evomon codes work on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, as long as you redeem them inside the official Roblox Evomon game on any platform. Codes can usually only be redeemed once per account.",
        },
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Active Evomon Codes",
    itemListElement: activeCodes.map((code, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: code.code,
      description: code.reward,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <CodesPageClient
        activeCodes={activeCodes}
        expiredCodes={expiredCodes}
        updatedAt={codesData.updated_at}
      />
    </>
  );
}
