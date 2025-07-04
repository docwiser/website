import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import { getDatabase, ref, set } from 'firebase/database'

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
const rtdb = getDatabase(app)

// Sample data
const sampleProjects = [
  {
    title: "Accessible WordPress E-commerce Site",
    description: "A fully accessible WooCommerce store with WCAG 2.1 AA compliance, screen reader optimization, and keyboard navigation support.",
    technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript", "CSS", "ARIA"],
    image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600",
    liveUrl: "https://example-store.com",
    githubUrl: "https://github.com/susantswain/accessible-woocommerce",
    featured: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Screen Reader Friendly Blog Platform",
    description: "A custom WordPress theme designed specifically for visually impaired users with enhanced navigation and content structure.",
    technologies: ["WordPress", "PHP", "JavaScript", "SCSS", "ARIA", "JSON-LD"],
    image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600",
    liveUrl: "https://accessible-blog.com",
    githubUrl: "https://github.com/susantswain/screen-reader-blog",
    featured: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Vue.js Accessibility Dashboard",
    description: "A comprehensive dashboard for managing accessibility features including contrast adjustment, font sizing, and voice controls.",
    technologies: ["Vue.js", "JavaScript", "TailwindCSS", "Firebase", "Web Speech API"],
    image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600",
    liveUrl: "https://a11y-dashboard.com",
    githubUrl: "https://github.com/susantswain/vue-a11y-dashboard",
    featured: true,
    createdAt: Timestamp.now()
  },
  {
    title: "WordPress Accessibility Plugin",
    description: "A comprehensive plugin that adds accessibility features to any WordPress site including skip links, focus management, and color contrast tools.",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600",
    liveUrl: "https://wordpress.org/plugins/accessibility-helper",
    githubUrl: "https://github.com/susantswain/wp-accessibility-plugin",
    featured: false,
    createdAt: Timestamp.now()
  }
]

