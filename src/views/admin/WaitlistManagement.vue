<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Waitlist Management
              </h1>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Manage waitlist services and entries
              </p>
            </div>
            <button
              @click="showAddServiceModal = true"
              class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <PlusIcon class="h-5 w-5 inline mr-2" />
              Add Service
            </button>
          </div>
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
                <ClipboardDocumentListIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ waitlistStore.services.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-success-600 rounded-md flex items-center justify-center">
                <CheckCircleIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Services</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ waitlistStore.activeServices.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-secondary-600 rounded-md flex items-center justify-center">
                <UsersIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Entries</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ waitlistStore.waitlistEntries.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-accent-600 rounded-md flex items-center justify-center">
                <ClockIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ pendingEntries }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Services List -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Waitlist Services</h2>
        </div>
        <div class="p-6">
          <div v-if="waitlistStore.services.length > 0" class="space-y-4">
            <div
              v-for="service in waitlistStore.services"
              :key="service.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div class="flex-1">
                <div class="flex items-center">
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ service.name }}</h3>
                  <span
                    :class="[
                      'ml-2 px-2 py-1 rounded-full text-xs font-medium',
                      service.active 
                        ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    ]"
                  >
                    {{ service.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ service.description }}</p>
                <div class="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Slug: /waitlist/{{ service.slug }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ getServiceStats(service.id).total }} entries</span>
                  <span v-if="service.estimatedLaunch" class="mx-2">•</span>
                  <span v-if="service.estimatedLaunch">Launch: {{ formatDate(service.estimatedLaunch) }}</span>
                </div>
              </div>
              <div class="flex space-x-2 ml-4">
                <button
                  @click="viewServiceEntries(service)"
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Entries
                </button>
                <button
                  @click="editService(service)"
                  class="text-secondary-600 hover:text-secondary-700 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="deleteService(service.id)"
                  class="text-error-600 hover:text-error-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500 dark:text-gray-400">No waitlist services yet</p>
          </div>
        </div>
      </div>

      <!-- Recent Entries -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Waitlist Entries</h2>
        </div>
        <div class="p-6">
          <div v-if="recentEntries.length > 0" class="space-y-4">
            <div
              v-for="entry in recentEntries"
              :key="entry.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div>
                <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ entry.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ entry.email }}</p>
                <div class="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ entry.serviceName }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ formatDate(entry.createdAt) }}</span>
                  <span class="mx-2">•</span>
                  <span :class="getStatusColor(entry.status)">{{ entry.status }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="updateEntryStatus(entry.id, 'contacted')"
                  :disabled="entry.status === 'contacted'"
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium disabled:opacity-50"
                >
                  Mark Contacted
                </button>
                <button
                  @click="updateEntryStatus(entry.id, 'converted')"
                  :disabled="entry.status === 'converted'"
                  class="text-success-600 hover:text-success-700 text-sm font-medium disabled:opacity-50"
                >
                  Mark Converted
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500 dark:text-gray-400">No waitlist entries yet</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Service Modal -->
    <div
      v-if="showAddServiceModal || showEditServiceModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModals"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        @click.stop
      >
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ showAddServiceModal ? 'Add New Service' : 'Edit Service' }}
        </h3>
        
        <form @submit.prevent="saveService" class="space-y-4">
          <div>
            <label for="serviceName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Name *
            </label>
            <input
              id="serviceName"
              v-model="serviceForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          <div>
            <label for="serviceSlug" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Slug *
            </label>
            <input
              id="serviceSlug"
              v-model="serviceForm.slug"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
              placeholder="e.g., accessibility-audit"
            />
          </div>

          <div>
            <label for="serviceDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="serviceDescription"
              v-model="serviceForm.description"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            ></textarea>
          </div>

          <div>
            <label for="estimatedLaunch" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Launch Date
            </label>
            <input
              id="estimatedLaunch"
              v-model="serviceForm.estimatedLaunch"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          <div class="flex items-center">
            <input
              id="serviceActive"
              v-model="serviceForm.active"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="serviceActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Active (accepting new entries)
            </label>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="waitlistStore.loading"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {{ waitlistStore.loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  PlusIcon, 
  ClipboardDocumentListIcon, 
  CheckCircleIcon, 
  UsersIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import { useWaitlistStore } from '../../stores/waitlist'
import { useUIStore } from '../../stores/ui'
import SkipLink from '../../components/ui/SkipLink.vue'

const waitlistStore = useWaitlistStore()
const uiStore = useUIStore()

const showAddServiceModal = ref(false)
const showEditServiceModal = ref(false)
const editingServiceId = ref(null)

const serviceForm = ref({
  name: '',
  slug: '',
  description: '',
  estimatedLaunch: '',
  active: true
})

const pendingEntries = computed(() => {
  return waitlistStore.waitlistEntries.filter(entry => entry.status === 'pending').length
})

const recentEntries = computed(() => {
  return waitlistStore.waitlistEntries.slice(0, 10)
})

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'text-warning-600 dark:text-warning-400'
    case 'contacted':
      return 'text-primary-600 dark:text-primary-400'
    case 'converted':
      return 'text-success-600 dark:text-success-400'
    default:
      return 'text-gray-600 dark:text-gray-400'
  }
}

const getServiceStats = (serviceId) => {
  return waitlistStore.getWaitlistStats(serviceId)
}

const editService = (service) => {
  editingServiceId.value = service.id
  serviceForm.value = {
    name: service.name,
    slug: service.slug,
    description: service.description,
    estimatedLaunch: service.estimatedLaunch ? 
      (service.estimatedLaunch.toDate ? service.estimatedLaunch.toDate() : new Date(service.estimatedLaunch))
        .toISOString().split('T')[0] : '',
    active: service.active
  }
  showEditServiceModal.value = true
}

const saveService = async () => {
  const serviceData = {
    ...serviceForm.value,
    estimatedLaunch: serviceForm.value.estimatedLaunch ? 
      new Date(serviceForm.value.estimatedLaunch) : null
  }

  let success
  if (showEditServiceModal.value) {
    success = await waitlistStore.updateService(editingServiceId.value, serviceData)
  } else {
    success = await waitlistStore.addService(serviceData)
  }

  if (success) {
    uiStore.addNotification({
      type: 'success',
      title: showEditServiceModal.value ? 'Service Updated' : 'Service Added',
      message: `The waitlist service has been ${showEditServiceModal.value ? 'updated' : 'created'} successfully.`
    })
    closeModals()
  }
}

const deleteService = async (id) => {
  if (confirm('Are you sure you want to delete this service? This will also delete all associated waitlist entries.')) {
    const success = await waitlistStore.deleteService(id)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Service Deleted',
        message: 'The waitlist service has been deleted.'
      })
    }
  }
}

const updateEntryStatus = async (entryId, status) => {
  const success = await waitlistStore.updateWaitlistEntry(entryId, { status })
  if (success) {
    uiStore.addNotification({
      type: 'success',
      title: 'Status Updated',
      message: `Entry status updated to ${status}.`
    })
  }
}

const viewServiceEntries = (service) => {
  // This could navigate to a detailed view or open a modal
  console.log('View entries for service:', service.name)
}

const closeModals = () => {
  showAddServiceModal.value = false
  showEditServiceModal.value = false
  editingServiceId.value = null
  serviceForm.value = {
    name: '',
    slug: '',
    description: '',
    estimatedLaunch: '',
    active: true
  }
}

onMounted(() => {
  waitlistStore.fetchServices()
  waitlistStore.fetchWaitlistEntries()
})
</script>