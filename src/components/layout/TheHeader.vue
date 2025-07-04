<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex items-center text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            aria-label="Go to homepage"
          >
            <img 
              src="/src/assets/photo.png" 
              alt="Susant Swain" 
              class="h-10 w-10 rounded-full mr-3 object-cover"
            />
            Susant Swain
          </router-link>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:ml-10 md:flex space-x-8" role="navigation" aria-label="Main navigation">
            <router-link 
              v-for="item in navigation" 
              :key="item.name"
              :to="item.href"
              :class="[
                'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                $route.path === item.href ? 'text-primary-600 dark:text-primary-400' : ''
              ]"
              :aria-current="$route.path === item.href ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Accessibility Menu -->
          <button 
            @click="toggleAccessibilityMenu"
            type="button"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Open accessibility settings"
            :aria-expanded="showAccessibilityModal"
          >
            <CogIcon class="h-5 w-5" />
          </button>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button 
              @click="toggleUserMenu"
              type="button"
              class="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="User menu"
              :aria-expanded="showUserMenu"
            >
              <UserIcon class="h-5 w-5" />
            </button>
            
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div class="py-1">
                <router-link 
                  v-if="authStore.isAdmin"
                  to="/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  @click="showUserMenu = false"
                >
                  Dashboard
                </router-link>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          <router-link 
            v-else
            to="/login"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Sign In
          </router-link>

          <!-- Mobile Menu Button -->
          <button 
            @click="uiStore.toggleSidebar"
            type="button"
            class="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle mobile menu"
            :aria-expanded="uiStore.sidebarOpen"
          >
            <Bars3Icon v-if="!uiStore.sidebarOpen" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="uiStore.sidebarOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <router-link 
          v-for="item in navigation" 
          :key="item.name"
          :to="item.href"
          :class="[
            'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors',
            $route.path === item.href ? 'text-primary-600 dark:text-primary-400' : ''
          ]"
          @click="uiStore.toggleSidebar"
          :aria-current="$route.path === item.href ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <!-- Accessibility Modal -->
    <AccessibilityModal 
      :is-open="showAccessibilityModal" 
      @close="showAccessibilityModal = false" 
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { CogIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../stores/auth'
import { useUIStore } from '../../stores/ui'
import AccessibilityModal from '../ui/AccessibilityModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

const showAccessibilityModal = ref(false)
const showUserMenu = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' }
]

const toggleAccessibilityMenu = () => {
  showAccessibilityModal.value = !showAccessibilityModal.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showAccessibilityModal.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  router.push('/')
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

const handleKeydown = (event) => {
  // Alt + A to open accessibility menu
  if (event.altKey && event.key === 'a') {
    event.preventDefault()
    toggleAccessibilityMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>