const sampleBlogs = [
  {
    title: "The Complete Guide to WordPress Accessibility",
    excerpt: "Learn how to make your WordPress site fully accessible with practical tips and best practices.",
    content: `# The Complete Guide to WordPress Accessibility

Making your WordPress site accessible is not just about compliance—it's about creating an inclusive experience for all users. In this comprehensive guide, I'll walk you through everything you need to know about WordPress accessibility.

## Why Accessibility Matters

Web accessibility ensures that people with disabilities can use your website effectively. This includes users who are blind or visually impaired, deaf or hard of hearing, or have mobility or cognitive disabilities.

## Key Accessibility Principles

1. **Perceivable**: Information must be presentable in ways users can perceive
2. **Operable**: Interface components must be operable by all users
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough to work with various assistive technologies

## WordPress Accessibility Best Practices

### 1. Choose an Accessible Theme
Start with a theme that's built with accessibility in mind. Look for themes that mention WCAG compliance or accessibility features.

### 2. Use Proper Heading Structure
Use heading tags (H1, H2, H3, etc.) in a logical order to create a clear content hierarchy.

### 3. Add Alt Text to Images
Always provide descriptive alt text for images that convey important information.

### 4. Ensure Keyboard Navigation
Test your site using only a keyboard to ensure all interactive elements are accessible.

### 5. Use Sufficient Color Contrast
Ensure there's enough contrast between text and background colors.

## Tools for Testing Accessibility

- **WAVE**: Web accessibility evaluation tool
- **axe DevTools**: Browser extension for accessibility testing
- **Color Contrast Analyzers**: Tools to check color contrast ratios
- **Screen Readers**: NVDA, JAWS, or VoiceOver for testing

## Conclusion

Creating an accessible WordPress site is an ongoing process, but it's essential for reaching all users and providing an inclusive experience. Start with these basics and gradually implement more advanced accessibility features.`,
    tags: ["WordPress", "Accessibility", "WCAG", "Web Development"],
    published: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Screen Reader Testing: A Developer's Guide",
    excerpt: "Learn how to test your websites with screen readers to ensure they're truly accessible to visually impaired users.",
    content: `# Screen Reader Testing: A Developer's Guide

Screen readers are essential tools for visually impaired users to navigate the web. As developers, understanding how to test with screen readers is crucial for creating truly accessible websites.

## What Are Screen Readers?

Screen readers are assistive technology software that reads digital text aloud and provides navigation shortcuts for users who are blind or have low vision.

## Popular Screen Readers

### NVDA (Windows)
- Free and open-source
- Widely used by the blind community
- Great for development testing

### JAWS (Windows)
- Most popular commercial screen reader
- Extensive features and customization
- Industry standard for testing

### VoiceOver (macOS/iOS)
- Built into Apple devices
- Easy to access for Mac users
- Good for mobile testing

## Testing Best Practices

### 1. Learn Basic Commands
Each screen reader has different commands. Learn the basics:
- Navigation shortcuts
- Heading navigation
- Link lists
- Form controls

### 2. Test Without Looking
Turn off your monitor or close your eyes while testing to truly understand the user experience.

### 3. Focus on Content Structure
Ensure your content makes sense when read linearly by a screen reader.

### 4. Test Form Interactions
Forms can be particularly challenging for screen reader users. Test all form elements thoroughly.

## Common Issues to Look For

- Missing or inappropriate heading structure
- Images without alt text
- Forms without proper labels
- Poor focus management
- Inaccessible custom components

## Getting Started

1. Download NVDA (free) or enable VoiceOver on Mac
2. Learn basic navigation commands
3. Test your site with eyes closed
4. Fix issues as you find them
5. Make testing part of your development process

Regular screen reader testing will dramatically improve your site's accessibility and user experience for visually impaired users.`,
    tags: ["Screen Readers", "Testing", "Accessibility", "NVDA", "JAWS", "VoiceOver"],
    published: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Building Accessible Vue.js Applications",
    excerpt: "Best practices for creating accessible Vue.js applications with proper ARIA usage and keyboard navigation.",
    content: `# Building Accessible Vue.js Applications

Vue.js is a powerful framework for building interactive web applications, but creating accessible Vue apps requires careful attention to detail. This guide covers the essential techniques for building inclusive Vue applications.

## Core Accessibility Principles in Vue

### 1. Semantic HTML First
Always start with semantic HTML elements before adding Vue functionality:

\`\`\`vue
<template>
  <main id="main-content">
    <section>
      <h1>Page Title</h1>
      <nav aria-label="Main navigation">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </section>
  </main>
</template>
\`\`\`

### 2. Focus Management
Manage focus when navigating between routes or showing/hiding content:

\`\`\`vue
<script setup>
import { ref, nextTick } from 'vue'

const showModal = ref(false)
const modalRef = ref(null)

const openModal = async () => {
  showModal.value = true
  await nextTick()
  modalRef.value.focus()
}
</script>
\`\`\`

### 3. ARIA Attributes
Use ARIA attributes to enhance accessibility:

\`\`\`vue
<template>
  <button 
    @click="toggleMenu"
    :aria-expanded="isMenuOpen"
    aria-haspopup="true"
    aria-controls="menu"
  >
    Menu
  </button>
  
  <ul 
    id="menu" 
    :aria-hidden="!isMenuOpen"
    role="menu"
  >
    <li role="menuitem">Item 1</li>
    <li role="menuitem">Item 2</li>
  </ul>
</template>
\`\`\`

## Accessibility Testing in Vue

### 1. Vue Accessibility Plugin
Install the vue-axe plugin for development:

\`\`\`bash
npm install --save-dev vue-axe
\`\`\`

### 2. Testing with Vue Test Utils
Write tests that check for accessibility:

\`\`\`javascript
import { mount } from '@vue/test-utils'
import Component from '@/components/Component.vue'

test('has proper aria-label', () => {
  const wrapper = mount(Component)
  expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog')
})
\`\`\`

## Common Vue Accessibility Patterns

### Skip Links
\`\`\`vue
<template>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
</template>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
</style>
\`\`\`

### Live Regions
\`\`\`vue
<template>
  <div aria-live="polite" aria-atomic="true">
    {{ statusMessage }}
  </div>
</template>
\`\`\`

## Conclusion

Building accessible Vue applications requires planning and attention to detail, but the result is applications that work for everyone. Start with semantic HTML, manage focus properly, and test with assistive technologies.`,
    tags: ["Vue.js", "Accessibility", "ARIA", "JavaScript", "Frontend"],
    published: true,
    createdAt: Timestamp.now()
  }
]

