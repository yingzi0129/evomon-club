"use client";

import Script from "next/script";

const PLAUSIBLE_SRC = "https://plausible.shipsolo.io/js/pa-SgjtMbxWoTmy89WDo0w24.js";
const PLAUSIBLE_DOMAIN = "evomon.club";

export function PlausibleAnalytics() {
  return (
    <Script
      src={PLAUSIBLE_SRC}
      strategy="afterInteractive"
      data-domain={PLAUSIBLE_DOMAIN}
    />
  );
}
