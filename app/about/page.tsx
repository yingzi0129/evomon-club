import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About Evomon.club",
  description:
    "Evomon.club is an independent, fan-made guide for Evomon on Roblox. We share active codes, tier lists, and creature stats.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        About Evomon.club
      </h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 leading-relaxed">
          Evomon.club is an independent, fan-made guide site for Evomon on
          Roblox. We built it because finding the latest active code, checking a
          creature&apos;s stats, or comparing tier picks on mobile should be fast and
          simple.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          What we cover
        </h2>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>Active Evomon codes, updated regularly</li>
          <li>Creature stats, types, rarity, and locations</li>
          <li>Community tier list based on PvE viability</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          How we keep info up to date
        </h2>
        <p className="text-slate-600 leading-relaxed">
          We monitor official Evomon channels, community wikis, and trusted
          Roblox guide sources. When data changes, our build pipeline updates the
          site and redeploys it automatically. If we are unsure about a code or
          stat, we leave it out rather than guess.
        </p>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mt-8">
          <p className="text-sm text-amber-900 leading-relaxed">
            Evomon.club is not affiliated with, endorsed by, or sponsored by the
            Evomon developers or Roblox Corporation. All game images, names, and
            assets belong to their respective owners and are used for
            informational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
