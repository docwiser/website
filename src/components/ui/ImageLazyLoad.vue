<template>
  <div 
    ref="imageContainer"
    class="relative overflow-hidden"
    :class="containerClass"
  >
    <!-- Placeholder -->
    <div 
      v-if="!loaded"
      class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
    >
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    </div>

    <!-- Actual Image -->
    <img
      v-if="shouldLoad"
      :src="src"
      :alt="alt"
      :class="imageClass"
      class="transition-opacity duration-300"
      :style="{ opacity: loaded ? 1 : 0 }"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  containerClass: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: 'w-full h-full object-cover'
  },
  threshold: {
    type: Number,
    default: 0.1
  }
})

const emit = defineEmits(['load', 'error'])

const imageContainer = ref(null)
const shouldLoad = ref(false)
const loaded = ref(false)
let observer = null

const onLoad = () => {
  loaded.value = true
  emit('load')
}

const onError = () => {
  emit('error')
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          shouldLoad.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: props.threshold
    }
  )

  if (imageContainer.value) {
    observer.observe(imageContainer.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>