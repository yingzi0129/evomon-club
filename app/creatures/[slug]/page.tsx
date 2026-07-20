import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Sword, Shield, Zap, Heart, Sparkles, Snowflake, ChevronLeft, ChevronRight, TrendingUp, Gift } from "lucide-react";
import creaturesData from "@/data/creatures.json";
import tierListData from "@/data/tier-list.json";
import { Creature } from "@/types";
import { CreatureCard } from "@/components/creature-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { AdsterraNativeBanner } from "@/components/adsterra-native-banner";
import { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return creaturesData.creatures.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const creature = creaturesData.creatures.find((c) => c.slug === params.slug);
  if (!creature) return { title: "Not Found" };
  const rarity = creature.rarity && creature.rarity !== "Common" ? `${creature.rarity} ` : "";
  const typeText = creature.type ? `${creature.type} ` : "";
  const locationText = creature.locations && creature.locations.length > 0
    ? `Found in ${creature.locations.slice(0, 2).join(", ")}. `
    : "";
  const title = `${creature.name} - ${rarity}${typeText}Evomon | How to Get, Stats & Location`;
  const description = `${locationText}Learn how to get ${creature.name}, its base stats, moves, evolution line, and catch locations. ${creature.description || ""}`.trim();
  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `https://evomon.club/creatures/${creature.slug}/`,
    },
  };
}

