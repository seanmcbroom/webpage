import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("./src/assets/posts");

export interface BlogItem {
  slug: string;
  description: string;
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
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      const fileData = matter(fileContent).data;
      const [slug] = file.replace(/\.md$/, "").split(".");

      return {
        slug: `posts/${slug}`,
        description: fileData.description || "",
      };
    })
    .filter((r): r is BlogItem => Boolean(r));

  return routes;
}
