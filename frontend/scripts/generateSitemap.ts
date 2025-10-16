import fs from "fs";
import path from "path";
import { routes } from "../src/router/routes.js";
import { getBlogRoutes } from "./getBlogRoutes.js";

const hostname = "https://seanmcbroom.com";
const distDir = path.resolve("./dist");
const blogDir = path.resolve("./src/assets/posts");

function generateSitemap() {
  const staticRoutes = routes
    .filter((r) => !r.dynamic)
    .map((r) => ({
      url: `${hostname}${r.path}`,
      description: r.description,
      changefreq: "monthly",
      priority: r.path === "/" ? "1.0" : "0.7",
      lastmod: new Date().toISOString(),
    }));

  const blogRoutes = getBlogRoutes().map((b) => {
    const filePath = path.join(blogDir, `${b.slug.replace("posts/", "")}.md`);
    let lastmod = new Date().toISOString();
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      lastmod = stats.mtime.toISOString();
    }

    return {
      url: `${hostname}/${b.slug}`,
      description: b.description,
      changefreq: "weekly",
      priority: "0.6",
      lastmod,
    };
  });

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `
  <url>
    <loc>${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    ${r.description ? `<description>${escapeXml(r.description)}</description>` : ""}
  </url>`,
  )
  .join("")}
</urlset>`;

  const sitemapPath = path.join(distDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf-8");
  console.log(`✅ Sitemap generated at ${sitemapPath}`);
}

function generateRobots() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${hostname}/sitemap.xml
`;

  const robotsPath = path.join(distDir, "robots.txt");
  fs.writeFileSync(robotsPath, robotsTxt, "utf-8");
  console.log(`✅ robots.txt generated at ${robotsPath}`);
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

function main() {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  generateSitemap();
  generateRobots();
}

main();
