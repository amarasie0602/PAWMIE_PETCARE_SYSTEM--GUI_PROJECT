<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-100 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
      <!-- Left: Info / Hero -->
      <section class="space-y-6">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-200">
          🎓 Grooming & Training
          <span class="w-1 h-1 rounded-full bg-emerald-400" />
          Training
        </span>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Build better <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">habits and skills</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Enroll your pet in basic obedience, behaviour correction, or fun advanced tricks
          with experienced trainers who understand animal behaviour.
        </p>

        <ul class="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200">
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Select training focus and add notes for your trainer.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Great for puppies, rescues, and energetic pets.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>All sessions stored in your booking history for quick reference.</span>
          </li>
        </ul>

        <div class="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            🐕 Puppy & adult programs
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            👨‍🏫 1:1 and group options
          </span>
        </div>
      </section>

      <!-- Right: Booking Form -->
      <section class="flex justify-center">
        <BookingForm
          service="Training Services"
          category="Grooming & Training"
          heading="Book Training Session"
        />
      </section>
    </div>
  </div>
</template>

