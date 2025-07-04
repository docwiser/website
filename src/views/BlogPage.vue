<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Insights on accessibility, WordPress development, and inclusive design
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search and Filter -->
        <div class="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div class="relative flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search blog posts..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            />
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedTag = ''"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                selectedTag === '' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              All Posts
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
        </div>

        <!-- Blog Posts Grid -->
        <div v-if="contentStore.loading" class="flex justify-center">
          <LoadingSpinner />
        </div>
        
        <div v-else-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="blog in filteredBlogs"
            :key="blog.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <CalendarIcon class="h-4 w-4 mr-2" />
                <time :datetime="blog.createdAt?.toDate?.()?.toISOString()">
                  {{ formatDate(blog.createdAt) }}
                </time>
              </div>
              
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <router-link
                  :to="`/blog/${blog.id}`"
                  class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                >
                  {{ blog.title }}
                </router-link>
              </h3>
              
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ blog.excerpt }}
              </p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in blog.tags"
                  :key="tag"
                  class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-md text-sm"
                >
                  {{ tag }}
                </span>
              </div>
              
              <router-link
                :to="`/blog/${blog.id}`"
                class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
              >
                Read More
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </router-link>
            </div>
          </article>
        </div>
        
        <div v-else class="text-center py-16">
          <div class="mb-4">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No blog posts found
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ searchQuery || selectedTag ? 'Try adjusting your search or filter criteria.' : 'Blog posts will be available soon.' }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CalendarIcon, MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useContentStore } from '../stores/content'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const contentStore = useContentStore()
const searchQuery = ref('')
const selectedTag = ref('')

const filteredBlogs = computed(() => {
  let blogs = contentStore.publishedBlogs
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    blogs = blogs.filter(blog => 
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query)
    )
  }
  
  if (selectedTag.value) {
    blogs = blogs.filter(blog => 
      blog.tags && blog.tags.includes(selectedTag.value)
    )
  }
  
  return blogs
})

const allTags = computed(() => {
  const tags = new Set()
  contentStore.publishedBlogs.forEach(blog => {
    if (blog.tags) {
      blog.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  contentStore.fetchBlogs()
})
</script>