const sampleTestimonials = [
  {
    name: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    content: "Susant's expertise in accessibility transformed our website. Our visually impaired users now have a seamless experience, and we've seen a 40% increase in engagement from users with disabilities.",
    approved: true,
    createdAt: Timestamp.now()
  },
  {
    name: "Michael Chen",
    position: "Founder of StartupXYZ",
    content: "Working with Susant was a game-changer for our WordPress site. His attention to detail and deep understanding of accessibility standards helped us achieve WCAG 2.1 AA compliance without sacrificing design.",
    approved: true,
    createdAt: Timestamp.now()
  },
  {
    name: "Lisa Rodriguez",
    position: "UX Designer at DesignStudio",
    content: "Susant's insights into accessible design have been invaluable. He doesn't just implement accessibility features—he educates the entire team on why they matter and how to maintain them.",
    approved: true,
    createdAt: Timestamp.now()
  },
  {
    name: "David Thompson",
    position: "CTO at E-commerce Plus",
    content: "Our e-commerce site needed to be accessible for all users. Susant delivered a solution that not only met accessibility standards but also improved our overall user experience and SEO rankings.",
    approved: true,
    createdAt: Timestamp.now()
  }
]

const sampleTimeline = [
  {
    year: "2024",
    title: "Senior Accessibility Engineer",
    organization: "Tech Solutions Inc.",
    description: "Leading accessibility initiatives across multiple client projects, focusing on WCAG 2.1 AA compliance and inclusive design practices."
  },
  {
    year: "2023",
    title: "WordPress Accessibility Specialist",
    organization: "WebDev Agency",
    description: "Specialized in making WordPress sites accessible, developed custom accessibility plugins, and provided training to development teams."
  },
  {
    year: "2022",
    title: "Frontend Developer",
    organization: "Innovation Labs",
    description: "Focused on creating accessible React and Vue.js applications with emphasis on screen reader compatibility and keyboard navigation."
  },
  {
    year: "2021",
    title: "Web Developer",
    organization: "Digital Creative",
    description: "Developed responsive websites with strong focus on accessibility standards and cross-browser compatibility."
  },
  {
    year: "2020",
    title: "Junior Developer",
    organization: "StartupHub",
    description: "Started my journey in web development with emphasis on learning accessibility best practices from day one."
  }
]

const sampleUserRoles = [
  {
    uid: "admin-user-id",
    email: "admin@susantswain.com",
    role: "admin",
    createdAt: Timestamp.now()
  },
  {
    uid: "viewer-user-id",
    email: "viewer@example.com",
    role: "viewer",
    createdAt: Timestamp.now()
  }
]

// Seed function
async function seedDatabase() {
  console.log('Starting database seeding...')
  
  try {
    // Seed projects
    console.log('Seeding projects...')
    for (const project of sampleProjects) {
      await addDoc(collection(db, 'projects'), project)
    }
    
    // Seed blogs
    console.log('Seeding blogs...')
    for (const blog of sampleBlogs) {
      await addDoc(collection(db, 'blogs'), blog)
    }
    
    // Seed testimonials
    console.log('Seeding testimonials...')
    for (const testimonial of sampleTestimonials) {
      await addDoc(collection(db, 'testimonials'), testimonial)
    }
    
    // Seed timeline
    console.log('Seeding timeline...')
    for (const timelineItem of sampleTimeline) {
      await addDoc(collection(db, 'timeline'), timelineItem)
    }
    
    // Seed user roles (for testing)
    console.log('Seeding user roles...')
    for (const userRole of sampleUserRoles) {
      await addDoc(collection(db, 'users'), userRole)
    }
    
    // Seed some sample comments in Realtime Database
    console.log('Seeding comments...')
    const sampleComments = {
      'blog-1': {
        'comment-1': {
          author: 'John Doe',
          content: 'Great article! This really helped me understand accessibility better.',
          timestamp: Date.now(),
          approved: true
        },
        'comment-2': {
          author: 'Jane Smith',
          content: 'Thank you for sharing these practical tips. I\'ll implement them right away.',
          timestamp: Date.now(),
          approved: true
        }
      },
      'blog-2': {
        'comment-1': {
          author: 'Alex Johnson',
          content: 'Screen reader testing was intimidating before, but your guide makes it approachable.',
          timestamp: Date.now(),
          approved: true
        }
      }
    }
    
    await set(ref(rtdb, 'comments'), sampleComments)
    
    console.log('Database seeding completed successfully!')
    
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

// Run the seeding
seedDatabase()