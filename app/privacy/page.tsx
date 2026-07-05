import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Evomon.club",
  description: "Privacy Policy for Evomon.club, an independent fan-made guide for Evomon on Roblox.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: [DATE]</p>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">1. Introduction</h2>
        <p className="text-slate-600 leading-relaxed">Evomon.club (“we”, “us”, “our”) operates the website at evomon.club (the “Site”). This Privacy Policy explains how we collect, use, and protect information when you visit our Site.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">2. Information We Do Not Collect</h2>
        <p className="text-slate-600 leading-relaxed">We do not require you to create an account, log in, or submit personal information to use the Site. We do not collect names, email addresses, passwords, or payment information.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">3. Information We Collect Automatically</h2>
        <p className="text-slate-600 leading-relaxed">When you visit the Site, we and our third-party service providers may collect:</p>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>Usage data (pages visited, time spent, referring URL) via Google Analytics 4 and Bing Webmaster Tools.</li>
          <li>Device and browser information (device type, browser type, approximate location based on IP).</li>
          <li>Cookies and similar technologies used for analytics and advertising.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">4. How We Use Information</h2>
        <p className="text-slate-600 leading-relaxed">To understand and improve Site performance and content, to display relevant advertisements (if enabled), and to ensure Site security and prevent abuse.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">5. Third-Party Services</h2>
        <p className="text-slate-600 leading-relaxed">We use Cloudflare (hosting/CDN), Google Analytics 4, Google Search Console, Bing Webmaster Tools, and may use Google AdSense or Adsterra (if ads are displayed). These services may collect data according to their own privacy policies.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">6. Cookies</h2>
        <p className="text-slate-600 leading-relaxed">You can manage or disable cookies through your browser settings. For Google advertising cookies, visit https://adssettings.google.com/.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">7. Children’s Privacy</h2>
        <p className="text-slate-600 leading-relaxed">Our Site is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information, please contact us at [EMAIL].</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">8. Changes to This Policy</h2>
        <p className="text-slate-600 leading-relaxed">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">9. Contact Us</h2>
        <p className="text-slate-600 leading-relaxed">For questions about this Privacy Policy, contact us at [EMAIL].</p>
      </div>
    </div>
  );
}
