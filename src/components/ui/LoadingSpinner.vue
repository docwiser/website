<template>
  <div 
    class="flex items-center justify-center"
    :class="containerClass"
    role="status"
    :aria-label="ariaLabel"
  >
    <div 
      class="animate-spin rounded-full border-2 border-gray-300 border-t-primary-600"
      :class="sizeClass"
    >
      <span class="sr-only">{{ loadingText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  fullHeight: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'h-4 w-4'
    case 'large':
      return 'h-12 w-12'
    default:
      return 'h-8 w-8'
  }
})

const containerClass = computed(() => {
  return props.fullHeight ? 'min-h-screen' : 'py-8'
})

const ariaLabel = computed(() => props.loadingText)
</script>