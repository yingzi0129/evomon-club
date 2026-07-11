import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Sword, Shield, Zap, Heart, Sparkles, Snowflake, ChevronLeft, ChevronRight } from "lucide-react";
import creaturesData from "@/data/creatures.json";
import tierListData from "@/data/tier-list.json";
import { Creature } from "@/types";
import { CreatureCard } from "@/components/creature-card";
import { Breadcrumb } from "@/components/breadcrumb";
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
  const title = `${creature.name} - ${rarity}${typeText}Evomon | Stats, Location & Evolution`;
  const description = `${creature.name} is a ${rarity}${typeText}Evomon with base stats, catch locations, evolution line, and how to get it. ${creature.description || ""}`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `https://evomon.club/creatures/${creature.slug}/`,
    },
  };
}

export default function CreatureDetailPage({ params }: PageProps) {
  const creature = creaturesData.creatures.find((c) => c.slug === params.slug) as Creature | undefined;
  if (!creature) notFound();

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

  const currentIndex = creaturesData.creatures.findIndex(
    (c) => c.slug === creature.slug
  );
  const prevCreature = currentIndex > 0 ? creaturesData.creatures[currentIndex - 1] : null;
  const nextCreature =
    currentIndex < creaturesData.creatures.length - 1
      ? creaturesData.creatures[currentIndex + 1]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${creature.name} Stats & Rarity`,
    description: creature.description,
    image: imageUrl,
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
                  Locations
                </h2>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {creature.locations.map((loc) => (
                    <li key={loc}>{loc}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  Locations
                </h2>
                <p className="text-slate-500">Location data for {creature.name} is not confirmed in public sources yet.</p>
              </div>
            )}

            {(creature.how_to_get && creature.how_to_get.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  How to Get {creature.name}
                </h2>
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
                <p className="text-slate-500">How to obtain {creature.name} is not confirmed in public sources yet.</p>
              </div>
            )}

            {(creature.moves && creature.moves.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  Moves
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
                  Moves
                </h2>
                <p className="text-slate-500">Moves for {creature.name} are not fully documented in public sources yet.</p>
              </div>
            )}

            {(creature.evolutions && creature.evolutions.length > 0) ? (
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h2 className="font-headline text-2xl font-bold text-slate-900 mb-4">
                  Evolution
                </h2>
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
                  Evolution
                </h2>
                <p className="text-slate-500">Evolution details for {creature.name} are not confirmed in public sources yet.</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                Base Stats
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-card border border-slate-100 p-6">
              {prevCreature ? (
                <Link
                  href={`/creatures/${prevCreature.slug}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors w-full sm:w-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous: {prevCreature.name}</span>
                </Link>
              ) : (
                <span className="invisible w-full sm:w-auto">Previous</span>
              )}
              {nextCreature ? (
                <Link
                  href={`/creatures/${nextCreature.slug}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors w-full sm:w-auto sm:ml-auto"
                >
                  <span>Next: {nextCreature.name}</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <span className="invisible w-full sm:w-auto">Next</span>
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
