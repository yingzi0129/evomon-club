import Link from "next/link";
import { Metadata } from "next";
import { Gift, ExternalLink, TrendingUp, Search, Smartphone, CheckCircle } from "lucide-react";
import codesData from "@/data/codes.json";

export const metadata: Metadata = {
  title: "Evomon Guide & Codes | Active Today - Evomon.club",
  description:
    "Get active Evomon codes today, check the latest tier list, and browse all creatures. Fast, mobile-friendly fan-made guide for Roblox players.",
};

export default function HomePage() {
  const activeCodes = codesData.codes.filter((c) => c.status === "active").slice(0, 3);

  const features = [
    {
      icon: TrendingUp,
      title: "Tier List",
      desc: "Sorted by PvE viability, base stats, rarity, and community feedback. Updated weekly or after balance patches.",
      href: "/tier-list",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Search,
      title: "Creature Index",
      desc: "Search by name, type, or rarity. Stats, locations, and how to get each creature — one page per creature.",
      href: "/creatures",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: Smartphone,
      title: "Mobile-First",
      desc: "Clean layout, fast load, no heavy ads blocking the content. Built for playing on the side.",
      href: "#",
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide border border-indigo-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Evomon Guide & Codes — Active Today
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight font-headline">
              Your Fastest <span className="text-gradient-indigo">Evomon</span> Guide Hub
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
              Active codes, tier list, and creature stats — updated regularly and built for mobile players first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/codes"
                className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white text-base font-bold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Gift className="w-5 h-5" />
                Get Latest Codes
              </Link>
              <a
                href="/play"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-cta text-base font-bold py-3.5 px-8 rounded-full transition-all border-2 border-cta hover:-translate-y-0.5"
              >
                <ExternalLink className="w-5 h-5" />
                Play Evomon
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent-nature" />
                Regular updates
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent-nature" />
                Mobile-first
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent-nature" />
                Fan-made & independent
              </div>
            </div>
          </div>

          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-[3rem] transform rotate-3 scale-95 -z-10 opacity-70"></div>
            <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 ring-1 ring-slate-100">
              <img
                src="https://cdn.evomon.club/assets/hero-cover.webp"
                alt="Evomon Roblox game cover"
                className="w-full h-auto object-cover"
                width={768}
                height={432}
                loading="eager"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-white text-sm font-semibold drop-shadow">
                  Catch, battle, and explore with Evomon on Roblox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-16 md:py-24 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 font-headline">
            Tired of outdated codes and slow wiki pages?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Evomon changes fast. Most code lists go stale within hours, and crowded wikis can be hard to use on a phone. You just want the current active code, the best creatures, and where to find them — without the clutter.
          </p>
        </div>
      </section>

      {/* Solution / Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-headline">
            One clean hub for codes, tiers, and creatures
          </h2>
          <p className="text-lg text-slate-600">
            We monitor official channels and trusted sources, then turn the latest info into a fast, structured guide you can actually use on mobile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Codes Card - large left card spanning 2 rows */}
          <Link
            href="/codes"
            className="group bg-white rounded-3xl p-8 shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow relative overflow-hidden lg:col-span-2 lg:row-span-2 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 font-headline">Active Codes Today</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Regular checks on official Discord, Twitter/X, and Pro Game Guides. Each code shows reward, status, and last verified time.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative z-10">
              {activeCodes.map((code, i) => (
                <div
                  key={code.code}
                  className={`flex justify-between items-center ${
                    i < activeCodes.length - 1 ? "border-b border-slate-200 pb-2 mb-2" : ""
                  }`}
                >
                  <span className="font-mono font-bold text-slate-800">{code.code}</span>
                  <span className="text-xs font-bold text-accent-nature bg-green-50 px-2 py-1 rounded">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </Link>

          {/* Tier List Card - spans 2 cols on desktop */}
          <Link
            href="/tier-list"
            className="group bg-white rounded-3xl p-8 shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow lg:col-span-2"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-headline">Tier List</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sorted by PvE viability, base stats, rarity, and community feedback. Updated weekly or after balance patches.
            </p>
          </Link>

          {features.slice(1).map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group bg-white rounded-3xl p-8 shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-headline">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-slate-900 py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 font-headline">
            Built for players, not platforms
          </h2>
          <p className="text-slate-400">
            Evomon.club is an independent fan-made guide. All game images and names belong to their respective owners and are used for informational purposes only.
          </p>
        </div>
      </section>

    </>
  );
}
