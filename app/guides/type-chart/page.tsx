import { Metadata } from "next";
import Link from "next/link";
import { Swords, Flame, Droplets, Leaf, Wind, Bug, CircleDot, Mountain, Skull, Snowflake, Circle, Brain, Zap } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Evomon Type Chart & Matchup Guide - Evomon.club",
  description:
    "See the full Evomon type chart: strengths, weaknesses, resistances, and super-effective matchups for every element.",
  alternates: {
    canonical: "https://evomon.club/guides/type-chart",
  },
};

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Fire: Flame,
  Water: Droplets,
  Grass: Leaf,
  Flying: Wind,
  Bug: Bug,
  Normal: CircleDot,
  Rock: Mountain,
  Poison: Skull,
  Ice: Snowflake,
  Ground: Circle,
  Psychic: Brain,
  Fighting: Swords,
  Electric: Zap,
};

const typeColors: Record<string, string> = {
  Fire: "bg-amber-100 text-amber-700 border-amber-200",
  Water: "bg-teal-100 text-teal-700 border-teal-200",
  Grass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Flying: "bg-sky-100 text-sky-700 border-sky-200",
  Bug: "bg-lime-100 text-lime-700 border-lime-200",
  Normal: "bg-slate-100 text-slate-700 border-slate-200",
  Rock: "bg-stone-100 text-stone-700 border-stone-200",
  Poison: "bg-purple-100 text-purple-700 border-purple-200",
  Ice: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Ground: "bg-orange-100 text-orange-700 border-orange-200",
  Psychic: "bg-pink-100 text-pink-700 border-pink-200",
  Fighting: "bg-red-100 text-red-700 border-red-200",
  Electric: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const types = [
  "Fire",
  "Water",
  "Grass",
  "Flying",
  "Bug",
  "Normal",
  "Rock",
  "Poison",
  "Ice",
  "Ground",
  "Psychic",
  "Fighting",
  "Electric",
];

function getEffectiveness(attacker: string, defender: string): "super" | "not" | "normal" | "immune" {
  if (attacker === defender) return "not";
  const matchups: Record<string, string[]> = {
    Fire: ["Grass", "Bug", "Ice"],
    Water: ["Fire", "Rock", "Ground"],
    Grass: ["Water", "Rock", "Ground"],
    Electric: ["Water", "Flying"],
    Ice: ["Grass", "Ground", "Flying"],
    Fighting: ["Normal", "Rock", "Ice"],
    Poison: ["Grass"],
    Ground: ["Fire", "Electric", "Rock", "Poison"],
    Flying: ["Grass", "Bug", "Fighting"],
    Psychic: ["Fighting", "Poison"],
    Bug: ["Grass", "Psychic"],
    Rock: ["Fire", "Flying", "Bug", "Ice"],
    Normal: [],
  };
  const resistedBy: Record<string, string[]> = {
    Fire: ["Water", "Rock", "Fire"],
    Water: ["Grass", "Water"],
    Grass: ["Fire", "Grass", "Poison", "Flying", "Bug"],
    Electric: ["Grass", "Electric"],
    Ice: ["Fire", "Water", "Ice"],
    Fighting: ["Poison", "Flying", "Psychic", "Bug"],
    Poison: ["Poison", "Ground", "Rock"],
    Ground: ["Grass", "Flying"],
    Flying: ["Electric", "Rock"],
    Psychic: ["Psychic"],
    Bug: ["Fire", "Fighting", "Poison", "Flying"],
    Rock: ["Fighting", "Ground"],
    Normal: ["Rock"],
  };
  if (matchups[attacker]?.includes(defender)) return "super";
  if (resistedBy[attacker]?.includes(defender)) return "not";
  if (attacker === "Ground" && defender === "Flying") return "immune";
  if (attacker === "Electric" && defender === "Ground") return "immune";
  return "normal";
}

const faqs = [
  {
    question: "What types are super effective against Fire?",
    answer: "Water, Rock, and Ground-type moves are super effective against Fire-type Evomon.",
  },
  {
    question: "What is the best attacking type in Evomon?",
    answer: "There is no single best type, but Water, Fighting, and Ground cover many common defensive types. Build a team with varied coverage rather than relying on one type.",
  },
  {
    question: "Are there immunities in Evomon?",
    answer: "Based on standard type rules, Ground moves do not hit Flying types, and Electric moves do not hit Ground types. Check in-game tooltips for any Evomon-specific exceptions.",
  },
];

export default function TypeChartPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Evomon Type Chart & Matchup Guide",
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
            { label: "Type Chart" },
          ]}
        />

        <header className="mb-10 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Evomon Type Chart
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Check type strengths, weaknesses, and resistances for every element in Evomon. Use the chart to build a balanced team and win more matchups.
          </p>
        </header>

        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase sticky left-0 bg-slate-50 z-10">
                      Attack \ Defend
                    </th>
                    {types.map((t) => {
                      const Icon = typeIcons[t] || CircleDot;
                      return (
                        <th
                          key={t}
                          className={`py-3 px-2 text-center text-xs font-bold ${typeColors[t]}`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Icon className="w-4 h-4" />
                            <span>{t}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {types.map((attacker) => {
                    const Icon = typeIcons[attacker] || CircleDot;
                    return (
                      <tr key={attacker} className="hover:bg-slate-50/50">
                        <td
                          className={`py-3 px-4 text-sm font-bold sticky left-0 z-10 ${typeColors[attacker]}`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {attacker}
                          </div>
                        </td>
                        {types.map((defender) => {
                          const eff = getEffectiveness(attacker, defender);
                          const cellClass =
                            eff === "super"
                              ? "bg-emerald-100 text-emerald-800 font-bold"
                              : eff === "not"
                              ? "bg-rose-100 text-rose-800 font-bold"
                              : eff === "immune"
                              ? "bg-slate-200 text-slate-500 font-bold"
                              : "text-slate-300";
                          const label =
                            eff === "super" ? "2×" : eff === "not" ? "½" : eff === "immune" ? "0" : "—";
                          return (
                            <td
                              key={defender}
                              className={`py-3 px-2 text-center text-xs ${cellClass}`}
                              title={`${attacker} vs ${defender}: ${label}`}
                            >
                              {label}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-sm text-slate-600 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-800 font-bold text-xs rounded flex items-center justify-center">2×</span>
                Super effective
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-rose-100 text-rose-800 font-bold text-xs rounded flex items-center justify-center">½</span>
                Not very effective
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-200 text-slate-500 font-bold text-xs rounded flex items-center justify-center">0</span>
                Immune / no effect
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 text-slate-300 font-bold text-xs rounded flex items-center justify-center border border-slate-200">—</span>
                Normal damage
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Quick Type Matchup Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-3">Strongest offensive coverage</h3>
              <ul className="text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Water</strong> beats Fire, Rock, and Ground.</li>
                <li><strong>Ground</strong> beats Fire, Electric, Rock, and Poison.</li>
                <li><strong>Fighting</strong> beats Normal, Rock, and Ice.</li>
                <li><strong>Rock</strong> beats Fire, Flying, Bug, and Ice.</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-3">Common defensive weaknesses</h3>
              <ul className="text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Fire</strong> is weak to Water, Rock, and Ground.</li>
                <li><strong>Grass</strong> is weak to Fire, Poison, Flying, and Bug.</li>
                <li><strong>Flying</strong> is weak to Electric, Rock, and Ice.</li>
                <li><strong>Ice</strong> is weak to Fire, Fighting, and Rock.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
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
            Want to see every creature by type?
          </h2>
          <Link
            href="/creatures"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            Browse All Evomon
          </Link>
        </section>
      </div>
    </>
  );
}
