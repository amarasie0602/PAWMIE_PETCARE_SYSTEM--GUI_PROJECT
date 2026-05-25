<script setup lang="ts">
import customerPets from '@/stores/customerPets.json'

interface CustomerPet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  ownerName: string
  city: string
  favoriteService: string
  imageUrl: string
}

const pets = customerPets as CustomerPet[]
const doubled = [...pets, ...pets, ...pets]

interface SpeciesConfig {
  emoji: string
  accent: string
}

const speciesConfig: Record<string, SpeciesConfig> = {
  Dog:    { emoji: '🐶', accent: '#6366f1' },
  Cat:    { emoji: '🐱', accent: '#ec4899' },
  Bird:   { emoji: '🦜', accent: '#10b981' },
  Rabbit: { emoji: '🐰', accent: '#f59e0b' },
}

const getConfig = (species: string): SpeciesConfig =>
  speciesConfig[species] ?? speciesConfig['Dog']!

const ownerQuotes: Record<string, string> = {
  'pet-1': "Pawmie made vet visits stress-free for Luna. I can't imagine life without it!",
  'pet-2': 'Zimba comes home looking like royalty after every grooming session.',
  'pet-3': 'Coco went from chaos to calm in just a few training sessions. Amazing!',
  'pet-4': 'Milo hops around so happily after every vet visit. Pawmie is a lifesaver!',
  'pet-5': 'Kiwi chirps louder than ever — Pawmie keeps him healthy and happy!',
  'pet-6': 'Max is so well-behaved now. The trainers Pawmie connects us with are brilliant.',
  'pet-7': 'Bella walks out of every grooming session looking like a show cat!',
  'pet-8': 'Daisy is the fluffiest, healthiest bunny thanks to Pawmie vets.',
  'pet-9': 'Rio has been with us 5 years. Pawmie makes his care so easy to manage.',
  'pet-10': 'Bruno finally sits still for grooming. Pawmie groomers have magic hands!',
  'pet-11': 'Nala is so calm and healthy. Pawmie vet reminders are a game changer.',
  'pet-12': 'Sunny sings every morning. Pawmie grooming keeps his feathers perfect!',
}
</script>

<template>
  <section class="relative overflow-hidden py-14">

    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <p class="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">Community</p>
        <h2 class="hero-heading mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white">
          Pets already on Pawmie
        </h2>
        <p class="mx-auto mt-2 max-w-md text-[13px] text-slate-500 dark:text-slate-400">
          Real families, real bookings — hover the ribbon to pause.
        </p>
      </div>
    </div>

    <div class="relative overflow-hidden py-2">
      <div
        class="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-36 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950 dark:to-transparent"
      />
      <div
        class="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-36 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950 dark:to-transparent"
      />

      <div class="ribbon-track px-4 sm:px-6">
        <article
          v-for="(pet, idx) in doubled"
          :key="`${pet.id}-${idx}`"
          class="ribbon-card group w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70 sm:w-[270px]"
        >
          <div class="relative h-40 overflow-hidden sm:h-44">
            <img
              :src="pet.imageUrl"
              :alt="pet.name"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <span
              class="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm shadow ring-1 ring-white/30 dark:bg-slate-900/90"
            >
              {{ getConfig(pet.species).emoji }}
            </span>
            <p class="absolute bottom-3 left-3 text-sm font-bold text-white drop-shadow">{{ pet.name }}</p>
            <div
              class="absolute inset-x-0 top-0 h-1"
              :style="{ backgroundColor: getConfig(pet.species).accent }"
            />
          </div>

          <div class="flex flex-col gap-2 p-4">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-[13px] font-bold text-slate-800 dark:text-white">{{ pet.name }}</h3>
              <span
                class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                :style="{
                  background: getConfig(pet.species).accent + '18',
                  color: getConfig(pet.species).accent,
                }"
              >
                {{ pet.species }}
              </span>
            </div>

            <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {{ pet.breed }} · {{ pet.age }} yr<span v-if="pet.age !== 1">s</span>
            </p>

            <p
              class="border-l-2 pl-2.5 text-[11px] italic leading-relaxed text-slate-600 dark:text-slate-300"
              :style="{ borderColor: getConfig(pet.species).accent }"
            >
              "{{ ownerQuotes[pet.id] ?? `${pet.ownerName} loves Pawmie!` }}"
            </p>

            <p class="text-[11px] text-slate-400 dark:text-slate-500">
              <span class="font-semibold text-slate-600 dark:text-slate-300">{{ pet.ownerName }}</span>
              · {{ pet.city }}
            </p>

            <span
              class="mt-0.5 inline-flex self-start items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              :style="{
                background: getConfig(pet.species).accent + '14',
                color: getConfig(pet.species).accent,
              }"
            >
              {{ pet.favoriteService }}
            </span>
          </div>
        </article>
      </div>
    </div>

  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }

.ribbon-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  animation: scroll-left 32s linear infinite;
}
.ribbon-track:hover {
  animation-play-state: paused;
}
.ribbon-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.ribbon-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px -8px rgb(15 23 42 / 0.15);
}
@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
</style>