export default function CreatureDetailPage({ params }: PageProps) {
  const found = creaturesData.creatures.find((c) => c.slug === params.slug);
  if (!found) notFound();
  const creature = found as Creature;

  const stats = creature.base_stats;
  const imageUrl = creature.image && !creature.image.startsWith("/images/")
    ? creature.image
    : "/placeholder-creature.png";

  const tier = tierListData.tiers.find((t) => t.creatures.includes(creature.slug));

  const related = creaturesData.creatures
    .filter(
      (c) =>
        c.type === creature.type && c.slug !== creature.slug
    )
    .slice(0, 4);

  const relatedByRarity = creaturesData.creatures
    .filter((c) => c.rarity === creature.rarity && c.slug !== creature.slug)
    .slice(0, 4);

  const relatedByLocation = creature.locations.length > 0
    ? creaturesData.creatures
        .filter(
          (c) =>
            c.slug !== creature.slug &&
            c.locations.some((loc) => creature.locations.includes(loc))
        )
        .slice(0, 4)
    : [];

  const evolutionSlugs = new Set<string>();
  if (creature.evolutions) {
    creature.evolutions.forEach((evo) => {
      const fromSlug = creaturesData.creatures.find((c) => c.name === evo.from)?.slug;
      const toSlug = creaturesData.creatures.find((c) => c.name === evo.to)?.slug;
      if (fromSlug && fromSlug !== creature.slug) evolutionSlugs.add(fromSlug);
      if (toSlug && toSlug !== creature.slug) evolutionSlugs.add(toSlug);
    });
  }
  const evolutionRelated = creaturesData.creatures.filter((c) =>
    evolutionSlugs.has(c.slug)
  );

  // Build a unified suggested-creatures list (max 4) prioritizing: evolution, same type, same location, same rarity
  const suggestedSet = new Set<string>();
  const addToSuggested = (slug: string) => {
    if (slug !== creature.slug && !suggestedSet.has(slug)) suggestedSet.add(slug);
  };
  evolutionRelated.forEach((c) => addToSuggested(c.slug));
  related.forEach((c) => addToSuggested(c.slug));
  relatedByLocation.forEach((c) => addToSuggested(c.slug));
  relatedByRarity.forEach((c) => addToSuggested(c.slug));
  const suggestedCreatures = creaturesData.creatures
    .filter((c) => suggestedSet.has(c.slug))
    .slice(0, 4);

  const currentIndex = creaturesData.creatures.findIndex(
    (c) => c.slug === creature.slug
  );
  const prevCreature = currentIndex > 0 ? creaturesData.creatures[currentIndex - 1] : null;
  const nextCreature =
    currentIndex < creaturesData.creatures.length - 1
      ? creaturesData.creatures[currentIndex + 1]
      : null;

  const typeLabel = creature.type ? `${creature.type}-type` : "";
  const rarityLabel = creature.rarity && creature.rarity !== "Common" ? `${creature.rarity} ` : "";
  const locationText = creature.locations && creature.locations.length > 0
    ? `Found in ${creature.locations.slice(0, 2).join(", ")}. `
    : "";

  const faqItems = [
    {
      question: `How to get ${creature.name} in Evomon?`,
      answer: creature.how_to_get && creature.how_to_get.length > 0
        ? `${creature.name} can be obtained by: ${creature.how_to_get.join("; ")}.`
        : `The exact method to obtain ${creature.name} in Evomon is not confirmed in public sources yet.`,
    },
    {
      question: `Where to find ${creature.name} in Evomon?`,
      answer: creature.locations && creature.locations.length > 0
        ? `${creature.name} can be found in ${creature.locations.join(", ")}.`
        : `The confirmed locations for ${creature.name} are not documented in public sources yet.`,
    },
    {
      question: `What type is ${creature.name}?`,
      answer: creature.type
        ? `${creature.name} is a ${typeLabel} Evomon.`
        : `The type of ${creature.name} is not confirmed in public sources yet.`,
    },
    {
      question: `Does ${creature.name} evolve?`,
      answer: creature.evolutions && creature.evolutions.length > 0
        ? `${creature.name} has an evolution line. ${creature.evolutions.map((e) => `${e.from ? `${e.from} → ` : ""}${e.to}`).join("; ")}. The exact evolution conditions are not confirmed in public sources yet.`
        : `Evolution details for ${creature.name} are not confirmed in public sources yet.`,
    },
    {
      question: `What is ${creature.name} weak against?`,
      answer: creature.type
        ? `As a ${typeLabel} Evomon, ${creature.name}'s weaknesses depend on the Evomon type chart. Check our type chart guide for exact matchups.`
        : `Weakness information for ${creature.name} is not available yet.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${creature.name} - ${rarityLabel}${typeLabel} Evomon | How to Get, Stats & Location`,
    description: `${locationText}Learn how to get ${creature.name}, its base stats, moves, evolution line, and catch locations in Evomon.`,
    image: imageUrl,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
            { label: "Creatures", href: "/creatures" },
            { label: creature.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-6 sticky top-24">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4">
                <Image
                  src={imageUrl}
                  alt={`${creature.name} Evomon creature`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
              <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-slate-900 mb-2">
                {creature.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                  {creature.type}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                  {creature.rarity}
                </span>
                {tier && (
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                    Tier {tier.tier}
                  </span>
                )}
              </div>
              {creature.locations.length > 0 && (
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{creature.locations.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Stats & Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-3">
                About {creature.name}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {creature.description || `No detailed description available for ${creature.name} yet. Check back soon for updates.`}
              </p>
            </div>

            {(creature.locations && creature.locations.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  Where to Find {creature.name}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  {creature.name} can be found in the following locations in Evomon:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {creature.locations.map((loc) => (
                    <li key={loc}>{loc}</li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500 mt-3">
                  Travel to these areas and look for {creature.name} in the wild to add it to your collection.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  Where to Find {creature.name}
                </h2>
                <p className="text-slate-500">The confirmed locations for {creature.name} are not documented in public sources yet.</p>
              </div>
            )}

            {(creature.how_to_get && creature.how_to_get.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  How to Get {creature.name}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Here is how to obtain {creature.name} in Evomon:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {creature.how_to_get.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  How to Get {creature.name}
                </h2>
                <p className="text-slate-500">The exact method to obtain {creature.name} in Evomon is not confirmed in public sources yet.</p>
              </div>
            )}

            {(creature.moves && creature.moves.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  {creature.name} Moves
                </h2>
                <div className="grid gap-3">
                  {creature.moves.map((move) => (
                    <div key={move.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <div className="font-semibold text-slate-900">{move.name}</div>
                        {move.description && (
                          <div className="text-xs text-slate-500">{move.description}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">{move.type}</span>
                        {move.power && <span className="text-slate-600">PWR {move.power}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  {creature.name} Moves
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  The full move list for {creature.name} is not yet documented in public sources. Once confirmed, this section will list its basic attacks, level-up moves, and any charge skills.
                </p>
                <p className="text-slate-500 mt-3">
                  Known facts: {creature.name} is a {typeLabel || "Evomon"} with a base stat total of {Object.values(stats).filter((v): v is number => typeof v === "number").reduce((a, b) => a + b, 0)}.
                </p>
              </div>
            )}

            {(creature.evolutions && creature.evolutions.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  Does {creature.name} Evolve?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Yes, {creature.name} is part of an evolution line in Evomon. The exact evolution condition (level, stone, or item) is not confirmed in public sources yet.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {creature.evolutions.map((evo, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {evo.from && <span className="font-semibold text-slate-700">{evo.from}</span>}
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">{evo.condition}</span>
                      <span className="font-semibold text-slate-900">{evo.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  Does {creature.name} Evolve?
                </h2>
                <p className="text-slate-500">Evolution details for {creature.name} are not confirmed in public sources yet.</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                {creature.name} Base Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatBox icon={Heart} label="HP" value={stats.hp ?? null} />
                <StatBox icon={Sword} label="Attack" value={stats.attack ?? null} />
                <StatBox icon={Shield} label="Defense" value={stats.defense ?? null} />
                <StatBox icon={Sparkles} label="Sp. Attack" value={stats.sp_atk ?? null} />
                <StatBox icon={Snowflake} label="Sp. Defense" value={stats.sp_def ?? null} />
                <StatBox icon={Zap} label="Speed" value={stats.speed ?? null} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions About {creature.name}
              </h2>
              <dl className="space-y-4">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <dt className="font-semibold text-slate-900 mb-1">{item.question}</dt>
                    <dd className="text-slate-600 leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {related.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                  More {creature.type} Creatures
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {related.map((c) => (
                    <CreatureCard key={c.slug} creature={c} />
                  ))}
                </div>
              </div>
            )}

            {relatedByRarity.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                  More {creature.rarity} Evomon
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedByRarity.map((c) => (
                    <CreatureCard key={c.slug} creature={c} />
                  ))}
                </div>
              </div>
            )}

            {relatedByLocation.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                  Found in the Same Location
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedByLocation.map((c) => (
                    <CreatureCard key={c.slug} creature={c} />
                  ))}
                </div>
              </div>
            )}

            {evolutionRelated.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                  Evolution Line
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {evolutionRelated.map((c) => (
                    <CreatureCard key={c.slug} creature={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Fixed Related Creatures module at the bottom */}
            {suggestedCreatures.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl shadow-card border border-indigo-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-2">
                  Related Creatures to Explore
                </h2>
                <p className="text-slate-600 mb-6">
                  Players looking at {creature.name} also check these creatures.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {suggestedCreatures.map((c) => (
                    <CreatureCard key={c.slug} creature={c} />
                  ))}
                </div>
              </div>
            )}

            {/* P0 内链模块：Tier List + Codes */}
            <div className="bg-gradient-to-br from-indigo-50 to-amber-50 rounded-2xl shadow-card border border-indigo-100 p-6">
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                Keep Exploring
              </h2>
              <p className="text-slate-600 mb-6">
                See how {creature.name} compares to the rest of the roster, or redeem active codes to power it up.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/tier-list"
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      Evomon Tier List
                    </div>
                    <div className="text-sm text-slate-500">
                      {tier ? `Ranked Tier ${tier.tier}` : "Check the ranking"}
                    </div>
                  </div>
                </Link>
                <Link
                  href="/codes"
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      Evomon Codes
                    </div>
                    <div className="text-sm text-slate-500">
                      Active rewards today
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <AdsterraNativeBanner />

            {/* Next / Prev navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevCreature ? (
                <Link
                  href={`/creatures/${prevCreature.slug}/`}
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {prevCreature.name}
                </Link>
              ) : (
                <span />
              )}
              {nextCreature ? (
                <Link
                  href={`/creatures/${nextCreature.slug}/`}
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                >
                  {nextCreature.name}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatBox({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | null;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-4">
      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-xl font-bold text-slate-900">{value ?? "?"}</div>
      </div>
    </div>
  );
}
