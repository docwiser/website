<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            User Management
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Manage user accounts, roles, and permissions
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <UsersIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ users.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-secondary-600 rounded-md flex items-center justify-center">
                <ShieldCheckIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ adminCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-accent-600 rounded-md flex items-center justify-center">
                <EyeIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Viewers</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ viewerCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-success-600 rounded-md flex items-center justify-center">
                <ClockIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Today</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ activeToday }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">All Users</h2>
            <div class="flex space-x-3">
              <button
                @click="openUserModal()"
                class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Add User
              </button>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              />
              <select
                v-model="roleFilter"
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span class="text-white font-medium">
                        {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ user.displayName || 'No name' }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRoleBadgeClass(user.role)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(user.lastLogin) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="openUserModal(user)"
                      class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Edit
                    </button>
                    <button
                      v-if="user.id !== authStore.user?.uid"
                      @click="confirmDeleteUser(user)"
                      class="text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <UsersIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No users found</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ searchQuery || roleFilter ? 'Try adjusting your search criteria.' : 'No users have been created yet.' }}
          </p>
        </div>
      </div>
    </main>

    <!-- User Modal -->
    <UserModal
      :is-open="showUserModal"
      :user="selectedUser"
      @close="closeUserModal"
      @saved="handleUserSaved"
    />

    <!-- Delete Confirmation Modal -->
    <AdminModal
      :is-open="showDeleteModal"
      title="Delete User"
      size="sm"
      :show-footer="true"
      save-text="Delete"
      :loading="deleteLoading"
      @close="closeDeleteModal"
      @save="confirmDelete"
    >
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-error-100 dark:bg-error-900 mb-4">
          <ExclamationTriangleIcon class="h-6 w-6 text-error-600 dark:text-error-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Are you sure?
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone. This will permanently delete the user account for
          <strong v-if="deleteUser">"{{ deleteUser.displayName || deleteUser.email }}"</strong>.
        </p>
      </div>
    </AdminModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  EyeIcon, 
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../stores/auth'
import { useUIStore } from '../../stores/ui'
import SkipLink from '../../components/ui/SkipLink.vue'
import AdminModal from '../../components/ui/AdminModal.vue'
import UserModal from '../../components/admin/UserModal.vue'

const authStore = useAuthStore()
const uiStore = useUIStore()

const users = ref([])
const searchQuery = ref('')
const roleFilter = ref('')

// Modal states
const showUserModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref(null)
const deleteUser = ref(null)
const deleteLoading = ref(false)

const adminCount = computed(() => users.value.filter(u => u.role === 'admin').length)
const viewerCount = computed(() => users.value.filter(u => u.role === 'viewer').length)
const activeToday = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return users.value.filter(u => {
    if (!u.lastLogin) return false
    const lastLogin = new Date(u.lastLogin)
    return lastLogin >= today
  }).length
})

const filteredUsers = computed(() => {
  let filtered = users.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      (user.displayName || '').toLowerCase().includes(query) ||
      (user.email || '').toLowerCase().includes(query)
    )
  }
  
  if (roleFilter.value) {
    filtered = filtered.filter(user => user.role === roleFilter.value)
  }
  
  return filtered
})

const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
    case 'viewer':
      return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// User Modal Functions
const openUserModal = (user = null) => {
  selectedUser.value = user
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
}

const handleUserSaved = () => {
  // Refresh users list or handle as needed
  // Modal will close itself and show notification
}

const confirmDeleteUser = (user) => {
  deleteUser.value = user
  showDeleteModal.value = true
}

// Delete Modal Functions
const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteUser.value = null
}

const confirmDelete = async () => {
  if (!deleteUser.value) return

  deleteLoading.value = true
  try {
    // Simulate user deletion
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Remove from local array
    const index = users.value.findIndex(u => u.id === deleteUser.value.id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
    
    uiStore.addNotification({
      type: 'success',
      title: 'User Deleted',
      message: 'The user has been successfully deleted.'
    })
    closeDeleteModal()
  } catch (error) {
    uiStore.addNotification({
      type: 'error',
      title: 'Delete Failed',
      message: 'There was an error deleting the user.'
    })
  } finally {
    deleteLoading.value = false
  }
}

onMounted(() => {
  // TODO: Fetch users from Firestore
  // For now, using mock data
  users.value = [
    {
      id: '1',
      email: 'admin@susantswain.com',
      displayName: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString()
    },
    {
      id: '2',
      email: 'viewer@example.com',
      displayName: 'Viewer User',
      role: 'viewer',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    }
  ]
})
</script>