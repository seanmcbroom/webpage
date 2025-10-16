export interface RouteItem {
  path: string;
  description?: string; // 🆕 added
  dynamic?: boolean;
}

export const routes: RouteItem[] = [
  {
    path: "/",
    description: "I work with software to bring ideas to life.",
  },
  {
    path: "/about",
    description: "A bit about me and what I do.",
  },
  {
    path: "/blog",
    description: "A collection of posts where I share things that interest me.",
  },
  {
    path: "/resume",
    description:
      "Resume of Sean McBroom — software developer from Des Moines, Iowa specializing in TypeScript, JavaScript, and full-stack web development with React, Vue, and Express.",
  },
  {
    path: "/contact",
    description:
      "Have a question, proposal, or just want to say hi? Find my social links here.",
  },
  {
    path: "/posts/:slug",
    description: "",
    dynamic: true,
  },
];
