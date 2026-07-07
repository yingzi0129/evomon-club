"use client";

import Link from "next/link";
import { Gift, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/codes", label: "Codes" },
  { href: "/tier-list", label: "Tier List" },
  { href: "/creatures", label: "Creatures" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl md:text-2xl font-headline font-bold text-primary"
        >
          Evomon.club
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/codes"
            className="hidden md:inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-headline font-bold text-sm px-5 py-2.5 rounded-full transition-colors shadow-md"
          >
            <Gift className="w-4 h-4" />
            Get Latest Codes
          </Link>
          <a
            href="https://www.roblox.com/games/134381727982611/Evomon"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-cta font-headline font-bold text-sm px-5 py-2.5 rounded-full transition-colors border-2 border-cta"
          >
            <ExternalLink className="w-4 h-4" />
            Play Evomon
          </a>
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-indigo-100/50 px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-headline font-medium text-slate-600 hover:text-primary py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/codes"
              className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white font-headline font-bold px-5 py-3 rounded-full transition-colors"
              onClick={() => setOpen(false)}
            >
              <Gift className="w-4 h-4" />
              Get Latest Codes
            </Link>
            <a
              href="https://www.roblox.com/games/134381727982611/Evomon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-cta font-headline font-bold px-5 py-3 rounded-full transition-colors border-2 border-cta"
              onClick={() => setOpen(false)}
            >
              <ExternalLink className="w-4 h-4" />
              Play Evomon
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
