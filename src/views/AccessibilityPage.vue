<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Accessibility Settings</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Customize your browsing experience with our accessibility features
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Accessibility Controls -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Accessibility Controls
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Visual Settings -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Visual Settings
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label for="dark-mode" class="text-gray-700 dark:text-gray-300">Dark Mode</label>
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
                  <label for="high-contrast" class="text-gray-700 dark:text-gray-300">High Contrast</label>
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
                
                <div>
                  <label for="font-size" class="text-gray-700 dark:text-gray-300 block mb-2">Font Size</label>
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
            </div>

            <!-- Audio Settings -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Audio Settings
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label for="speech" class="text-gray-700 dark:text-gray-300">Speech Synthesis</label>
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
                
                <button
                  @click="testSpeech"
                  :class="[
                    'w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    uiStore.isSpeaking 
                      ? 'bg-error-600 text-white hover:bg-error-700' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  ]"
                  :disabled="!uiStore.speechEnabled"
                >
                  {{ uiStore.isSpeaking ? 'Stop Speech' : 'Test Speech' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Accessibility Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Accessibility Features
          </h2>
          
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p>
              This website is designed with accessibility in mind. Here are the features available to enhance your browsing experience:
            </p>
            
            <h3>Keyboard Navigation</h3>
            <ul>
              <li>Use Tab to navigate through interactive elements</li>
              <li>Use Enter or Space to activate buttons and links</li>
              <li>Use arrow keys to navigate through menus</li>
              <li>Use Escape to close modals and menus</li>
            </ul>
            
            <h3>Screen Reader Support</h3>
            <ul>
              <li>All images have descriptive alt text</li>
              <li>Proper heading structure for easy navigation</li>
              <li>ARIA labels and descriptions where needed</li>
              <li>Skip links to jump to main content</li>
            </ul>
            
            <h3>Visual Accessibility</h3>
            <ul>
              <li>High contrast mode for better visibility</li>
              <li>Adjustable font sizes</li>
              <li>Dark mode to reduce eye strain</li>
              <li>Focus indicators on all interactive elements</li>
            </ul>
            
            <h3>Standards Compliance</h3>
            <p>
              This website follows WCAG 2.1 AA guidelines to ensure accessibility for users with disabilities.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'

const uiStore = useUIStore()

const testSpeech = () => {
  const testText = 'This is a test of the speech synthesis feature. If you can hear this, the feature is working correctly.'
  uiStore.toggleSpeaking(testText)
}
</script>