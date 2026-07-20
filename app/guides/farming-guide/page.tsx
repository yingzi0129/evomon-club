import { Metadata } from "next";
import Link from "next/link";
import { Coins, Sparkles, Target, Repeat, Map, Gift, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Evomon Farming Guide: Coins, EXP & Shiny Hunting - Evomon.club",
  description:
    "The fastest ways to farm coins, EXP, and rare creatures in Evomon. Farming routes, daily habits, and tips for efficient progression.",
  alternates: {
    canonical: "https://evomon.club/guides/farming-guide",
  },
};

const methods = [
  {
    title: "Farm coins",
    icon: Coins,
    tips: [
      "Redeem all active Evomon codes — many give free coins.",
      "Battle trainers and wild Evomon repeatedly in high-density zones.",
      "Sell unused items and duplicate balls if the game allows it.",
      "Focus on zones with quick respawn rates.",
    ],
  },
  {
    title: "Farm EXP",
    icon: Sparkles,
    tips: [
      "Use Medium and Large EXP fruits from codes and milestones.",
      "Battle higher-level wild creatures for more experience.",
      "Keep a balanced team so no single creature falls behind.",
      "Revisit earlier zones with fast travel for quick clears.",
    ],
  },
  {
    title: "Farm rare creatures",
    icon: Target,
    tips: [
      "Know where each creature spawns before you hunt.",
      "Use better balls for higher catch rates.",
      "Check community channels for spawn event announcements.",
      "Farm during off-peak hours when zones are less crowded.",
    ],
  },
  {
    title: "Daily farming loop",
    icon: Repeat,
    tips: [
      "Log in and check for new codes first.",
      "Clear your highest unlocked zone for coins and EXP.",
      "Complete daily milestones if available.",
      "Spend leftover time hunting specific creatures you need.",
    ],
  },
];

const faqs = [
  {
    question: "What is the fastest way to get coins in Evomon?",
    answer:
      "Redeeming active codes is the fastest free coin source. After that, repeatedly battle trainers and wild creatures in dense zones.",
  },
  {
    question: "How do I level up fast in Evomon?",
    answer:
      "Use EXP fruits from codes and milestones, then battle higher-level creatures in zones you can clear quickly.",
  },
  {
    question: "Where can I find rare Evomon?",
    answer:
      "Rare and legendary creatures appear in specific zones or events. Check the creature index for locations and watch official announcements for limited spawns.",
  },
];

export default function FarmingGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Evomon Farming Guide: Coins, EXP & Shiny Hunting",
    datePublished: "2026-07-20",
    dateModified: "2026-07-20",
    author: { "@type": "Organization", name: "Evomon.club" },
    publisher: { "@type": "Organization", name: "Evomon.club" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: "Farming Guide" },
          ]}
        />

        <header className="mb-10 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Evomon Farming Guide
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            The fastest ways to farm coins, EXP, and rare creatures in Evomon. Build a daily loop and progress without wasting time.
          </p>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="bg-white rounded-2xl p-6 shadow-card border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-headline text-xl font-bold text-slate-900">{method.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {method.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600">
                        <span className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Recommended daily farming route
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
            <ol className="space-y-4 list-decimal list-inside text-slate-600">
              <li>
                <strong className="text-slate-900">Check codes (<Clock className="w-4 h-4 inline align-text-bottom" /> 1 min):</strong>{" "}
                Redeem every active code on the list before it expires.
              </li>
              <li>
                <strong className="text-slate-900">High-value zone clear (<Map className="w-4 h-4 inline align-text-bottom" /> 10–15 min):</strong>{" "}
                Run the highest zone you can clear quickly for coins and EXP.
              </li>
              <li>
                <strong className="text-slate-900">Target hunt (<Target className="w-4 h-4 inline align-text-bottom" /> 10–20 min):</strong>{" "}
                Farm a specific creature or item you need for your team.
              </li>
              <li>
                <strong className="text-slate-900">Milestones and events (<Gift className="w-4 h-4 inline align-text-bottom" /> 5 min):</strong>{" "}
                Claim any daily or milestone rewards before logging off.
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Farming FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
                <h3 className="font-headline text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-indigo-50 rounded-2xl p-8 md:p-12 border border-indigo-100">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Need the latest active codes?
          </h2>
          <Link
            href="/codes"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            <Gift className="w-5 h-5" />
            Get Active Codes
          </Link>
        </section>
      </div>
    </>
  );
}
