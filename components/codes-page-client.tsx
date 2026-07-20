"use client";

import Link from "next/link";
import { Info, AlertTriangle, TrendingUp, Clock, Calendar } from "lucide-react";
import codesData from "@/data/codes.json";
import creaturesData from "@/data/creatures.json";
import { timeAgo, formatDate } from "@/lib/utils";
import { CopyCodeButton } from "@/components/copy-code-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { CreatureCard } from "@/components/creature-card";
import { Code } from "@/types";

interface CodesPageClientProps {
  activeCodes: Code[];
  expiredCodes: Code[];
  updatedAt: string;
}

const faqs = [
  {
    question: "Are Evomon codes free?",
    answer:
      "Yes. Codes are free in-game rewards released by the developers. We list active codes and their rewards; always redeem them through official Roblox / Evomon channels.",
  },
  {
    question: "How often are Evomon codes updated?",
    answer:
      "We check official channels and trusted sources regularly. Each code shows a last verified time, but codes can expire at any time.",
  },
  {
    question: "Why do some codes have an expiration date?",
    answer:
      "Codes released for milestone events often expire. When a code is confirmed expired, it moves to the Expired Codes table below so you know not to try it.",
  },
  {
    question: "Do Evomon codes work on mobile?",
    answer:
      "Yes, as long as you redeem them inside the official Roblox Evomon game on any platform. Codes are not account-locked, but each code can usually only be redeemed once per account.",
  },
];

export function CodesPageClient({ activeCodes, expiredCodes, updatedAt }: CodesPageClientProps) {
  const featuredCreatures = creaturesData.creatures
    .filter((c) => c.rarity === "Legendary" || c.rarity === "Epic")
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Codes" },
        ]}
      />

      <div className="mb-10 max-w-3xl">
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight">
          Evomon Codes (Active Today)
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Below is the list of active Evomon codes we last verified. Codes can expire at any time — always redeem them in the official game.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Last Updated Banner */}
          <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-indigo-900">
            <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Last updated:</span>{" "}
              <span className="font-medium">{formatDate(updatedAt)}</span>
              <span className="text-slate-500 text-sm ml-2">({timeAgo(updatedAt)})</span>
            </div>
          </div>

          {/* Codes Table */}
          <div className="glass-card rounded-2xl shadow-card overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50 border-b border-indigo-100">
                    <th className="py-4 px-6 font-headline font-semibold text-indigo-900">Code</th>
                    <th className="py-4 px-6 font-headline font-semibold text-indigo-900">Reward</th>
                    <th className="py-4 px-6 font-headline font-semibold text-indigo-900">Status</th>
                    <th className="py-4 px-6 font-headline font-semibold text-indigo-900">Added</th>
                    <th className="py-4 px-6 font-headline font-semibold text-indigo-900">Expires</th>
                    <th className="py-4 px-6 font-headline font-semibold text-indigo-900">Last Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeCodes.map((code) => (
                    <tr key={code.code} className="hover:bg-white/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                            {code.code}
                          </span>
                          <CopyCodeButton code={code.code} />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700 font-medium">{code.reward}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          active
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(code.added_at)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">
                        {code.expires_at ? formatDate(code.expires_at) : "—"}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">{timeAgo(code.verified_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expired Codes */}
          {expiredCodes.length > 0 && (
            <section>
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-6">
                Expired Evomon Codes
              </h2>
              <p className="text-slate-600 mb-4">
                These codes no longer work. We keep them here so you can see what has been released in the past and avoid wasting time trying them again.
              </p>
              <div className="glass-card rounded-2xl shadow-card overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="py-4 px-6 font-headline font-semibold text-slate-700">Code</th>
                        <th className="py-4 px-6 font-headline font-semibold text-slate-700">Reward</th>
                        <th className="py-4 px-6 font-headline font-semibold text-slate-700">Added</th>
                        <th className="py-4 px-6 font-headline font-semibold text-slate-700">Expired</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {expiredCodes.map((code) => (
                        <tr key={code.code} className="opacity-70 hover:opacity-100 transition-opacity">
                          <td className="py-4 px-6">
                            <span className="font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-md border border-slate-200 line-through">
                              {code.code}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-medium">{code.reward}</td>
                          <td className="py-4 px-6 text-sm text-slate-500">{formatDate(code.added_at)}</td>
                          <td className="py-4 px-6 text-sm text-slate-500">
                            {code.expires_at ? formatDate(code.expires_at) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-indigo-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-headline font-semibold text-lg text-slate-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 relative overflow-hidden">
            <h3 className="font-headline font-bold text-indigo-900 text-lg mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-indigo-500" />
              List Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Last Checked</p>
                <p className="text-slate-800 font-medium">{timeAgo(codesData.updated_at)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Sources Monitored</p>
                <ul className="text-slate-700 text-sm space-y-1 list-disc list-inside">
                  <li>Official Discord</li>
                  <li>Twitter/X</li>
                  <li>Pro Game Guides</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer Block */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-900 leading-relaxed">
                Codes are collected from official Evomon social media, Discord, and in-game announcements. We update this list regularly, but codes may expire before the next refresh. Always redeem through official Roblox / Evomon channels.
              </p>
            </div>
          </div>

          {/* Featured Creatures */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
            <h3 className="font-headline font-bold text-indigo-900 text-lg mb-4">
              Top Creatures to Use Codes On
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {featuredCreatures.map((c) => (
                <CreatureCard key={c.slug} creature={c} />
              ))}
            </div>
            <Link
              href="/creatures"
              className="block mt-4 text-center text-sm font-bold text-primary hover:text-primary-dark"
            >
              View all creatures →
            </Link>
          </div>

          {/* P1 内链：Codes → Tier List */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-headline font-bold text-slate-900 mb-1">
                  Check the Evomon Tier List
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Not sure which creature to spend your rewards on? See which ones rank highest in our Evomon tier list and ranking guide.
                </p>
                <Link
                  href="/tier-list"
                  className="inline-flex items-center text-sm font-bold text-amber-700 hover:text-amber-800"
                >
                  View Evomon Tier List →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/creatures"
          className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
        >
          Browse All Creatures
        </Link>
      </div>
    </div>
  );
}
