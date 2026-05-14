<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-rose-50 via-slate-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-rose-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
      <!-- Left: Info / Hero -->
      <section class="space-y-6">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-200">
          🚑 Medical Care
          <span class="w-1 h-1 rounded-full bg-rose-400" />
          Emergency
        </span>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          24/7 <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500">emergency care</span> for urgent pet needs
        </h1>

        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          When something feels wrong, every second matters. Quickly log your emergency visit request
          so nearby clinics can prepare in advance.
        </p>

        <ul class="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200">
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Describe symptoms so vets can triage your pet faster.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Keep a record of every emergency visit in one place.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Designed for quick entry on mobile and desktop.</span>
          </li>
        </ul>

        <div class="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            ⚡ Priority: High
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            📍 Best when heading to a nearby clinic
          </span>
        </div>
      </section>

      <!-- Right: Booking Form -->
      <section class="flex justify-center">
        <BookingForm
          service="Emergency Care"
          category="Medical Care"
          heading="Log Emergency Visit"
        />
      </section>
    </div>
  </div>
</template>

