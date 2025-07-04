import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userRole = ref('public')
  const loading = ref(true)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => userRole.value === 'admin')
  const isViewer = computed(() => userRole.value === 'viewer')

  const initializeAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        await fetchUserRole(firebaseUser.uid)
      } else {
        user.value = null
        userRole.value = 'public'
      }
      loading.value = false
    })
  }

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        userRole.value = userDoc.data().role || 'public'
      } else {
        // Create default user document
        await setDoc(doc(db, 'users', uid), {
          email: user.value.email,
          role: 'public',
          createdAt: new Date().toISOString()
        })
        userRole.value = 'public'
      }
    } catch (err) {
      console.error('Error fetching user role:', err)
      userRole.value = 'public'
    }
  }

  const login = async (email, password) => {
    try {
      error.value = ''
      loading.value = true
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (email, password) => {
    try {
      error.value = ''
      loading.value = true
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user document with default role
      await setDoc(doc(db, 'users', newUser.uid), {
        email: newUser.email,
        role: 'public',
        createdAt: new Date().toISOString()
      })
      
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const loginWithGoogle = async () => {
    try {
      error.value = ''
      const provider = new GoogleAuthProvider()
      await signInWithRedirect(auth, provider)
      return true
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      userRole.value = 'public'
      return true
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    user,
    userRole,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isViewer,
    initializeAuth,
    login,
    register,
    loginWithGoogle,
    logout,
    clearError
  }
})