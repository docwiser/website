<template>
  <div
    v-if="notifications.length > 0"
    class="fixed top-4 right-4 z-50 space-y-2"
    role="region"
    aria-live="polite"
    aria-label="Notifications"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-80 max-w-md"
      :class="getNotificationClass(notification.type)"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component :is="getNotificationIcon(notification.type)" class="h-5 w-5" />
        </div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ notification.title }}
          </p>
          <p v-if="notification.message" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="removeNotification(notification.id)"
            class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            aria-label="Close notification"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useUIStore } from '../../stores/ui'

const uiStore = useUIStore()
const notifications = computed(() => uiStore.notifications)

const getNotificationClass = (type) => {
  switch (type) {
    case 'success':
      return 'border-l-4 border-success-500'
    case 'warning':
      return 'border-l-4 border-warning-500'
    case 'error':
      return 'border-l-4 border-error-500'
    default:
      return 'border-l-4 border-primary-500'
  }
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    case 'error':
      return XCircleIcon
    default:
      return InformationCircleIcon
  }
}

const removeNotification = (id) => {
  uiStore.removeNotification(id)
}
</script>