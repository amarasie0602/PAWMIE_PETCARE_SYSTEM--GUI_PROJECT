<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'

// Replace this with your own asset once you have one:
// import groomingImage from '@/assets/grooming-hero.png'
const groomingImage = 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1400&q=80'

const trustSignals = [
  { icon: '✂️', label: 'Services offered', value: '12+'      },
  { icon: '⭐', label: 'Avg. rating',       value: '4.9 / 5' },
  { icon: '🐾', label: 'Pets groomed',      value: '2,400+'  },
]

const steps = [
  { icon: '📋', title: 'Pick your session',   text: 'Choose a date, time, and grooming package that suits your pet.' },
  { icon: '✂️', title: 'We get ready',         text: 'Your groomer reviews your notes and prepares the right products.' },
  { icon: '🛁', title: 'Drop off & relax',     text: 'Arrive stress-free — your slot is confirmed and waiting.'        },
]

const packages = [
  { name: 'Basic Bath',     desc: 'Shampoo, blow-dry, ear clean',            price: 'LKR 1,500', tag: 'Popular'  },
  { name: 'Full Groom',     desc: 'Bath + haircut, nail trim, spritz',        price: 'LKR 2,800', tag: 'Best value' },
  { name: 'Spa Treatment',  desc: 'Deep conditioning, paw massage, cologne',  price: 'LKR 3,900', tag: 'Premium'  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 dark:from-slate-950 dark:via-slate-900 dark:to-fuchsia-950">

    <!-- ─── HERO ───────────────────────────────────────────────── -->
    <section class="relative -mt-20 h-[750px] overflow-hidden">
      <img
        :src="groomingImage"
        alt="A happy dog being groomed at a salon"
        class="absolute inset-0 h-full w-full object-cover object-[center_40%]"
      />
      <!-- Gradient overlay: pink-tinted on the left, fades right -->
      <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-950/85 via-pink-900/55 to-black/15" />
      <!-- Bottom fade into page background -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-pink-50 to-transparent dark:from-slate-950 dark:to-transparent" />

      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 rounded-full bg-pink-300" />
          ✂️ Grooming &amp; Training
        </span>
        <h1 class="hero-heading mb-3 text-[2.6rem] font-black leading-[1.08] tracking-tight text-balance text-white drop-shadow-lg sm:text-5xl lg:text-[3.2rem]">
          <span class="text-white">Salon-fresh style </span>
          <span class="bg-gradient-to-r from-pink-300 to-fuchsia-200 bg-clip-text text-transparent">for your pet.</span>
        </h1>
        <p class="mb-7 max-w-sm text-[14px] leading-6 text-white/75">
          Baths, haircuts, nail trims and spa treatments — book a session with a trusted groomer in minutes.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="#grooming-form"
            class="inline-flex items-center gap-2.5 rounded-full bg-pink-500 px-7 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-pink-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-xl active:translate-y-0">
            <span>Book a Session</span>
            <span aria-hidden="true">✂️</span>
          </a>
          <a href="#packages"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0">
            🐾 View Packages
          </a>
        </div>
      </div>
    </section>
    <!-- ─── END HERO ───────────────────────────────────────────── -->


    <!-- ─── CONTENT ────────────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">

      <!-- Promo banner — floats up over hero bottom fade -->
      <div class="relative -mt-6 mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 shadow-xl shadow-pink-900/25">
        <div class="absolute inset-0 bg-gradient-to-r from-pink-600/40 via-transparent to-fuchsia-600/40" />
        <div class="relative flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div class="flex items-center gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">🎀</span>
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.25em] text-pink-100">First visit offer</p>
              <p class="mt-0.5 text-[1.3rem] font-black tracking-tight text-white">20% off your first grooming session</p>
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
          v-for="signal in trustSignals"
          :key="signal.label"
          class="rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
        >
          <p class="text-2xl">{{ signal.icon }}</p>
          <p class="mt-2 text-[1.3rem] font-black tabular-nums text-slate-900 dark:text-white">{{ signal.value }}</p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ signal.label }}</p>
        </div>
      </div>

      <!-- Two-column grid: info left, form right -->
      <div
        id="grooming-form"
        class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start"
      >

        <!-- ── LEFT: Info ──────────────────────────────────────── -->
        <section class="space-y-5">

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

          <!-- Packages -->
          <div
            id="packages"
            class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">Our packages</p>
            <ul class="space-y-3">
              <li
                v-for="pkg in packages"
                :key="pkg.name"
                class="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 dark:border-white/[0.06] dark:bg-slate-800/50"
              >
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ pkg.name }}</p>
                    <span class="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-pink-600 dark:bg-pink-900/40 dark:text-pink-300">
                      {{ pkg.tag }}
                    </span>
                  </div>
                  <p class="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">{{ pkg.desc }}</p>
                </div>
                <p class="shrink-0 text-[14px] font-black text-slate-900 dark:text-white">{{ pkg.price }}</p>
              </li>
            </ul>
          </div>

          <!-- Why book -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">Why book with us</p>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Add coat or skin sensitivity notes so groomers are prepared.',
                  'Track every grooming visit in one clean booking history.',
                  'Designed for quick, stress-free booking on any device.',
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
          <div class="flex items-start gap-4 rounded-2xl border border-pink-200 bg-pink-50 px-5 py-4 dark:border-pink-500/20 dark:bg-pink-900/10">
            <span class="text-2xl">💡</span>
            <div>
              <p class="text-[13px] font-bold text-pink-800 dark:text-pink-300">Grooming tip</p>
              <p class="mt-0.5 text-[12px] leading-5 text-pink-700 dark:text-pink-400">
                Regular grooming every 4–6 weeks keeps coats healthy and reduces shedding year-round.
              </p>
            </div>
          </div>

        </section>

        <!-- ── RIGHT: Form ─────────────────────────────────────── -->
        <section class="self-start lg:sticky lg:top-24">
          <BookingForm
            service="Grooming Booking"
            category="Grooming & Training"
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