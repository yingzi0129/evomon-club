import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use - Evomon.club",
  description: "Terms of Use for Evomon.club, an independent fan-made guide for Evomon on Roblox.",
  alternates: {
    canonical: "https://evomon.club/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Terms of Use</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: [DATE]</p>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-slate-600 leading-relaxed">By accessing and using Evomon.club (“the Site”), you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">2. Not Official</h2>
        <p className="text-slate-600 leading-relaxed">Evomon.club is an independent, fan-made guide website and is not affiliated with, endorsed by, sponsored by, or connected to the Evomon developers, Roblox Corporation, or any related parties.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">3. Use of Content</h2>
        <p className="text-slate-600 leading-relaxed">All content on the Site is provided for informational and educational purposes only. You may view and share links to the Site for personal, non-commercial use. You may not reproduce, sell, or redistribute content without permission.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">4. Accuracy of Information</h2>
        <p className="text-slate-600 leading-relaxed">Game data, codes, tier lists, and maps are based on game screenshots, official announcements, and community verification. We aim to keep content updated, but we cannot guarantee that all information is accurate, complete, or current at all times. Use the information at your own risk.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">5. Codes and Rewards</h2>
        <p className="text-slate-600 leading-relaxed">Codes listed on the Site are collected from official Evomon social media, Discord, and in-game announcements. Codes may expire at any time. Always redeem codes through official Roblox / Evomon channels.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">6. Intellectual Property</h2>
        <p className="text-slate-600 leading-relaxed">All game-related names, images, and assets are the property of their respective owners. Evomon.club uses them under fair use for informational purposes. If you believe any content infringes your rights, contact us at [EMAIL].</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">7. No Liability</h2>
        <p className="text-slate-600 leading-relaxed">We are not responsible for any loss, damage, or issue arising from the use of the Site or reliance on its content. You use the Site at your own risk.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">8. Changes to Terms</h2>
        <p className="text-slate-600 leading-relaxed">We may update these Terms at any time. Continued use of the Site after changes means you accept the updated Terms.</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">9. Contact</h2>
        <p className="text-slate-600 leading-relaxed">For questions or concerns, contact us at [EMAIL].</p>
      </div>
    </div>
  );
}
