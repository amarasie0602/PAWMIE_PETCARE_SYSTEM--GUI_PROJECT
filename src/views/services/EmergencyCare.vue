<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
import emergencyImage from '@/assets/emergency-care-hero.png'

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
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-rose-950">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="relative -mt-20 h-[520px] overflow-hidden">

      <img
        :src="emergencyImage"
        alt="Person providing emergency care to a dog"
        class="absolute inset-0 h-full w-full object-cover object-[center_60%]"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      <!-- Bottom fade -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-rose-50 to-transparent dark:from-slate-950 dark:to-transparent" />

      <!-- Hero content -->
      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 lg:left-14 xl:left-20">

        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
          🚑 Emergency Care
        </span>

        <h1 class="hero-heading mb-3 text-[2.4rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[3rem]">
          24/7 emergency<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-300">care for your pet.</span>
        </h1>

        <p class="mb-6 max-w-sm text-[14px] leading-6 text-white/80">
          When something feels wrong, every second matters. Log your emergency visit so nearby clinics can prepare before you arrive.
        </p>

        <div class="flex flex-wrap gap-3">
          <a
            href="#emergency-form"
            class="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-[13px] font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-xl active:translate-y-0"
          >
            Log Emergency Visit 🚑
          </a>
          <a
            href="tel:+94112345678"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/25 active:translate-y-0"
          >
            📞 Call Hotline
          </a>
        </div>
      </div>
    </section>
    <!-- ─── END HERO ──────────────────────────────────────────────── -->


    <!-- ─── MAIN CONTENT ─────────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div id="emergency-form" class="grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start pt-4">

        <!-- ── LEFT: Info ──────────────────────────────────────── -->
        <section class="space-y-6">

          <!-- Hotline card -->
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

.hero-heading {
  font-family: 'Playfair Display', Georgia, serif;
}
</style>