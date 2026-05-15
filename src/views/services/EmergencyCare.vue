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
    <section class="relative -mt-20 h-[750px] overflow-hidden">
      <img
        :src="emergencyImage"
        alt="Person providing emergency care to a dog"
        class="absolute inset-0 h-full w-full object-cover object-[center_42%]"
      />

      <!-- dark overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      <!-- bottom fade into page bg -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-50 to-transparent dark:from-slate-950 dark:to-transparent" />

      <!-- Hero content -->
      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
          🚑 Emergency Care
        </span>

        <h1
          class="hero-heading mb-3 text-[2.6rem] font-black leading-[1.08] tracking-tight text-balance text-white drop-shadow-lg sm:text-5xl lg:text-[3.2rem]"
        >
          <span class="text-white">24/7 emergency </span>
          <span class="bg-gradient-to-r from-rose-400 to-red-300 bg-clip-text text-transparent">
            care for your pet.
          </span>
        </h1>

        <p class="mb-7 max-w-sm text-[14px] leading-6 text-white/75">
          When something feels wrong, every second matters. Log your emergency visit so nearby clinics can prepare before you arrive.
        </p>

        <div class="flex flex-wrap gap-3">
          <a
            href="#emergency-form"
            class="inline-flex items-center gap-2.5 rounded-full bg-rose-600 px-7 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-rose-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-xl active:translate-y-0"
          >
            <span>Log Emergency Visit</span>
            <span class="text-base leading-none" aria-hidden="true">🚑</span>
          </a>
          <a
            href="tel:+94112345678"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
          >
            📞 Call Hotline
          </a>
        </div>
      </div>
    </section>
    <!-- ─── END HERO ──────────────────────────────────────────────── -->


    <!-- ─── MAIN CONTENT ─────────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
      <div
        id="emergency-form"
        class="grid gap-10 pt-10 lg:grid-cols-[1.2fr,1fr] lg:items-start"
      >

        <!-- ── LEFT: Info ──────────────────────────────────────── -->
        <section class="space-y-6">

          <!-- Hotline card -->
          <div
            class="flex items-center justify-between gap-4 rounded-2xl border border-rose-900/40 bg-slate-900/70 px-5 py-4 shadow-sm backdrop-blur-sm sm:gap-5 sm:px-6 sm:py-4"
          >
            <div class="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-xl ring-1 ring-rose-500/20">
                📞
              </div>
              <div class="min-w-0">
                <p class="text-[11px] font-bold uppercase tracking-widest text-rose-400">Emergency Hotline</p>
                <p class="mt-0.5 text-[18px] font-black tracking-tight text-white tabular-nums">
                  +94 11 234 5678
                </p>
              </div>
            </div>
            <a
              href="tel:+94112345678"
              class="inline-flex shrink-0 items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-[12px] font-bold text-white shadow-sm transition hover:bg-rose-700 active:scale-95 sm:px-5"
            >
              Call Now
            </a>
          </div>

          <!-- Trust signals -->
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="signal in trustSignals"
              :key="signal.label"
              class="rounded-2xl border border-white/[0.06] bg-slate-900/60 p-4 text-center shadow-sm backdrop-blur-sm"
            >
              <p class="text-xl">{{ signal.icon }}</p>
              <p class="mt-1.5 text-[15px] font-black text-white">{{ signal.value }}</p>
              <p class="mt-0.5 text-[11px] text-slate-400">{{ signal.label }}</p>
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
              class="flex items-start gap-3 text-[14px] text-slate-300"
            >
              <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] text-emerald-400 ring-1 ring-emerald-500/20">✔</span>
              {{ item }}
            </li>
          </ul>

          <!-- What happens next -->
          <div class="rounded-2xl border border-white/[0.06] bg-slate-900/60 p-5 shadow-sm backdrop-blur-sm">
            <p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-rose-400">
              What happens next
            </p>
            <ol class="space-y-4">
              <li
                v-for="(step, i) in steps"
                :key="step.title"
                class="flex items-start gap-3"
              >
                <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-[11px] font-black text-rose-400 ring-1 ring-rose-500/20">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="text-[13px] font-bold text-white">{{ step.icon }} {{ step.title }}</p>
                  <p class="mt-0.5 text-[12px] leading-5 text-slate-400">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

        </section>

        <!-- ── RIGHT: Booking Form ─────────────────────────────── -->
        <section class="flex justify-center self-start lg:sticky lg:top-24">
          <BookingForm
            service="Emergency Care"
            category="Medical Care"
            heading="Log Emergency Visit"
            theme="emergency"
          />
        </section>

      </div>
    </div>
    <!-- ─── END MAIN CONTENT ─────────────────────────────────────── -->

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

.hero-heading {
  font-family: 'Playfair Display', Georgia, serif;
}
</style>