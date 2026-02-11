import fs from "fs";
import path from "path";

const postsDir = path.resolve("./src/assets/posts");

export interface BlogItem {
  slug: string;
}

// Get all blog post routes for a given locale
// Returns array of routes like /posts/my-post, /posts/another-post
// Mostly for sitemap generation
export function getBlogRoutes(): BlogItem[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir);

  const routes = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const [slug] = file.replace(/\.md$/, "").split(".");

      return {
        slug: `posts/${slug}`
      };
    })
    .filter((r): r is BlogItem => Boolean(r));

  return routes;
}
