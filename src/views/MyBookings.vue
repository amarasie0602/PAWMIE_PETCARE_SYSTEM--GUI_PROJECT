<script setup lang="ts">
import { computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'

const { myGroupedByCategory } = useBookingStore()

const categories = computed(() => Object.entries(myGroupedByCategory.value))
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-slate-50 dark:bg-gray-900">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="mb-10 text-center">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          My Bookings
        </h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Dummy bookings grouped by service category.
        </p>
      </div>

      <div v-if="categories.length === 0" class="text-center text-gray-500 dark:text-gray-400">
        No bookings yet. Go to a service and click
        <span class="font-semibold">Book Now</span>
        to create your first booking.
      </div>

      <div v-else class="space-y-8">
        <section
          v-for="[categoryName, bookings] in categories"
          :key="categoryName"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ categoryName }}
            </h2>
            <span class="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
              {{ bookings.length }} bookings
            </span>
          </div>

          <div class="space-y-4">
            <article
              v-for="booking in bookings"
              :key="booking.id"
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/70"
            >
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    {{ booking.service }}
                  </h3>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    {{ booking.petName }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  For <span class="font-medium">{{ booking.ownerName }}</span>
                  <span v-if="booking.notes"> • {{ booking.notes }}</span>
                </p>
              </div>

              <div class="text-sm text-right text-gray-600 dark:text-gray-300">
                <div class="font-medium">
                  {{ booking.date }} • {{ booking.time }}
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>  </style>