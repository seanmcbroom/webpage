import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import type { Component } from "vue";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import BlogView from "../views/BlogView.vue";
import ResumeView from "../views/ResumeView.vue";
import ContactView from "../views/ContactView.vue";
import BlogPost from "../components/BlogPost.vue";

const routeMap: Record<string, Component> = {
  "/": HomeView,
  "/about": AboutView,
  "/blog": BlogView,
  "/resume": ResumeView,
  "/contact": ContactView,
  "/posts/:slug": BlogPost
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.map((r) => ({
    path: r.path,
    component: routeMap[r.path]
  }))
});

export default router;
