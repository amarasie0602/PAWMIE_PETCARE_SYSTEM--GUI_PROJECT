<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useScrollReveal } from '@/composables/useScrollReveal'
import heroImage  from '@/assets/about-hero.jpeg'
import storyImage from '@/assets/about-story.jpg'

// ── Static data ───────────────────────────────────────────────────
const stats = [
  { val: '12,400+', label: 'Happy pets served', icon: '🐾' },
  { val: '340+',    label: 'Trusted sitters',   icon: '🏅' },
  { val: '18',      label: 'Cities & growing',  icon: '📍' },
  { val: '4.9★',    label: 'Average rating',    icon: '⭐' },
]

type PrincipleColour = 'indigo' | 'emerald' | 'pink' | 'rose'

const principles: { icon: string; colour: PrincipleColour; title: string; body: string }[] = [
  {
    icon:    '🛡️',
    colour:  'indigo',
    title:   'Trust above everything',
    body:    'Every sitter passes background checks, reference calls, and a supervised trial visit before they ever meet your pet.',
  },
  {
    icon:    '📸',
    colour:  'emerald',
    title:   'Radical transparency',
    body:    'Real-time photo updates and GPS check-ins keep you in the loop — wherever you are, whatever you\'re doing.',
  },
  {
    icon:    '⚡',
    colour:  'pink',
    title:   'Effortless booking',
    body:    'Every screen is designed to feel calm and clear — even when you\'re booking at 11 pm in a mild panic.',
  },
  {
    icon:    '💛',
    colour:  'rose',
    title:   'Genuine animal care',
    body:    'We only work with sitters who treat pets exactly as their own. Because yours deserves nothing less.',
  },
]

