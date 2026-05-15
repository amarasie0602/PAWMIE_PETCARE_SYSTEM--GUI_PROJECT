<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'

const trustSignals = [
  { icon: '🏥', label: 'Clinics notified', value: 'Instantly' },
  { icon: '⚡', label: 'Avg. response', value: '< 5 min' },
  { icon: '🕐', label: 'Available', value: '24 / 7' },
]

const steps = [
  { icon: '📋', title: 'Log your visit', text: 'Fill in your pet\'s symptoms and location quickly.' },
  { icon: '📡', title: 'Clinics are alerted', text: 'Nearby vets receive your request and prepare.' },
  { icon: '🚗', title: 'Head over', text: 'Arrive knowing the team is already ready for you.' },
]
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-rose-50 via-slate-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-rose-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ─── MAIN GRID ─────────────────────────────────────────────── -->
      <div class="grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">

        <!-- ── LEFT: Info / Hero ─────────────────────────────────── -->
        <section class="space-y-7">

          <!-- Badge -->
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 ring-1 ring-rose-200 dark:ring-rose-800">
            <span class="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            🚑 Emergency Care
          </span>

          <!-- Heading -->
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              24/7 <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500">emergency care</span><br class="hidden sm:block" /> for urgent pet needs
            </h1>
            <p class="mt-4 text-[15px] sm:text-base leading-7 text-slate-600 dark:text-slate-300 max-w-md">
              When something feels wrong, every second matters. Log your emergency visit so nearby clinics can prepare before you arrive.
            </p>
          </div>

          <!-- 🔴 Hotline card -->
          <div class="flex items-center gap-4 rounded-2xl border border-rose-200 bg-white px-5 py-4 shadow-sm dark:border-rose-800/60 dark:bg-rose-950/40">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-xl dark:bg-rose-900/50">
              📞
            </div>
            <div>
              <p class="text-[11px] font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">Emergency Hotline</p>
              <p class="mt-0.5 text-[18px] font-black tracking-tight text-slate-900 dark:text-white">+94 11 234 5678</p>
            </div>
            <a
              href="tel:+94112345678"
              class="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-[12px] font-bold text-white shadow-sm transition hover:bg-rose-700 active:scale-95"
            >
              Call Now
            </a>
          </div>

          <!-- Trust signals -->
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="signal in trustSignals"
              :key="signal.label"
              class="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-slate-900/60"
            >
              <p class="text-xl">{{ signal.icon }}</p>
              <p class="mt-1.5 text-[15px] font-black text-slate-900 dark:text-white">{{ signal.value }}</p>
              <p class="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{{ signal.label }}</p>
            </div>
          </div>

          <!-- Checklist -->
          <ul class="space-y-3">
            <li
              v-for="item in [
                'Describe symptoms so vets can triage your pet faster.',
                'Keep a record of every emergency visit in one place.',
                'Designed for quick entry on mobile and desktop.',
              ]"
              :key="item"
              class="flex items-start gap-3 text-[14px] text-slate-700 dark:text-slate-300"
            >
              <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">✔</span>
              {{ item }}
            </li>
          </ul>

          <!-- What happens next -->
          <div class="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-white/[0.08] dark:bg-slate-900/60">
            <p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">
              What happens next
            </p>
            <ol class="space-y-4">
              <li
                v-for="(step, i) in steps"
                :key="step.title"
                class="flex items-start gap-3"
              >
                <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px] font-black text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="text-[13px] font-bold text-slate-800 dark:text-white">{{ step.icon }} {{ step.title }}</p>
                  <p class="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

        </section>

        <!-- ── RIGHT: Booking Form ─────────────────────────────── -->
        <section class="flex justify-center lg:sticky lg:top-24">
          <BookingForm
            service="Emergency Care"
            category="Medical Care"
            heading="Log Emergency Visit"
          />
        </section>

      </div>
    </div>
  </div>
</template>