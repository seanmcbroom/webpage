import fs from "fs";
import path from "path";

const postsDir = path.resolve("./src/assets/posts");

// Get all blog post routes for a given locale
// Returns array of routes like /posts/my-post, /posts/another-post
// Mostly for sitemap generation
export function getBlogRoutes(): string[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir);

  const routes = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const [slug] = file.replace(/\.md$/, "").split(".");

      return `posts/${slug}`;
    })
    .filter((r): r is string => Boolean(r));

  return routes;
}
