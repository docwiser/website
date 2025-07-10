<template>
  <div 
    ref="sectionRef"
    class="relative overflow-hidden"
    :style="{ transform: `translateY(${offset}px)` }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  speed: {
    type: Number,
    default: 0.5
  }
})

const sectionRef = ref(null)
const offset = ref(0)

const updateOffset = () => {
  if (!sectionRef.value) return
  
  const rect = sectionRef.value.getBoundingClientRect()
  const scrolled = window.pageYOffset
  const rate = scrolled * -props.speed
  
  offset.value = rate
}

onMounted(() => {
  window.addEventListener('scroll', updateOffset)
  updateOffset()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateOffset)
})
</script>