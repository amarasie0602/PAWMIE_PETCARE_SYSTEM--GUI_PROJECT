<script setup lang="ts">
import heroBg from '@/assets/heropet.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const trustItems = ['12,400+ pets served', '340+ trusted sitters', '4.9★ average rating']
</script>

<template>
  <section class="relative min-h-[calc(100vh+64px)] -mt-20 w-full flex items-center overflow-hidden">

    <!-- Background image -->
    <div
      class="absolute inset-0 hero-bg bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(${heroBg})` }"
    />

    <!-- Overlays — darken evenly, left side heavier so text is always legible -->
    <div class="absolute inset-0 bg-black/50" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

    <!-- Content -->
    <div class="relative z-10 w-full">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        <div class="max-w-2xl">

          <!-- Animated badge -->
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span class="badge-dot h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
              Trusted pet care platform
            </span>
          </div>

          <!-- Headline — Playfair Display, italic on second line -->
          <h1 class="hero-heading text-[clamp(2.6rem,5.5vw,4rem)] font-black leading-[1.06] tracking-tight text-white drop-shadow-lg">
            Your pets deserve<br/>
            <em class="bg-gradient-to-r from-indigo-300 to-purple-200 bg-clip-text text-transparent not-italic">
              the very best.
            </em>
          </h1>

          <!-- Subtext -->
          <p class="mt-6 max-w-md text-[16px] font-normal leading-[1.8] text-white/68">
            From vet appointments and grooming to emergency care — Pawmie keeps your furry family healthy, happy, and loved.
          </p>

          <!-- CTAs -->
          <div class="mt-10 flex flex-wrap items-center gap-3">
            <button
              @click="router.push('/services')"
              class="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:translate-y-0"
            >
              Explore Services
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button
              @click="router.push('/about')"
              class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
            >
              Meet the team
            </button>
          </div>

          <!-- Trust strip -->
          <div class="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <div v-for="(item, i) in trustItems" :key="item"
              class="flex items-center gap-2 text-[12px] text-white/55">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              {{ item }}
              <span v-if="i < trustItems.length - 1" class="ml-1 h-3 w-px bg-white/20" />
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom fade — matches the page bg exactly -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-32
      bg-gradient-to-t from-slate-50 to-transparent
      dark:from-slate-950 dark:to-transparent" />

  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&display=swap');

.hero-heading { font-family: 'Playfair Display', Georgia, serif; }

.hero-bg { background-position: center top; }
@media (min-width: 768px) { .hero-bg { background-position: center -70px; } }

.badge-dot { animation: blink 2.2s ease-in-out infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style>