"use client";

import { useState, useEffect } from "react";
import { Settings, Check } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "evomon_cookie_consent";

type Consent = {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
};

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    essential: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setShow(true);
    } else {
      setConsent(JSON.parse(saved));
    }
  }, []);

  const save = (value: Consent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    setConsent(value);
    setShow(false);
  };

  const acceptAll = () => {
    save({ essential: true, analytics: true, advertising: true });
  };

  const rejectAll = () => {
    save({ essential: true, analytics: false, advertising: false });
  };

  const savePreferences = () => {
    save(consent);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-0 md:p-4">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md md:rounded-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)] border-t md:border border-slate-200 p-3 md:p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-slate-700 leading-snug md:leading-relaxed">
              We use cookies to keep the site running and understand how visitors use it. By clicking &quot;Accept All&quot;, you agree to analytics cookies. You can also manage preferences or reject optional cookies.
            </p>
            <div className="mt-1 md:mt-1.5 text-xs text-slate-500 flex gap-3">
              <Link href="/privacy" className="hover:text-primary underline">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-primary underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 md:gap-2.5 shrink-0">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              Manage
            </button>
            <button
              onClick={rejectAll}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={acceptAll}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Accept All
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 grid gap-2">
            {[
              { key: "essential", label: "Essential", desc: "Required for the site to function." },
              { key: "analytics", label: "Analytics", desc: "Help us understand how visitors use the site." },
              { key: "advertising", label: "Advertising", desc: "Used to display relevant ads." },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-sm text-slate-900">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={consent[item.key as keyof Consent]}
                  onChange={(e) =>
                    setConsent((prev) => ({
                      ...prev,
                      [item.key]: e.target.checked,
                    }))
                  }
                  disabled={item.key === "essential"}
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
              </label>
            ))}
            <button
              onClick={savePreferences}
              className="mt-1 inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
