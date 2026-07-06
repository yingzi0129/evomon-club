import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h3 className="font-headline font-bold text-xl text-slate-900 mb-2">
              Never miss a new code
            </h3>
            <p className="text-slate-600 max-w-md">
              Check back regularly or bookmark this page for the latest active codes and tier updates.
            </p>
          </div>
          <Link
            href="/codes"
            className="inline-flex items-center justify-center bg-cta hover:bg-cta-hover text-white font-headline font-bold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            Browse Active Codes
          </Link>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <Link href="/cookie-policy" className="text-slate-500 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link href="/about" className="text-slate-500 hover:text-primary transition-colors">
              About
            </Link>
          </div>
          <p className="text-xs text-slate-400 text-center md:text-right max-w-md">
            Evomon.club is an independent fan-made guide site and is not affiliated with, endorsed by, or sponsored by the Evomon developers or Roblox Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}
