<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click="closeModal"
    role="dialog"
    aria-labelledby="accessibility-modal-title"
    aria-modal="true"
  >
    <div
      ref="modalRef"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 id="accessibility-modal-title" class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Accessibility Settings
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
          aria-label="Close accessibility settings"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6 space-y-8">
        <!-- Visual Settings -->
        <section>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <EyeIcon class="h-5 w-5 mr-2" />
            Visual Settings
          </h3>
          
          <div class="space-y-4">
            <!-- Dark Mode -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label for="dark-mode-toggle" class="text-gray-700 dark:text-gray-300 font-medium">
                  Dark Mode
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Reduce eye strain with a dark color scheme
                </p>
              </div>
              <button 
                id="dark-mode-toggle"
                @click="uiStore.toggleDarkMode"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="uiStore.darkMode ? 'bg-primary-600' : 'bg-gray-200'"
                :aria-pressed="uiStore.darkMode"
              >
                <span class="sr-only">Toggle dark mode</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="uiStore.darkMode ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <!-- High Contrast -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label for="high-contrast-toggle" class="text-gray-700 dark:text-gray-300 font-medium">
                  High Contrast
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Increase contrast for better visibility
                </p>
              </div>
              <button 
                id="high-contrast-toggle"
                @click="uiStore.toggleHighContrast"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="uiStore.highContrast ? 'bg-primary-600' : 'bg-gray-200'"
                :aria-pressed="uiStore.highContrast"
              >
                <span class="sr-only">Toggle high contrast</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="uiStore.highContrast ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <!-- Font Size -->
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <label for="font-size-select" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                Font Size
              </label>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Adjust text size for better readability
              </p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  v-for="size in fontSizes"
                  :key="size.value"
                  @click="uiStore.setFontSize(size.value)"
                  :class="[
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                    uiStore.fontSize === size.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                  ]"
                  :aria-pressed="uiStore.fontSize === size.value"
                >
                  {{ size.label }}
                </button>
              </div>
            </div>

            <!-- Text Spacing -->
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <label for="text-spacing" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                Text Spacing
              </label>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Increase spacing between lines and letters
              </p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Normal</span>
                <input
                  id="text-spacing"
                  v-model="textSpacing"
                  @input="updateTextSpacing"
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  class="flex-1 mx-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                <span class="text-sm text-gray-600 dark:text-gray-400">Wide</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Audio Settings -->
        <section>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <SpeakerWaveIcon class="h-5 w-5 mr-2" />
            Audio Settings
          </h3>
          
          <div class="space-y-4">
            <!-- Speech Synthesis -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label for="speech-toggle" class="text-gray-700 dark:text-gray-300 font-medium">
                  Speech Synthesis
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enable text-to-speech functionality
                </p>
              </div>
              <button 
                id="speech-toggle"
                @click="uiStore.toggleSpeech"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="uiStore.speechEnabled ? 'bg-primary-600' : 'bg-gray-200'"
                :aria-pressed="uiStore.speechEnabled"
              >
                <span class="sr-only">Toggle speech synthesis</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="uiStore.speechEnabled ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <!-- Speech Rate -->
            <div v-if="uiStore.speechEnabled" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <label for="speech-rate" class="text-gray-700 dark:text-gray-300 font-medium block mb-2">
                Speech Rate
              </label>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Adjust how fast text is spoken
              </p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Slow</span>
                <input
                  id="speech-rate"
                  v-model="speechRate"
                  @input="updateSpeechRate"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  class="flex-1 mx-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                <span class="text-sm text-gray-600 dark:text-gray-400">Fast</span>
              </div>
            </div>

            <!-- Test Speech -->
            <div v-if="uiStore.speechEnabled" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <button
                @click="testSpeech"
                class="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Test Speech
              </button>
            </div>
          </div>
        </section>

        <!-- Navigation Settings -->
        <section>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <CursorArrowRaysIcon class="h-5 w-5 mr-2" />
            Navigation Settings
          </h3>
          
          <div class="space-y-4">
            <!-- Focus Indicators -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label for="focus-indicators" class="text-gray-700 dark:text-gray-300 font-medium">
                  Enhanced Focus Indicators
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Make keyboard focus more visible
                </p>
              </div>
              <button 
                id="focus-indicators"
                @click="toggleFocusIndicators"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="enhancedFocus ? 'bg-primary-600' : 'bg-gray-200'"
                :aria-pressed="enhancedFocus"
              >
                <span class="sr-only">Toggle enhanced focus indicators</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="enhancedFocus ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <!-- Reduced Motion -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label for="reduced-motion" class="text-gray-700 dark:text-gray-300 font-medium">
                  Reduce Motion
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Minimize animations and transitions
                </p>
              </div>
              <button 
                id="reduced-motion"
                @click="toggleReducedMotion"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="reducedMotion ? 'bg-primary-600' : 'bg-gray-200'"
                :aria-pressed="reducedMotion"
              >
                <span class="sr-only">Toggle reduced motion</span>
                <span 
                  class="inline-block h-4 w-4 rounded-full bg-white shadow transform transition"
                  :class="reducedMotion ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </section>

        <!-- Quick Actions -->
        <section>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <BoltIcon class="h-5 w-5 mr-2" />
            Quick Actions
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              @click="resetToDefaults"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <ArrowPathIcon class="h-5 w-5 mr-2" />
              Reset to Defaults
            </button>
            
            <button
              @click="saveSettings"
              class="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <CheckIcon class="h-5 w-5 mr-2" />
              Save Settings
            </button>
          </div>
        </section>

        <!-- Keyboard Shortcuts -->
        <section>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <CommandLineIcon class="h-5 w-5 mr-2" />
            Keyboard Shortcuts
          </h3>
          
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Toggle Dark Mode:</span>
                  <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Alt + D</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Increase Font Size:</span>
                  <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl + +</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Decrease Font Size:</span>
                  <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl + -</kbd>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Skip to Content:</span>
                  <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Tab</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Open This Menu:</span>
                  <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Alt + A</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Close Menu:</span>
                  <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { 
  XMarkIcon, 
  EyeIcon, 
  SpeakerWaveIcon, 
  CursorArrowRaysIcon, 
  BoltIcon, 
  ArrowPathIcon, 
  CheckIcon, 
  CommandLineIcon 
} from '@heroicons/vue/24/outline'
import { useUIStore } from '../../stores/ui'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const uiStore = useUIStore()
const modalRef = ref(null)
const textSpacing = ref(1.5)
const speechRate = ref(1)
const enhancedFocus = ref(false)
const reducedMotion = ref(false)

