import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// route level code-splitting
// this generates a separate chunk
// which is lazy-loaded when the route is visited.
const AboutView = () => import('../views/AboutView.vue')
const BlogView = () => import('../views/BlogView.vue')
const ResumeView = () => import('../views/ResumeView.vue')
const ContactView = () => import('../views/ContactView.vue')
const BlogPost = () => import('../components/BlogPost.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/about',
      component: AboutView
    },
    {
      path: '/blog',
      component: BlogView
    },
    {
      path: '/resume',
      component: ResumeView
    },
    {
      path: '/contact',
      component: ContactView
    },
    {
      path: '/blog/:slug',
      component: BlogPost,
      props: true
    }
  ]
})

export default router
