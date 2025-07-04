<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span class="block">नमस्ते! I'm Susant Swain</span>
              <span class="block text-xl md:text-2xl font-normal text-primary-100 mt-2">
                WordPress Developer & Accessibility Engineer
              </span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
              मैं एक passionate WordPress developer हूं जो विशेष रूप से दृष्टिहीन समुदाय के लिए accessible digital experiences बनाता हूं। मेरा mission है technology को सभी के लिए inclusive बनाना।
            </p>
            <p class="text-lg mb-8 text-primary-200 animate-slide-up">
              With deep expertise in modern web technologies and accessibility standards, I help businesses create websites that truly serve everyone - because every person deserves equal access to information and opportunities online.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-start animate-slide-up">
              <router-link
                to="/contact"
                class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 text-center"
              >
                Let's Work Together
              </router-link>
              <router-link
                to="/projects"
                class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 text-center"
              >
                View My Work
              </router-link>
              <a
                href="/resume.pdf"
                download
                class="bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 text-center"
              >
                Download Resume
              </a>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="/src/assets/photo.png"
                  alt="Susant Swain - WordPress Developer and Accessibility Engineer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                Available for Projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <!-- Personal Story Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            My Journey & Mission
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From a small town in India to creating global impact through accessible technology
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Accessibility Matters to Me
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Growing up in India, I witnessed firsthand how technology barriers can exclude people from opportunities. This experience shaped my passion for creating digital solutions that work for everyone, especially those with visual impairments.
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
              मेरा मानना है कि technology सिर्फ कुछ लोगों के लिए नहीं, बल्कि सभी के लिए होनी चाहिए। Every website I build follows this principle - ensuring that whether you use a screen reader, keyboard navigation, or any assistive technology, you get the same quality experience.
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300">
              Today, I'm proud to have helped hundreds of businesses make their digital presence truly inclusive, creating opportunities for millions of users worldwide.
            </p>
          </div>
          
          <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
            <h3 class="text-2xl font-bold mb-4">What I Bring to Your Project</h3>
            <ul class="space-y-3">
              <li class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                <span>WCAG 2.1 AA Compliance - ensuring legal compliance and best practices</span>
              </li>
              <li class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                <span>Screen Reader Optimization - tested with real users and assistive technologies</span>
              </li>
              <li class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                <span>Keyboard Navigation - complete functionality without a mouse</span>
              </li>
              <li class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                <span>Voice Control Support - compatible with voice navigation software</span>
              </li>
              <li class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                <span>Performance Optimization - fast loading for all users and devices</span>
              </li>
              <li class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                <span>Ongoing Support - because accessibility is a journey, not a destination</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Featured Projects -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Featured Projects
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real-world solutions that make a difference in people's lives
            </p>
          </div>
          
          <div v-if="contentStore.loading" class="flex justify-center">
            <LoadingSpinner />
          </div>
          
          <div v-else-if="featuredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="project in featuredProjects.slice(0, 3)"
              :key="project.id"
              class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div v-if="project.image" class="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <p class="text-gray-600 dark:text-gray-400">Featured projects will be showcased here soon.</p>
          </div>
          
          <div class="text-center mt-12">
            <router-link
              to="/projects"
              class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Explore All Projects
            </router-link>
          </div>
        </div>
      </section>

      <!-- Services & Expertise -->
      <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How I Can Help Your Business
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive accessibility solutions that expand your reach and ensure compliance
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div class="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-4">
              <component :is="service.icon" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ service.description }}
            </p>
            <ul class="text-sm text-gray-500 dark:text-gray-500 space-y-1">
              <li v-for="feature in service.features" :key="feature" class="flex items-center">
                <CheckCircleIcon class="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Recent Blog Posts -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Latest Insights & Tips
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Practical advice on accessibility, WordPress development, and inclusive design
            </p>
          </div>
          
          <div v-if="recentBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="blog in recentBlogs.slice(0, 3)"
              :key="blog.id"
              class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
            <p class="text-gray-600 dark:text-gray-400">Insightful blog posts coming soon.</p>
          </div>
          
          <div class="text-center mt-12">
            <router-link
              to="/blog"
              class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Read All Articles
            </router-link>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Clients Say About Working With Me
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from businesses that have transformed their digital accessibility
          </p>
        </div>
        
        <div v-if="approvedTestimonials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testimonial in approvedTestimonials.slice(0, 3)"
            :key="testimonial.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
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
            <blockquote class="text-gray-700 dark:text-gray-300 italic">
              "{{ testimonial.content }}"
            </blockquote>
            <div class="mt-4 flex">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">Client testimonials will be featured here soon.</p>
        </div>
        
        <div class="text-center mt-12">
          <router-link
            to="/testimonials"
            class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            View All Testimonials
          </router-link>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make Your Website Accessible to Everyone?
          </h2>
          <p class="text-xl mb-8 text-primary-100">
            Let's discuss how we can expand your reach, ensure compliance, and create better experiences for all your users.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/contact"
              class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Start Your Project
            </router-link>
            <a
              href="tel:+917064068258"
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Call Now: +91 7064068258
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CheckCircleIcon, CalendarIcon, CodeBracketIcon, EyeIcon, DevicePhoneMobileIcon, CogIcon, AcademicCapIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { useContentStore } from '../stores/content'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const contentStore = useContentStore()

const featuredProjects = computed(() => contentStore.featuredProjects)
const recentBlogs = computed(() => contentStore.publishedBlogs)
const approvedTestimonials = computed(() => contentStore.approvedTestimonials)

const services = [
  {
    title: 'WordPress Accessibility Audit',
    description: 'Comprehensive evaluation of your existing website to identify and fix accessibility barriers.',
    icon: EyeIcon,
    features: ['WCAG 2.1 AA compliance check', 'Screen reader testing', 'Keyboard navigation audit', 'Detailed remediation plan']
  },
  {
    title: 'Custom WordPress Development',
    description: 'Build new accessible WordPress websites from scratch with modern design and functionality.',
    icon: CodeBracketIcon,
    features: ['Responsive design', 'SEO optimization', 'Performance optimization', 'Ongoing maintenance']
  },
  {
    title: 'Accessibility Training',
    description: 'Educate your team on accessibility best practices and inclusive design principles.',
    icon: AcademicCapIcon,
    features: ['Team workshops', 'Documentation', 'Best practices guide', 'Ongoing support']
  },
  {
    title: 'Mobile App Accessibility',
    description: 'Ensure your mobile applications are accessible across all platforms and devices.',
    icon: DevicePhoneMobileIcon,
    features: ['iOS & Android testing', 'Voice control support', 'Touch accessibility', 'Platform compliance']
  },
  {
    title: 'Accessibility Consulting',
    description: 'Strategic guidance on implementing accessibility across your entire digital ecosystem.',
    icon: ChatBubbleLeftRightIcon,
    features: ['Strategy development', 'Policy creation', 'Implementation roadmap', 'Compliance guidance']
  },
  {
    title: 'Ongoing Support',
    description: 'Continuous monitoring and maintenance to ensure your website stays accessible.',
    icon: CogIcon,
    features: ['Regular audits', 'Content updates', 'Technical support', 'Performance monitoring']
  }
]

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