<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'

const router = useRouter()

const revealHeader   = useScrollReveal({ type: 'fade-in' })
const revealServices = useScrollReveal({ type: 'fade-up', delay: 90 })

type ServiceColour = 'indigo' | 'pink' | 'emerald' | 'rose' | 'amber'

interface Service {
  title: string
  description: string
  icon: string
  ctaType: string
  colour: ServiceColour
  route?: string
}

const services: Service[] = [
  {
    title: 'Vet Appointment',
    description: 'Routine check-ups, vaccines, and follow-ups with vetted clinics near you.',
    icon: '🩺',
    ctaType: 'booking',
    colour: 'indigo',
    route: '/services/vet-appointment',
  },
  {
    title: 'Emergency Care',
    description: '24/7 line to nearby emergency vets — call first, forms optional.',
    icon: '🚑',
    ctaType: 'booking',
    colour: 'rose',
    route: '/services/emergency-care',
  },
  {
    title: 'Grooming Booking',
    description: 'Bath, trim, and coat care with groomers who handle anxious pets gently.',
    icon: '✂️',
    ctaType: 'booking',
    colour: 'pink',
    route: '/services/grooming-booking',
  },
  {
    title: 'Training Services',
    description: 'Puppy basics to behaviour fixes — matched trainers, clear session goals.',
    icon: '🎓',
    ctaType: 'booking',
    colour: 'emerald',
    route: '/services/training-services',
  },
]

const moreLinks = [
  { label: 'Pet care tips', path: '/tips', icon: '📚' },
  { label: 'Adoption', path: '/adoption', icon: '🐶' },
  { label: 'Marketplace', path: '/marketplace', icon: '🛒' },
]

const colourMap: Record<ServiceColour, { badge: string; ring: string; dot: string; btn: string }> = {
  indigo:  { badge: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',  ring: 'ring-indigo-200 dark:ring-indigo-500/20',  dot: 'bg-indigo-400',  btn: 'text-indigo-600 dark:text-indigo-300' },
  pink:    { badge: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300',       ring: 'ring-pink-200 dark:ring-pink-500/20',       dot: 'bg-pink-400',    btn: 'text-pink-600 dark:text-pink-300' },
  emerald: { badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', ring: 'ring-emerald-200 dark:ring-emerald-500/20', dot: 'bg-emerald-400', btn: 'text-emerald-600 dark:text-emerald-300' },
  rose:    { badge: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',       ring: 'ring-rose-200 dark:ring-rose-500/20',       dot: 'bg-rose-400',    btn: 'text-rose-600 dark:text-rose-300' },
  amber:   { badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',   ring: 'ring-amber-200 dark:ring-amber-500/20',     dot: 'bg-amber-400',   btn: 'text-amber-600 dark:text-amber-300' },
}

function openService(service: Service) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (service.ctaType === 'booking' && !isAuthenticated) {
    router.push('/login')
    return
  }
  if (service.route) {
    router.push(service.route)
  }
}

function openMore(path: string) {
  const needsAuth = path === '/marketplace'
  if (needsAuth && localStorage.getItem('isAuthenticated') !== 'true') {
    router.push('/login')
    return
  }
  router.push(path)
}
</script>

<template>
  <section id="services" class="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">

    <div :ref="revealHeader.add" class="mb-8 text-center">
      <p class="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">Services</p>
      <h2 class="hero-heading mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white">
        What you can book today
      </h2>
      <p class="mx-auto mt-2 max-w-lg text-[13px] text-slate-500 dark:text-slate-400">
        Four core services — each with its own booking flow, so you never fill the wrong form.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <article
        :ref="revealServices.add"
          v-for="service in services"
        :key="service.title"
        class="group flex flex-col gap-4 rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/[0.07] dark:bg-slate-900/70"
      >
        <div class="flex items-start justify-between gap-3">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ring-1"
            :class="[colourMap[service.colour].badge, colourMap[service.colour].ring]"
          >
            {{ service.icon }}
          </span>
          <span class="h-1 w-8 rounded-full transition-all duration-300 group-hover:w-14" :class="colourMap[service.colour].dot" />
        </div>

        <div class="flex-1">
          <h3 class="text-[15px] font-black text-slate-800 dark:text-white">{{ service.title }}</h3>
          <p class="mt-1.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ service.description }}</p>
        </div>

        <button
          type="button"
          @click="openService(service)"
          class="self-start text-[12px] font-bold transition hover:opacity-80"
          :class="colourMap[service.colour].btn"
        >
          Book now →
        </button>
      </article>
    </div>

    <!-- Secondary links -->
    <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Also explore</span>
      <button
        v-for="link in moreLinks"
        :key="link.path"
        type="button"
        @click="openMore(link.path)"
        class="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3.5 py-1.5 text-[12px] font-semibold text-slate-600 backdrop-blur-sm transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-white/20"
      >
        <span>{{ link.icon }}</span>
        {{ link.label }}
      </button>
    </div>

  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }
</style>