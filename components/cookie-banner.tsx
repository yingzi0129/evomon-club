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

  const savePreferences = () => {
    save(consent);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-slate-700 leading-relaxed">
              We use cookies to keep the site running, understand how visitors use it, and show relevant ads through our advertising partner. By clicking &quot;Accept All&quot;, you agree to all cookies. You can manage or withdraw consent anytime.
            </p>
            <div className="mt-2 text-xs text-slate-500 flex gap-3">
              <Link href="/privacy" className="hover:text-primary underline">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-primary underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Manage Cookies
            </button>
            <button
              onClick={acceptAll}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              <Check className="w-4 h-4" />
              Accept All
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid gap-3">
            {[
              { key: "essential", label: "Essential", desc: "Required for the site to function." },
              { key: "analytics", label: "Analytics", desc: "Help us understand how visitors use the site." },
              { key: "advertising", label: "Advertising", desc: "Used to display relevant ads." },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer"
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
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
