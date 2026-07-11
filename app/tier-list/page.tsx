import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import tierListData from "@/data/tier-list.json";
import creaturesData from "@/data/creatures.json";
import { formatDate } from "@/lib/utils";
import { CreatureCard } from "@/components/creature-card";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Evomon Tier List (Updated Weekly) - Evomon.club",
  description:
    "Check the latest Evomon tier list based on PvE viability, stats, rarity, and community feedback. Updated weekly or after game patches.",
  alternates: {
    canonical: "https://evomon.club/tier-list",
  },
};

const tierConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  S: {
    label: "Top Picks",
    color: "bg-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  A: {
    label: "Strong Choices",
    color: "bg-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  B: {
    label: "Solid Situationally",
    color: "bg-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  C: {
    label: "Niche Use",
    color: "bg-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  D: {
    label: "Avoid for Now",
    color: "bg-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-100",
  },
};

export default function TierListPage() {
  const creatureMap = new Map(creaturesData.creatures.map((c) => [c.slug, c]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Evomon Tier List",
    datePublished: "2026-07-05",
    dateModified: tierListData.updated_at,
    author: { "@type": "Organization", name: "Evomon.club" },
    publisher: { "@type": "Organization", name: "Evomon.club" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Tier List" },
          ]}
        />

        <div className="mb-10 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Evomon Tier List
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            This tier list ranks creatures by PvE viability, base stats, rarity,
            and community feedback. Rankings change when the game is balanced —
            check the update date below.
          </p>
        </div>

        <div className="space-y-8">
          {tierListData.tiers.map((tier) => {
            const config = tierConfig[tier.tier] || tierConfig.D;
            const tierCreatures = tier.creatures
              .map((slug) => creatureMap.get(slug))
              .filter(Boolean);

            return (
              <div
                key={tier.tier}
                className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden"
              >
                <div
                  className={`${config.bg} border-b ${config.border} px-6 py-4 flex items-center gap-3`}
                >
                  <div
                    className={`${config.color} text-white font-headline font-bold w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-sm`}
                  >
                    {tier.tier}
                  </div>
                  <h2 className="font-headline font-semibold text-lg text-slate-900">
                    {tier.label}
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {tierCreatures.map((creature) => (
                    <CreatureCard key={creature!.slug} creature={creature!} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Methodology */}
        <section className="mt-12 bg-indigo-50/50 rounded-2xl p-6 md:p-8 border border-indigo-100">
          <h2 className="font-headline text-2xl font-bold text-indigo-900 mb-3">
            How the tier list is ranked
          </h2>
          <p className="text-slate-700 mb-4">
            Methodology: {tierListData.methodology} Last updated:{" "}
            {formatDate(tierListData.updated_at)}.
          </p>
          <div className="bg-white rounded-xl p-4 border border-indigo-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600">
              Tier lists are community interpretations, not official rankings.
              Use them as a starting point, not a guarantee.
            </p>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/creatures"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            View All Creatures
          </Link>
        </div>
      </div>
    </>
  );
}
