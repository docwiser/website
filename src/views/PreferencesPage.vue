<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Preferences</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Customize your experience and accessibility settings
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <!-- Accessibility Preferences -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Accessibility Preferences
          </h2>
          
          <div class="space-y-6">
            <!-- Theme Settings -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Theme Settings
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-gray-700 dark:text-gray-300 font-medium">
                      Dark Mode
                    </label>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Use dark theme to reduce eye strain
                    </p>
                  </div>
                  <button 
                    @click="uiStore.toggleDarkMode"
                    type="button"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    :class="uiStore.darkMode ? 'bg-primary-600' : 'bg-gray-200'"
                  >
                    <span class="sr-only">Toggle dark mode</span>
                    <span 
                      class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                      :class="uiStore.darkMode ? 'translate-x-6' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-gray-700 dark:text-gray-300 font-medium">
                      High Contrast
                    </label>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <button 
                    @click="uiStore.toggleHighContrast"
                    type="button"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    :class="uiStore.highContrast ? 'bg-primary-600' : 'bg-gray-200'"
                  >
                    <span class="sr-only">Toggle high contrast</span>
                    <span 
                      class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                      :class="uiStore.highContrast ? 'translate-x-6' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Font Settings -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Font Settings
              </h3>
              <div>
                <label for="font-size" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                  Font Size
                </label>
                <select 
                  id="font-size"
                  v-model="uiStore.fontSize"
                  @change="uiStore.setFontSize($event.target.value)"
                  class="w-full border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="small">Small</option>
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>
            </div>

            <!-- Audio Settings -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Audio Settings
              </h3>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-gray-700 dark:text-gray-300 font-medium">
                    Speech Synthesis
                  </label>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Enable text-to-speech functionality
                  </p>
                </div>
                <button 
                  @click="uiStore.toggleSpeech"
                  type="button"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  :class="uiStore.speechEnabled ? 'bg-primary-600' : 'bg-gray-200'"
                >
                  <span class="sr-only">Toggle speech synthesis</span>
                  <span 
                    class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                    :class="uiStore.speechEnabled ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Preferences -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Content Preferences
          </h2>
          
          <div class="space-y-4">
            <div>
              <label for="language" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                Language
              </label>
              <select 
                id="language"
                v-model="preferences.language"
                class="w-full border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label for="timezone" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                Timezone
              </label>
              <select 
                id="timezone"
                v-model="preferences.timezone"
                class="w-full border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="UTC">UTC</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
              </select>
            </div>

            <div>
              <label for="dateFormat" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                Date Format
              </label>
              <select 
                id="dateFormat"
                v-model="preferences.dateFormat"
                class="w-full border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notification Preferences -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Notification Preferences
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-gray-700 dark:text-gray-300 font-medium">
                  Browser Notifications
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Show notifications in your browser
                </p>
              </div>
              <button 
                @click="toggleNotificationPreference('browser')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="notificationPreferences.browser ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle browser notifications</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="notificationPreferences.browser ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label class="text-gray-700 dark:text-gray-300 font-medium">
                  Sound Notifications
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Play sound for notifications
                </p>
              </div>
              <button 
                @click="toggleNotificationPreference('sound')"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="notificationPreferences.sound ? 'bg-primary-600' : 'bg-gray-200'"
              >
                <span class="sr-only">Toggle sound notifications</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="notificationPreferences.sound ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            @click="savePreferences"
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'

const uiStore = useUIStore()

const preferences = ref({
  language: 'en',
  timezone: 'Asia/Kolkata',
  dateFormat: 'DD/MM/YYYY'
})

const notificationPreferences = ref({
  browser: true,
  sound: false
})

const toggleNotificationPreference = (preference) => {
  notificationPreferences.value[preference] = !notificationPreferences.value[preference]
}

const savePreferences = () => {
  uiStore.addNotification({
    type: 'success',
    title: 'Preferences Saved',
    message: 'Your preferences have been successfully saved.'
  })
}
</script>