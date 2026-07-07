"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Smartphone } from "lucide-react";

const PLACE_ID = "134381727982611";
const GAME_PAGE_URL = `https://www.roblox.com/games/${PLACE_ID}/Evomon`;
const ROBLOX_APP_URL = `roblox://placeId=${PLACE_ID}`;
const ROBLOX_START_URL = `https://www.roblox.com/games/start?placeId=${PLACE_ID}`;

export default function PlayPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    setIsMobile(mobile);

    if (mobile) {
      window.location.href = ROBLOX_APP_URL;
      return;
    }

    window.location.href = GAME_PAGE_URL;
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
      <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 md:p-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center">
          <Smartphone className="w-8 h-8" />
        </div>
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Opening Evomon on Roblox
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          {isMobile
            ? "If the Roblox app does not open automatically, use the button below to launch Evomon directly."
            : "Redirecting you to the official Evomon Roblox page."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={isMobile ? ROBLOX_START_URL : GAME_PAGE_URL}
            className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white font-headline font-bold px-6 py-3 rounded-full transition-colors shadow-md"
          >
            <ExternalLink className="w-5 h-5" />
            Open Evomon
          </a>
          <a
            href={GAME_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-cta font-headline font-bold px-6 py-3 rounded-full transition-colors border-2 border-cta"
          >
            Roblox Web Page
          </a>
        </div>
      </div>
    </section>
  );
}
