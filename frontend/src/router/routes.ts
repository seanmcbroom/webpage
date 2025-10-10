export interface RouteItem {
  path: string;
  dynamic?: boolean;
}

export const routes: RouteItem[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/blog" },
  { path: "/resume" },
  { path: "/contact" },
  { path: "/posts/:slug", dynamic: true },
];
