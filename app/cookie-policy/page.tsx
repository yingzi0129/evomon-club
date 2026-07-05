import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy - Evomon.club",
  description: "Cookie Policy for Evomon.club, an independent fan-made guide for Evomon on Roblox.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: [DATE]</p>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">1. What Are Cookies</h2>
        <p className="text-slate-600 leading-relaxed">Cookies are small text files stored on your device to help websites function and improve your experience.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">2. Cookies We Use</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>Essential cookies: required for the Site to function (e.g., Cloudflare).</li>
          <li>Analytics cookies: help us understand how visitors use the Site (Google Analytics 4).</li>
          <li>Advertising cookies: used to display relevant ads (Adsterra, if enabled).</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">3. Managing Cookies</h2>
        <p className="text-slate-600 leading-relaxed">You can disable cookies through your browser settings. Some features may not work properly if cookies are disabled.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">4. More Information</h2>
        <p className="text-slate-600 leading-relaxed">For Google advertising preferences, visit https://adssettings.google.com/.</p>
      </div>
    </div>
  );
}
