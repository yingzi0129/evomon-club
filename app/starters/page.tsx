import { Metadata } from "next";
import Link from "next/link";
import { Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Evomon Starter Comparison: Bubble, Blazpup & Frostlet",
  description:
    "The Evomon starter comparison has moved to /best-starter/. Compare Bubble, Blazpup and Frostlet stats and pick the best starter for your journey.",
  alternates: {
    canonical: "https://evomon.club/best-starter/",
  },
};

export default function StartersRedirectPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
        Evomon Starter Comparison Moved
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
        The starter comparison has a new home at{" "}
        <strong className="text-indigo-700">/best-starter/</strong>. Click below to
        compare Bubble, Blazpup, and Frostlet.
      </p>
      <Link
        href="/best-starter"
        className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md"
      >
        Go to Best Starter Guide →
      </Link>

      <div className="mt-12">
        <Link
          href="/codes"
          className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark"
        >
          <Gift className="w-4 h-4" />
          Get the latest Evomon codes
        </Link>
      </div>
    </div>
  );
}
