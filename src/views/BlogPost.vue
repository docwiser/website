<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div v-if="loading" class="flex justify-center">
        <LoadingSpinner />
      </div>
      
      <article v-else-if="blog" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400">Home</router-link>
            </li>
            <li>/</li>
            <li>
              <router-link to="/blog" class="hover:text-primary-600 dark:hover:text-primary-400">Blog</router-link>
            </li>
            <li>/</li>
            <li class="text-gray-900 dark:text-gray-100">{{ blog.title }}</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <header class="mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {{ blog.title }}
          </h1>
          
          <div class="flex items-center text-gray-600 dark:text-gray-400 mb-6">
            <CalendarIcon class="h-5 w-5 mr-2" />
            <time :datetime="blog.createdAt?.toDate?.()?.toISOString()">
              {{ formatDate(blog.createdAt) }}
            </time>
          </div>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in blog.tags"
              :key="tag"
              class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-md text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>
          
          <div class="flex space-x-4 mb-8">
            <button
              @click="speakContent"
              class="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              :disabled="!uiStore.speechEnabled"
            >
              <span v-if="uiStore.speechEnabled">🔊 Read Aloud</span>
              <span v-else>🔊 Enable Speech in Settings</span>
            </button>
            <button
              @click="sharePost"
              class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Share Post
            </button>
          </div>
        </header>

        <!-- Article Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none mb-12" v-html="renderedContent"></div>

        <!-- Navigation -->
        <nav class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div class="flex justify-between">
            <router-link
              to="/blog"
              class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              ← Back to Blog
            </router-link>
          </div>
        </nav>
      </article>
      
      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Blog Post Not Found
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <router-link
          to="/blog"
          class="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Back to Blog
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CalendarIcon } from '@heroicons/vue/24/outline'
import { marked } from 'marked'
import { useContentStore } from '../stores/content'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const route = useRoute()
const contentStore = useContentStore()
const uiStore = useUIStore()
const loading = ref(true)

// Configure marked options for better security and accessibility
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'heading-',
  sanitize: false, // We trust our own content, but in production you might want to sanitize
  smartLists: true,
  smartypants: true
})

const blog = computed(() => {
  return contentStore.publishedBlogs.find(b => b.id === route.params.id)
})

const renderedContent = computed(() => {
  if (!blog.value?.content) return ''
  
  try {
    // Parse markdown content using marked
    return marked.parse(blog.value.content)
  } catch (error) {
    console.error('Error parsing markdown:', error)
    // Fallback to simple text formatting if markdown parsing fails
    return blog.value.content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
  }
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

const speakContent = () => {
  if (blog.value) {
    // Strip HTML tags for speech synthesis
    const textContent = blog.value.content.replace(/<[^>]*>/g, '')
    const content = `${blog.value.title}. ${textContent}`
    uiStore.speak(content)
  }
}

const sharePost = async () => {
  if (navigator.share && blog.value) {
    try {
      await navigator.share({
        title: blog.value.title,
        text: blog.value.excerpt,
        url: window.location.href
      })
    } catch (err) {
      // Fallback to copying URL
      copyUrl()
    }
  } else {
    copyUrl()
  }
}

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    uiStore.addNotification({
      type: 'success',
      title: 'Link Copied!',
      message: 'Blog post URL copied to clipboard'
    })
  } catch (err) {
    uiStore.addNotification({
      type: 'error',
      title: 'Failed to Copy',
      message: 'Could not copy the URL'
    })
  }
}

onMounted(async () => {
  if (contentStore.publishedBlogs.length === 0) {
    contentStore.fetchBlogs()
  }
  loading.value = false
})
</script>