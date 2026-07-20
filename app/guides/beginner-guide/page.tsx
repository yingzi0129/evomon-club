import { Metadata } from "next";
import Link from "next/link";
import { Gift, Search, Zap, MapPin, Coins, Swords } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "How to Play Evomon: Beginner Guide - Evomon.club",
  description:
    "New to Evomon? Learn how to start, pick your starter, catch creatures, earn coins, and build your first team.",
  alternates: {
    canonical: "https://evomon.club/guides/beginner-guide",
  },
};

const steps = [
  {
    title: "Pick your starter",
    icon: Swords,
    text: "Choose between Bubble (Water), Blazpup (Fire), and Frostlet (Ice). Frostlet has the highest stats, Bubble is the safest for beginners, and Blazpup is great for aggressive early clears.",
    link: { href: "/best-starter", label: "See starter comparison" },
  },
  {
    title: "Claim free codes",
    icon: Gift,
    text: "Redeem active Evomon codes for free coins, EXP fruits, balls, and summon tickets. Codes can only be used once per account.",
    link: { href: "/codes", label: "Get active codes" },
  },
  {
    title: "Catch creatures",
    icon: Search,
    text: "Explore zones like the Starter Zone, Crystal Cascade, and Thunder Cliffs. Weaken wild Evomon, then use balls to catch them. Rarer creatures need better balls.",
    link: { href: "/creatures", label: "Browse creature locations" },
  },
  {
    title: "Build a balanced team",
    icon: Zap,
    text: "Aim for a mix of types so you can handle different matchups. Check the type chart to cover weaknesses and avoid stacking the same type.",
    link: { href: "/guides/type-chart", label: "View type chart" },
  },
  {
    title: "Earn coins and EXP",
    icon: Coins,
    text: "Battle trainers, defeat wild Evomon, and complete in-game milestones. Use EXP fruits and codes to speed up leveling early on.",
    link: { href: "/guides/farming-guide", label: "Farming tips" },
  },
  {
    title: "Explore new zones",
    icon: MapPin,
    text: "Progress through the map to find stronger creatures and better rewards. Some creatures only spawn in specific zones or events.",
    link: { href: "/creatures", label: "Find creature locations" },
  },
];

const faqs = [
  {
    question: "What should I do first in Evomon?",
    answer:
      "Pick a starter, redeem the latest codes, then catch a few creatures to round out your team. Focus on learning type matchups and exploring the early zones.",
  },
  {
    question: "How do I earn coins fast in Evomon?",
    answer:
      "Use active codes, battle wild Evomon and trainers, and sell items you do not need. The farming guide has more detailed methods.",
  },
  {
    question: "Can I change my starter later?",
    answer:
      "You can catch additional starters in the wild or get them through events and trading. Your first starter choice is not permanent.",
  },
];

export default function BeginnerGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play Evomon for Beginners",
    description:
      "A beginner guide for Evomon: pick a starter, redeem codes, catch creatures, build a team, and earn coins.",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
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
            { label: "Beginner Guide" },
          ]}
        />

        <header className="mb-10 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            How to Play Evomon
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A beginner guide for Roblox Evomon. Learn how to start strong, build your first team, and make the most of free codes.
          </p>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Step {index + 1}
                      </div>
                      <h2 className="font-headline text-xl font-bold text-slate-900">{step.title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4 flex-grow">{step.text}</p>
                  <Link
                    href={step.link.href}
                    className="text-sm font-bold text-primary hover:text-primary-dark"
                  >
                    {step.link.label} →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Beginner FAQ
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
            Ready to catch them all?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/codes"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
            >
              <Gift className="w-5 h-5" />
              Get Latest Codes
            </Link>
            <Link
              href="/creatures"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-cta font-bold px-8 py-3 rounded-full transition-colors border-2 border-cta"
            >
              <Search className="w-5 h-5" />
              Browse Creatures
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
