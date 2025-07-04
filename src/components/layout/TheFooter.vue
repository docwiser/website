<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="md:col-span-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Susant Swain</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            WordPress Developer & Software Engineer specializing in accessibility solutions for the visually impaired community.
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link 
                :to="link.href"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact</h3>
          <div class="space-y-2">
            <p class="text-gray-600 dark:text-gray-400">
              <a 
                href="mailto:contact@susantswain.com"
                class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
              >
                contact@susantswain.com
              </a>
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <a 
                href="tel:+1234567890"
                class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
              >
                +1 (234) 567-890
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © {{ currentYear }} Susant Swain. All rights reserved.
          </p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <router-link 
              to="/accessibility"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              Accessibility
            </router-link>
            <a 
              href="/sitemap.xml"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/susantswain',
    icon: 'GitHubIcon'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/susantswain',
    icon: 'LinkedInIcon'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/susantswain',
    icon: 'TwitterIcon'
  }
]

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
]
</script>