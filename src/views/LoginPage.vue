<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Sign In</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Welcome back! Please sign in to your account.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <!-- Google Sign In Button -->
          <div class="mb-6">
            <button
              @click="handleGoogleLogin"
              :disabled="loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span v-if="loading">Signing in...</span>
              <span v-else>Continue with Google</span>
            </button>
          </div>

          <!-- Divider -->
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with email</span>
            </div>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <ShowPassword
                input-id="password"
                v-model="password"
                name="password"
                autocomplete="current-password"
                :required="true"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300"
                placeholder="Enter your password"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <router-link 
                  to="/forgot-password" 
                  class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
                >
                  Forgot your password?
                </router-link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <LoadingSpinner v-if="loading" size="small" class="mr-2" />
                <span v-if="loading">Signing in...</span>
                <span v-else>Sign in</span>
              </button>
            </div>

            <div class="text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?
                <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Sign up
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import ShowPassword from '../components/ui/ShowPassword.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    uiStore.addNotification({
      type: 'error',
      title: 'Validation Error',
      message: 'Please enter both email and password.'
    })
    return
  }

  loading.value = true
  
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        title: 'Welcome Back!',
        message: 'You have successfully signed in.'
      })
      router.push('/dashboard')
    } else {
      uiStore.addNotification({
        type: 'error',
        title: 'Login Failed',
        message: authStore.error || 'Invalid email or password.'
      })
    }
  } catch (error) {
    console.error('Login failed:', error)
    uiStore.addNotification({
      type: 'error',
      title: 'Login Failed',
      message: 'An error occurred during login. Please try again.'
    })
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  
  try {
    const success = await authStore.loginWithGoogle()
    if (success) {
      // The redirect will handle the rest
      uiStore.addNotification({
        type: 'info',
        title: 'Redirecting...',
        message: 'Redirecting to Google for authentication.'
      })
    } else {
      uiStore.addNotification({
        type: 'error',
        title: 'Google Login Failed',
        message: authStore.error || 'Failed to initiate Google login.'
      })
      loading.value = false
    }
  } catch (error) {
    console.error('Google login failed:', error)
    uiStore.addNotification({
      type: 'error',
      title: 'Google Login Failed',
      message: 'An error occurred during Google login. Please try again.'
    })
    loading.value = false
  }
}

onMounted(async () => {
  // Check for Google redirect result
  try {
    const result = await authStore.handleGoogleRedirectResult()
    if (result) {
      uiStore.addNotification({
        type: 'success',
        title: 'Welcome!',
        message: 'You have successfully signed in with Google.'
      })
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Google redirect result error:', error)
    uiStore.addNotification({
      type: 'error',
      title: 'Authentication Error',
      message: 'There was an error completing your Google sign-in.'
    })
  }
})
</script>