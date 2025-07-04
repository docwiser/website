import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  updateProfile
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userRole = ref('public')
  const userPermissions = ref([])
  const loading = ref(true)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => userRole.value === 'admin')
  const isViewer = computed(() => userRole.value === 'viewer')
  const isEditor = computed(() => userRole.value === 'editor')

  const hasPermission = (permission) => {
    return userPermissions.value.includes(permission) || isAdmin.value
  }

  const initializeAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        await fetchUserRole(firebaseUser.uid)
      } else {
        user.value = null
        userRole.value = 'public'
        userPermissions.value = []
      }
      loading.value = false
    })
  }

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        userRole.value = userData.role || 'public'
        userPermissions.value = userData.permissions || []
      } else {
        // Create default user document
        const defaultUserData = {
          email: user.value.email,
          displayName: user.value.displayName || '',
          role: 'public',
          permissions: [],
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
        
        await setDoc(doc(db, 'users', uid), defaultUserData)
        userRole.value = 'public'
        userPermissions.value = []
      }
    } catch (err) {
      console.error('Error fetching user role:', err)
      userRole.value = 'public'
      userPermissions.value = []
    }
  }

  const login = async (email, password) => {
    try {
      error.value = ''
      loading.value = true
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Update last login
      await updateDoc(doc(db, 'users', result.user.uid), {
        lastLogin: new Date().toISOString()
      })
      
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (email, password, displayName = '') => {
    try {
      error.value = ''
      loading.value = true
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with display name
      if (displayName) {
        await updateProfile(newUser, { displayName })
      }
      
      // Create user document with default role
      await setDoc(doc(db, 'users', newUser.uid), {
        email: newUser.email,
        displayName: displayName,
        role: 'public',
        permissions: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
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
      userPermissions.value = []
      return true
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  const updateUserProfile = async (profileData) => {
    try {
      if (!user.value) return false
      
      // Update Firebase Auth profile
      if (profileData.displayName) {
        await updateProfile(user.value, { displayName: profileData.displayName })
      }
      
      // Update Firestore document
      await updateDoc(doc(db, 'users', user.value.uid), {
        ...profileData,
        updatedAt: new Date().toISOString()
      })
      
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
    userPermissions,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isViewer,
    isEditor,
    hasPermission,
    initializeAuth,
    login,
    register,
    loginWithGoogle,
    logout,
    updateUserProfile,
    clearError
  }
})