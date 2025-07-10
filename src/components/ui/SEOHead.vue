<template>
  <div></div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: 'Susant Swain - WordPress Developer & Accessibility Engineer'
  },
  description: {
    type: String,
    default: 'WordPress Developer & Accessibility Engineer specializing in creating inclusive digital experiences for the visually impaired community.'
  },
  keywords: {
    type: String,
    default: 'WordPress developer, accessibility engineer, WCAG compliance, screen reader optimization, inclusive design'
  },
  image: {
    type: String,
    default: 'https://susantswain.com/og-image.jpg'
  },
  type: {
    type: String,
    default: 'website'
  }
})

const route = useRoute()

const updateMeta = () => {
  // Update title
  document.title = props.title

  // Update or create meta tags
  const updateMetaTag = (name, content, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    let meta = document.querySelector(selector)
    
    if (!meta) {
      meta = document.createElement('meta')
      if (property) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      document.head.appendChild(meta)
    }
    
    meta.setAttribute('content', content)
  }

  // Basic meta tags
  updateMetaTag('description', props.description)
  updateMetaTag('keywords', props.keywords)

  // Open Graph tags
  updateMetaTag('og:title', props.title, true)
  updateMetaTag('og:description', props.description, true)
  updateMetaTag('og:image', props.image, true)
  updateMetaTag('og:url', window.location.href, true)
  updateMetaTag('og:type', props.type, true)

  // Twitter tags
  updateMetaTag('twitter:title', props.title, true)
  updateMetaTag('twitter:description', props.description, true)
  updateMetaTag('twitter:image', props.image, true)
  updateMetaTag('twitter:url', window.location.href, true)

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', window.location.href)
}

onMounted(() => {
  updateMeta()
})

watch(() => [props.title, props.description, props.keywords, props.image, route.path], () => {
  updateMeta()
})
</script>