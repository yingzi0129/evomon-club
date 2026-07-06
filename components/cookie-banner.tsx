"use client";

import { useState, useEffect } from "react";
import { Settings, Check, X } from "lucide-react";
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

  const dismiss = () => {
    save({ essential: true, analytics: false, advertising: false });
  };

  const savePreferences = () => {
    save(consent);
  };

  if (!show) return null;

  return (
    <div className="bg-indigo-950 text-white border-b border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-2.5 md:py-3">
        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
          <p className="flex-1 min-w-0 leading-relaxed">
            We use cookies to understand how visitors use our site and to improve their experience.{" "}
            <Link href="/privacy" className="underline hover:text-indigo-200">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/cookie-policy" className="underline hover:text-indigo-200">
              Cookie Policy
            </Link>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 md:px-2.5 md:py-1 rounded-md hover:bg-indigo-900 transition-colors"
              aria-label="Manage cookies"
              title="Manage cookies"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={rejectAll}
              className="hidden md:inline-flex px-3 py-1.5 rounded-md font-medium text-indigo-100 bg-indigo-900/60 hover:bg-indigo-900 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={acceptAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium bg-white text-indigo-950 hover:bg-indigo-50 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Accept
            </button>
            <button
              onClick={dismiss}
              className="p-1.5 rounded-md hover:bg-indigo-900 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-2 pt-2 border-t border-indigo-900/50 grid gap-2 max-w-md md:max-w-lg">
            {[
              { key: "essential", label: "Essential", desc: "Required for the site to function." },
              { key: "analytics", label: "Analytics", desc: "Help us understand how visitors use the site." },
              { key: "advertising", label: "Advertising", desc: "Used to display relevant ads." },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-900/30 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-sm text-white">{item.label}</div>
                  <div className="text-xs text-indigo-200">{item.desc}</div>
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
                  className="w-5 h-5 rounded border-indigo-400 text-indigo-500 focus:ring-indigo-400"
                />
              </label>
            ))}
            <div className="flex gap-2">
              <button
                onClick={rejectAll}
                className="flex-1 md:hidden px-4 py-2 rounded-md font-medium text-indigo-100 bg-indigo-900/60 hover:bg-indigo-900 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={savePreferences}
                className="flex-1 px-4 py-2 rounded-md font-medium bg-white text-indigo-950 hover:bg-indigo-50 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
