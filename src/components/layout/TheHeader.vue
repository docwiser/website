<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            aria-label="Go to homepage"
          >
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
            aria-label="Accessibility settings"
            :aria-expanded="showAccessibilityMenu"
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

    <!-- Accessibility Menu -->
    <div v-if="showAccessibilityMenu" class="absolute right-4 top-16 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 p-4">
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Accessibility Settings</h3>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label for="dark-mode" class="text-sm text-gray-700 dark:text-gray-300">Dark Mode</label>
          <button 
            @click="uiStore.toggleDarkMode"
            type="button"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="uiStore.darkMode ? 'bg-primary-600' : 'bg-gray-200'"
          >
            <span class="sr-only">Toggle dark mode</span>
            <span 
              class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
              :class="uiStore.darkMode ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
        
        <div class="flex items-center justify-between">
          <label for="high-contrast" class="text-sm text-gray-700 dark:text-gray-300">High Contrast</label>
          <button 
            @click="uiStore.toggleHighContrast"
            type="button"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="uiStore.highContrast ? 'bg-primary-600' : 'bg-gray-200'"
          >
            <span class="sr-only">Toggle high contrast</span>
            <span 
              class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
              :class="uiStore.highContrast ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
        
        <div class="flex items-center justify-between">
          <label for="speech" class="text-sm text-gray-700 dark:text-gray-300">Speech</label>
          <button 
            @click="uiStore.toggleSpeech"
            type="button"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="uiStore.speechEnabled ? 'bg-primary-600' : 'bg-gray-200'"
          >
            <span class="sr-only">Toggle speech synthesis</span>
            <span 
              class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
              :class="uiStore.speechEnabled ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
        
        <div>
          <label for="font-size" class="text-sm text-gray-700 dark:text-gray-300 block mb-2">Font Size</label>
          <select 
            id="font-size"
            v-model="uiStore.fontSize"
            @change="uiStore.setFontSize($event.target.value)"
            class="w-full text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="small">Small</option>
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra Large</option>
          </select>
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
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { CogIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../stores/auth'
import { useUIStore } from '../../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

const showAccessibilityMenu = ref(false)
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
  showAccessibilityMenu.value = !showAccessibilityMenu.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showAccessibilityMenu.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  router.push('/')
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showAccessibilityMenu.value = false
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>