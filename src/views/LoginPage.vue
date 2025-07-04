<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Skip Link -->
    <SkipLink />

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or
          <router-link 
            to="/register"
            class="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
          >
            create a new account
          </router-link>
        </p>
      </div>
    </div>

    <main id="main-content" class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 sm:text-sm"
                :class="{ 'border-error-300 focus:border-error-500 focus:ring-error-500': authStore.error }"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 sm:text-sm"
                :class="{ 'border-error-300 focus:border-error-500 focus:ring-error-500': authStore.error }"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div v-if="authStore.error" class="rounded-md bg-error-50 dark:bg-error-900 p-4" role="alert">
            <div class="flex">
              <div class="flex-shrink-0">
                <ExclamationCircleIcon class="h-5 w-5 text-error-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-error-800 dark:text-error-200">
                  Sign in failed
                </h3>
                <div class="mt-2 text-sm text-error-700 dark:text-error-300">
                  <p>{{ authStore.error }}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LoadingSpinner v-if="authStore.loading" size="small" class="mr-2" />
              <span v-if="authStore.loading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-6">
              <button
                @click="handleGoogleLogin"
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <svg class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  authStore.clearError()
  
  if (!form.value.email || !form.value.password) {
    uiStore.addNotification({
      type: 'error',
      title: 'Validation Error',
      message: 'Please fill in all fields.'
    })
    return
  }

  const success = await authStore.login(form.value.email, form.value.password)
  
  if (success) {
    uiStore.addNotification({
      type: 'success',
      title: 'Welcome back!',
      message: 'You have been successfully signed in.'
    })
    
    // Redirect based on role
    if (authStore.isAdmin) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }
}

const handleGoogleLogin = async () => {
  authStore.clearError()
  const success = await authStore.loginWithGoogle()
  
  if (success) {
    uiStore.addNotification({
      type: 'success',
      title: 'Welcome!',
      message: 'You have been successfully signed in with Google.'
    })
  }
}

onMounted(() => {
  authStore.clearError()
})
</script>