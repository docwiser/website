<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="text-center"
      >
        <div class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
        </div>
        <div class="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedCounter from './AnimatedCounter.vue'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' }
]
</script>