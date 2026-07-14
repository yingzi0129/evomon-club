import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/breadcrumb";
import creaturesData from "@/data/creatures.json";
import { Creature } from "@/types";

export const metadata: Metadata = {
  title: "Evomon Starter Comparison: Bubble, Blazpup & Frostlet Stats",
  description:
    "Compare all Evomon starters: Bubble (Water), Blazpup (Fire) and Frostlet (Ice). Base stats, evolution paths, pros and cons to pick your best starter.",
  alternates: {
    canonical: "https://evomon.club/starters/",
  },
};

const starterSlugs = ["bubble", "blazpup", "frostlet"];

const recommendations: Record<string, { badge: string; color: string }> = {
  bubble: { badge: "Best for new players", color: "bg-teal-100 text-teal-700" },
  blazpup: { badge: "Best for aggressive early-game", color: "bg-amber-100 text-amber-700" },
  frostlet: { badge: "Best overall stats", color: "bg-cyan-100 text-cyan-700" },
};

const roles: Record<string, string> = {
  bubble: "Balanced special attacker with a tanky late-game evolution.",
  blazpup: "High physical attack sweeper that matures into a fast end-game threat.",
  frostlet: "Fast special attacker with the strongest starter base stats and a late-game special wall breaker.",
};

const statRows: { key: keyof Creature["base_stats"]; label: string }[] = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attack" },
  { key: "defense", label: "Defense" },
  { key: "sp_atk", label: "Sp. Atk" },
  { key: "sp_def", label: "Sp. Def" },
  { key: "speed", label: "Speed" },
  { key: "bst", label: "BST" },
];

const evolutionLines: Record<string, { slugs: string[]; note?: string }> = {
  bubble: { slugs: ["bubble", "bubboxer", "bubblade"] },
  blazpup: { slugs: ["blazpup", "blazgrowl", "blazmane"] },
  frostlet: { slugs: ["frostlet", "frostseer"], note: "Frostlet's final evolution beyond Frostseer is not documented in the current dataset." },
};

const faqs = [
  {
    question: "What are the three starter Evomon?",
    answer:
      "The three starter Evomon are Bubble (Water), Blazpup (Fire), and Frostlet (Ice). Bubble and Blazpup are found in the Starter Zone; Frostlet is obtained from the starter pack or around Crystal Cascade.",
  },
  {
    question: "Which starter has the highest base stats?",
    answer:
      "Frostlet has the highest base stat total (BST 368), which is significantly higher than Bubble (260) and Blazpup (263).",
  },
  {
    question: "Which starter is best for beginners?",
    answer:
      "Bubble is the safest choice for beginners because it has higher HP and defenses, giving you more room to learn battles without losing quickly.",
  },
  {
    question: "Can you get all three starters on one account?",
    answer:
      "This depends on in-game mechanics. Currently, Bubble and Blazpup are found in the Starter Zone, and Frostlet is available from the starter pack or in Crystal Cascade. Trading or alternate accounts may be required to collect all three on one save.",
  },
  {
    question: "Which starter evolution is the strongest?",
    answer:
      "By final-stage BST, the lines are very close: Bubblade (521), Blazmane (520), and Frostseer (528). Frostseer is slightly ahead on paper, but Frostlet's full evolution chain beyond Frostseer is not documented yet.",
  },
];

