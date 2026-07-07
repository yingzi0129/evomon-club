import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacy", "/terms", "/cookie-policy"],
    },
    sitemap: "https://evomon.club/sitemap.xml",
  };
}
