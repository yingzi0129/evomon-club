"use client";

import { useEffect, useRef, useState } from "react";

interface AdsterraNativeBannerIframeProps {
  minHeight?: number;
  maxHeight?: number;
  className?: string;
}

export function AdsterraNativeBannerIframe({
  minHeight = 120,
  maxHeight = 320,
  className = "",
}: AdsterraNativeBannerIframeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Only accept height resize messages from our ad iframe
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.type === "adsterra-native-ad-resize" &&
        typeof event.data.height === "number"
      ) {
        setHeight((h) => Math.min(Math.max(event.data.height, h), maxHeight));
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [maxHeight]);

  return (
    <div
      ref={ref}
      className={`my-8 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden ${className}`}
      style={{ minHeight, height }}
    >
      <iframe
        src="/adsterra-native-ad.html"
        title="Ad"
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        scrolling="no"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
