<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Skip Link -->
    <SkipLink />

    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Copyright Policy</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Intellectual property rights and copyright information
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main-content" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h2>Copyright Notice</h2>
          <p>
            © {{ currentYear }} Susant Swain. All rights reserved. The content, design, graphics, and other materials on this website are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2>Ownership of Content</h2>
          <p>
            Unless otherwise indicated, all content on this website, including but not limited to text, graphics, logos, images, audio clips, video clips, digital downloads, data compilations, and software, is the property of Susant Swain and is protected by Indian and international copyright laws.
          </p>

          <h3>Original Content</h3>
          <p>All original content created by Susant Swain, including:</p>
          <ul>
            <li>Blog posts and articles</li>
            <li>Project descriptions and case studies</li>
            <li>Code examples and tutorials</li>
            <li>Design elements and graphics</li>
            <li>Photography and images (where specified)</li>
          </ul>
          <p>is protected by copyright and may not be reproduced without explicit written permission.</p>

          <h3>Third-Party Content</h3>
          <p>
            Some content on this website may be owned by third parties. This includes but is not limited to:
          </p>
          <ul>
            <li>Stock photography from Pexels and other sources</li>
            <li>Icons and graphics from various providers</li>
            <li>Fonts and typography</li>
            <li>Third-party libraries and frameworks</li>
          </ul>
          <p>
            Such content is used under appropriate licenses and remains the property of their respective owners.
          </p>

          <h2>Permitted Uses</h2>
          <p>You may:</p>
          <ul>
            <li>View and browse the website for personal, non-commercial use</li>
            <li>Print individual pages for personal reference</li>
            <li>Share links to our content on social media</li>
            <li>Quote brief excerpts with proper attribution and linking back to the source</li>
          </ul>

          <h2>Prohibited Uses</h2>
          <p>Without explicit written permission, you may not:</p>
          <ul>
            <li>Reproduce, distribute, or display any content from this website</li>
            <li>Modify, adapt, or create derivative works based on our content</li>
            <li>Use our content for commercial purposes</li>
            <li>Remove or alter any copyright notices or attributions</li>
            <li>Use our content in a way that suggests endorsement or affiliation</li>
            <li>Republish our content on other websites or platforms</li>
          </ul>

          <h2>Fair Use</h2>
          <p>
            Limited use of copyrighted material may be permitted under fair use provisions for purposes such as criticism, comment, news reporting, teaching, scholarship, or research. However, fair use is determined on a case-by-case basis and should be evaluated carefully.
          </p>

          <h2>Open Source and Code</h2>
          <p>
            Some code examples and projects showcased on this website may be available under open source licenses. Where applicable, specific license terms will be clearly indicated. Open source code is subject to the terms of its respective license agreement.
          </p>

          <h2>Trademark Information</h2>
          <p>
            "Susant Swain" and associated logos are trademarks of Susant Swain. Other trademarks, service marks, and trade names mentioned on this website are the property of their respective owners.
          </p>

          <h2>Digital Millennium Copyright Act (DMCA)</h2>
          <p>
            We respect the intellectual property rights of others and expect our users to do the same. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our designated agent with the following information:
          </p>
          <ul>
            <li>A physical or electronic signature of the copyright owner or authorized representative</li>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the material that is claimed to be infringing and its location on our website</li>
            <li>Your contact information (address, telephone number, and email address)</li>
            <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner</li>
            <li>A statement that the information in the notification is accurate and that you are authorized to act on behalf of the copyright owner</li>
          </ul>

          <h2>Permission Requests</h2>
          <p>
            If you would like to use any content from this website beyond what is permitted under fair use or these terms, please contact us for permission. Include the following information in your request:
          </p>
          <ul>
            <li>Specific content you wish to use</li>
            <li>Intended use and purpose</li>
            <li>Distribution method and audience</li>
            <li>Duration of use</li>
            <li>Your contact information</li>
          </ul>

          <h2>Attribution Requirements</h2>
          <p>
            When permitted use requires attribution, please include:
          </p>
          <ul>
            <li>Author name: Susant Swain</li>
            <li>Source website: susantswain.com</li>
            <li>Direct link to the original content</li>
            <li>Copyright notice: © {{ currentYear }} Susant Swain</li>
          </ul>

          <h2>Reporting Copyright Infringement</h2>
          <p>
            If you believe that content on our website infringes your copyright, please contact us immediately with detailed information about the alleged infringement. We will investigate and take appropriate action in accordance with applicable laws.
          </p>

          <h2>International Copyright</h2>
          <p>
            This website and its content are protected by copyright laws in India and internationally through various treaties and agreements. Unauthorized use may be subject to civil and criminal penalties.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Copyright Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of the website constitutes acceptance of any changes.
          </p>

          <h2>Contact Information</h2>
          <p>For copyright-related inquiries, permission requests, or to report infringement:</p>
          <ul>
            <li><strong>Email:</strong> info@susantswain.com</li>
            <li><strong>Phone:</strong> +91 7064068258</li>
            <li><strong>Subject Line:</strong> Copyright Inquiry - [Brief Description]</li>
          </ul>

          <p class="text-sm text-gray-600 dark:text-gray-400 mt-8">
            This Copyright Policy is effective as of {{ currentDate }} and was last updated on {{ currentDate }}.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SkipLink from '../components/ui/SkipLink.vue'

const currentYear = computed(() => new Date().getFullYear())
const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>