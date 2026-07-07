import type { Metadata } from "next";
import CreaturesContent from "./_creatures-content";

export const metadata: Metadata = {
  title: "All Evomon Creatures Database - Stats, Types & Rarity | Evomon.club",
  description: "Browse all Evomon creatures with stats, types, rarity, locations, moves, and evolution details. Use the Evomon database to plan your team.",
  alternates: {
    canonical: "https://evomon.club/creatures/",
  },
};

export default function CreaturesPage() {
  return <CreaturesContent />;
}
