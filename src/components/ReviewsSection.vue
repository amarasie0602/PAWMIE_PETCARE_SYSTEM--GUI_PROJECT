<script setup lang="ts">
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

const reviews: Review[] = [
  {
    id: 'r-1',
    name: 'Sarah Mitchell',
    petName: 'Biscuit',
    petType: 'Golden Retriever',
    location: 'New York, NY',
    rating: 5,
    service: 'Vet Appointment',
    review: 'Booked a same-day check-up for Biscuit. The vet already had his notes — first visit where he didn\'t hide under the chair.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'r-2',
    name: 'James Okonkwo',
    petName: 'Luna',
    petType: 'Persian Cat',
    location: 'Chicago, IL',
    rating: 5,
    service: 'Grooming Booking',
    review: 'Luna\'s coat mats easily. The groomer Pawmie matched us with actually read her file and went slow — huge difference.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'r-4',
    name: 'Tom Harrington',
    petName: 'Mochi',
    petType: 'Shih Tzu',
    location: 'Los Angeles, CA',
    rating: 5,
    service: 'Emergency Care',
    review: 'Mochi ate something bad at 1 am. One tap to emergency line, clinic on the phone in under three minutes.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'r-3',
    name: 'Priya Nair',
    petName: 'Rocky',
    petType: 'Labrador',
    location: 'Austin, TX',
    rating: 5,
    service: 'Training Services',
    review: 'Four sessions in, Rocky waits at the door instead of jumping on delivery drivers. Worth every minute.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'r-6',
    name: 'Daniel Fernandez',
    petName: 'Coco',
    petType: 'French Bulldog',
    location: 'Miami, FL',
    rating: 5,
    service: 'Vet Appointment',
    review: 'Vaccination reminders and past visit notes in one screen. I stopped keeping a spreadsheet for Coco.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'r-5',
    name: 'Anika Patel',
    petName: 'Oreo',
    petType: 'Beagle',
    location: 'Seattle, WA',
    rating: 4,
    service: 'Pet Marketplace',
    review: 'Ordered harness and food through the marketplace after booking grooming. Arrived fast, fit was spot on.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
  },
]

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

    <div class="mb-8 text-center">
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

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(review, i) in reviews"
        :key="review.id"
        class="flex flex-col rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/[0.07] dark:bg-slate-900/70"
      >
        <div class="mb-3 flex items-center justify-between">
          <p
            class="text-[10px] font-black uppercase tracking-[0.2em]"
            :class="serviceColours[review.service] ?? 'text-slate-400'"
          >
            {{ review.service }}
          </p>
          <div class="flex gap-0.5">
            <span
              v-for="n in 5"
              :key="n"
              class="text-sm"
              :class="n <= review.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'"
            >★</span>
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
</style>