const principleColours: Record<PrincipleColour, { badge: string; ring: string; dot: string }> = {
  indigo:  { badge: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',  ring: 'ring-indigo-200 dark:ring-indigo-500/20',  dot: 'bg-indigo-400' },
  emerald: { badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', ring: 'ring-emerald-200 dark:ring-emerald-500/20', dot: 'bg-emerald-400' },
  pink:    { badge: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300',   ring: 'ring-pink-200 dark:ring-pink-500/20',   dot: 'bg-pink-400' },
  rose:    { badge: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',   ring: 'ring-rose-200 dark:ring-rose-500/20',   dot: 'bg-rose-400' },
}

const faqs = [
  { q: 'How do I ask about my booking?',        a: 'Our team can help with booking details, appointment changes, and service information anytime through the app or hotline.' },
  { q: 'Can I ask about grooming services?',    a: 'Absolutely — ask us about packages, available time slots, and the best care option for your pet\'s coat type.' },
  { q: 'Is Pawmie available for emergencies?',  a: 'Yes. Our 24/7 emergency line connects you to nearby clinics instantly — no form needed, just call.' },
  { q: 'How are sitters verified?',             a: 'Every sitter goes through identity checks, reference calls, and a supervised trial visit before joining the network.' },
  { q: 'What pets does Pawmie support?',        a: 'Primarily dogs and cats, with select sitters experienced in rabbits, birds, and small animals.' },
  { q: 'Can I track past appointments?',        a: 'Yes — all your bookings live in My Bookings, grouped by category with dates and notes.' },
]

// ── Team via randomuser.me ────────────────────────────────────────
interface TeamMember { name: string; role: string; location: string; photo: string }
const revealStats      = useScrollReveal({ type: 'fade-up',  delay: 80 })
const revealStory      = useScrollReveal({ type: 'fade-in' })
const revealPrinciples = useScrollReveal({ type: 'fade-up', delay: 90 })
const revealTeam       = useScrollReveal({ type: 'fade-up', delay: 80 })
const revealFaqs       = useScrollReveal({ type: 'fade-up', delay: 70 })

const team = ref<TeamMember[]>([])
const teamLoading = ref(true)

const revealStats      = useScrollReveal({ type: 'fade-up',  delay: 80 })
const revealStory      = useScrollReveal({ type: 'fade-in' })
const revealPrinciples = useScrollReveal({ type: 'fade-up',  delay: 90 })
const revealTeam       = useScrollReveal({ type: 'fade-up',  delay: 90 })
const revealFaq        = useScrollReveal({ type: 'fade-up',  delay: 70 })
const teamError   = ref<string | null>(null)

const roles = ['Co-founder & CEO', 'Head of Vet Partnerships', 'Lead Product Designer', 'Head of Sitter Operations']

onMounted(async () => {
  try {
    const res = await fetch('https://randomuser.me/api/?results=4&inc=name,picture,location,login&nat=us,gb,au,ca')
    if (!res.ok) throw new Error(`${res.status}`)
    const d = await res.json()
    team.value = d.results.map((u: any, i: number) => ({
      name:     `${u.name.first} ${u.name.last}`,
      role:     roles[i] ?? 'Team Member',
      location: `${u.location.city}, ${u.location.country}`,
      photo:    u.picture.large,
    }))
  } catch {
    teamError.value = 'Could not load team members. Please try again later.'
  } finally {
    teamLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="relative -mt-20 h-[750px] overflow-hidden">
      <img
        :src="heroImage"
        alt="Happy cat and dog together"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />

      <div class="absolute left-6 top-[52%] z-10 max-w-lg -translate-y-1/2 sm:max-w-xl lg:left-14 lg:max-w-2xl xl:left-20">
        <span class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-sm">
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
          Our Story
        </span>
        <h1 class="hero-heading mb-4 text-[2.6rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[3.4rem]">
          Built by pet lovers,<br/>
          <span class="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent italic">for pet lovers.</span>
        </h1>
        <p class="mb-7 max-w-md text-[14px] leading-7 text-white/75">
          Pawmie started with one simple belief — every pet deserves stress-free care, and every pet parent deserves complete peace of mind.
        </p>
        <div class="flex flex-wrap gap-2.5">
          <span v-for="tag in ['🐶 Dog Care', '🐱 Cat Care', '✂️ Grooming', '🐾 Pet Support']" :key="tag"
            class="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[12px] font-semibold text-white backdrop-blur-sm">
            {{ tag }}
          </span>
        </div>
      </div>
    </section>

    <!-- ─── CONTENT WRAPPER ──────────────────────────────────────── -->
    <div class="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">

      <!-- ── STATS STRIP ─────────────────────────────────────────── -->
      <div class="relative -mt-6 mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div
          :ref="revealStats.add"
          :ref="revealStats.add"
          v-for="stat in stats" :key="stat.label"
          class="rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
        >
          <p class="text-2xl">{{ stat.icon }}</p>
          <p class="mt-2 font-mono text-[1.45rem] font-black tabular-nums text-slate-900 dark:text-white">{{ stat.val }}</p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ stat.label }}</p>
        </div>
      </div>

      <!-- ── OUR STORY ───────────────────────────────────────────── -->
      <section :ref="revealStory.ref" class="mb-10">
        <div class="mb-6 text-center">
          <p class="text-[10px] font-black uppercase tracking-[0.28em] text-amber-500">The Origin</p>
          <h2 class="mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white hero-heading">How Pawmie came to life</h2>
        </div>

        <div :ref="revealStory.add" class="grid gap-4 lg:grid-cols-[1fr_400px] lg:items-stretch">
          <!-- Story image — stretches to match right column height -->
          <div class="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70 min-h-[280px]">
            <img
              :src="storyImage"
              alt="Woman cuddling a golden retriever puppy outdoors"
              class="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <!-- Floating year badge -->
            <div class="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-black/60 px-5 py-3 backdrop-blur-sm">
              <p class="hero-heading text-[2rem] font-black italic leading-none text-white">2021</p>
              <p class="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/60">San Francisco</p>
            </div>
          </div>

          <!-- Story cards -->
          <div class="flex flex-col gap-4">
            <!-- Narrative -->
            <div class="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70">
              <p class="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-3">The spark</p>
              <p class="text-[14px] leading-7 text-slate-700 dark:text-slate-300">
                It started with <span class="font-bold text-slate-900 dark:text-white">Milo</span> — a golden retriever who absolutely hated kennels. His owner Maya spent weeks calling sitters, getting ghosted, and leaving Milo with a neighbour she barely knew. Maya and co-founder Ravi spent six months interviewing pet parents, sitters, and vets before writing a single line of code. Today, thousands of pets across 18 cities come home happy every week.
              </p>
            </div>

            <!-- Fact cards -->
            <div
              v-for="fact in [
                { icon: '🐾', title: 'Pet-first, always',    body: 'Every decision we make starts with one question: is this good for the animals?' },
                { icon: '🔍', title: 'Rigorous vetting',     body: 'Background checks, reference calls, and a trial visit before any sitter meets your pet.' },
                { icon: '📍', title: 'Real-time visibility', body: 'Live GPS check-ins and photo updates so you\'re never in the dark.' },
              ]"
              :key="fact.title"
              class="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
            >
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg dark:bg-slate-800">{{ fact.icon }}</span>
              <div>
                <p class="text-[13px] font-bold text-slate-800 dark:text-white">{{ fact.title }}</p>
                <p class="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ fact.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PRINCIPLES ──────────────────────────────────────────── -->
      <section class="mb-10">
        <div class="mb-6 text-center">
          <p class="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">Our Principles</p>
          <h2 class="mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white hero-heading">What guides every Pawmie screen</h2>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            :ref="revealPrinciples.add"
          :ref="revealPrinciples.add"
            v-for="p in principles" :key="p.title"
            class="group flex flex-col gap-4 rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <!-- Icon badge -->
            <span
              class="flex h-11 w-11 items-center justify-center rounded-xl text-xl ring-1"
              :class="[principleColours[p.colour].badge, principleColours[p.colour].ring]"
            >
              {{ p.icon }}
            </span>
            <!-- Accent dot -->
            <span class="h-1 w-8 rounded-full transition-all duration-300 group-hover:w-14" :class="principleColours[p.colour].dot" />
            <div>
              <p class="text-[14px] font-black text-slate-800 dark:text-white">{{ p.title }}</p>
              <p class="mt-1.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ p.body }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── TEAM ────────────────────────────────────────────────── -->
      <section class="mb-10">
        <div class="mb-6 text-center">
          <p class="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">The People</p>
          <h2 class="mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white hero-heading">The team behind Pawmie</h2>
          <p class="mt-2 text-[13px] text-slate-500 dark:text-slate-400">Small team. Big love for animals.</p>
        </div>

        <!-- Skeleton -->
        <div v-if="teamLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="n in 4" :key="n" class="overflow-hidden rounded-2xl border border-white/60 bg-white/80 dark:border-white/[0.07] dark:bg-slate-900/70">
            <div class="skeleton h-64 w-full" />
            <div class="space-y-2 p-5">
              <div class="skeleton h-3.5 w-3/5 rounded-lg" />
              <div class="skeleton h-2.5 w-2/5 rounded-lg" />
            </div>
          </div>
        </div>

        <!-- Error -->
        <p v-else-if="teamError" class="text-center text-[13px] text-rose-500">{{ teamError }}</p>

        <!-- Team grid -->
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            :ref="revealTeam.add"
          :ref="revealTeam.add"
            v-for="(member, i) in team" :key="member.name"
            class="group overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <!-- Photo -->
            <div class="relative h-64 overflow-hidden">
              <img
                :src="member.photo"
                :alt="member.name"
                class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Bottom gradient + location -->
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p class="text-[11px] font-semibold text-white/80">📍 {{ member.location }}</p>
              </div>
              <!-- Service colour strip at top matching index → service colours -->
              <div class="absolute inset-x-0 top-0 h-1"
                :class="[['bg-indigo-500','bg-pink-500','bg-emerald-500','bg-rose-500'][i] ?? 'bg-slate-400']"
              />
            </div>
            <!-- Info -->
            <div class="px-5 py-4">
              <p class="text-[14px] font-black text-slate-900 dark:text-white">{{ member.name }}</p>
              <p class="mt-0.5 text-[10px] font-bold uppercase tracking-widest"
                :class="[['text-indigo-500','text-pink-500','text-emerald-600','text-rose-500'][i] ?? 'text-slate-400']">
                {{ member.role }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── FAQ ─────────────────────────────────────────────────── -->
      <section>
        <div class="mb-6 text-center">
          <p class="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">Common Questions</p>
          <h2 class="mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white hero-heading">Things pet parents often ask</h2>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div
            :ref="revealFaqs.add"
          :ref="revealFaq.add"
            v-for="(faq, i) in faqs" :key="faq.q"
            class="group rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/[0.07] dark:bg-slate-900/70"
          >
            <!-- Coloured question number -->
            <p class="mb-3 text-[10px] font-black uppercase tracking-[0.2em]"
              :class="[['text-indigo-500','text-pink-500','text-emerald-600','text-rose-500','text-amber-500','text-sky-500'][i] ?? 'text-slate-400']">
              Q{{ String(i + 1).padStart(2, '0') }}
            </p>
            <p class="text-[13px] font-bold leading-snug text-slate-800 dark:text-white">{{ faq.q }}</p>
            <p class="mt-2 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ faq.a }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }

/* Skeleton shimmer */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s linear infinite;
  border-radius: 8px;
  display: block;
}
:global(.dark) .skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s linear infinite;
}
</style>