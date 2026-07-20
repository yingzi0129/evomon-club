const fs = require("fs");
const path = require("path");

const base = "https://evomon.club";
const lastModified = new Date().toISOString();

const creatures = require("../data/creatures.json");

const pages = [
  { loc: `${base}/`, priority: 1.0, changefreq: "weekly" },
  { loc: `${base}/codes/`, priority: 0.9, changefreq: "weekly" },
  { loc: `${base}/tier-list/`, priority: 0.8, changefreq: "weekly" },
  { loc: `${base}/creatures/`, priority: 0.8, changefreq: "weekly" },
  { loc: `${base}/best-starter/`, priority: 0.8, changefreq: "weekly" },
  { loc: `${base}/guides/`, priority: 0.7, changefreq: "weekly" },
  { loc: `${base}/guides/type-chart/`, priority: 0.7, changefreq: "weekly" },
  { loc: `${base}/guides/beginner-guide/`, priority: 0.7, changefreq: "weekly" },
  { loc: `${base}/guides/farming-guide/`, priority: 0.7, changefreq: "weekly" },
  // About is intentionally excluded from sitemap per SEO policy
  // Policy pages are not submitted because they use robots noindex
];

const escapeXml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

creatures.creatures.forEach((c) => {
  pages.push({
    loc: `${base}/creatures/${c.slug}/`,
    priority: 0.7,
    changefreq: "weekly",
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = path.join(__dirname, "..", "public", "sitemap-google.xml");
fs.writeFileSync(outPath, xml, "utf8");

// Also keep a standard /sitemap.xml copy for tools that expect the default path.
const fallbackPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(fallbackPath, xml, "utf8");

console.log(`Generated sitemap-google.xml with ${pages.length} URLs`);
