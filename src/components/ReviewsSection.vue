<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useScrollReveal } from '@/composables/useScrollReveal'

// ── DummyJSON user interface ──────────────────────────────────────────
interface DummyUser {
  id: number
  firstName: string
  lastName: string
  image: string
  address: { city: string; state: string }
}

interface DummyUsersResponse {
  users: DummyUser[]
  total: number
  skip: number
  limit: number
}

// ── Local review interface ────────────────────────────────────────────
interface Review {
  id: string
  name: string
  petName: string
  petType: string
  location: string
  rating: number
  service: string
  review: string
  avatar: string
}

// Static review content (text stays curated; only author info comes from API)
const reviewContent: Omit<Review, 'name' | 'location' | 'avatar'>[] = [
  { id: 'r-1', petName: 'Biscuit', petType: 'Golden Retriever', rating: 5, service: 'Vet Appointment',   review: 'Booked a same-day check-up for Biscuit. The vet already had his notes — first visit where he didn\'t hide under the chair.' },
  { id: 'r-2', petName: 'Luna',    petType: 'Persian Cat',      rating: 5, service: 'Grooming Booking',  review: 'Luna\'s coat mats easily. The groomer Pawmie matched us with actually read her file and went slow — huge difference.' },
  { id: 'r-3', petName: 'Mochi',   petType: 'Shih Tzu',         rating: 5, service: 'Emergency Care',    review: 'Mochi ate something bad at 1 am. One tap to emergency line, clinic on the phone in under three minutes.' },
  { id: 'r-4', petName: 'Rocky',   petType: 'Labrador',         rating: 5, service: 'Training Services', review: 'Four sessions in, Rocky waits at the door instead of jumping on delivery drivers. Worth every minute.' },
  { id: 'r-5', petName: 'Coco',    petType: 'French Bulldog',   rating: 5, service: 'Vet Appointment',   review: 'Vaccination reminders and past visit notes in one screen. I stopped keeping a spreadsheet for Coco.' },
  { id: 'r-6', petName: 'Oreo',    petType: 'Beagle',           rating: 4, service: 'Pet Marketplace',   review: 'Ordered harness and food through the marketplace after booking grooming. Arrived fast, fit was spot on.' },
]

const reviews = ref<Review[]>([])
const loading = ref(true)
const revealCards = useScrollReveal({ type: 'fade-up', delay: 80 })

onMounted(async () => {
  try {
    const res = await fetch('https://dummyjson.com/users?limit=6&select=id,firstName,lastName,image,address')
    if (!res.ok) throw new Error(`${res.status}`)
    const data: DummyUsersResponse = await res.json()
    reviews.value = data.users.map((user, i) => ({
      ...reviewContent[i]!,
      name:     `${user.firstName} ${user.lastName}`,
      location: `${user.address.city}, ${user.address.state}`,
      avatar:   user.image,
    }))
  } catch {
    // fallback: use static names if API fails
    reviews.value = reviewContent.map((r, i) => ({
      ...r,
      name:     ['Sarah Mitchell','James Okonkwo','Tom Harrington','Priya Nair','Daniel Fernandez','Anika Patel'][i] ?? 'Pet Parent',
      location: ['New York, NY','Chicago, IL','Los Angeles, CA','Austin, TX','Miami, FL','Seattle, WA'][i] ?? '',
      avatar:   `https://i.pravatar.cc/80?img=${i + 10}`,
    }))
  } finally {
    loading.value = false
  }
})

const revealCards  = useScrollReveal({ type: 'fade-up', delay: 80 })
const revealHeader = useScrollReveal({ type: 'fade-in' })

const serviceColours: Record<string, string> = {
  'Vet Appointment':   'text-indigo-500',
  'Grooming Booking':  'text-pink-500',
  'Training Services': 'text-emerald-600',
  'Emergency Care':    'text-rose-500',
  'Pet Marketplace':   'text-amber-500',
}
</script>

<template>
  <section class="pb-14 pt-4">

    <div :ref="revealHeader.ref" class="mb-8 text-center">
      <p class="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">Reviews</p>
      <h2 class="hero-heading mt-2 text-[2rem] font-black tracking-tight text-slate-900 dark:text-white">
        What pet parents say
      </h2>
      <div class="mt-3 flex items-center justify-center gap-2">
        <div class="flex gap-0.5">
          <span v-for="n in 5" :key="n" class="text-amber-400 text-lg">★</span>
        </div>
        <span class="text-[13px] font-bold text-slate-700 dark:text-slate-200">4.9 average</span>
        <span class="text-[12px] text-slate-400 dark:text-slate-500">· 2,400+ families</span>
      </div>
    </div>

    <!-- Skeleton while loading -->
    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 6" :key="n" class="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm dark:border-white/[0.07] dark:bg-slate-900/70">
        <div class="skeleton mb-3 h-3 w-1/3 rounded-lg" />
        <div class="skeleton mb-1 h-3 w-full rounded-lg" />
        <div class="skeleton mb-1 h-3 w-5/6 rounded-lg" />
        <div class="skeleton h-3 w-2/3 rounded-lg" />
        <div class="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
          <div class="skeleton h-9 w-9 rounded-full" />
          <div class="flex-1">
            <div class="skeleton mb-1 h-3 w-1/2 rounded-lg" />
            <div class="skeleton h-2.5 w-1/3 rounded-lg" />
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews grid -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        :ref="revealCards.add"
        :ref="revealCards.add"
        v-for="review in reviews"
        :key="review.id"
        class="flex flex-col rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/[0.07] dark:bg-slate-900/70"
      >
        <div class="mb-3 flex items-center justify-between">
          <p class="text-[10px] font-black uppercase tracking-[0.2em]" :class="serviceColours[review.service] ?? 'text-slate-400'">
            {{ review.service }}
          </p>
          <div class="flex gap-0.5">
            <span v-for="n in 5" :key="n" class="text-sm" :class="n <= review.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'">★</span>
          </div>
        </div>

        <p class="flex-1 text-[12px] leading-5 text-slate-600 dark:text-slate-300">
          "{{ review.review }}"
        </p>

        <div class="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
          <img
            :src="review.avatar"
            :alt="review.name"
            class="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
          />
          <div>
            <p class="text-[13px] font-bold text-slate-800 dark:text-white">{{ review.name }}</p>
            <p class="text-[11px] text-slate-400 dark:text-slate-500">
              {{ review.petName }} · {{ review.petType }}
            </p>
          </div>
        </div>
      </article>
    </div>

  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
.hero-heading { font-family: 'Playfair Display', Georgia, serif; }

@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s linear infinite;
  display: block;
}
:global(.dark) .skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s linear infinite;
}
</style>