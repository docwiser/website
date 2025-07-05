import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { pinia } from '../main'

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
    path: '/waitlist/:service',
    name: 'WaitlistJoin',
    component: () => import('../views/WaitlistJoinPage.vue'),
    meta: { title: 'Join Waitlist - Susant Swain' }
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordPage.vue'),
    meta: { title: 'Forgot Password - Susant Swain', requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: { title: 'My Profile - Susant Swain', requiresAuth: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/AccountPage.vue'),
    meta: { title: 'Account Settings - Susant Swain', requiresAuth: true }
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: () => import('../views/PreferencesPage.vue'),
    meta: { title: 'Preferences - Susant Swain', requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardPage.vue'),
    meta: { title: 'Dashboard - Susant Swain', requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/admin/UsersManagement.vue'),
    meta: { title: 'User Management - Susant Swain', requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/admin/content',
    name: 'AdminContent',
    component: () => import('../views/admin/ContentManagement.vue'),
    meta: { title: 'Content Management - Susant Swain', requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/admin/waitlists',
    name: 'AdminWaitlists',
    component: () => import('../views/admin/WaitlistManagement.vue'),
    meta: { title: 'Waitlist Management - Susant Swain', requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: () => import('../views/admin/SystemSettings.vue'),
    meta: { title: 'System Settings - Susant Swain', requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/accessibility',
    name: 'Accessibility',
    component: () => import('../views/AccessibilityPage.vue'),
    meta: { title: 'Accessibility Settings - Susant Swain' }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicyPage.vue'),
    meta: { title: 'Privacy Policy - Susant Swain' }
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('../views/TermsOfUsePage.vue'),
    meta: { title: 'Terms of Use - Susant Swain' }
  },
  {
    path: '/copyright',
    name: 'Copyright',
    component: () => import('../views/CopyrightPage.vue'),
    meta: { title: 'Copyright Policy - Susant Swain' }
  },
  {
    path: '/hyperlinking-policy',
    name: 'HyperlinkingPolicy',
    component: () => import('../views/HyperlinkingPolicyPage.vue'),
    meta: { title: 'Hyperlinking Policy - Susant Swain' }
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

// Function to extract title from page content
const extractTitleFromContent = () => {
  // Wait for the page to render
  setTimeout(() => {
    const h1 = document.querySelector('main h1')
    const h2 = document.querySelector('main h2')
    
    if (h1) {
      document.title = `${h1.textContent.trim()} | Susant Swain`
    } else if (h2) {
      document.title = `${h2.textContent.trim()} | Susant Swain`
    }
  }, 100)
}

router.beforeEach((to, from, next) => {
  // Use the exported Pinia instance to access the store
  const authStore = useAuthStore(pinia)
  
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    // Fallback to route-based title
    const routeName = to.name || to.path.replace('/', '').replace('-', ' ')
    document.title = `${routeName} | Susant Swain`
  }
  
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

router.afterEach((to) => {
  // Extract title from content if no meta title is set
  if (!to.meta.title) {
    extractTitleFromContent()
  }
})

export default router