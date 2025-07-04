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
                      @click="editUser(user)"
                      class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Edit
                    </button>
                    <button
                      v-if="user.id !== authStore.user?.uid"
                      @click="deleteUser(user)"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  EyeIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../stores/auth'
import { useUIStore } from '../../stores/ui'
import SkipLink from '../../components/ui/SkipLink.vue'

const authStore = useAuthStore()
const uiStore = useUIStore()

const users = ref([])
const searchQuery = ref('')
const roleFilter = ref('')

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

const editUser = (user) => {
  // TODO: Implement user editing
  uiStore.addNotification({
    type: 'info',
    title: 'Feature Coming Soon',
    message: 'User editing functionality will be available soon.'
  })
}

const deleteUser = (user) => {
  if (confirm(`Are you sure you want to delete ${user.displayName || user.email}?`)) {
    // TODO: Implement user deletion
    uiStore.addNotification({
      type: 'info',
      title: 'Feature Coming Soon',
      message: 'User deletion functionality will be available soon.'
    })
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