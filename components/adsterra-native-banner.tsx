"use client";

import { useEffect, useRef, useState } from "react";

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;

    // Avoid injecting the same script multiple times across re-renders/pages
    const existing = document.getElementById("adsterra-script-3598632d0fe0a970c08a37bf64d558f8");
    if (existing) {
      const ad = document.getElementById("container-3598632d0fe0a970c08a37bf64d558f8");
      if (ad && ad.parentElement !== container) {
        container.appendChild(ad);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "adsterra-script-3598632d0fe0a970c08a37bf64d558f8";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl30451626.effectivecpmnetwork.com/3598632d0fe0a970c08a37bf64d558f8/invoke.js";

    script.onerror = () => setLoadError(true);

    try {
      document.body.appendChild(script);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Adsterra script injection failed", e);
      setLoadError(true);
    }

    return () => {
      // Move the ad container back to a temporary hidden placeholder
      // so the script's document.write() doesn't blow away the page body.
      const ad = document.getElementById("container-3598632d0fe0a970c08a37bf64d558f8");
      if (ad && container.contains(ad)) {
        try {
          container.removeChild(ad);
        } catch {
          // ignore
        }
      }
    };
  }, []);

  if (loadError) {
    return (
      <div className="my-8 min-h-[120px] bg-slate-50 rounded-2xl border border-slate-100" />
    );
  }

  return (
    <div className="my-8 min-h-[120px] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
      <div ref={ref} id="container-3598632d0fe0a970c08a37bf64d558f8" />
    </div>
  );
}
