<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="md:col-span-2">
          <div class="flex items-center mb-4">
            <img 
              src="/src/assets/photo.png" 
              alt="Susant Swain" 
              class="h-12 w-12 rounded-full mr-4 object-cover"
            />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Susant Swain</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            WordPress Developer & Software Engineer specializing in accessibility solutions for the visually impaired community. Creating inclusive digital experiences that empower everyone.
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
              <GitHubIcon v-if="social.name === 'GitHub'" class="h-5 w-5" />
              <LinkedInIcon v-if="social.name === 'LinkedIn'" class="h-5 w-5" />
              <TwitterIcon v-if="social.name === 'Twitter'" class="h-5 w-5" />
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
                href="mailto:info@susantswain.com"
                class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
              >
                info@susantswain.com
              </a>
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <a 
                href="tel:+917064068258"
                class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
              >
                +91 7064068258
              </a>
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <a 
                href="https://wa.me/917064068258"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm inline-flex items-center"
              >
                <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
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
          <div class="flex flex-wrap space-x-4 mt-4 md:mt-0">
            <router-link 
              to="/accessibility"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              Accessibility
            </router-link>
            <router-link 
              to="/privacy-policy"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              Privacy Policy
            </router-link>
            <router-link 
              to="/terms-of-use"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              Terms of Use
            </router-link>
            <router-link 
              to="/copyright"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
            >
              Copyright
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
import GitHubIcon from '../../assets/icons/GitHubIcon.vue'
import LinkedInIcon from '../../assets/icons/LinkedInIcon.vue'
import TwitterIcon from '../../assets/icons/TwitterIcon.vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/susantswain'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/susantswain'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/susantswain'
  }
]

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Hyperlinking Policy', href: '/hyperlinking-policy' }
]
</script>