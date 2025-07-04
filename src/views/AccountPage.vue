<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Account Settings</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Manage your account security and preferences
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <!-- Change Password -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Change Password
          </h2>
          
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Password
              </label>
              <ShowPassword
                input-id="currentPassword"
                v-model="passwordForm.currentPassword"
                autocomplete="current-password"
                placeholder="Enter current password"
                :required="true"
              />
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <ShowPassword
                input-id="newPassword"
                v-model="passwordForm.newPassword"
                autocomplete="new-password"
                placeholder="Enter new password"
                :required="true"
              />
            </div>

            <div>
              <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <ShowPassword
                input-id="confirmNewPassword"
                v-model="passwordForm.confirmNewPassword"
                autocomplete="new-password"
                placeholder="Confirm new password"
                :required="true"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="passwordLoading || !isPasswordFormValid"
                class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="passwordLoading">Updating...</span>
                <span v-else>Update Password</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Email Preferences -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Email Preferences
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label for="newsletter" class="text-gray-700 dark:text-gray-300 font-medium">
                  Newsletter
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates about new blog posts and projects
                </p>
              </div>
              <button 
                @click="toggleEmailPreference('newsletter')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="emailPreferences.newsletter ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle newsletter</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="emailPreferences.newsletter ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label for="marketing" class="text-gray-700 dark:text-gray-300 font-medium">
                  Marketing Emails
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Receive promotional emails and special offers
                </p>
              </div>
              <button 
                @click="toggleEmailPreference('marketing')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="emailPreferences.marketing ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle marketing emails</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="emailPreferences.marketing ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label for="security" class="text-gray-700 dark:text-gray-300 font-medium">
                  Security Alerts
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications about account security
                </p>
              </div>
              <button 
                @click="toggleEmailPreference('security')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="emailPreferences.security ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle security alerts</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="emailPreferences.security ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Privacy Settings
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label for="profileVisibility" class="text-gray-700 dark:text-gray-300 font-medium">
                  Public Profile
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Make your profile visible to other users
                </p>
              </div>
              <button 
                @click="togglePrivacySetting('profileVisibility')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="privacySettings.profileVisibility ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle profile visibility</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="privacySettings.profileVisibility ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label for="analytics" class="text-gray-700 dark:text-gray-300 font-medium">
                  Analytics
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Allow us to collect anonymous usage data
                </p>
              </div>
              <button 
                @click="togglePrivacySetting('analytics')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="privacySettings.analytics ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle analytics</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="privacySettings.analytics ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-error-500">
          <h2 class="text-xl font-bold text-error-600 dark:text-error-400 mb-6">
            Danger Zone
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-error-50 dark:bg-error-900 rounded-lg">
              <div>
                <h3 class="text-error-800 dark:text-error-200 font-medium">
                  Delete Account
                </h3>
                <p class="text-sm text-error-600 dark:text-error-400">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button
                @click="showDeleteConfirmation = true"
                class="px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirmation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="showDeleteConfirmation = false"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        @click.stop
      >
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Delete Account
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteConfirmation = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteAccount"
            class="px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import ShowPassword from '../components/ui/ShowPassword.vue'

const authStore = useAuthStore()
const uiStore = useUIStore()

const passwordLoading = ref(false)
const showDeleteConfirmation = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const emailPreferences = ref({
  newsletter: true,
  marketing: false,
  security: true
})

const privacySettings = ref({
  profileVisibility: true,
  analytics: true
})

const isPasswordFormValid = computed(() => {
  return passwordForm.value.currentPassword &&
         passwordForm.value.newPassword &&
         passwordForm.value.confirmNewPassword &&
         passwordForm.value.newPassword === passwordForm.value.confirmNewPassword &&
         passwordForm.value.newPassword.length >= 6
})

const changePassword = async () => {
  passwordLoading.value = true
  
  try {
    // Simulate password change
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
    
    uiStore.addNotification({
      type: 'success',
      title: 'Password Updated',
      message: 'Your password has been successfully changed.'
    })
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Update Failed',
      message: 'There was an error updating your password.'
    })
  } finally {
    passwordLoading.value = false
  }
}

const toggleEmailPreference = (preference) => {
  emailPreferences.value[preference] = !emailPreferences.value[preference]
  
  uiStore.addNotification({
    type: 'success',
    title: 'Preferences Updated',
    message: 'Your email preferences have been saved.'
  })
}

const togglePrivacySetting = (setting) => {
  privacySettings.value[setting] = !privacySettings.value[setting]
  
  uiStore.addNotification({
    type: 'success',
    title: 'Settings Updated',
    message: 'Your privacy settings have been saved.'
  })
}

const deleteAccount = async () => {
  try {
    // Simulate account deletion
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    uiStore.addNotification({
      type: 'success',
      title: 'Account Deleted',
      message: 'Your account has been successfully deleted.'
    })
    
    await authStore.logout()
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Deletion Failed',
      message: 'There was an error deleting your account.'
    })
  }
  
  showDeleteConfirmation.value = false
}

onMounted(() => {
  // Load user preferences from backend
})
</script>