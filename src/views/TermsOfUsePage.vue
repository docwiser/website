<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Terms and conditions for using our website and services
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

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using this website (susantswain.com), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Susant Swain's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by Susant Swain at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The materials on Susant Swain's website are provided on an 'as is' basis. Susant Swain makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, Susant Swain does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Susant Swain or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Susant Swain's website, even if Susant Swain or a Susant Swain authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            The materials appearing on Susant Swain's website could include technical, typographical, or photographic errors. Susant Swain does not warrant that any of the materials on its website are accurate, complete, or current. Susant Swain may make changes to the materials contained on its website at any time without notice. However, Susant Swain does not make any commitment to update the materials.
          </p>

          <h2>Links</h2>
          <p>
            Susant Swain has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Susant Swain of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>User Content</h2>
          <p>
            By submitting content to our website (including but not limited to comments, testimonials, contact forms), you grant Susant Swain a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display such content. You represent and warrant that:
          </p>
          <ul>
            <li>You own or have the necessary rights to the content you submit</li>
            <li>Your content does not violate any third-party rights</li>
            <li>Your content is not defamatory, obscene, or otherwise objectionable</li>
            <li>Your content does not contain viruses or other harmful code</li>
          </ul>

          <h2>Prohibited Uses</h2>
          <p>You may not use our website:</p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>For any obscene or immoral purpose</li>
            <li>To interfere with or circumvent the security features of our website</li>
          </ul>

          <h2>Services</h2>
          <p>
            Information about our web development and accessibility consulting services is provided for informational purposes only. We reserve the right to modify, suspend, or discontinue any service at any time without notice. Specific terms for professional services will be outlined in separate service agreements.
          </p>

          <h2>Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
          </p>

          <h2>Accessibility</h2>
          <p>
            We are committed to ensuring that our website is accessible to people with disabilities. If you experience any difficulty accessing any part of this website, please contact us for assistance.
          </p>

          <h2>Modifications</h2>
          <p>
            Susant Swain may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms of Use, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> info@susantswain.com</li>
            <li><strong>Phone:</strong> +91 7064068258</li>
            <li><strong>Website:</strong> susantswain.com</li>
          </ul>
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