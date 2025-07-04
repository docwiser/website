<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span class="block">Susant Swain</span>
            <span class="block text-xl md:text-2xl font-normal text-primary-100 mt-2">
              WordPress Developer & Accessibility Engineer
            </span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-100 animate-slide-up">
            Creating inclusive digital experiences that empower the visually impaired community through accessible WordPress solutions and innovative software engineering.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <router-link
              to="/contact"
              class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Hire Me
            </router-link>
            <router-link
              to="/projects"
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              View Projects
            </router-link>
            <a
              href="/resume.pdf"
              download
              class="bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <!-- Featured Projects -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Featured Projects
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore some of my recent work in accessibility-focused development
          </p>
        </div>
        
        <div v-if="contentStore.loading" class="flex justify-center">
          <LoadingSpinner />
        </div>
        
        <div v-else-if="featuredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in featuredProjects.slice(0, 3)"
            :key="project.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div v-if="project.image" class="h-48 bg-gray-200 dark:bg-gray-700">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
              />
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
              <div class="flex space-x-4">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                >
                  Live Demo
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 hover:text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">No featured projects available at the moment.</p>
        </div>
        
        <div class="text-center mt-12">
          <router-link
            to="/projects"
            class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            View All Projects
          </router-link>
        </div>
      </section>

      <!-- About Preview -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                About Me
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                I'm a passionate WordPress developer and software engineer with a special focus on creating accessible digital experiences. My mission is to break down barriers and ensure that technology serves everyone, including those with visual impairments.
              </p>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                With expertise in modern web technologies and accessibility standards, I help businesses create inclusive websites that reach wider audiences and comply with accessibility guidelines.
              </p>
              <router-link
                to="/about"
                class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Learn More About Me
              </router-link>
            </div>
            <div class="relative">
              <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
                <h3 class="text-2xl font-bold mb-4">Accessibility First</h3>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <CheckCircleIcon class="h-5 w-5 mr-3" />
                    <span>WCAG 2.1 AA Compliance</span>
                  </li>
                  <li class="flex items-center">
                    <CheckCircleIcon class="h-5 w-5 mr-3" />
                    <span>Screen Reader Optimization</span>
                  </li>
                  <li class="flex items-center">
                    <CheckCircleIcon class="h-5 w-5 mr-3" />
                    <span>Keyboard Navigation</span>
                  </li>
                  <li class="flex items-center">
                    <CheckCircleIcon class="h-5 w-5 mr-3" />
                    <span>Voice Control Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Blog Posts -->
      <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Latest Blog Posts
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights on accessibility, WordPress development, and inclusive design
          </p>
        </div>
        
        <div v-if="recentBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="blog in recentBlogs.slice(0, 3)"
            :key="blog.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in blog.tags"
                  :key="tag"
                  class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">No blog posts available at the moment.</p>
        </div>
        
        <div class="text-center mt-12">
          <router-link
            to="/blog"
            class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Read All Posts
          </router-link>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              What Clients Say
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from satisfied clients about their experience working with me
            </p>
          </div>
          
          <div v-if="approvedTestimonials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="testimonial in approvedTestimonials.slice(0, 3)"
              :key="testimonial.id"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div class="flex items-center mb-4">
                <div class="flex-shrink-0">
                  <div class="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center">
                    <span class="text-white font-semibold">
                      {{ testimonial.name.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ testimonial.position }}
                  </p>
                </div>
              </div>
              <p class="text-gray-700 dark:text-gray-300 italic">
                "{{ testimonial.content }}"
              </p>
            </div>
          </div>
          
          <div v-else class="text-center py-12">
            <p class="text-gray-600 dark:text-gray-400">No testimonials available at the moment.</p>
          </div>
          
          <div class="text-center mt-12">
            <router-link
              to="/testimonials"
              class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View All Testimonials
            </router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CheckCircleIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import { useContentStore } from '../stores/content'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const contentStore = useContentStore()

const featuredProjects = computed(() => contentStore.featuredProjects)
const recentBlogs = computed(() => contentStore.publishedBlogs)
const approvedTestimonials = computed(() => contentStore.approvedTestimonials)

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
  contentStore.fetchProjects()
  contentStore.fetchBlogs()
  contentStore.fetchTestimonials()
})
</script>