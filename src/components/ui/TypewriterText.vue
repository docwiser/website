<template>
  <span class="relative">
    {{ displayText }}
    <span 
      v-if="showCursor"
      class="animate-pulse text-primary-400"
      aria-hidden="true"
    >|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 100
  },
  showCursor: {
    type: Boolean,
    default: true
  },
  startDelay: {
    type: Number,
    default: 0
  }
})

const displayText = ref('')
let currentIndex = 0
let timeoutId = null

const typeText = () => {
  if (currentIndex < props.text.length) {
    displayText.value += props.text.charAt(currentIndex)
    currentIndex++
    timeoutId = setTimeout(typeText, props.speed)
  }
}

onMounted(() => {
  timeoutId = setTimeout(() => {
    typeText()
  }, props.startDelay)
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>