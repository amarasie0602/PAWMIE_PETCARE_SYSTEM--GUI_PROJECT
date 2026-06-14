<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import FeaturesSection from '@/components/FeatureSection.vue'
import CustomerPetsSection from '@/components/CustomerPetsSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import { useRouter } from 'vue-router'
import type { ComponentPublicInstance } from 'vue'

const router = useRouter()

const revealStats   = useScrollReveal({ type: 'fade-up',  delay: 80 })
const revealSteps   = useScrollReveal({ type: 'fade-up',  delay: 100 })

const createScrollRevealRef = (addFn: (el: Element | null) => void) => {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof Element) addFn(el)
  }
}

// revealCta provides an add() method, not a .ref property; expose a ref-compatible object
const revealCtaObj  = useScrollReveal({ type: 'fade-in' })
const revealCta     = { ref: createScrollRevealRef(revealCtaObj.add) }

const stats = [
  { val: '12,400+', label: 'Pets cared for', icon: '🐾' },
  { val: '4.9★',    label: 'Parent rating',  icon: '⭐' },
  { val: '< 2 min', label: 'Avg. booking',   icon: '⏱' },
  { val: '24/7',    label: 'Emergency line', icon: '🚑' },
]

const steps = [
  { num: '01', title: 'Pick a service', body: 'Vet, grooming, training, or emergency — each flow is built for that visit type.' },
  { num: '02', title: 'Choose a slot',  body: 'See real availability, add your pet\'s details once, and confirm in a few taps.' },
  { num: '03', title: 'Stay in the loop', body: 'Track everything under My Bookings — dates, notes, and what comes next.' },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

    <Hero />

    <div class="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">

      <!-- Stats -->
      <div class="relative -mt-6 mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div
          :ref="revealStats.add"
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
        >
          <p class="text-2xl">{{ stat.icon }}</p>
          <p class="mt-2 font-mono text-[1.35rem] font-black tabular-nums text-slate-900 dark:text-white sm:text-[1.45rem]">{{ stat.val }}</p>
          <p class="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ stat.label }}</p>
        </div>
      </div>

      <!-- How it works -->
      <section class="mb-14">
        <div class="mb-6 text-center">
          <p class="text-[10px] font-black uppercase tracking-[0.28em] text-amber-500">How it works</p>
          <h2 class="hero-heading mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white">
            From browse to booked
          </h2>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div
            :ref="revealSteps.add"
          :ref="revealSteps.add"
            v-for="step in steps"
            :key="step.num"
            class="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <span class="absolute -right-2 -top-4 font-mono text-[4.5rem] font-black leading-none text-slate-100 dark:text-slate-800/80">{{ step.num }}</span>
            <div class="relative">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Step {{ step.num }}</p>
              <p class="mt-2 text-[15px] font-black text-slate-800 dark:text-white">{{ step.title }}</p>
              <p class="mt-2 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ step.body }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>

    <FeaturesSection />

    <CustomerPetsSection />

    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <ReviewsSection />

      <!-- Closing CTA -->
      <section :ref="revealCta.ref" class="mb-4 overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
        <div class="grid items-center gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.28em] text-amber-500">Still deciding?</p>
            <h2 class="hero-heading mt-2 text-[1.6rem] font-black tracking-tight text-slate-900 dark:text-white sm:text-[1.85rem]">
              Talk to a human who gets pets.
            </h2>
            <p class="mt-2 max-w-md text-[13px] leading-6 text-slate-500 dark:text-slate-400">
              Our support team helps with bookings, grooming questions, and clinic visits — no bots, no runaround.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 sm:flex-col sm:items-stretch">
            <button
              type="button"
              @click="router.push('/contact')"
              class="rounded-full bg-slate-900 px-6 py-2.5 text-[13px] font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Contact support
            </button>
            <button
              type="button"
              @click="router.push('/about')"
              class="rounded-full border border-slate-200 px-6 py-2.5 text-[13px] font-bold text-slate-700 transition hover:border-slate-300 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500"
            >
              Our story
            </button>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }
</style>