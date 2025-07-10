<template>
  <span class="tabular-nums">{{ displayValue }}</span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 2000
  },
  suffix: {
    type: String,
    default: ''
  }
})

const displayValue = ref(0)

const animateCounter = () => {
  const start = 0
  const end = props.value
  const startTime = Date.now()
  
  const updateCounter = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    displayValue.value = Math.floor(start + (end - start) * easeOutQuart)
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      displayValue.value = end
    }
  }
  
  requestAnimationFrame(updateCounter)
}

watch(() => props.value, () => {
  animateCounter()
})

onMounted(() => {
  animateCounter()
})
</script>