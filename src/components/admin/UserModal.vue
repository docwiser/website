<template>
  <AdminModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit User' : 'Add New User'"
    size="lg"
    :loading="loading"
    @close="closeModal"
    @save="saveUser"
  >
    <form @submit.prevent="saveUser" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Name *
          </label>
          <input
            id="user-name"
            v-model="form.displayName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Enter display name"
          />
        </div>

        <div>
          <label for="user-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            id="user-email"
            v-model="form.email"
            type="email"
            required
            :disabled="isEditing"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 disabled:bg-gray-100 dark:disabled:bg-gray-600"
            placeholder="Enter email address"
          />
          <p v-if="isEditing" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Email cannot be changed for existing users
          </p>
        </div>
      </div>

      <div v-if="!isEditing" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="user-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password *
          </label>
          <input
            id="user-password"
            v-model="form.password"
            type="password"
            :required="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label for="user-confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password *
          </label>
          <input
            id="user-confirm-password"
            v-model="form.confirmPassword"
            type="password"
            :required="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div>
        <label for="user-role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Role *
        </label>
        <select
          id="user-role"
          v-model="form.role"
          required
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="subscriber">Subscriber</option>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Permissions
        </label>
        <div class="space-y-2">
          <div v-for="permission in availablePermissions" :key="permission.value" class="flex items-center">
            <input
              :id="`permission-${permission.value}`"
              v-model="form.permissions"
              :value="permission.value"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label :for="`permission-${permission.value}`" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              {{ permission.label }}
            </label>
          </div>
        </div>
      </div>

      <div v-if="passwordError" class="text-error-600 dark:text-error-400 text-sm">
        {{ passwordError }}
      </div>
    </form>
  </AdminModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useUIStore } from '../../stores/ui'
import AdminModal from '../ui/AdminModal.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'saved'])

const authStore = useAuthStore()
const uiStore = useUIStore()
const loading = ref(false)
const passwordError = ref('')

const form = ref({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'subscriber',
  permissions: []
})

const availablePermissions = [
  { value: 'read_posts', label: 'Read Posts' },
  { value: 'write_posts', label: 'Write Posts' },
  { value: 'edit_posts', label: 'Edit Posts' },
  { value: 'delete_posts', label: 'Delete Posts' },
  { value: 'manage_users', label: 'Manage Users' },
  { value: 'manage_settings', label: 'Manage Settings' }
]

const isEditing = computed(() => !!props.user)

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  form.value = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'subscriber',
    permissions: []
  }
  passwordError.value = ''
}

const validateForm = () => {
  if (!isEditing.value) {
    if (form.value.password !== form.value.confirmPassword) {
      passwordError.value = 'Passwords do not match'
      return false
    }
    if (form.value.password.length < 6) {
      passwordError.value = 'Password must be at least 6 characters long'
      return false
    }
  }
  passwordError.value = ''
  return true
}

const saveUser = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    // This would typically involve creating/updating user in Firebase Auth and Firestore
    // For now, we'll simulate the operation
    await new Promise(resolve => setTimeout(resolve, 1000))

    uiStore.addNotification({
      type: 'success',
      title: isEditing.value ? 'User Updated' : 'User Created',
      message: `User has been ${isEditing.value ? 'updated' : 'created'} successfully.`
    })
    emit('saved')
    closeModal()
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Save Failed',
      message: 'There was an error saving the user.'
    })
  } finally {
    loading.value = false
  }
}

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = {
      displayName: newUser.displayName || '',
      email: newUser.email || '',
      password: '',
      confirmPassword: '',
      role: newUser.role || 'subscriber',
      permissions: newUser.permissions || []
    }
  } else {
    resetForm()
  }
}, { immediate: true })

watch([() => form.value.password, () => form.value.confirmPassword], () => {
  passwordError.value = ''
})
</script>