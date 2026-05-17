<script setup lang="ts">
import BookingForm from '@/components/bookings/BookingForm.vue'
import trainingImage from '@/assets/training-hero.png'

const trustSignals = [
  { icon: '🎓', label: 'Programs offered', value: '8+'      },
  { icon: '🐕', label: 'Pets trained',     value: '1,800+'  },
  { icon: '⭐', label: 'Trainer rating',   value: '4.8 / 5' },
]

const steps = [
  { icon: '📋', title: 'Pick your program',   text: 'Choose a training focus and session type that fits your pet\'s needs.' },
  { icon: '👨‍🏫', title: 'Trainer gets ready', text: 'Your trainer reviews your notes and tailors the session plan.'         },
  { icon: '🐾', title: 'Show up & train',     text: 'Arrive knowing exactly what to expect — and watch your pet grow.'      },
]

const programs = [
  { name: 'Puppy Foundation',     desc: 'Sit, stay, recall & socialisation basics',   icon: '🐶', tag: 'Best for puppies' },
  { name: 'Basic Obedience',      desc: 'Leash manners, impulse control, commands',    icon: '🎯', tag: 'Most popular'    },
  { name: 'Behaviour Correction', desc: 'Address aggression, anxiety & bad habits',    icon: '🧠', tag: 'Specialist'      },
  { name: 'Advanced Tricks',      desc: 'Fun complex skills for engaged, active pets', icon: '🏆', tag: 'Level up'        },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-100 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">

    <!-- ─── HERO ───────────────────────────────────────────────── -->
    <section class="relative -mt-20 h-[750px] overflow-hidden">
      <img
        :src="trainingImage"
        alt="A trainer working with an attentive dog outdoors"
        class="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/82 via-black/50 to-black/15" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-emerald-50 to-transparent dark:from-slate-950 dark:to-transparent" />

      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
          🎓 Grooming &amp; Training
        </span>
        <h1 class="hero-heading mb-3 text-[2.6rem] font-black leading-[1.08] tracking-tight text-balance text-white drop-shadow-lg sm:text-5xl lg:text-[3.2rem]">
          <span class="text-white">Build better habits </span>
          <span class="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">with expert trainers.</span>
        </h1>
        <p class="mb-7 max-w-sm text-[14px] leading-6 text-white/75">
          From puppy basics to advanced skills — book a training session and watch your pet thrive.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="#training-form"
            class="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-7 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl active:translate-y-0">
            <span>Book a Session</span>
            <span aria-hidden="true">🎓</span>
          </a>
          <a href="#programs"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0">
            🐾 View Programs
          </a>
        </div>
      </div>
    </section>
    <!-- ─── END HERO ───────────────────────────────────────────── -->


    <!-- ─── CONTENT ────────────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">

      <!-- Banner -->
      <div class="relative -mt-6 mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 shadow-xl shadow-emerald-900/25">
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-700/40 via-transparent to-teal-600/40" />
        <div class="relative flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div class="flex items-center gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">🏅</span>
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-100">Certified trainers · Pawmie network</p>
              <p class="mt-0.5 text-[1.3rem] font-black tracking-tight text-white">First session free for new enrollments</p>
            </div>
          </div>
          <a href="#training-form"
            class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-black text-emerald-700 shadow-sm transition hover:bg-emerald-50 active:scale-95">
            Enroll Now →
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

      <!-- Two-column grid -->
      <div
        id="training-form"
        class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start"
      >

        <!-- ── LEFT: Info ──────────────────────────────────────── -->
        <section class="space-y-5">

          <!-- What happens next -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">What happens next</p>
            <ol class="divide-y divide-slate-100 dark:divide-white/[0.06]">
              <li
                v-for="(step, i) in steps"
                :key="step.title"
                class="flex items-center gap-5 py-4 first:pt-0 last:pb-0"
              >
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[13px] font-black text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:ring-emerald-500/30">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ step.icon }} {{ step.title }}</p>
                  <p class="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Programs -->
          <div
            id="programs"
            class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Training programs</p>
            <ul class="space-y-3">
              <li
                v-for="prog in programs"
                :key="prog.name"
                class="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 dark:border-white/[0.06] dark:bg-slate-800/50"
              >
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg dark:bg-emerald-900/30">{{ prog.icon }}</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ prog.name }}</p>
                    <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      {{ prog.tag }}
                    </span>
                  </div>
                  <p class="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">{{ prog.desc }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Why book -->
          <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
            <p class="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Why train with Pawmie</p>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Add notes on behaviour issues so trainers can plan before you arrive.',
                  'All sessions logged in your history — track your pet\'s progress over time.',
                  'Choose between 1:1 private sessions or group classes.',
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
          <div class="flex items-start gap-4 rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4 dark:border-teal-500/20 dark:bg-teal-900/10">
            <span class="text-2xl">💡</span>
            <div>
              <p class="text-[13px] font-bold text-teal-800 dark:text-teal-300">Trainer tip</p>
              <p class="mt-0.5 text-[12px] leading-5 text-teal-700 dark:text-teal-400">
                Short, consistent daily practice between sessions makes the biggest difference — even just 5 minutes.
              </p>
            </div>
          </div>

        </section>

        <!-- ── RIGHT: Form ─────────────────────────────────────── -->
        <section class="self-start lg:sticky lg:top-24">
          <BookingForm
            service="Training Services"
            category="Grooming & Training"
            heading="Book Training Session"
            notesPlaceholder="Describe your pet's behaviour or what you'd like to work on (e.g. pulling on lead, barking, recall)"
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