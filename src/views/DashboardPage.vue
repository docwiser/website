<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Admin Dashboard
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Manage your portfolio content and settings
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ contentStore.projects.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-secondary-600 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Blog Posts</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ contentStore.blogs.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-accent-600 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.476L3 21l2.476-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Testimonials</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ contentStore.testimonials.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-success-600 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ contentStore.approvedTestimonials.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Quick Actions</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              @click="showAddProject = true"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Add Project
            </button>
            <button
              @click="showAddBlog = true"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Add Blog Post
            </button>
            <button
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <CogIcon class="h-5 w-5 mr-2" />
              Settings
            </button>
            <button
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <ChartBarIcon class="h-5 w-5 mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Projects -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Projects</h2>
          </div>
          <div class="p-6">
            <div v-if="contentStore.projects.length > 0" class="space-y-4">
              <div
                v-for="project in contentStore.projects.slice(0, 5)"
                :key="project.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ project.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ project.description?.substring(0, 60) }}...</p>
                </div>
                <div class="flex space-x-2">
                  <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">Edit</button>
                  <button class="text-error-600 hover:text-error-700 text-sm font-medium">Delete</button>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">No projects yet</p>
            </div>
          </div>
        </div>

        <!-- Pending Testimonials -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Pending Testimonials</h2>
          </div>
          <div class="p-6">
            <div v-if="pendingTestimonials.length > 0" class="space-y-4">
              <div
                v-for="testimonial in pendingTestimonials"
                :key="testimonial.id"
                class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ testimonial.name }}</h3>
                  <div class="flex space-x-2">
                    <button
                      @click="approveTestimonial(testimonial.id)"
                      class="text-success-600 hover:text-success-700 text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      @click="deleteTestimonial(testimonial.id)"
                      class="text-error-600 hover:text-error-700 text-sm font-medium"
                    >
                      Reject
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.position }}</p>
                <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">{{ testimonial.content }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">No pending testimonials</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PlusIcon, CogIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
import { useContentStore } from '../stores/content'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'

const contentStore = useContentStore()
const uiStore = useUIStore()

const showAddProject = ref(false)
const showAddBlog = ref(false)

const pendingTestimonials = computed(() => 
  contentStore.testimonials.filter(t => !t.approved)
)

const approveTestimonial = async (id) => {
  const success = await contentStore.updateTestimonial(id, { approved: true })
  if (success) {
    uiStore.addNotification({
      type: 'success',
      title: 'Testimonial Approved',
      message: 'The testimonial has been approved and is now visible.'
    })
  }
}

const deleteTestimonial = async (id) => {
  if (confirm('Are you sure you want to delete this testimonial?')) {
    const success = await contentStore.deleteTestimonial(id)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Testimonial Deleted',
        message: 'The testimonial has been deleted.'
      })
    }
  }
}

onMounted(() => {
  contentStore.fetchProjects()
  contentStore.fetchBlogs()
  contentStore.fetchTestimonials()
})
</script>