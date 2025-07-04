<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ service ? `Join ${service.name} Waitlist` : 'Join Waitlist' }}
          </h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            {{ service ? service.description : 'Be the first to know when this service becomes available' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading && !service" class="flex justify-center">
          <LoadingSpinner />
        </div>

        <div v-else-if="!service && !loading" class="text-center py-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Service Not Found
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            The waitlist service you're looking for doesn't exist or is no longer available.
          </p>
          <router-link
            to="/"
            class="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Back to Home
          </router-link>
        </div>

        <div v-else-if="service && !service.active" class="text-center py-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Waitlist Closed
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            This waitlist is currently closed and not accepting new entries.
          </p>
          <router-link
            to="/"
            class="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Back to Home
          </router-link>
        </div>

        <div v-else-if="submitted" class="text-center py-16">
          <div class="mb-6">
            <CheckCircleIcon class="mx-auto h-16 w-16 text-success-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            You're on the list!
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for joining the {{ service.name }} waitlist. We'll notify you as soon as this service becomes available.
          </p>
          <div class="space-y-4">
            <router-link
              to="/"
              class="block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Back to Home
            </router-link>
            <button
              @click="resetForm"
              class="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Join Another Waitlist
            </button>
          </div>
        </div>

        <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <!-- Service Info -->
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {{ service.name }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ service.description }}
            </p>
            <div v-if="service.estimatedLaunch" class="bg-primary-50 dark:bg-primary-900 rounded-lg p-4">
              <p class="text-primary-800 dark:text-primary-200 font-medium">
                Estimated Launch: {{ formatDate(service.estimatedLaunch) }}
              </p>
            </div>
          </div>

          <!-- Waitlist Form -->
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
              <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company/Organization
              </label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                placeholder="Your company or organization"
              />
            </div>

            <div>
              <label for="interest" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Why are you interested in this service?
              </label>
              <textarea
                id="interest"
                v-model="form.interest"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                placeholder="Tell us about your specific needs or use case..."
              ></textarea>
            </div>

            <div>
              <label for="budget" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Budget Range
              </label>
              <select
                id="budget"
                v-model="form.budget"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select budget range</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-25000">$10,000 - $25,000</option>
                <option value="25000-plus">$25,000+</option>
              </select>
            </div>

            <div>
              <label for="timeline" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                v-model="form.timeline"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select timeline</option>
                <option value="asap">As soon as possible</option>
                <option value="1-month">Within 1 month</option>
                <option value="3-months">Within 3 months</option>
                <option value="6-months">Within 6 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div class="flex items-center">
              <input
                id="updates"
                v-model="form.updates"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="updates" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I'd like to receive updates about other services and accessibility tips
              </label>
            </div>

            <div>
              <button
                type="submit"
                :disabled="formLoading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <LoadingSpinner v-if="formLoading" size="small" class="mr-2" />
                <span v-if="formLoading">Joining Waitlist...</span>
                <span v-else>Join Waitlist</span>
              </button>
            </div>
          </form>

          <!-- Privacy Notice -->
          <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <strong>Privacy Notice:</strong> Your information will only be used to contact you about this service and related updates. 
              We will never share your information with third parties. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { useWaitlistStore } from '../stores/waitlist'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const route = useRoute()
const waitlistStore = useWaitlistStore()
const uiStore = useUIStore()

const loading = ref(true)
const formLoading = ref(false)
const submitted = ref(false)

const form = ref({
  name: '',
  email: '',
  company: '',
  interest: '',
  budget: '',
  timeline: '',
  updates: false
})

const service = computed(() => {
  return waitlistStore.getServiceBySlug(route.params.service)
})

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const submitForm = async () => {
  if (!service.value) return

  formLoading.value = true

  try {
    const success = await waitlistStore.joinWaitlist({
      ...form.value,
      serviceId: service.value.id,
      serviceName: service.value.name,
      serviceSlug: service.value.slug
    })

    if (success) {
      submitted.value = true
      uiStore.addNotification({
        type: 'success',
        title: 'Successfully Joined!',
        message: `You've been added to the ${service.value.name} waitlist.`
      })
    } else {
      uiStore.addNotification({
        type: 'error',
        title: 'Failed to Join',
        message: 'There was an error joining the waitlist. Please try again.'
      })
    }
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Failed to Join',
      message: 'There was an error joining the waitlist. Please try again.'
    })
  } finally {
    formLoading.value = false
  }
}

const resetForm = () => {
  submitted.value = false
  form.value = {
    name: '',
    email: '',
    company: '',
    interest: '',
    budget: '',
    timeline: '',
    updates: false
  }
}

onMounted(async () => {
  if (waitlistStore.services.length === 0) {
    waitlistStore.fetchServices()
  }
  loading.value = false
})
</script>