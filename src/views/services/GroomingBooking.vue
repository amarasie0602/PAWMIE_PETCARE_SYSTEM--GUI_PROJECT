<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-100 dark:from-slate-950 dark:via-slate-900 dark:to-fuchsia-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
      <!-- Left: Info / Hero -->
      <section class="space-y-6">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-200">
          ✂️ Grooming & Training
          <span class="w-1 h-1 rounded-full bg-pink-400" />
          Grooming
        </span>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Make your pet <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">salon fresh</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Book baths, haircuts, nail trimming, and more with trusted groomers.
          Keep your pet looking and feeling their absolute best.
        </p>

        <ul class="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200">
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Pick a convenient date and time for your grooming session.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Add notes for special coat types or sensitivities.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Track past grooming visits in your booking history.</span>
          </li>
        </ul>

        <div class="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            🧼 Full & basic packages
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            🐾 Ideal for regular maintenance
          </span>
        </div>
      </section>

      <!-- Right: Booking Form -->
      <section class="flex justify-center">
        <BookingForm
          service="Grooming Booking"
          category="Grooming & Training"
          heading="Book Grooming Session"
        />
      </section>
    </div>
  </div>
</template>

