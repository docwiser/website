import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const darkMode = ref(false)
  const highContrast = ref(false)
  const fontSize = ref('normal')
  const speechEnabled = ref(false)
  const sidebarOpen = ref(false)
  const loading = ref(false)
  const notifications = ref([])
  
  // Advanced speech settings
  const speechSettings = ref({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: null,
    autoStop: true
  })
  
  const isSpeaking = ref(false)
  const currentUtterance = ref(null)

  const theme = computed(() => darkMode.value ? 'dark' : 'light')
  const fontSizeClass = computed(() => {
    switch (fontSize.value) {
      case 'small': return 'text-sm'
      case 'large': return 'text-lg'
      case 'extra-large': return 'text-xl'
      default: return 'text-base'
    }
  })

  const availableVoices = computed(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return speechSynthesis.getVoices()
    }
    return []
  })

  const initializeTheme = () => {
    // Get saved preferences from localStorage
    const savedDarkMode = localStorage.getItem('darkMode')
    const savedHighContrast = localStorage.getItem('highContrast')
    const savedFontSize = localStorage.getItem('fontSize')
    const savedSpeechEnabled = localStorage.getItem('speechEnabled')
    const savedSpeechSettings = localStorage.getItem('speechSettings')

    if (savedDarkMode) {
      darkMode.value = JSON.parse(savedDarkMode)
    } else {
      // Check system preference
      darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    if (savedHighContrast) {
      highContrast.value = JSON.parse(savedHighContrast)
    }

    if (savedFontSize) {
      fontSize.value = savedFontSize
    }

    if (savedSpeechEnabled) {
      speechEnabled.value = JSON.parse(savedSpeechEnabled)
    }

    if (savedSpeechSettings) {
      speechSettings.value = { ...speechSettings.value, ...JSON.parse(savedSpeechSettings) }
    }

    updateTheme()
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
    updateTheme()
  }

  const toggleHighContrast = () => {
    highContrast.value = !highContrast.value
    localStorage.setItem('highContrast', JSON.stringify(highContrast.value))
    updateTheme()
  }

  const setFontSize = (size) => {
    fontSize.value = size
    localStorage.setItem('fontSize', size)
    updateTheme()
  }

  const toggleSpeech = () => {
    speechEnabled.value = !speechEnabled.value
    localStorage.setItem('speechEnabled', JSON.stringify(speechEnabled.value))
    
    if (!speechEnabled.value && isSpeaking.value) {
      stopSpeaking()
    }
  }

  const updateSpeechSettings = (newSettings) => {
    speechSettings.value = { ...speechSettings.value, ...newSettings }
    localStorage.setItem('speechSettings', JSON.stringify(speechSettings.value))
  }

  const updateTheme = () => {
    const html = document.documentElement
    
    if (darkMode.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    if (highContrast.value) {
      html.classList.add('high-contrast')
    } else {
      html.classList.remove('high-contrast')
    }

    html.classList.remove('font-small', 'font-normal', 'font-large', 'font-extra-large')
    html.classList.add(`font-${fontSize.value}`)
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({
      id,
      ...notification,
      timestamp: new Date()
    })

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const speak = (text) => {
    if (!speechEnabled.value || !('speechSynthesis' in window)) return

    // Stop current speech if speaking
    if (isSpeaking.value) {
      stopSpeaking()
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechSettings.value.rate
    utterance.pitch = speechSettings.value.pitch
    utterance.volume = speechSettings.value.volume
    
    if (speechSettings.value.voice) {
      utterance.voice = speechSettings.value.voice
    }

    utterance.onstart = () => {
      isSpeaking.value = true
    }

    utterance.onend = () => {
      isSpeaking.value = false
      currentUtterance.value = null
    }

    utterance.onerror = () => {
      isSpeaking.value = false
      currentUtterance.value = null
    }

    currentUtterance.value = utterance
    speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      isSpeaking.value = false
      currentUtterance.value = null
    }
  }

  const toggleSpeaking = (text) => {
    if (isSpeaking.value) {
      stopSpeaking()
    } else {
      speak(text)
    }
  }

  return {
    darkMode,
    highContrast,
    fontSize,
    speechEnabled,
    speechSettings,
    isSpeaking,
    availableVoices,
    sidebarOpen,
    loading,
    notifications,
    theme,
    fontSizeClass,
    initializeTheme,
    toggleDarkMode,
    toggleHighContrast,
    setFontSize,
    toggleSpeech,
    updateSpeechSettings,
    toggleSidebar,
    addNotification,
    removeNotification,
    speak,
    stopSpeaking,
    toggleSpeaking
  }
})