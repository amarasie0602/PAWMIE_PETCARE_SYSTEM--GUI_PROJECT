<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
import emergencyImage from '@/assets/emergency-care-hero.png'

// Demo data for trust signals and process steps. In a real app, these might come from props or an API.
const trustSignals = [
  { icon: '🏥', label: 'Clinics notified', value: 'Instantly' },
  { icon: '⚡', label: 'Avg. response',    value: '< 5 min'  },
  { icon: '🕐', label: 'Available',         value: '24 / 7'  },
]

// Steps for the "What happens next" section. In a real app, these could be dynamic based on the service or user flow.
const steps = [
  { icon: '📋', title: 'Log your visit',     text: 'Fill in your pet\'s symptoms and location quickly.'  },
  { icon: '📡', title: 'Clinics are alerted', text: 'Nearby vets receive your request and prepare.'      },
  { icon: '🚗', title: 'Head over',           text: 'Arrive knowing the team is already ready for you.' },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-rose-950">

    <!-- ─── HERO (unchanged) ───────────────────────────────────────── -->
    <section class="relative -mt-20 h-[750px] overflow-hidden">
      <img
        :src="emergencyImage"
        alt="Person providing emergency care to a dog"
        class="absolute inset-0 h-full w-full object-cover object-[center_42%]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-50 to-transparent dark:from-slate-950 dark:to-transparent" />

      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
          🚑 Emergency Care
        </span>
        <h1 class="hero-heading mb-3 text-[2.6rem] font-black leading-[1.08] tracking-tight text-balance text-white drop-shadow-lg sm:text-5xl lg:text-[3.2rem]">
          <span class="text-white">24/7 emergency </span>
          <span class="bg-gradient-to-r from-rose-400 to-red-300 bg-clip-text text-transparent">care for your pet.</span>
        </h1>
        <p class="mb-7 max-w-sm text-[14px] leading-6 text-white/75">
          When something feels wrong, every second matters. Log your emergency visit so nearby clinics can prepare before you arrive.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="#emergency-form"
            class="inline-flex items-center gap-2.5 rounded-full bg-rose-600 px-7 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-rose-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-xl active:translate-y-0">
            <span>Log Emergency Visit</span>
            <span aria-hidden="true">🚑</span>
          </a>
          <a href="tel:+94112345678"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0">
            📞 Call Hotline
          </a>
        </div>
      </div>
    </section>
    <!-- ─── END HERO ───────────────────────────────────────────────── -->


    <!-- ─── CONTENT ────────────────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">

      <!-- Hotline banner — floats up over hero bottom fade -->
      <div class="relative -mt-6 mb-10 overflow-hidden rounded-2xl bg-rose-600 shadow-xl shadow-rose-900/30">
        <div class="absolute inset-0 bg-gradient-to-r from-rose-700/50 via-transparent to-rose-700/50" />
        <div class="relative flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div class="flex items-center gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">📞</span>
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.25em] text-rose-200">Emergency Hotline · 24 / 7</p>
              <p class="mt-0.5 text-[1.5rem] font-black tabular-nums tracking-tight text-white">+94 11 234 5678</p>
            </div>
          </div>
          <a href="tel:+94112345678"
            class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-black text-rose-600 shadow-sm transition hover:bg-rose-50 active:scale-95">
            Call Now →
          </a>
        </div>
      </div>

      <!-- Trust stats -->
      <div class="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="signal in trustSignals"
          :key="signal.label"
          class="rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
        >
          <p class="text-2xl">{{ signal.icon }}</p>
          <p class="mt-2 text-[1.3rem] font-black tabular-nums text-slate-900 dark:text-white">{{ signal.value }}</p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ signal.label }}</p>
        </div>
      </div>

      <!-- Two-column grid: info left, form/tracker right -->
      <div
        id="emergency-form"
        class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start"
      >

        <!-- ── LEFT: Info ─────────────────────────────────────────── -->
        <section class="space-y-5">

          <!-- What happens next -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-rose-500">What happens next</p>
            <ol class="divide-y divide-slate-100 dark:divide-white/[0.06]">
              <li
                v-for="(step, i) in steps"
                :key="step.title"
                class="flex items-center gap-5 py-4 first:pt-0 last:pb-0"
              >
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[13px] font-black text-rose-600 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:ring-rose-500/30">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ step.icon }} {{ step.title }}</p>
                  <p class="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Why log -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-rose-500">Why log your visit</p>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Describe symptoms so vets can triage your pet faster.',
                  'Keep a record of every emergency visit in one place.',
                  'Designed for quick entry on mobile and desktop.',
                ]"
                :key="item"
                class="flex items-start gap-3"
              >
                <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[12px] text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:ring-emerald-500/20">✔</span>
                <p class="text-[14px] leading-6 text-slate-700 dark:text-slate-300">{{ item }}</p>
              </li>
            </ul>
          </div>

          <!-- Alert strip -->
          <div class="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-500/20 dark:bg-amber-900/10">
            <span class="text-2xl">⚠️</span>
            <div>
              <p class="text-[13px] font-bold text-amber-800 dark:text-amber-400">For life-threatening emergencies</p>
              <p class="mt-0.5 text-[12px] leading-5 text-amber-700 dark:text-amber-500">
                Call the hotline immediately — don't wait to fill the form. Our team will guide you.
              </p>
            </div>
          </div>

        </section>

        <!-- ── RIGHT: Form / Tracker ──────────────────────────────── -->
        <section class="self-start lg:sticky lg:top-24">
          <BookingForm
            service="Emergency Care"
            category="Medical Care"
            heading="Log Emergency Visit"
            theme="emergency"
          />
        </section>

      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }
</style>