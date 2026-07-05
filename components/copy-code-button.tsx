"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <button
      className="text-slate-400 hover:text-primary transition-colors"
      title={copied ? "Copied!" : "Copy Code"}
      onClick={handleCopy}
    >
      {copied ? (
        <span className="text-xs font-bold text-accent-nature">Copied!</span>
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}
