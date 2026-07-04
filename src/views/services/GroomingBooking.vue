<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import groomingImage from '@/assets/grooming-hero.jpg'

const revealStats = useScrollReveal({ type: 'fade-up', delay: 80 })
const revealInfo  = useScrollReveal({ type: 'fade-in' })
const revealForm  = useScrollReveal({ type: 'fade-up' })

const trustSignals = [
  { icon: '✂️', label: 'Groomers available', value: '20+'      },
  { icon: '⏱',  label: 'Avg. session',       value: '50 min'   },
  { icon: '📅', label: 'Booking window',     value: '30 days'  },
]

const steps = [
  { icon: '📋', title: 'Fill in the details',   text: 'Tell us your pet\'s name, coat type, and a preferred time slot.'   },
  { icon: '✅', title: 'Booking confirmed',      text: 'You\'ll receive instant confirmation once the slot is saved.'      },
  { icon: '🐾', title: 'Arrive & relax',         text: 'Drop off your pet knowing your groomer already has their needs ready.'  },
]

const visitTypes = [
  { name: 'Bath & Brush',      desc: 'Shampoo, blow-dry & de-shedding brush-out',    icon: '🛁', tag: 'Most common' },
  { name: 'Full Groom',        desc: 'Bath, haircut, nail trim & ear cleaning',       icon: '✂️', tag: 'Popular'     },
  { name: 'Nail & Paw Care',   desc: 'Nail trim, paw pad trim & moisturising balm',   icon: '🐾', tag: 'Quick visit' },
  { name: 'Coat Consultation', desc: 'Discuss coat type, matting, or skin concerns',  icon: '💬', tag: 'Advice'      },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-slate-50 to-fuchsia-100 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950">

    <!-- ─── HERO ───────────────────────────────────────────────── -->
    <section class="relative -mt-20 h-[750px] overflow-hidden">
      <img
        :src="groomingImage"
        alt="A groomer gently brushing a dog's coat"
        class="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-pink-50 to-transparent dark:from-slate-950 dark:to-transparent" />

      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 rounded-full bg-pink-300" />
          ✂️ Grooming
        </span>
        <h1 class="hero-heading mb-3 text-[2.6rem] font-black leading-[1.08] tracking-tight text-balance text-white drop-shadow-lg sm:text-5xl lg:text-[3.2rem]">
          <span class="text-white">A fresh look for </span>
          <span class="bg-gradient-to-r from-pink-300 to-fuchsia-200 bg-clip-text text-transparent">your best friend.</span>
        </h1>
        <p class="mb-7 max-w-sm text-[14px] leading-6 text-white/75">
          Book baths, haircuts, and nail care with trusted groomers — in just a few taps.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="#grooming-form"
            class="inline-flex items-center gap-2.5 rounded-full bg-pink-600 px-7 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-pink-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl active:translate-y-0">
            <span>Book Grooming</span>
            <span aria-hidden="true">✂️</span>
          </a>
          <a href="#visit-types"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0">
            🐾 Session Types
          </a>
        </div>
      </div>
    </section>
    <!-- ─── END HERO ───────────────────────────────────────────── -->


    <!-- ─── CONTENT ────────────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">

      <!-- Info banner -->
      <div class="relative -mt-6 mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 to-fuchsia-500 shadow-xl shadow-pink-900/25">
        <div class="absolute inset-0 bg-gradient-to-r from-pink-700/40 via-transparent to-fuchsia-600/40" />
        <div class="relative flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div class="flex items-center gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">🛁</span>
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.25em] text-pink-100">Trusted groomers · Pawmie network</p>
              <p class="mt-0.5 text-[1.3rem] font-black tracking-tight text-white">20+ certified groomers across Colombo</p>
            </div>
          </div>
          <a href="#grooming-form"
            class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-black text-pink-600 shadow-sm transition hover:bg-pink-50 active:scale-95">
            Book Now →
          </a>
        </div>
      </div>

      <!-- Trust stats -->
      <div class="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
        <div
          :ref="revealStats.add"
          v-for="signal in trustSignals"
          :key="signal.label"
          class="rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
        >
          <p class="text-2xl">{{ signal.icon }}</p>
          <p class="mt-2 text-[1.3rem] font-black tabular-nums text-slate-900 dark:text-white">{{ signal.value }}</p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ signal.label }}</p>
        </div>
      </div>

      <!-- Two-column grid -->
      <div
        id="grooming-form"
        class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start"
      >

        <!-- ── LEFT: Info ──────────────────────────────────────── -->
        <section :ref="revealInfo.add" class="space-y-5">

          <!-- What happens next -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">What happens next</p>
            <ol class="divide-y divide-slate-100 dark:divide-white/[0.06]">
              <li
                v-for="(step, i) in steps"
                :key="step.title"
                class="flex items-center gap-5 py-4 first:pt-0 last:pb-0"
              >
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[13px] font-black text-pink-600 ring-1 ring-pink-200 dark:bg-pink-900/30 dark:ring-pink-500/30">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ step.icon }} {{ step.title }}</p>
                  <p class="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Visit types -->
          <div
            id="visit-types"
            class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">Session types</p>
            <ul class="space-y-3">
              <li
                v-for="vt in visitTypes"
                :key="vt.name"
                class="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 dark:border-white/[0.06] dark:bg-slate-800/50"
              >
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-50 text-lg dark:bg-pink-900/30">{{ vt.icon }}</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ vt.name }}</p>
                    <span class="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-pink-600 dark:bg-pink-900/40 dark:text-pink-300">
                      {{ vt.tag }}
                    </span>
                  </div>
                  <p class="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">{{ vt.desc }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Why book -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">Why book with Pawmie</p>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Add coat type or skin sensitivities so your groomer is prepared before you arrive.',
                  'All your appointments stored in one place — no more lost receipts.',
                  'Quick to fill out on mobile, even on the way to the salon.',
                ]"
                :key="item"
                class="flex items-start gap-3"
              >
                <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[12px] text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:ring-emerald-500/20">✔</span>
                <p class="text-[14px] leading-6 text-slate-700 dark:text-slate-300">{{ item }}</p>
              </li>
            </ul>
          </div>

          <!-- Tip strip -->
          <div class="flex items-start gap-4 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-5 py-4 dark:border-fuchsia-500/20 dark:bg-fuchsia-900/10">
            <span class="text-2xl">💡</span>
            <div>
              <p class="text-[13px] font-bold text-fuchsia-800 dark:text-fuchsia-300">Grooming tip</p>
              <p class="mt-0.5 text-[12px] leading-5 text-fuchsia-700 dark:text-fuchsia-400">
                Regular brushing between sessions reduces matting and keeps shedding under control.
              </p>
            </div>
          </div>

        </section>

        <!-- ── RIGHT: Form ─────────────────────────────────────── -->
        <section :ref="revealForm.add" class="self-start lg:sticky lg:top-24">
          <BookingForm
            service="Grooming Session"
            category="Grooming"
            heading="Book Grooming Session"
            notesPlaceholder="Any coat type, skin sensitivities or special requests?"
            theme="grooming"
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
