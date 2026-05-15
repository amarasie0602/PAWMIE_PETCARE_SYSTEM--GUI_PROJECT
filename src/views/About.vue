<script setup lang="ts">
import aboutContent from '@/stores/aboutContent.json'

interface AboutStat {
  label: string
  value: string
}

interface AboutValue {
  id: string
  title: string
  description: string
}

interface AboutStory {
  heading: string
  paragraphs: string[]
}

interface AboutTeamMember {
  id: string
  name: string
  role: string
  bio: string
}

interface AboutData {
  hero: {
    title: string
    subtitle: string
    badge: string
  }
  stats: AboutStat[]
  values: AboutValue[]
  story: AboutStory
  team: AboutTeamMember[]
}

const data = aboutContent as AboutData
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Hero -->
      <section class="text-center mb-14">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
          {{ data.hero.badge }}
        </span>
        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {{ data.hero.title }}
        </h1>
        <p class="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {{ data.hero.subtitle }}
        </p>
      </section>

      <!-- Stats -->
      <section class="grid gap-4 sm:grid-cols-3 mb-14">
        <div
          v-for="stat in data.stats"
          :key="stat.label"
          class="rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/70 p-5 text-center shadow-sm"
        >
          <p class="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400 dark:text-slate-500 mb-1">
            {{ stat.label }}
          </p>
          <p class="text-2xl font-extrabold text-slate-900 dark:text-white">
            {{ stat.value }}
          </p>
        </div>
      </section>

      <!-- Values + Story -->
      <section class="grid gap-10 lg:grid-cols-[1.2fr,1.1fr] items-start mb-16">

        <!-- Values -->
        <div class="space-y-5">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            What guides every Pawmie screen
          </h2>
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
            These principles shape how we design bookings, flows, and the overall experience for pet parents.
          </p>
          <div class="space-y-4">
            <article
              v-for="value in data.values"
              :key="value.id"
              class="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 p-4 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200"
            >
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                {{ value.title }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {{ value.description }}
              </p>
            </article>
          </div>
        </div>

        <!-- Story -->
        <div class="rounded-3xl bg-white/90 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-lg">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {{ data.story.heading }}
          </h2>
          <div class="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p v-for="(paragraph, index) in data.story.paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          The team behind Pawmie
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 text-center mb-8">
          Small team, big love for animals.
        </p>
        <div class="grid gap-6 sm:grid-cols-2">
          <article
            v-for="member in data.team"
            :key="member.id"
            class="rounded-2xl bg-white/90 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200"
          >
            <!-- Avatar placeholder -->
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {{ member.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <h3 class="text-base font-semibold text-slate-900 dark:text-white leading-tight">
                  {{ member.name }}
                </h3>
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
                  {{ member.role }}
                </p>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ member.bio }}
            </p>
          </article>
        </div>
      </section>

    </div>
  </div>
</template>