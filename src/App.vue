<template>
  <div id="app" :class="[uiStore.theme, uiStore.fontSizeClass]">
    <ProgressBar />
    <TheHeader />
    <router-view />
    <TheFooter />
    <NotificationToast />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useUIStore } from './stores/ui'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import NotificationToast from './components/ui/NotificationToast.vue'

import ProgressBar from './components/ui/ProgressBar.vue'
const authStore = useAuthStore()
const uiStore = useUIStore()

onMounted(() => {
  authStore.initializeAuth()
  uiStore.initializeTheme()
})
</script>

<style>
@import './style.css';

/* High contrast mode styles */
.high-contrast {
  --tw-text-opacity: 1;
  color: #000 !important;
}

.high-contrast .dark {
  --tw-text-opacity: 1;
  color: #fff !important;
}

.high-contrast button,
.high-contrast input,
.high-contrast textarea {
  border: 2px solid #000 !important;
}

.high-contrast .dark button,
.high-contrast .dark input,
.high-contrast .dark textarea {
  border: 2px solid #fff !important;
}

/* Font size adjustments */
.font-small {
  font-size: 0.875rem;
}

.font-normal {
  font-size: 1rem;
}

.font-large {
  font-size: 1.125rem;
}

.font-extra-large {
  font-size: 1.25rem;
}

/* Focus styles for better accessibility */
*:focus {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 2px !important;
}

/* Skip link styles */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: absolute;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>