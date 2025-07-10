<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div class="relative">
      <!-- Main FAB -->
      <button
        @click="toggleMenu"
        class="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        :class="{ 'rotate-45': isOpen }"
        aria-label="Quick actions menu"
        :aria-expanded="isOpen"
      >
        <PlusIcon class="h-6 w-6 transition-transform duration-300" />
      </button>

      <!-- Action Items -->
      <div 
        v-if="isOpen"
        class="absolute bottom-16 right-0 space-y-3"
      >
        <div
          v-for="(action, index) in actions"
          :key="action.label"
          class="flex items-center space-x-3 animate-slide-in-right"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <span class="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-90">
            {{ action.label }}
          </span>
          <button
            @click="action.action"
            class="w-12 h-12 bg-white hover:bg-gray-50 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            :aria-label="action.label"
          >
            <component :is="action.icon" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="closeMenu"
      class="fixed inset-0 bg-black bg-opacity-20 -z-10"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, ArrowUpIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)

const actions = [
  {
    label: 'Contact Me',
    icon: ChatBubbleLeftRightIcon,
    action: () => {
      window.location.href = '/contact'
    }
  },
  {
    label: 'Call Now',
    icon: PhoneIcon,
    action: () => {
      window.location.href = 'tel:+917064068258'
    }
  },
  {
    label: 'Send Email',
    icon: EnvelopeIcon,
    action: () => {
      window.location.href = 'mailto:info@susantswain.com'
    }
  },
  {
    label: 'Back to Top',
    icon: ArrowUpIcon,
    action: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>