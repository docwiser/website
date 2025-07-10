<template>
  <AdminModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit Blog Post' : 'Add New Blog Post'"
    size="xl"
    :loading="loading"
    @close="closeModal"
    @save="saveBlog"
  >
    <form @submit.prevent="saveBlog" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="blog-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            id="blog-title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Enter blog post title"
          />
        </div>

        <div>
          <label for="blog-excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Excerpt *
          </label>
          <input
            id="blog-excerpt"
            v-model="form.excerpt"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Brief description"
          />
        </div>
      </div>

      <div>
        <label for="blog-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content *
        </label>
        <textarea
          id="blog-content"
          v-model="form.content"
          rows="12"
          required
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Write your blog post content here... (Markdown supported)"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Supports Markdown formatting
        </p>
      </div>

      <div>
        <label for="blog-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <input
          id="blog-tags"
          v-model="tagsInput"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter tags separated by commas"
        />
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Separate tags with commas (e.g., JavaScript, React, Tutorial)
        </p>
      </div>

      <div class="flex items-center">
        <input
          id="blog-published"
          v-model="form.published"
          type="checkbox"
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="blog-published" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Publish immediately
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
  blog: {
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
  excerpt: '',
  content: '',
  published: false
})

const tagsInput = ref('')

const isEditing = computed(() => !!props.blog)

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    excerpt: '',
    content: '',
    published: false
  }
  tagsInput.value = ''
}

const saveBlog = async () => {
  loading.value = true
  
  try {
    const blogData = {
      ...form.value,
      tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    let success
    if (isEditing.value) {
      success = await contentStore.updateBlog(props.blog.id, blogData)
    } else {
      success = await contentStore.addBlog(blogData)
    }

    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: isEditing.value ? 'Blog Updated' : 'Blog Created',
        message: `Blog post has been ${isEditing.value ? 'updated' : 'created'} successfully.`
      })
      emit('saved')
      closeModal()
    }
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Save Failed',
      message: 'There was an error saving the blog post.'
    })
  } finally {
    loading.value = false
  }
}

watch(() => props.blog, (newBlog) => {
  if (newBlog) {
    form.value = {
      title: newBlog.title || '',
      excerpt: newBlog.excerpt || '',
      content: newBlog.content || '',
      published: newBlog.published || false
    }
    tagsInput.value = newBlog.tags ? newBlog.tags.join(', ') : ''
  } else {
    resetForm()
  }
}, { immediate: true })
</script>