export default function StartersPage() {
  const creatureMap = new Map(creaturesData.creatures.map((c) => [c.slug, c]));
  const starters = starterSlugs
    .map((slug) => creatureMap.get(slug))
    .filter(Boolean) as Creature[];

  const maxStat = Math.max(
    ...statRows.flatMap((row) =>
      starters.map((s) => s.base_stats[row.key] ?? 0)
    )
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Evomon Starter Comparison: Bubble, Blazpup & Frostlet Stats",
    description:
      "Compare all Evomon starters: Bubble (Water), Blazpup (Fire) and Frostlet (Ice). Base stats, evolution paths, pros and cons to pick your best starter.",
    url: "https://evomon.club/starters/",
  };

  const faqJsonLd = {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Starters" }]}
        />

        {/* Hero */}
        <header className="mb-12 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Evomon Starter Comparison:{" "}
            <span className="text-primary">Which Starter Fits You?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Pick the Best Evomon Starter for Your Journey. Compare Bubble, Blazpup,
            and Frostlet — the three official starters in Evomon. See base stats,
            evolution lines, and which one suits your playstyle before you lock in
            your choice.
          </p>
        </header>

        {/* Starter Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {starters.map((creature) => {
              const rec = recommendations[creature.slug];
              return (
                <Link
                  key={creature.slug}
                  href={`/creatures/${creature.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-40 rounded-xl bg-slate-50 mb-4 overflow-hidden">
                    <Image
                      src={creature.image}
                      alt={`${creature.name} Evomon starter`}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mb-3">
                    <span
                      className={`inline-block text-xs font-bold px-2.5 py-1 rounded ${rec.color}`}
                    >
                      {rec.badge}
                    </span>
                  </div>
                  <h2 className="font-headline text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {creature.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-3">
                    {creature.type} Starter
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                    {roles[creature.slug]}
                  </p>
                  <p className="text-sm text-slate-500">
                    {creature.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#comparison"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
            >
              Jump to Comparison
            </a>
          </div>
        </section>

        {/* Stats Comparison */}
        <section id="comparison" className="mb-16">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Base Stats Comparison
          </h2>
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Stat
                    </th>
                    {starters.map((creature) => (
                      <th
                        key={creature.slug}
                        className="px-6 py-4 text-sm font-bold text-slate-900"
                      >
                        {creature.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {statRows.map((row) => (
                    <tr
                      key={row.key}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {row.label}
                      </td>
                      {starters.map((creature) => {
                        const value = creature.base_stats[row.key] ?? 0;
                        const percent = maxStat > 0 ? (value / maxStat) * 100 : 0;
                        return (
                          <td key={creature.slug} className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-slate-900 w-10">
                                {value}
                              </span>
                              <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <section className="mb-16">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Strengths & Weaknesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {starters.map((creature) => {
              const rec = recommendations[creature.slug];
              return (
                <div
                  key={creature.slug}
                  className="bg-white rounded-2xl p-6 shadow-card border border-slate-100"
                >
                  <div className="mb-4">
                    <span
                      className={`inline-block text-xs font-bold px-2.5 py-1 rounded ${rec.color}`}
                    >
                      {rec.badge}
                    </span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-slate-900 mb-4">
                    {creature.name}
                  </h3>

                  <div className="mb-4">
                    <h4 className="font-bold text-emerald-700 mb-2">Pros</h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                      {pros[creature.slug].map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-red-600 mb-2">Cons</h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                      {cons[creature.slug].map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <span className="font-bold">Best for:</span>{" "}
                    {bestFor[creature.slug]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Evolution Lines */}
        <section className="mb-16">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Evolution Lines
          </h2>
          <div className="space-y-8">
            {starters.map((creature) => {
              const line = evolutionLines[creature.slug];
              const stages = line.slugs
                .map((slug) => creatureMap.get(slug))
                .filter(Boolean) as Creature[];

              return (
                <div
                  key={creature.slug}
                  className="bg-white rounded-2xl p-6 shadow-card border border-slate-100"
                >
                  <h3 className="font-headline text-xl font-bold text-slate-900 mb-4">
                    {creature.name} Evolution Line
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {stages.map((stage, idx) => (
                      <div key={stage.slug} className="flex items-center gap-2">
                        <Link
                          href={`/creatures/${stage.slug}`}
                          className="group flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100 hover:border-indigo-200 transition-colors"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={stage.image}
                              alt={stage.name}
                              fill
                              className="object-contain p-1"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                              {stage.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              BST {stage.base_stats.bst ?? "?"}
                            </div>
                          </div>
                        </Link>
                        {idx < stages.length - 1 && (
                          <span className="text-slate-400 text-xl">→</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-4 py-2 font-bold text-slate-500">Stage</th>
                          <th className="px-4 py-2 font-bold text-slate-500">Rarity</th>
                          <th className="px-4 py-2 font-bold text-slate-500">BST</th>
                          <th className="px-4 py-2 font-bold text-slate-500">HP</th>
                          <th className="px-4 py-2 font-bold text-slate-500">Atk</th>
                          <th className="px-4 py-2 font-bold text-slate-500">Def</th>
                          <th className="px-4 py-2 font-bold text-slate-500">SpA</th>
                          <th className="px-4 py-2 font-bold text-slate-500">SpD</th>
                          <th className="px-4 py-2 font-bold text-slate-500">Spe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stages.map((stage) => (
                          <tr
                            key={stage.slug}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="px-4 py-2 font-semibold text-slate-900">
                              {stage.name}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.rarity}
                            </td>
                            <td className="px-4 py-2 font-bold text-slate-900">
                              {stage.base_stats.bst ?? "?"}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.base_stats.hp ?? "?"}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.base_stats.attack ?? "?"}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.base_stats.defense ?? "?"}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.base_stats.sp_atk ?? "?"}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.base_stats.sp_def ?? "?"}
                            </td>
                            <td className="px-4 py-2 text-slate-600">
                              {stage.base_stats.speed ?? "?"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {line.note && (
                    <p className="text-sm text-slate-500 mt-4">{line.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Evomon Starter FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-100"
              >
                <h3 className="font-headline text-lg font-bold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-indigo-50 rounded-2xl p-8 md:p-12 border border-indigo-100">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Still deciding? Explore the full creature list.
          </h2>
          <Link
            href="/creatures"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            Browse All Evomon Creatures
          </Link>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <p className="text-sm text-slate-500 leading-relaxed">
            Evomon.club is an independent fan-made guide site and is not affiliated
            with, endorsed by, or sponsored by the Evomon developers or Roblox
            Corporation. All creature stats, descriptions, and evolution data are
            sourced from the site&apos;s creatures.json file. Stats may change with future
            game updates.
          </p>
        </div>
      </div>
    </>
  );
}

const pros: Record<string, string[]> = {
  bubble: [
    "Highest combined HP and defenses among the three starters at base.",
    "Highest Special Attack base of the original trio, giving it a strong late-game special nuke role.",
    "Evolution line gains the most HP (Bubble → Bubboxer → Bubblade) and ends with a bulky mixed attacker.",
  ],
  blazpup: [
    "Highest physical Attack at base (56), making early-game progression smoother.",
    "Final evolution Blazmane reaches 105 Attack and 93 Speed — a fast physical sweeper.",
    "Strong glass-cannon pressure with good Speed growth.",
  ],
  frostlet: [
    "Highest total BST of all starters by a large margin (368 vs ~260).",
    "Highest Speed (70), Special Attack (66), and Defense (53) among the three.",
    "Available from the starter pack or in Crystal Cascade, making it the most accessible starter.",
  ],
};

const cons: Record<string, string[]> = {
  bubble: [
    "Slowest base Speed (40) of the three starters.",
    "Lowest physical Attack at base, making early-game physical moves weak.",
    "Needs more time to scale before it outperforms the others.",
  ],
  blazpup: [
    "Lowest HP (37) and lowest Special Defense (41) of the three starters.",
    "Weaker to Water-type and Rock-type coverage, which are common early-game counters.",
    "Special Attack is low, limiting move flexibility.",
  ],
  frostlet: [
    "Evolution line has only one confirmed stage (Frostseer) in the current data, so long-term ceiling is less documented.",
    "Lower physical Attack than Blazpup.",
    "Ice typing can be defensively fragile in some matchups.",
  ],
};

const bestFor: Record<string, string> = {
  bubble: "Players who want a safe, scaling playstyle and prefer special attackers or late-game value.",
  blazpup: "Players who prefer aggressive, fast-paced early-game clears and physical sweepers.",
  frostlet: "Players who want the strongest starter on paper and a fast special-attacking lead.",
};
