import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

// Lazy-load components
const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const BlogView = () => import('../views/BlogView.vue')
const ResumeView = () => import('../views/ResumeView.vue')
const ContactView = () => import('../views/ContactView.vue')
const BlogPost = () => import('../components/BlogPost.vue')

const routeMap: Record<string, any> = {
  '/': HomeView,
  '/about': AboutView,
  '/blog': BlogView,
  '/resume': ResumeView,
  '/contact': ContactView,
  '/posts/:slug': BlogPost
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.map(r => ({
    path: r.path,
    component: routeMap[r.path]
  }))
})

export default router
