<template>
  <AdminModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit Project' : 'Add New Project'"
    size="xl"
    :loading="loading"
    @close="closeModal"
    @save="saveProject"
  >
    <form @submit.prevent="saveProject" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="project-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            id="project-title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label for="project-image" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image URL
          </label>
          <input
            id="project-image"
            v-model="form.image"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div>
        <label for="project-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          id="project-description"
          v-model="form.description"
          rows="4"
          required
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Describe your project"
        ></textarea>
      </div>

      <div>
        <label for="project-technologies" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Technologies *
        </label>
        <input
          id="project-technologies"
          v-model="technologiesInput"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter technologies separated by commas"
        />
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Separate technologies with commas (e.g., React, Node.js, MongoDB)
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="project-live-url" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Live URL
          </label>
          <input
            id="project-live-url"
            v-model="form.liveUrl"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label for="project-github-url" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub URL
          </label>
          <input
            id="project-github-url"
            v-model="form.githubUrl"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div class="flex items-center">
        <input
          id="project-featured"
          v-model="form.featured"
          type="checkbox"
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="project-featured" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Featured project
        </label>
      </div>
    </form>
  </AdminModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useContentStore } from '../../stores/content'
import { useUIStore } from '../../stores/ui'
import AdminModal from '../ui/AdminModal.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'saved'])

const contentStore = useContentStore()
const uiStore = useUIStore()
const loading = ref(false)

const form = ref({
  title: '',
  description: '',
  image: '',
  liveUrl: '',
  githubUrl: '',
  featured: false
})

const technologiesInput = ref('')

const isEditing = computed(() => !!props.project)

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  }
  technologiesInput.value = ''
}

const saveProject = async () => {
  loading.value = true
  
  try {
    const projectData = {
      ...form.value,
      technologies: technologiesInput.value.split(',').map(tech => tech.trim()).filter(tech => tech)
    }

    let success
    if (isEditing.value) {
      success = await contentStore.updateProject(props.project.id, projectData)
    } else {
      success = await contentStore.addProject(projectData)
    }

    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: isEditing.value ? 'Project Updated' : 'Project Created',
        message: `Project has been ${isEditing.value ? 'updated' : 'created'} successfully.`
      })
      emit('saved')
      closeModal()
    }
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Save Failed',
      message: 'There was an error saving the project.'
    })
  } finally {
    loading.value = false
  }
}

watch(() => props.project, (newProject) => {
  if (newProject) {
    form.value = {
      title: newProject.title || '',
      description: newProject.description || '',
      image: newProject.image || '',
      liveUrl: newProject.liveUrl || '',
      githubUrl: newProject.githubUrl || '',
      featured: newProject.featured || false
    }
    technologiesInput.value = newProject.technologies ? newProject.technologies.join(', ') : ''
  } else {
    resetForm()
  }
}, { immediate: true })
</script>