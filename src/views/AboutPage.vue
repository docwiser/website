<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Learn about my journey, expertise, and passion for accessible web development
          </p>
          <div class="mt-8">
            <button
              @click="speakContent"
              class="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 mr-4"
              :disabled="!uiStore.speechEnabled"
            >
              <span v-if="uiStore.speechEnabled">🔊 Read Aloud</span>
              <span v-else>🔊 Enable Speech in Settings</span>
            </button>
            <a
              href="/resume.pdf"
              download
              class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <!-- Biography Section -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">My Story</h2>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Welcome! I'm Susant Swain, a passionate WordPress developer and software engineer with a mission to make the web more accessible for everyone. My journey began with a simple belief: technology should serve all people, regardless of their abilities.
            </p>
            
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Throughout my career, I've specialized in creating digital experiences that are not only beautiful and functional but also fully accessible to users with disabilities. I have extensive experience working with screen readers, keyboard navigation, and other assistive technologies.
            </p>
            
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
              My expertise spans modern web technologies including WordPress, React, Vue.js, and accessibility standards like WCAG 2.1 AA. I believe that accessibility is not just a compliance requirement—it's an opportunity to create better experiences for everyone.
            </p>
            
            <p class="text-lg text-gray-700 dark:text-gray-300">
              When I'm not coding, you'll find me contributing to open-source accessibility projects, speaking at conferences about inclusive design, or mentoring other developers on best practices for accessible web development.
            </p>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Technical Skills
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="skill in skills"
              :key="skill.category"
              class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {{ skill.category }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="item in skill.items"
                  :key="item"
                  class="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 mr-3" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline Section -->
      <section class="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          Professional Timeline
        </h2>
        
        <div v-if="contentStore.loading" class="flex justify-center">
          <LoadingSpinner />
        </div>
        
        <div v-else-if="timeline.length > 0" class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-600"></div>
          
          <div
            v-for="(item, index) in timeline"
            :key="item.id"
            class="relative mb-12"
          >
            <div :class="[
              'flex items-center',
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            ]">
              <div :class="[
                'w-5/12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
                index % 2 === 0 ? 'mr-8' : 'ml-8'
              ]">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {{ item.title }}
                  </h3>
                  <span class="text-sm text-primary-600 font-medium">
                    {{ item.year }}
                  </span>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  {{ item.organization }}
                </p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </div>
            </div>
            
            <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <div class="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">Timeline information will be available soon.</p>
        </div>
      </section>

      <!-- Values Section -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            My Values
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="value in values"
              :key="value.title"
              class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                <component :is="value.icon" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {{ value.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ value.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CheckCircleIcon, HeartIcon, LightBulbIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { useContentStore } from '../stores/content'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const contentStore = useContentStore()
const uiStore = useUIStore()

const timeline = computed(() => contentStore.timeline)

const skills = [
  {
    category: 'Frontend Development',
    items: ['WordPress', 'React', 'Vue.js', 'HTML5/CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Backend Development',
    items: ['PHP', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'Firebase', 'REST APIs']
  },
  {
    category: 'Accessibility',
    items: ['WCAG 2.1 AA', 'Screen Readers', 'Keyboard Navigation', 'ARIA', 'Color Contrast', 'Focus Management']
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Docker', 'AWS', 'Figma', 'JAWS', 'NVDA', 'VoiceOver']
  },
  {
    category: 'WordPress',
    items: ['Custom Themes', 'Plugin Development', 'Gutenberg Blocks', 'WooCommerce', 'Multisite', 'Performance']
  },
  {
    category: 'Soft Skills',
    items: ['User Research', 'Inclusive Design', 'Team Leadership', 'Public Speaking', 'Mentoring', 'Problem Solving']
  }
]

const values = [
  {
    title: 'Accessibility First',
    description: 'I believe that accessibility should be built into every project from the ground up, not added as an afterthought.',
    icon: HeartIcon
  },
  {
    title: 'Innovation',
    description: 'Constantly learning and applying new technologies to solve complex accessibility challenges.',
    icon: LightBulbIcon
  },
  {
    title: 'Community',
    description: 'Giving back to the developer community through open source contributions and knowledge sharing.',
    icon: UsersIcon
  }
]

const speakContent = () => {
  const content = `
    Hello! I'm Susant Swain, a passionate WordPress developer and software engineer with a mission to make the web more accessible for everyone. 
    My journey began with a simple belief: technology should serve all people, regardless of their abilities.
    
    Throughout my career, I've specialized in creating digital experiences that are not only beautiful and functional but also fully accessible to users with disabilities. 
    I have extensive experience working with screen readers, keyboard navigation, and other assistive technologies.
    
    My expertise spans modern web technologies including WordPress, React, Vue.js, and accessibility standards like WCAG 2.1 AA. 
    I believe that accessibility is not just a compliance requirement—it's an opportunity to create better experiences for everyone.
  `
  
  uiStore.speak(content)
}

onMounted(() => {
  contentStore.fetchTimeline()
})
</script>