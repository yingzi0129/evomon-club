"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, TrendingUp } from "lucide-react";
import creaturesData from "@/data/creatures.json";
import { CreatureCard } from "@/components/creature-card";

export default function CreaturesContent() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState("All");

  const types = useMemo(() => {
    const set = new Set(creaturesData.creatures.map((c) => c.type));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const rarities = useMemo(() => {
    const set = new Set(creaturesData.creatures.map((c) => c.rarity));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return creaturesData.creatures.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || c.type === typeFilter;
      const matchesRarity = rarityFilter === "All" || c.rarity === rarityFilter;
      return matchesSearch && matchesType && matchesRarity;
    });
  }, [search, typeFilter, rarityFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <header className="mb-10 text-center md:text-left">
        <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
          All Evomon Creatures
        </h1>
        <p className="font-body text-lg text-slate-600 max-w-3xl">
          Search by name, type, or rarity. Click any creature to see full stats, locations, and how to get it.
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search creatures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:border-primary font-body text-sm"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex-1 md:w-40 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:border-primary font-body text-sm py-2.5 px-3"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Types" : t}
              </option>
            ))}
          </select>
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
            className="flex-1 md:w-40 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:border-primary font-body text-sm py-2.5 px-3"
          >
            {rarities.map((r) => (
              <option key={r} value={r}>
                {r === "All" ? "All Rarities" : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {filtered.map((creature) => (
          <CreatureCard key={creature.slug} creature={creature} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">No creatures found. Try adjusting your filters.</p>
        </div>
      )}

      <div className="flex justify-center mb-16">
        <Link
          href="/tier-list"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-sm"
        >
          <TrendingUp className="w-5 h-5" />
          View Tier List
        </Link>
      </div>
    </div>
  );
}
