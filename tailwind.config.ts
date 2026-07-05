import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
          foreground: "#ffffff",
        },
        cta: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
          foreground: "#ffffff",
        },
        accent: {
          water: "#14b8a6",
          nature: "#10b981",
          fire: "#f59e0b",
          electric: "#eab308",
          earth: "#8b5cf6",
          ice: "#06b6d4",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f1f5f9",
        },
        "text-main": "#0f172a",
        "text-muted": "#64748b",
        legendary: "#f59e0b",
        epic: "#8b5cf6",
        rare: "#3b82f6",
        common: "#94a3b8",
        starter: "#10b981",
      },
      fontFamily: {
        headline: ["var(--font-sora)", "Sora", "sans-serif"],
        display: ["var(--font-sora)", "Sora", "sans-serif"],
        body: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 8px 30px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 12px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
