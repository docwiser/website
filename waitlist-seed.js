import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWmtoaRx-_UD6DdvPU6OhSfiGYISyTzSI",
  authDomain: "susant-swain.firebaseapp.com",
  projectId: "susant-swain",
  storageBucket: "susant-swain.firebasestorage.app",
  messagingSenderId: "1029642583050",
  appId: "1:1029642583050:web:181556d2597148289e73f3",
  measurementId: "G-2L9SFK6TBZ",
  databaseURL: "https://susant-swain-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample waitlist services
const sampleWaitlistServices = [
  {
    name: "WordPress Accessibility Audit",
    slug: "wordpress-accessibility-audit",
    description: "Comprehensive accessibility evaluation of your WordPress website with detailed remediation plan and WCAG 2.1 AA compliance report.",
    estimatedLaunch: new Date('2024-02-15'),
    active: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "Custom Accessibility Plugin Development",
    slug: "custom-accessibility-plugin",
    description: "Bespoke WordPress plugin development to add specific accessibility features tailored to your website's unique needs.",
    estimatedLaunch: new Date('2024-03-01'),
    active: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "Screen Reader Optimization Service",
    slug: "screen-reader-optimization",
    description: "Specialized service to optimize your website for screen readers including NVDA, JAWS, and VoiceOver compatibility testing.",
    estimatedLaunch: new Date('2024-02-28'),
    active: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "Accessibility Training Workshop",
    slug: "accessibility-training-workshop",
    description: "Comprehensive training program for your development team on accessibility best practices, WCAG guidelines, and inclusive design principles.",
    estimatedLaunch: new Date('2024-04-01'),
    active: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "Mobile App Accessibility Consulting",
    slug: "mobile-app-accessibility",
    description: "Expert consultation for making your iOS and Android applications accessible, including voice control and assistive technology support.",
    estimatedLaunch: new Date('2024-05-15'),
    active: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "E-commerce Accessibility Package",
    slug: "ecommerce-accessibility-package",
    description: "Complete accessibility solution for WooCommerce and other e-commerce platforms, ensuring your online store is accessible to all customers.",
    estimatedLaunch: new Date('2024-03-15'),
    active: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
]

// Sample waitlist entries
const sampleWaitlistEntries = [
  {
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp Solutions",
    interest: "We need to make our corporate website WCAG compliant for legal requirements and better user experience.",
    budget: "5000-10000",
    timeline: "3-months",
    updates: true,
    serviceId: "service-1", // This will be updated with actual service IDs
    serviceName: "WordPress Accessibility Audit",
    serviceSlug: "wordpress-accessibility-audit",
    status: "pending",
    createdAt: Timestamp.now()
  },
  {
    name: "Sarah Johnson",
    email: "sarah@designstudio.com",
    company: "Creative Design Studio",
    interest: "Looking to add accessibility features to our client websites. Need custom solutions for unique design requirements.",
    budget: "10000-25000",
    timeline: "1-month",
    updates: true,
    serviceId: "service-2",
    serviceName: "Custom Accessibility Plugin Development",
    serviceSlug: "custom-accessibility-plugin",
    status: "contacted",
    createdAt: Timestamp.now()
  },
  {
    name: "Michael Chen",
    email: "m.chen@nonprofit.org",
    company: "Community Nonprofit Organization",
    interest: "Our website serves visually impaired community members. We want to ensure it works perfectly with screen readers.",
    budget: "1000-5000",
    timeline: "6-months",
    updates: false,
    serviceId: "service-3",
    serviceName: "Screen Reader Optimization Service",
    serviceSlug: "screen-reader-optimization",
    status: "pending",
    createdAt: Timestamp.now()
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@startup.io",
    company: "InnovateTech Startup",
    interest: "We're building a new SaaS platform and want to ensure accessibility is built in from the ground up. Need team training.",
    budget: "25000-plus",
    timeline: "asap",
    updates: true,
    serviceId: "service-4",
    serviceName: "Accessibility Training Workshop",
    serviceSlug: "accessibility-training-workshop",
    status: "converted",
    createdAt: Timestamp.now()
  },
  {
    name: "David Wilson",
    email: "david@ecommerce-store.com",
    company: "Wilson's Online Store",
    interest: "Our WooCommerce store needs to be accessible to comply with ADA requirements and serve all customers effectively.",
    budget: "5000-10000",
    timeline: "3-months",
    updates: true,
    serviceId: "service-6",
    serviceName: "E-commerce Accessibility Package",
    serviceSlug: "ecommerce-accessibility-package",
    status: "pending",
    createdAt: Timestamp.now()
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@university.edu",
    company: "State University",
    interest: "University website needs comprehensive accessibility audit to ensure compliance with Section 508 and serve our diverse student body.",
    budget: "10000-25000",
    timeline: "6-months",
    updates: true,
    serviceId: "service-1",
    serviceName: "WordPress Accessibility Audit",
    serviceSlug: "wordpress-accessibility-audit",
    status: "contacted",
    createdAt: Timestamp.now()
  },
  {
    name: "Robert Kim",
    email: "robert@healthtech.com",
    company: "HealthTech Solutions",
    interest: "Healthcare platform needs to be accessible for patients with disabilities. Critical for our mission of inclusive healthcare.",
    budget: "25000-plus",
    timeline: "1-month",
    updates: true,
    serviceId: "service-2",
    serviceName: "Custom Accessibility Plugin Development",
    serviceSlug: "custom-accessibility-plugin",
    status: "pending",
    createdAt: Timestamp.now()
  },
  {
    name: "Amanda Foster",
    email: "amanda@govagency.gov",
    company: "Government Agency",
    interest: "Government website must meet Section 508 compliance. Need comprehensive audit and remediation services.",
    budget: "10000-25000",
    timeline: "3-months",
    updates: false,
    serviceId: "service-1",
    serviceName: "WordPress Accessibility Audit",
    serviceSlug: "wordpress-accessibility-audit",
    status: "pending",
    createdAt: Timestamp.now()
  }
]

// Seed function
async function seedWaitlistData() {
  console.log('Starting waitlist data seeding...')
  
  try {
    // Seed waitlist services
    console.log('Seeding waitlist services...')
    const serviceIds = []
    
    for (const service of sampleWaitlistServices) {
      const docRef = await addDoc(collection(db, 'waitlist-services'), service)
      serviceIds.push(docRef.id)
      console.log(`Added service: ${service.name} with ID: ${docRef.id}`)
    }
    
    // Update waitlist entries with actual service IDs
    console.log('Seeding waitlist entries...')
    for (let i = 0; i < sampleWaitlistEntries.length; i++) {
      const entry = { ...sampleWaitlistEntries[i] }
      
      // Map service names to actual IDs
      const serviceIndex = sampleWaitlistServices.findIndex(
        service => service.name === entry.serviceName
      )
      
      if (serviceIndex !== -1 && serviceIds[serviceIndex]) {
        entry.serviceId = serviceIds[serviceIndex]
      }
      
      await addDoc(collection(db, 'waitlist-entries'), entry)
      console.log(`Added waitlist entry: ${entry.name}`)
    }
    
    console.log('Waitlist data seeding completed successfully!')
    console.log(`Added ${serviceIds.length} services and ${sampleWaitlistEntries.length} waitlist entries`)
    
  } catch (error) {
    console.error('Error seeding waitlist data:', error)
  }
}

// Run the seeding
seedWaitlistData()