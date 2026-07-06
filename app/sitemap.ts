import type { MetadataRoute } from "next";
import creaturesData from "@/data/creatures.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://evomon.club";
  const lastModified = new Date();

  const staticPages = [
    { url: base, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/codes`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/tier-list`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/creatures`, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const creaturePages = creaturesData.creatures.map((c) => ({
    url: `${base}/creatures/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...creaturePages];
}
