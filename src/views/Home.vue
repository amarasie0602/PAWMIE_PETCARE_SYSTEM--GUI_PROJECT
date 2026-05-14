<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import FeaturesSection from '@/components/FeatureSection.vue'
import CustomerPetsSection from '@/components/CustomerPetsSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100
              dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

    <Hero />

    <!-- Divider -->
    <div class="w-24 h-1 bg-indigo-500 mx-auto rounded-full mt-12 mb-16"></div>

    <!-- Features Section -->
    <FeaturesSection class="mt-32" />

    <!-- Customer Pets Section -->
    <CustomerPetsSection />

    <!-- Reviews Section -->
    <ReviewsSection />

  </div>
</template>

<style scoped>
</style>