const fontSizes = [
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: 'normal' },
  { label: 'Large', value: 'large' },
  { label: 'X-Large', value: 'extra-large' }
]

const closeModal = () => {
  emit('close')
}

const updateTextSpacing = () => {
  document.documentElement.style.setProperty('--text-spacing', textSpacing.value)
  localStorage.setItem('textSpacing', textSpacing.value.toString())
}

const updateSpeechRate = () => {
  localStorage.setItem('speechRate', speechRate.value.toString())
}

const toggleFocusIndicators = () => {
  enhancedFocus.value = !enhancedFocus.value
  if (enhancedFocus.value) {
    document.documentElement.classList.add('enhanced-focus')
  } else {
    document.documentElement.classList.remove('enhanced-focus')
  }
  localStorage.setItem('enhancedFocus', enhancedFocus.value.toString())
}

const toggleReducedMotion = () => {
  reducedMotion.value = !reducedMotion.value
  if (reducedMotion.value) {
    document.documentElement.classList.add('reduced-motion')
  } else {
    document.documentElement.classList.remove('reduced-motion')
  }
  localStorage.setItem('reducedMotion', reducedMotion.value.toString())
}

const testSpeech = () => {
  if (uiStore.speechEnabled && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance('This is a test of the speech synthesis feature. The speech rate is currently set to ' + speechRate.value + '.')
    utterance.rate = speechRate.value
    utterance.pitch = 1
    speechSynthesis.speak(utterance)
  }
}

const resetToDefaults = () => {
  // Reset UI store settings
  uiStore.darkMode = false
  uiStore.highContrast = false
  uiStore.fontSize = 'normal'
  uiStore.speechEnabled = false
  
  // Reset local settings
  textSpacing.value = 1.5
  speechRate.value = 1
  enhancedFocus.value = false
  reducedMotion.value = false
  
  // Apply changes
  updateTextSpacing()
  document.documentElement.classList.remove('enhanced-focus', 'reduced-motion')
  
  // Clear localStorage
  localStorage.removeItem('textSpacing')
  localStorage.removeItem('speechRate')
  localStorage.removeItem('enhancedFocus')
  localStorage.removeItem('reducedMotion')
  
  uiStore.addNotification({
    type: 'success',
    title: 'Settings Reset',
    message: 'All accessibility settings have been reset to defaults.'
  })
}

const saveSettings = () => {
  uiStore.addNotification({
    type: 'success',
    title: 'Settings Saved',
    message: 'Your accessibility preferences have been saved.'
  })
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
  
  // Global keyboard shortcuts
  if (event.altKey && event.key === 'd') {
    event.preventDefault()
    uiStore.toggleDarkMode()
  }
  
  if (event.ctrlKey && event.key === '=') {
    event.preventDefault()
    const sizes = ['small', 'normal', 'large', 'extra-large']
    const currentIndex = sizes.indexOf(uiStore.fontSize)
    if (currentIndex < sizes.length - 1) {
      uiStore.setFontSize(sizes[currentIndex + 1])
    }
  }
  
  if (event.ctrlKey && event.key === '-') {
    event.preventDefault()
    const sizes = ['small', 'normal', 'large', 'extra-large']
    const currentIndex = sizes.indexOf(uiStore.fontSize)
    if (currentIndex > 0) {
      uiStore.setFontSize(sizes[currentIndex - 1])
    }
  }
}

const focusModal = async () => {
  await nextTick()
  if (modalRef.value) {
    modalRef.value.focus()
  }
}

// Load saved settings
const loadSettings = () => {
  const savedTextSpacing = localStorage.getItem('textSpacing')
  const savedSpeechRate = localStorage.getItem('speechRate')
  const savedEnhancedFocus = localStorage.getItem('enhancedFocus')
  const savedReducedMotion = localStorage.getItem('reducedMotion')
  
  if (savedTextSpacing) {
    textSpacing.value = parseFloat(savedTextSpacing)
    updateTextSpacing()
  }
  
  if (savedSpeechRate) {
    speechRate.value = parseFloat(savedSpeechRate)
  }
  
  if (savedEnhancedFocus === 'true') {
    enhancedFocus.value = true
    document.documentElement.classList.add('enhanced-focus')
  }
  
  if (savedReducedMotion === 'true') {
    reducedMotion.value = true
    document.documentElement.classList.add('reduced-motion')
  }
}

// Watch for modal opening to manage focus
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    focusModal()
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  loadSettings()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Custom range slider styles */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]:focus::-webkit-slider-thumb {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

input[type="range"]:focus::-moz-range-thumb {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>