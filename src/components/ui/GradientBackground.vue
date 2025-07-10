<template>
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 opacity-90"></div>
    <div class="absolute inset-0">
      <div 
        v-for="(blob, index) in blobs" 
        :key="index"
        class="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        :class="blob.color"
        :style="blob.style"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const blobs = ref([])

const colors = [
  'bg-primary-400',
  'bg-secondary-400',
  'bg-accent-400',
  'bg-purple-400',
  'bg-pink-400'
]

const generateBlobs = () => {
  blobs.value = Array.from({ length: 5 }, (_, index) => ({
    color: colors[index % colors.length],
    style: {
      width: `${Math.random() * 400 + 200}px`,
      height: `${Math.random() * 400 + 200}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${index * 2}s`,
      animationDuration: `${Math.random() * 10 + 20}s`
    }
  }))
}

onMounted(() => {
  generateBlobs()
})
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob infinite;
}
</style>