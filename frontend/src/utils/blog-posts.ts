// Post metadata structure
export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  [key: string]: string | undefined;
}

// Full post object
export interface Post {
  slug: string;
  locale: string;
  metadata: PostMetadata;
  body: string;
}

// Load all markdown files as raw strings
export const posts: Record<string, string> = import.meta.glob(
  "../assets/posts/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
) as Record<string, string>;

// Parse frontmatter (YAML-like) from markdown
function parseFrontmatter(content: string): {
  metadata: PostMetadata;
  body: string;
} {
  const match = /^---([\s\S]*?)---/.exec(content);
  const metadata: PostMetadata = { title: "", date: "" };
  let body = content;

  if (match) {
    match[1]
      .trim()
      .split("\n")
      .forEach((line) => {
        const [key, value] = line.split(":").map((s) => s.trim());

        if (key) {
          metadata[key] = value?.replace(/"/g, "");
        }
      });
    body = content.slice(match[0].length).trim();
  }

  return { metadata, body };
}

// Get all posts filtered by locale
export function getAllPosts(locale = "en"): Post[] {
  // Parse all posts into structured objects
  const allPosts: Post[] = Object.entries(posts).map(([path, raw]): Post => {
    const { metadata, body } = parseFrontmatter(raw);

    // filename: slug.locale.md
    const file = path.split("/").pop()!;
    const [slug, lang] = file.replace(".md", "").split(".");

    return {
      slug,
      locale: lang,
      metadata,
      body,
    };
  });

  // Group posts by slug
  const postsBySlug = new Map<string, Post[]>();
  allPosts.forEach((post) => {
    if (!postsBySlug.has(post.slug)) {
      postsBySlug.set(post.slug, []);
    }
    postsBySlug.get(post.slug)!.push(post);
  });

  // Select the requested locale, fallback to "en"
  const result: Post[] = [];
  postsBySlug.forEach((group) => {
    // Try to find the requested locale
    let post = group.find((p) => p.locale === locale);

    // Fallback to English
    post ??= group.find((p) => p.locale === "en");

    if (post) {
      result.push(post);
    }
  });

  // Sort by date descending
  return result.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}
