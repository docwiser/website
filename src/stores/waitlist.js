import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  orderBy,
  query,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const useWaitlistStore = defineStore('waitlist', () => {
  const services = ref([])
  const waitlistEntries = ref([])
  const loading = ref(false)
  const error = ref('')

  const activeServices = computed(() => 
    services.value.filter(service => service.active)
  )

  // Services Management
  const fetchServices = () => {
    const q = query(collection(db, 'waitlist-services'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      services.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  }

  const addService = async (serviceData) => {
    try {
      loading.value = true
      await addDoc(collection(db, 'waitlist-services'), {
        ...serviceData,
        active: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const updateService = async (id, serviceData) => {
    try {
      loading.value = true
      await updateDoc(doc(db, 'waitlist-services', id), {
        ...serviceData,
        updatedAt: Timestamp.now()
      })
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteService = async (id) => {
    try {
      loading.value = true
      await deleteDoc(doc(db, 'waitlist-services', id))
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const getServiceBySlug = (slug) => {
    return services.value.find(service => service.slug === slug)
  }

  // Waitlist Entries Management
  const fetchWaitlistEntries = (serviceId = null) => {
    let q
    if (serviceId) {
      q = query(
        collection(db, 'waitlist-entries'), 
        where('serviceId', '==', serviceId),
        orderBy('createdAt', 'desc')
      )
    } else {
      q = query(collection(db, 'waitlist-entries'), orderBy('createdAt', 'desc'))
    }
    
    onSnapshot(q, (snapshot) => {
      waitlistEntries.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  }

  const joinWaitlist = async (entryData) => {
    try {
      loading.value = true
      await addDoc(collection(db, 'waitlist-entries'), {
        ...entryData,
        status: 'pending',
        createdAt: Timestamp.now()
      })
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const updateWaitlistEntry = async (id, entryData) => {
    try {
      loading.value = true
      await updateDoc(doc(db, 'waitlist-entries', id), {
        ...entryData,
        updatedAt: Timestamp.now()
      })
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteWaitlistEntry = async (id) => {
    try {
      loading.value = true
      await deleteDoc(doc(db, 'waitlist-entries', id))
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const getWaitlistStats = (serviceId) => {
    const entries = serviceId 
      ? waitlistEntries.value.filter(entry => entry.serviceId === serviceId)
      : waitlistEntries.value

    return {
      total: entries.length,
      pending: entries.filter(entry => entry.status === 'pending').length,
      contacted: entries.filter(entry => entry.status === 'contacted').length,
      converted: entries.filter(entry => entry.status === 'converted').length
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    services,
    waitlistEntries,
    loading,
    error,
    activeServices,
    fetchServices,
    addService,
    updateService,
    deleteService,
    getServiceBySlug,
    fetchWaitlistEntries,
    joinWaitlist,
    updateWaitlistEntry,
    deleteWaitlistEntry,
    getWaitlistStats,
    clearError
  }
})