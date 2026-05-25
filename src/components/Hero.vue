<script setup lang="ts">
import { useRouter } from 'vue-router'
import heroImage from '@/assets/heropet.png'

const router = useRouter()

function scrollToServices() {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}

function goToBookings() {
  if (localStorage.getItem('isAuthenticated') === 'true') {
    router.push('/my-bookings')
  } else {
    router.push({ path: '/login', query: { redirect: '/my-bookings' } })
  }
}
</script>

<template>
  <section class="relative -mt-20 h-[min(100vh,820px)] min-h-[640px] overflow-hidden">
    <img
      :src="heroImage"
      alt="Dog and cat resting together"
      class="absolute inset-0 h-full w-full object-cover object-[center_15%] sm:object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/20" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />

    <div class="absolute left-6 top-[50%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
      <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
        Pet care, simplified
      </span>

      <h1 class="hero-heading mb-4 text-[2.5rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[3.25rem]">
        One place for every<br />
        <span class="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent italic">tail, whisker & paw.</span>
      </h1>

      <p class="mb-7 max-w-md text-[14px] leading-7 text-white/75">
        Book vets, grooming, and training without the phone-tag. Pawmie keeps your pet's appointments, reminders, and emergency contacts where you actually need them.
      </p>

      <div class="mb-7 flex flex-wrap gap-2.5">
        <button
          type="button"
          @click="scrollToServices"
          class="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-[13px] font-bold text-slate-900 shadow-lg shadow-amber-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 active:translate-y-0"
        >
          Browse services
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          @click="goToBookings"
          class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
        >
          My bookings
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in ['🩺 Vet visits', '✂️ Grooming', '🎓 Training', '🚑 Emergency']"
          :key="tag"
          class="rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }
</style>
