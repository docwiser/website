<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Ready to create something amazing together? Let's discuss your project and how I can help make it accessible to everyone.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Let's Connect
            </h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon class="h-5 w-5 text-white" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Email
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    <a 
                      href="mailto:info@susantswain.com"
                      class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                    >
                      info@susantswain.com
                    </a>
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <PhoneIcon class="h-5 w-5 text-white" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Phone
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    <a 
                      href="tel:+917064068258"
                      class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                    >
                      +91 7064068258
                    </a>
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <MapPinIcon class="h-5 w-5 text-white" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Location
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Available for remote work worldwide
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-8">
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Follow Me
              </h3>
              <div class="flex space-x-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  :aria-label="social.name"
                  class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon v-if="social.name === 'GitHub'" class="h-5 w-5" />
                  <LinkedInIcon v-if="social.name === 'LinkedIn'" class="h-5 w-5" />
                  <TwitterIcon v-if="social.name === 'Twitter'" class="h-5 w-5" />
                </a>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Quick Actions
              </h3>
              <div class="space-y-3">
                <button
                  @click="copyEmail"
                  class="flex items-center w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <ClipboardIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <span class="text-gray-700 dark:text-gray-300">Copy Email Address</span>
                </button>
                <a
                  href="https://wa.me/917064068258"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <svg class="h-5 w-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">WhatsApp Message</span>
                </a>
                <a
                  href="/resume.pdf"
                  download
                  class="flex items-center w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <DocumentArrowDownIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <span class="text-gray-700 dark:text-gray-300">Download Resume</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Send me a message
            </h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Tell me about your project or question..."
                ></textarea>
              </div>

              <div class="flex items-center">
                <input
                  id="newsletter"
                  v-model="form.newsletter"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="newsletter" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Subscribe to my newsletter for accessibility tips and updates
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <LoadingSpinner v-if="loading" size="small" class="mr-2" />
                  <span v-if="loading">Sending...</span>
                  <span v-else>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClipboardIcon, 
  DocumentArrowDownIcon 
} from '@heroicons/vue/24/outline'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import GitHubIcon from '../assets/icons/GitHubIcon.vue'
import LinkedInIcon from '../assets/icons/LinkedInIcon.vue'
import TwitterIcon from '../assets/icons/TwitterIcon.vue'

const uiStore = useUIStore()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  newsletter: false
})

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

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('info@susantswain.com')
    uiStore.addNotification({
      type: 'success',
      title: 'Email Copied!',
      message: 'Email address copied to clipboard'
    })
  } catch (err) {
    uiStore.addNotification({
      type: 'error',
      title: 'Failed to Copy',
      message: 'Could not copy email address'
    })
  }
}

const submitForm = async () => {
  loading.value = true
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      newsletter: false
    }
    
    uiStore.addNotification({
      type: 'success',
      title: 'Message Sent!',
      message: 'Thank you for your message. I\'ll get back to you soon!'
    })
    
    // Announce success to screen readers
    uiStore.speak('Your message has been sent successfully. I will get back to you soon.')
    
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Failed to Send',
      message: 'There was an error sending your message. Please try again.'
    })
  } finally {
    loading.value = false
  }
}
</script>