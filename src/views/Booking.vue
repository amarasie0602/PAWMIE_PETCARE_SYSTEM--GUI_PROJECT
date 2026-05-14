<script setup lang="ts">
import { useRoute } from 'vue-router'
import BookingForm from '@/components/bookings/BookingForm.vue'

const route = useRoute()

const service = route.query.service as string | undefined
const category = route.query.category as string | undefined
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
      <BookingForm :service="service" :category="category" heading="Book Service" />
    </div>
  </div>
</template>
