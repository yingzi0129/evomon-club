import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About Evomon.club",
  description:
    "Evomon.club is an independent, fan-made guide for Evomon on Roblox. We share active codes, tier lists, and creature stats.",
  alternates: {
    canonical: "https://evomon.club/about",
  },
  robots: {
    index: true,
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
          Evomon.club is an independent, fan-made guide site for Evomon on Roblox. We built it because finding the latest active code, checking a creature&apos;s stats, or comparing tier picks on mobile should be fast and simple. Our goal is to give players a clean, reliable reference that loads quickly and stays current as the game evolves.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          What we cover
        </h2>
        <p className="text-slate-600 leading-relaxed">
          We focus on three things that Evomon players need most:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li><strong>Active codes</strong> — verified daily and sorted by reward, so you can redeem the latest items without digging through Discord or social feeds.</li>
          <li><strong>Creature stats and locations</strong> — base stats, types, rarities, and where to find each creature, all on one mobile-friendly page.</li>
          <li><strong>Tier list</strong> — a community-informed ranking based on PvE viability, base stats, rarity, and balance changes.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          How we keep info up to date
        </h2>
        <p className="text-slate-600 leading-relaxed">
          We monitor official Evomon channels, community wikis, and trusted Roblox guide sources. When data changes, we update the site and redeploy it. If we are unsure about a code, stat, or location, we mark it as coming soon rather than guess. Our update frequency is typically daily for codes and weekly for creature stats and tier adjustments.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          Who runs this site
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Evomon.club is run by a small group of Evomon and Roblox players who wanted a faster, cleaner guide than the usual wikis and ad-heavy code lists. We are not part of the Evomon development team, and we do not accept paid placement in the tier list or code pages.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          Contact and feedback
        </h2>
        <p className="text-slate-600 leading-relaxed">
          If you spot an outdated code, a missing creature, or a stat that looks wrong, we appreciate a heads-up. The fastest way to reach us is through the official Evomon community channels and pointing out the page you were on.
        </p>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mt-8">
          <p className="text-sm text-amber-900 leading-relaxed">
            Evomon.club is not affiliated with, endorsed by, or sponsored by the Evomon developers or Roblox Corporation. All game images, names, and assets belong to their respective owners and are used for informational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
