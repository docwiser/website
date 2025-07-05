<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            System Settings
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Configure system-wide settings and preferences
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- General Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">General Settings</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="siteName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Name
              </label>
              <input
                id="siteName"
                v-model="settings.siteName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label for="siteDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Description
              </label>
              <input
                id="siteDescription"
                v-model="settings.siteDescription"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label for="contactEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Email
              </label>
              <input
                id="contactEmail"
                v-model="settings.contactEmail"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label for="timezone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                id="timezone"
                v-model="settings.timezone"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="UTC">UTC</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Security Settings</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-gray-700 dark:text-gray-300 font-medium">
                  Require Email Verification
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Users must verify their email before accessing the system
                </p>
              </div>
              <button 
                @click="toggleSetting('emailVerification')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="settings.emailVerification ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle email verification</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="settings.emailVerification ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label class="text-gray-700 dark:text-gray-300 font-medium">
                  Two-Factor Authentication
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enable 2FA for enhanced security
                </p>
              </div>
              <button 
                @click="toggleSetting('twoFactorAuth')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="settings.twoFactorAuth ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle two-factor authentication</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div>
              <label for="sessionTimeout" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                id="sessionTimeout"
                v-model="settings.sessionTimeout"
                type="number"
                min="5"
                max="1440"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Email Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Email Settings</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="smtpHost" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SMTP Host
              </label>
              <input
                id="smtpHost"
                v-model="settings.smtpHost"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label for="smtpPort" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SMTP Port
              </label>
              <input
                id="smtpPort"
                v-model="settings.smtpPort"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label for="smtpUsername" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SMTP Username
              </label>
              <input
                id="smtpUsername"
                v-model="settings.smtpUsername"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label for="smtpPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SMTP Password
              </label>
              <input
                id="smtpPassword"
                v-model="settings.smtpPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Accessibility Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Accessibility Settings</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-gray-700 dark:text-gray-300 font-medium">
                  Force High Contrast Mode
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enable high contrast mode for all users
                </p>
              </div>
              <button 
                @click="toggleSetting('forceHighContrast')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="settings.forceHighContrast ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle force high contrast</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="settings.forceHighContrast ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label class="text-gray-700 dark:text-gray-300 font-medium">
                  Enable Screen Reader Announcements
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Provide audio feedback for screen reader users
                </p>
              </div>
              <button 
                @click="toggleSetting('screenReaderAnnouncements')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="settings.screenReaderAnnouncements ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle screen reader announcements</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="settings.screenReaderAnnouncements ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div>
              <label for="defaultFontSize" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Font Size
              </label>
              <select
                id="defaultFontSize"
                v-model="settings.defaultFontSize"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="small">Small</option>
                <option value="normal">Normal</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          @click="saveSettings"
          :disabled="loading"
          class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="loading">Saving...</span>
          <span v-else>Save Settings</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUIStore } from '../../stores/ui'
import SkipLink from '../../components/ui/SkipLink.vue'

const uiStore = useUIStore()
const loading = ref(false)

const settings = ref({
  siteName: 'Susant Swain Portfolio',
  siteDescription: 'WordPress Developer & Accessibility Engineer',
  contactEmail: 'info@susantswain.com',
  timezone: 'Asia/Kolkata',
  emailVerification: true,
  twoFactorAuth: false,
  sessionTimeout: 60,
  smtpHost: '',
  smtpPort: 587,
  smtpUsername: '',
  smtpPassword: '',
  forceHighContrast: false,
  screenReaderAnnouncements: true,
  defaultFontSize: 'normal'
})

const toggleSetting = (settingName) => {
  settings.value[settingName] = !settings.value[settingName]
}

const saveSettings = async () => {
  loading.value = true
  
  try {
    // Simulate saving settings
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    uiStore.addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'System settings have been successfully updated.'
    })
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Save Failed',
      message: 'There was an error saving the settings.'
    })
  } finally {
    loading.value = false
  }
}
</script>