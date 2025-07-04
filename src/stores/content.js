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

export const useContentStore = defineStore('content', () => {
  const projects = ref([])
  const blogs = ref([])
  const testimonials = ref([])
  const timeline = ref([])
  const loading = ref(false)
  const error = ref('')

  const publishedBlogs = computed(() => 
    blogs.value.filter(blog => blog.published)
  )

  const approvedTestimonials = computed(() => 
    testimonials.value.filter(testimonial => testimonial.approved)
  )

  const featuredProjects = computed(() => 
    projects.value.filter(project => project.featured)
  )

  // Projects
  const fetchProjects = () => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      projects.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  }

  const addProject = async (projectData) => {
    try {
      loading.value = true
      await addDoc(collection(db, 'projects'), {
        ...projectData,
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

  const updateProject = async (id, projectData) => {
    try {
      loading.value = true
      await updateDoc(doc(db, 'projects', id), {
        ...projectData,
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

  const deleteProject = async (id) => {
    try {
      loading.value = true
      await deleteDoc(doc(db, 'projects', id))
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // Blogs
  const fetchBlogs = () => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      blogs.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  }

  const addBlog = async (blogData) => {
    try {
      loading.value = true
      await addDoc(collection(db, 'blogs'), {
        ...blogData,
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

  const updateBlog = async (id, blogData) => {
    try {
      loading.value = true
      await updateDoc(doc(db, 'blogs', id), {
        ...blogData,
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

  const deleteBlog = async (id) => {
    try {
      loading.value = true
      await deleteDoc(doc(db, 'blogs', id))
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // Testimonials
  const fetchTestimonials = () => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      testimonials.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  }

  const addTestimonial = async (testimonialData) => {
    try {
      loading.value = true
      await addDoc(collection(db, 'testimonials'), {
        ...testimonialData,
        approved: false,
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

  const updateTestimonial = async (id, testimonialData) => {
    try {
      loading.value = true
      await updateDoc(doc(db, 'testimonials', id), {
        ...testimonialData,
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

  const deleteTestimonial = async (id) => {
    try {
      loading.value = true
      await deleteDoc(doc(db, 'testimonials', id))
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // Timeline
  const fetchTimeline = () => {
    const q = query(collection(db, 'timeline'), orderBy('year', 'desc'))
    onSnapshot(q, (snapshot) => {
      timeline.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    projects,
    blogs,
    testimonials,
    timeline,
    loading,
    error,
    publishedBlogs,
    approvedTestimonials,
    featuredProjects,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    fetchBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    fetchTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    fetchTimeline,
    clearError
  }
})