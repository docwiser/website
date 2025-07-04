<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Explore my portfolio of accessible WordPress solutions and innovative web applications
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filters -->
        <div class="mb-8 flex flex-wrap gap-4 justify-center">
          <button
            @click="selectedTag = ''"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              selectedTag === '' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            All Projects
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="selectedTag = tag"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              selectedTag === tag 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            {{ tag }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div v-if="contentStore.loading" class="flex justify-center">
          <LoadingSpinner />
        </div>
        
        <div v-else-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="project in filteredProjects"
            :key="project.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div v-if="project.image" class="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div v-else class="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span class="text-white text-2xl font-bold">{{ project.title.charAt(0) }}</span>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ project.description }}
              </p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-md text-sm"
                >
                  {{ tech }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="flex space-x-4">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                  >
                    Live Demo
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                  >
                    GitHub
                  </a>
                </div>
                
                <div class="flex items-center">
                  <span v-if="project.featured" class="bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 px-2 py-1 rounded-md text-xs font-medium">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <div v-else class="text-center py-16">
          <div class="mb-4">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No projects found
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ selectedTag ? `No projects found for "${selectedTag}"` : 'No projects available at the moment.' }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '../stores/content'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const contentStore = useContentStore()
const selectedTag = ref('')

const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return contentStore.projects
  }
  
  return contentStore.projects.filter(project => 
    project.technologies && project.technologies.includes(selectedTag.value)
  )
})

const allTags = computed(() => {
  const tags = new Set()
  contentStore.projects.forEach(project => {
    if (project.technologies) {
      project.technologies.forEach(tech => tags.add(tech))
    }
  })
  return Array.from(tags).sort()
})

onMounted(() => {
  contentStore.fetchProjects()
})
</script>