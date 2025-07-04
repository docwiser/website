<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div v-if="loading" class="flex justify-center">
        <LoadingSpinner />
      </div>
      
      <div v-else-if="project" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Project Header -->
        <div class="mb-8">
          <nav class="mb-4" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400">Home</router-link>
              </li>
              <li>/</li>
              <li>
                <router-link to="/projects" class="hover:text-primary-600 dark:hover:text-primary-400">Projects</router-link>
              </li>
              <li>/</li>
              <li class="text-gray-900 dark:text-gray-100">{{ project.title }}</li>
            </ol>
          </nav>
          
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {{ project.title }}
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {{ project.description }}
          </p>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-md text-sm font-medium"
            >
              {{ tech }}
            </span>
          </div>
          
          <div class="flex space-x-4">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View Live Demo
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View Source Code
            </a>
          </div>
        </div>

        <!-- Project Image -->
        <div v-if="project.image" class="mb-8">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <!-- Project Details -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Project Overview</h2>
          <p>{{ project.description }}</p>
          
          <h3>Technologies Used</h3>
          <ul>
            <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
          </ul>
          
          <h3>Key Features</h3>
          <ul>
            <li>Fully accessible design following WCAG 2.1 AA guidelines</li>
            <li>Responsive layout optimized for all devices</li>
            <li>Screen reader compatible with proper ARIA labels</li>
            <li>Keyboard navigation support</li>
            <li>High contrast mode support</li>
          </ul>
        </div>
      </div>
      
      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Project Not Found
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <router-link
          to="/projects"
          class="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Back to Projects
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '../stores/content'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const route = useRoute()
const contentStore = useContentStore()
const loading = ref(true)

const project = computed(() => {
  return contentStore.projects.find(p => p.id === route.params.id)
})

onMounted(async () => {
  if (contentStore.projects.length === 0) {
    contentStore.fetchProjects()
  }
  loading.value = false
})
</script>