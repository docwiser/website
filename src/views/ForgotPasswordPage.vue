<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Reset Password</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div v-if="!emailSent">
            <form @submit.prevent="handleForgotPassword" class="space-y-6">
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
                <button
                  type="submit"
                  :disabled="loading || !email"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <LoadingSpinner v-if="loading" size="small" class="mr-2" />
                  <span v-if="loading">Sending reset link...</span>
                  <span v-else>Send Reset Link</span>
                </button>
              </div>

              <div class="text-center">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?
                  <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                    Sign in
                  </router-link>
                </p>
              </div>
            </form>
          </div>

          <!-- Success Message -->
          <div v-else class="text-center">
            <div class="mb-6">
              <CheckCircleIcon class="mx-auto h-16 w-16 text-success-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Check Your Email
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a password reset link to <strong>{{ email }}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            <div class="space-y-4">
              <button
                @click="resendEmail"
                :disabled="resendLoading || resendCooldown > 0"
                class="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <LoadingSpinner v-if="resendLoading" size="small" class="mr-2" />
                <span v-if="resendLoading">Resending...</span>
                <span v-else-if="resendCooldown > 0">Resend in {{ resendCooldown }}s</span>
                <span v-else>Resend Email</span>
              </button>
              
              <router-link
                to="/login"
                class="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-center"
              >
                Back to Sign In
              </router-link>
            </div>
          </div>
        </div>

        <!-- Help Text -->
        <div class="mt-8 text-center">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Didn't receive the email?
            </h3>
            <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>• Check your spam or junk folder</p>
              <p>• Make sure you entered the correct email address</p>
              <p>• The email may take a few minutes to arrive</p>
              <p>• Contact support if you continue having issues</p>
            </div>
            <div class="mt-4">
              <a
                href="mailto:info@susantswain.com"
                class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useUIStore } from '../stores/ui'
import SkipLink from '../components/ui/SkipLink.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const uiStore = useUIStore()

const email = ref('')
const loading = ref(false)
const emailSent = ref(false)
const resendLoading = ref(false)
const resendCooldown = ref(0)

let cooldownInterval = null

const handleForgotPassword = async () => {
  if (!email.value) {
    uiStore.addNotification({
      type: 'error',
      title: 'Validation Error',
      message: 'Please enter your email address.'
    })
    return
  }

  loading.value = true

  try {
    await sendPasswordResetEmail(auth, email.value, {
      url: window.location.origin + '/login',
      handleCodeInApp: false
    })

    emailSent.value = true
    uiStore.addNotification({
      type: 'success',
      title: 'Reset Link Sent',
      message: 'Password reset link has been sent to your email.'
    })
  } catch (error) {
    console.error('Password reset error:', error)
    
    let errorMessage = 'Failed to send reset email. Please try again.'
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email address.'
        break
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.'
        break
      case 'auth/too-many-requests':
        errorMessage = 'Too many requests. Please try again later.'
        break
    }

    uiStore.addNotification({
      type: 'error',
      title: 'Reset Failed',
      message: errorMessage
    })
  } finally {
    loading.value = false
  }
}

const resendEmail = async () => {
  if (resendCooldown.value > 0) return

  resendLoading.value = true

  try {
    await sendPasswordResetEmail(auth, email.value, {
      url: window.location.origin + '/login',
      handleCodeInApp: false
    })

    uiStore.addNotification({
      type: 'success',
      title: 'Email Resent',
      message: 'Password reset link has been sent again.'
    })

    // Start cooldown
    resendCooldown.value = 60
    cooldownInterval = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(cooldownInterval)
      }
    }, 1000)

  } catch (error) {
    console.error('Resend error:', error)
    uiStore.addNotification({
      type: 'error',
      title: 'Resend Failed',
      message: 'Failed to resend email. Please try again.'
    })
  } finally {
    resendLoading.value = false
  }
}

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }
})
</script>