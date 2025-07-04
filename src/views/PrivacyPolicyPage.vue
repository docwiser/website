<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {{ lastUpdated }}
          </p>

          <h2>Introduction</h2>
          <p>
            Welcome to Susant Swain's portfolio website ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website susantswain.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill out contact forms</li>
            <li>Subscribe to our newsletter</li>
            <li>Submit testimonials</li>
            <li>Create an account on our website</li>
            <li>Engage with our interactive features</li>
          </ul>

          <p>This information may include:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company or organization details</li>
            <li>Project requirements and preferences</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect certain information about your device and usage patterns, including:</p>
          <ul>
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages viewed and time spent on our site</li>
            <li>Date and time of your visit</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Responding to your inquiries and providing customer support</li>
            <li>Processing and fulfilling your requests for services</li>
            <li>Sending you updates about our services and projects</li>
            <li>Improving our website and user experience</li>
            <li>Analyzing website usage and performance</li>
            <li>Complying with legal obligations</li>
            <li>Protecting against fraudulent or illegal activity</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting our business</li>
            <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Note that disabling cookies may affect website functionality.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our website after any modifications constitutes acceptance of the updated Privacy Policy.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> info@susantswain.com</li>
            <li><strong>Phone:</strong> +91 7064068258</li>
            <li><strong>Address:</strong> Available upon request</li>
          </ul>

          <h2>Accessibility</h2>
          <p>
            We are committed to ensuring our Privacy Policy is accessible to all users. If you need this information in an alternative format, please contact us using the information provided above.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SkipLink from '../components/ui/SkipLink.vue'

const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>