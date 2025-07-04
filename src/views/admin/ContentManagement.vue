<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Content Management
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Manage projects, blog posts, testimonials, and timeline entries
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Content Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8" aria-label="Content sections">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            ]"
          >
            {{ tab.name }}
            <span class="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
              {{ getTabCount(tab.id) }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Projects Tab -->
      <div v-if="activeTab === 'projects'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Projects</h2>
          <button
            @click="showAddProject = true"
            class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Add Project
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="project in contentStore.projects" :key="project.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ project.title }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ project.description?.substring(0, 60) }}...
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="tech in project.technologies?.slice(0, 3)"
                        :key="tech"
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                      >
                        {{ tech }}
                      </span>
                      <span v-if="project.technologies?.length > 3" class="text-xs text-gray-500">
                        +{{ project.technologies.length - 3 }} more
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        project.featured
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      ]"
                    >
                      {{ project.featured ? 'Featured' : 'Regular' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="editProject(project)"
                      class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteProject(project.id)"
                      class="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Blog Posts Tab -->
      <div v-if="activeTab === 'blogs'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Blog Posts</h2>
          <button
            @click="showAddBlog = true"
            class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Add Blog Post
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tags
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="blog in contentStore.blogs" :key="blog.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ blog.title }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ blog.excerpt?.substring(0, 60) }}...
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="tag in blog.tags?.slice(0, 2)"
                        :key="tag"
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200"
                      >
                        {{ tag }}
                      </span>
                      <span v-if="blog.tags?.length > 2" class="text-xs text-gray-500">
                        +{{ blog.tags.length - 2 }} more
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        blog.published
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                          : 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                      ]"
                    >
                      {{ blog.published ? 'Published' : 'Draft' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="editBlog(blog)"
                      class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteBlog(blog.id)"
                      class="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Testimonials Tab -->
      <div v-if="activeTab === 'testimonials'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Testimonials</h2>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="testimonial in contentStore.testimonials" :key="testimonial.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ testimonial.name }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-gray-100">
                      {{ testimonial.position }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        testimonial.approved
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                          : 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                      ]"
                    >
                      {{ testimonial.approved ? 'Approved' : 'Pending' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      v-if="!testimonial.approved"
                      @click="approveTestimonial(testimonial.id)"
                      class="text-success-600 hover:text-success-900 dark:text-success-400 dark:hover:text-success-300 mr-4"
                    >
                      Approve
                    </button>
                    <button
                      @click="deleteTestimonial(testimonial.id)"
                      class="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Timeline Tab -->
      <div v-if="activeTab === 'timeline'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Timeline</h2>
          <button
            @click="showAddTimeline = true"
            class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Add Timeline Entry
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Organization
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="item in contentStore.timeline" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ item.year }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ item.title }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-gray-100">
                      {{ item.organization }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="editTimeline(item)"
                      class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteTimeline(item.id)"
                      class="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '../../stores/content'
import { useUIStore } from '../../stores/ui'
import SkipLink from '../../components/ui/SkipLink.vue'

const contentStore = useContentStore()
const uiStore = useUIStore()

const activeTab = ref('projects')
const showAddProject = ref(false)
const showAddBlog = ref(false)
const showAddTimeline = ref(false)

const tabs = [
  { id: 'projects', name: 'Projects' },
  { id: 'blogs', name: 'Blog Posts' },
  { id: 'testimonials', name: 'Testimonials' },
  { id: 'timeline', name: 'Timeline' }
]

const getTabCount = (tabId) => {
  switch (tabId) {
    case 'projects':
      return contentStore.projects.length
    case 'blogs':
      return contentStore.blogs.length
    case 'testimonials':
      return contentStore.testimonials.length
    case 'timeline':
      return contentStore.timeline.length
    default:
      return 0
  }
}

const editProject = (project) => {
  // TODO: Implement edit functionality
  console.log('Edit project:', project)
}

const deleteProject = async (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    const success = await contentStore.deleteProject(id)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Project Deleted',
        message: 'The project has been successfully deleted.'
      })
    }
  }
}

const editBlog = (blog) => {
  // TODO: Implement edit functionality
  console.log('Edit blog:', blog)
}

const deleteBlog = async (id) => {
  if (confirm('Are you sure you want to delete this blog post?')) {
    const success = await contentStore.deleteBlog(id)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Blog Post Deleted',
        message: 'The blog post has been successfully deleted.'
      })
    }
  }
}

const approveTestimonial = async (id) => {
  const success = await contentStore.updateTestimonial(id, { approved: true })
  if (success) {
    uiStore.addNotification({
      type: 'success',
      title: 'Testimonial Approved',
      message: 'The testimonial has been approved and is now visible.'
    })
  }
}

const deleteTestimonial = async (id) => {
  if (confirm('Are you sure you want to delete this testimonial?')) {
    const success = await contentStore.deleteTestimonial(id)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Testimonial Deleted',
        message: 'The testimonial has been successfully deleted.'
      })
    }
  }
}

const editTimeline = (item) => {
  // TODO: Implement edit functionality
  console.log('Edit timeline:', item)
}

const deleteTimeline = async (id) => {
  if (confirm('Are you sure you want to delete this timeline entry?')) {
    // TODO: Implement timeline deletion in store
    console.log('Delete timeline:', id)
  }
}

onMounted(() => {
  contentStore.fetchProjects()
  contentStore.fetchBlogs()
  contentStore.fetchTestimonials()
  contentStore.fetchTimeline()
})
</script>