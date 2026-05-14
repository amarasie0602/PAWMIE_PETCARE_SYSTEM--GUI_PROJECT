<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
      <!-- Left: Info / Hero -->
      <section class="space-y-6">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
          🩺 Medical Care
          <span class="w-1 h-1 rounded-full bg-indigo-400" />
          Vet Appointment
        </span>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Schedule a <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">vet visit</span> for your best friend
        </h1>

        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Book a routine check-up, follow-up visit, or health consultation with trusted veterinarians.
          Pawmie keeps things simple so you can focus on your pet, not the paperwork.
        </p>

        <ul class="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200">
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Choose a date and time that fits your schedule.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Perfect for vaccinations, regular check-ups, and follow‑ups.</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 text-emerald-500">✔</span>
            <span>Your bookings are stored safely so you can view them anytime.</span>
          </li>
        </ul>

        <div class="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            ⏱ Typical duration: 20–30 min
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
            🐾 Suitable for dogs & cats
          </span>
        </div>
      </section>

      <!-- Right: Booking Form -->
      <section class="flex justify-center">
        <BookingForm
          service="Vet Appointment Booking"
          category="Medical Care"
          heading="Book Vet Appointment"
        />
      </section>
    </div>
  </div>
</template>

