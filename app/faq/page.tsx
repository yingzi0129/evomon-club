import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Evomon FAQ - Codes, Starters, PvE & More - Evomon.club",
  description:
    "Answers to the most common Evomon questions: active codes, how to redeem, best starter, best PvE creature, types, updates, and more. Independent fan-made guide.",
  alternates: {
    canonical: "https://evomon.club/faq",
  },
};

const faqs = [
  {
    question: "What are the active Evomon codes today?",
    answer:
      "Active codes change regularly. Check our Active Evomon Codes page for the current list with rewards, status, and last verified time. We monitor official Evomon channels and trusted Roblox sources and update the list as codes release or expire.",
    link: { href: "/codes", label: "Browse active Evomon codes" },
  },
  {
    question: "How do I redeem codes in Evomon?",
    answer:
      "Open Evomon in Roblox and look for the code redemption button or menu in the game UI. Enter the code exactly as shown and confirm. If a code does not work, it may have expired or been entered incorrectly. Always redeem through the official Roblox game to keep your account safe.",
  },
  {
    question: "What is the best starter creature in Evomon?",
    answer:
      "The best starter depends on your play style. Blazpup is a Fire type with strong attack, Bubble is a Water type with balanced stats, and Frostlet is an Ice type with good speed. In the early game, all three are viable, so pick the type that fits the team you want to build.",
  },
  {
    question: "What is the best PvE creature in Evomon?",
    answer:
      "High base-stat creatures like Arcapex tend to top PvE rankings. For a complete ranking, see our Evomon tier list, which is updated weekly or after balance patches based on PvE viability, stats, rarity, and community feedback.",
    link: { href: "/tier-list", label: "View the Evomon tier list" },
  },
  {
    question: "What does each creature type mean in Evomon?",
    answer:
      "Types such as Fire, Water, Electric, Ice, Flying, and Grass determine strengths and weaknesses in battle. Each type has matchups against other types, similar to classic creature-collecting games. A creature page lists its type, stats, and where to find it.",
  },
  {
    question: "How do I get Viparch in Evomon?",
    answer:
      "Viparch is the only Legendary creature currently tracked. Legendary creatures are usually tied to limited events, special summons, or high-end rewards. Check the creature page for any known location or acquisition method, and watch official channels for event announcements.",
  },
  {
    question: "Is Evomon free on Roblox?",
    answer:
      "Yes, Evomon is a free-to-play Roblox experience. You can download and play Roblox for free, then join Evomon without an upfront purchase. Some in-game items, boosts, or cosmetics may offer optional purchases, but the core game is free.",
  },
  {
    question: "How often does Evomon update?",
    answer:
      "Evomon receives balance changes, new creatures, and new codes fairly often. Codes can appear or expire daily, while larger creature or balance updates usually arrive weekly or with seasonal events. We refresh our site when those updates drop.",
  },
  {
    question: "How many creatures are in Evomon?",
    answer:
      "Our database currently tracks over 70 creatures, including starters, common creatures, and the legendary Viparch. The roster grows as the game updates, so the creature index is the best place to see the full list.",
    link: { href: "/creatures", label: "Browse all Evomon creatures" },
  },
  {
    question: "Is Evomon.club an official Evomon site?",
    answer:
      "No. Evomon.club is an independent, fan-made guide. We are not affiliated with, endorsed by, or sponsored by the Evomon developers or Roblox Corporation. All game names, images, and assets belong to their respective owners.",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        <div className="mb-10">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Evomon FAQ
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Quick answers to the most common Evomon questions. If you are looking for active codes, tier rankings, or creature details, the links inside each answer point to the full guide pages.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <section
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-slate-100"
            >
              <h2 className="font-headline text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {faq.question}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {faq.answer}
              </p>
              {faq.link && (
                <Link
                  href={faq.link.href}
                  className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors"
                >
                  {faq.link.label} →
                </Link>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
          <p className="text-sm text-indigo-900 leading-relaxed">
            Evomon.club is an independent fan-made guide. Data is based on official channels and community verification. If you notice an outdated answer, let us know through the official Evomon community.
          </p>
        </div>
      </div>
    </>
  );
}
