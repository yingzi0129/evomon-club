import { Metadata } from "next";
import Link from "next/link";
import { Swords, Sparkles, Coins, BookOpen } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Evomon Guides: Type Chart, Beginner Tips & Farming - Evomon.club",
  description:
    "Browse all Evomon guides: type chart, beginner guide, farming guide, and best starter comparison. Built for mobile players.",
  alternates: {
    canonical: "https://evomon.club/guides",
  },
};

const guides = [
  {
    title: "Best Starter",
    desc: "Which starter should you pick? Compare Bubble, Blazpup, and Frostlet stats, evolutions, and pros.",
    href: "/best-starter",
    icon: Swords,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Type Chart",
    desc: "Full type matchup table with strengths, weaknesses, and resistance rules for every element.",
    href: "/guides/type-chart",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Beginner Guide",
    desc: "New to Evomon? Learn how to start, pick your starter, catch creatures, and build a team.",
    href: "/guides/beginner-guide",
    icon: Sparkles,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Farming Guide",
    desc: "Fast ways to farm coins, EXP, and rare creatures. Daily loop and efficient routes.",
    href: "/guides/farming-guide",
    icon: Coins,
    color: "bg-teal-100 text-teal-700",
  },
];

export default function GuidesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Evomon Guides",
    description: "All Evomon guides including type chart, beginner guide, and farming guide.",
    url: "https://evomon.club/guides",
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
            { label: "Guides" },
          ]}
        />

        <header className="mb-10 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Evomon Guides
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Practical guides for Evomon players: type chart, beginner tips, farming routes, and starter comparison.
          </p>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow flex items-start gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${guide.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-headline text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">{guide.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="text-center bg-indigo-50 rounded-2xl p-8 md:p-12 border border-indigo-100">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Looking for active codes?
          </h2>
          <Link
            href="/codes"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            Get Active Codes
          </Link>
        </section>
      </div>
    </>
  );
}
