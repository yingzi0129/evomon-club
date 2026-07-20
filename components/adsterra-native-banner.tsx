"use client";

import { useEffect, useRef } from "react";

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !ref.current) return;

    const container = ref.current;
    const existing = document.getElementById("container-3598632d0fe0a970c08a37bf64d558f8");

    if (existing) {
      // Move existing ad container into this component if script already loaded elsewhere
      container.appendChild(existing);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl30451626.effectivecpmnetwork.com/3598632d0fe0a970c08a37bf64d558f8/invoke.js";
    script.onload = () => {
      const ad = document.getElementById("container-3598632d0fe0a970c08a37bf64d558f8");
      if (ad && ad.parentElement !== container) {
        container.appendChild(ad);
      }
    };

    document.body.appendChild(script);
    injected.current = true;
  }, []);

  return (
    <div className="my-8 min-h-[120px] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
      <div ref={ref} id="container-3598632d0fe0a970c08a37bf64d558f8" />
    </div>
  );
}
