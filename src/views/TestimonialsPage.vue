<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Hear what my clients say about working with me on their accessibility projects
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Add Testimonial Button -->
        <div class="text-center mb-12">
          <button
            @click="showModal = true"
            class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Share Your Experience
          </button>
        </div>

        <!-- Testimonials Grid -->
        <div v-if="contentStore.loading" class="flex justify-center">
          <LoadingSpinner />
        </div>
        
        <div v-else-if="approvedTestimonials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testimonial in approvedTestimonials"
            :key="testimonial.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center">
                  <span class="text-white font-semibold text-lg">
                    {{ testimonial.name.charAt(0) }}
                  </span>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {{ testimonial.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  {{ testimonial.position }}
                </p>
              </div>
            </div>
            
            <blockquote class="text-gray-700 dark:text-gray-300 italic">
              "{{ testimonial.content }}"
            </blockquote>
            
            <div class="mt-4 flex">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-16">
          <div class="mb-4">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.476L3 21l2.476-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No testimonials yet
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            Be the first to share your experience working with me!
          </p>
          <button
            @click="showModal = true"
            class="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Add Testimonial
          </button>
        </div>
      </div>
    </main>

    <!-- Add Testimonial Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        ref="modalRef"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        @click.stop
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 id="modal-title" class="text-xl font-bold text-gray-900 dark:text-gray-100">
            Share Your Experience
          </h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
            aria-label="Close modal"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        
        <form @submit.prevent="submitTestimonial" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label for="position" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position/Company *
            </label>
            <input
              id="position"
              v-model="form.position"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Your position and company"
            />
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Testimonial *
            </label>
            <textarea
              id="content"
              v-model="form.content"
              rows="4"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Share your experience working with me..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Submitting...</span>
              <span v-else>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useContentStore } from '../stores/content'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const contentStore = useContentStore()
const uiStore = useUIStore()

const showModal = ref(false)
const modalRef = ref(null)
const loading = ref(false)

const form = ref({
  name: '',
  position: '',
  content: ''
})

const approvedTestimonials = computed(() => contentStore.approvedTestimonials)

const closeModal = () => {
  showModal.value = false
  form.value = {
    name: '',
    position: '',
    content: ''
  }
}

const submitTestimonial = async () => {
  loading.value = true
  
  try {
    const success = await contentStore.addTestimonial(form.value)
    
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Thank You!',
        message: 'Your testimonial has been submitted and is pending approval.'
      })
      closeModal()
    } else {
      uiStore.addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your testimonial. Please try again.'
      })
    }
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Submission Failed',
      message: 'There was an error submitting your testimonial. Please try again.'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  contentStore.fetchTestimonials()
})

// Focus management for modal
const focusModal = async () => {
  await nextTick()
  if (modalRef.value) {
    modalRef.value.focus()
  }
}

// Watch for modal opening to manage focus
const handleModalOpen = () => {
  if (showModal.value) {
    focusModal()
  }
}

// Handle escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showModal.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>