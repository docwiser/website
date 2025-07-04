<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
    <!-- Skip Link -->
    <SkipLink />

    <main id="main-content" class="text-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <!-- 404 Illustration -->
        <div class="mb-8">
          <svg class="mx-auto h-32 w-32 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </div>

        <!-- Error Message -->
        <h1 class="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <!-- Action Buttons -->
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <router-link
            to="/"
            class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <HomeIcon class="h-5 w-5 mr-2" />
            Go Home
          </router-link>
          
          <button
            @click="goBack"
            class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <ArrowLeftIcon class="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        <!-- Helpful Links -->
        <div class="mt-12">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Popular Pages
          </h3>
          <div class="space-y-2">
            <router-link
              v-for="link in popularPages"
              :key="link.name"
              :to="link.href"
              class="block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>

        <!-- Search Suggestion -->
        <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Looking for something specific?
          </p>
          <router-link
            to="/contact"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
          >
            Contact me for help →
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import SkipLink from '../components/ui/SkipLink.vue'

const router = useRouter()

const popularPages = [
  { name: 'About Me', href: '/about' },
  { name: 'My Projects', href: '/projects' },
  { name: 'Blog Posts', href: '/blog' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' }
]

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>