import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { title: 'Home - Susant Swain' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: { title: 'About - Susant Swain' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsPage.vue'),
    meta: { title: 'Projects - Susant Swain' }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('../views/ProjectDetail.vue'),
    meta: { title: 'Project Detail - Susant Swain' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/BlogPage.vue'),
    meta: { title: 'Blog - Susant Swain' }
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue'),
    meta: { title: 'Blog Post - Susant Swain' }
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: () => import('../views/TestimonialsPage.vue'),
    meta: { title: 'Testimonials - Susant Swain' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
    meta: { title: 'Contact - Susant Swain' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { title: 'Login - Susant Swain', requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { title: 'Register - Susant Swain', requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardPage.vue'),
    meta: { title: 'Dashboard - Susant Swain', requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/accessibility',
    name: 'Accessibility',
    component: () => import('../views/AccessibilityPage.vue'),
    meta: { title: 'Accessibility Settings - Susant Swain' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue'),
    meta: { title: 'Page Not Found - Susant Swain' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  document.title = to.meta.title || 'Susant Swain'
  
  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check guest requirements
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }
  
  // Check role requirements
  if (to.meta.requiresRole) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }
    
    if (to.meta.requiresRole === 'admin' && !authStore.isAdmin) {
      next('/')
      return
    }
    
    if (to.meta.requiresRole === 'viewer' && !authStore.isViewer && !authStore.isAdmin) {
      next('/')
      return
    }
  }
  
  next()
})

export default router