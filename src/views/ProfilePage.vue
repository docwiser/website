<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">My Profile</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Manage your personal information and preferences
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <!-- Profile Header -->
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div class="flex items-center">
              <div class="h-16 w-16 rounded-full bg-primary-600 flex items-center justify-center">
                <span class="text-white text-2xl font-bold">
                  {{ (authStore.user?.displayName || authStore.user?.email || 'U').charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="ml-4">
                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {{ authStore.user?.displayName || 'User' }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ authStore.user?.email }}
                </p>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {{ authStore.userRole }}
                </span>
              </div>
            </div>
          </div>

          <!-- Profile Form -->
          <div class="p-6">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="displayName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    v-model="form.displayName"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    id="email"
                    :value="authStore.user?.email"
                    type="email"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    v-model="form.bio"
                    rows="4"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>

                <div>
                  <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Website
                  </label>
                  <input
                    id="website"
                    v-model="form.website"
                    type="url"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span v-if="loading">Updating...</span>
                  <span v-else>Update Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Account Information -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Account Information
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {{ formatDate(authStore.user?.metadata?.creationTime) }}
              </dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Sign In</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {{ formatDate(authStore.user?.metadata?.lastSignInTime) }}
              </dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {{ authStore.userRole }}
              </dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verified</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {{ authStore.user?.emailVerified ? 'Yes' : 'No' }}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'

const authStore = useAuthStore()
const uiStore = useUIStore()
const loading = ref(false)

const form = ref({
  displayName: '',
  bio: '',
  website: ''
})

const updateProfile = async () => {
  loading.value = true
  
  try {
    const success = await authStore.updateUserProfile(form.value)
    
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.'
      })
    } else {
      uiStore.addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'There was an error updating your profile.'
      })
    }
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Update Failed',
      message: 'There was an error updating your profile.'
    })
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    displayName: authStore.user?.displayName || '',
    bio: '',
    website: ''
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  resetForm()
})
</script>