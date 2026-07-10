<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore, type Booking } from '@/stores/bookingStore'
import { useToast } from '@/composables/useToast'

const bookingStore = useBookingStore()
const { myGroupedByCategory } = storeToRefs(bookingStore)
const { removeBooking } = bookingStore
const toast = useToast()

function handleRemove(booking: Booking) {
  removeBooking(booking.id)
  toast.success(`Cancelled the ${booking.service} booking for ${booking.petName}.`)
}

const searchQuery = ref('')

const allCategories = computed(() => Object.entries(myGroupedByCategory.value))

const categories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return allCategories.value

  return allCategories.value
    .map(([categoryName, bookings]): [string, Booking[]] => [
      categoryName,
      bookings.filter(b =>
        b.petName.toLowerCase().includes(query) ||
        b.ownerName.toLowerCase().includes(query) ||
        b.service.toLowerCase().includes(query)
      ),
    ])
    .filter(([, bookings]) => bookings.length > 0)
})

const totalBookings = computed(() =>
  allCategories.value.reduce((sum, [, bookings]) => sum + bookings.length, 0)
)

const hasAnyBookings = computed(() => allCategories.value.length > 0)

// Per-category colour + icon config — matches the service page themes
const categoryConfig: Record<string, { icon: string; accent: string; badge: string; dot: string }> = {
  'Medical Care': {
    icon:   '🩺',
    accent: 'text-indigo-600 dark:text-indigo-400',
    badge:  'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-indigo-500/20',
    dot:    'bg-indigo-400',
  },
  'Grooming & Training': {
    icon:   '✂️',
    accent: 'text-pink-600 dark:text-pink-400',
    badge:  'bg-pink-50 text-pink-600 ring-1 ring-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:ring-pink-500/20',
    dot:    'bg-pink-400',
  },
  'Emergency Care': {
    icon:   '🚑',
    accent: 'text-rose-600 dark:text-rose-400',
    badge:  'bg-rose-50 text-rose-600 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-500/20',
    dot:    'bg-rose-400',
  },
}

const fallbackConfig = {
  icon:   '📋',
  accent: 'text-slate-600 dark:text-slate-400',
  badge:  'bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600',
  dot:    'bg-slate-400',
}

function getCfg(category: string) {
  return categoryConfig[category] ?? fallbackConfig
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(timeStr: string): string {
  if (!timeStr) return '—'
  const parts = timeStr.split(':')
  const h = parseInt(parts[0] ?? '0', 10)
  const m = parseInt(parts[1] ?? '0', 10)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

    <!-- ─── PAGE HEADER ─────────────────────────────────────────── -->
    <div class="border-b border-slate-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-slate-900/70">
      <div class="mx-auto max-w-5xl px-4 pb-6 pt-28 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">Pawmie</p>
            <h1 class="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">My Bookings</h1>
            <p class="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">All your upcoming and past appointments in one place.</p>
          </div>
          <!-- Summary pill -->
          <div
            v-if="totalBookings > 0"
            class="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-800/70"
          >
            <span class="text-lg">📅</span>
            <div>
              <p class="text-[18px] font-black tabular-nums leading-none text-slate-900 dark:text-white">{{ totalBookings }}</p>
              <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total bookings</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── CONTENT ────────────────────────────────────────────── -->
    <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6">

      <!-- ── SEARCH ────────────────────────────────────────────── -->
      <div v-if="hasAnyBookings" class="relative mb-6">
        <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by pet, owner, or service…"
          class="w-full rounded-2xl border border-slate-200/70 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm backdrop-blur-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/50 dark:border-white/[0.07] dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
        />
      </div>

      <!-- ── EMPTY STATE: no bookings at all ──────────────────── -->
      <div
        v-if="!hasAnyBookings"
        class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-8 py-20 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/40"
      >
        <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-800">
          📭
        </div>
        <h2 class="text-[18px] font-black text-slate-800 dark:text-white">No bookings yet</h2>
        <p class="mt-2 max-w-xs text-[13px] leading-6 text-slate-500 dark:text-slate-400">
          Head to any service page and hit <span class="font-bold text-slate-700 dark:text-slate-200">Book Now</span> to create your first appointment.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-2">
          <a v-for="link in [
              { label: '🩺 Vet Appointment', href: '/services/vet-appointment' },
              { label: '✂️ Grooming', href: '/services/grooming-booking' },
              { label: '🎓 Training', href: '/services/training-services' },
              { label: '🚑 Emergency', href: '/services/emergency-care' },
            ]"
            :key="link.href"
            :href="link.href"
            class="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[12px] font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {{ link.label }}
          </a>
        </div>
      </div>

      <!-- ── EMPTY STATE: search matched nothing ──────────────── -->
      <div
        v-else-if="categories.length === 0"
        class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-8 py-16 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/40"
      >
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
          🔍
        </div>
        <h2 class="text-[16px] font-black text-slate-800 dark:text-white">No matching bookings</h2>
        <p class="mt-2 max-w-xs text-[13px] leading-6 text-slate-500 dark:text-slate-400">
          Try a different pet name, owner, or service.
        </p>
      </div>

      <!-- ── BOOKING GROUPS ───────────────────────────────────── -->
      <div v-else class="space-y-6">
        <section
          v-for="[categoryName, bookings] in categories"
          :key="categoryName"
          class="overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/[0.07] dark:bg-slate-900/70"
        >
          <!-- Section header -->
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/[0.06]">
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg dark:bg-slate-800">
                {{ getCfg(categoryName).icon }}
              </span>
              <div>
                <p class="text-[10px] font-black uppercase tracking-[0.2em]" :class="getCfg(categoryName).accent">
                  {{ categoryName }}
                </p>
                <p class="text-[14px] font-black text-slate-800 dark:text-white">
                  {{ bookings.length }} {{ bookings.length === 1 ? 'booking' : 'bookings' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Booking rows -->
          <ul class="divide-y divide-slate-100 dark:divide-white/[0.05]">
            <li
              v-for="booking in bookings"
              :key="booking.id"
              class="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <!-- Left: service + pet + notes -->
              <div class="flex items-start gap-3.5">
                <!-- Coloured dot -->
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full" :class="getCfg(categoryName).dot" />
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <p class="text-[14px] font-bold text-slate-800 dark:text-white">{{ booking.service }}</p>
                    <span class="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide" :class="getCfg(categoryName).badge">
                      🐾 {{ booking.petName }}
                    </span>
                  </div>
                  <p class="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">
                    Owner: <span class="font-semibold text-slate-700 dark:text-slate-300">{{ booking.ownerName }}</span>
                    <template v-if="booking.notes">
                      <span class="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                      <span class="italic">{{ booking.notes }}</span>
                    </template>
                  </p>
                </div>
              </div>

              <!-- Right: date + time + cancel -->
              <div class="ml-5 flex shrink-0 items-center gap-2 sm:ml-0">
                <div class="rounded-xl border border-slate-200/70 bg-slate-50 px-3.5 py-2 text-right dark:border-white/[0.07] dark:bg-slate-800/60">
                  <p class="text-[13px] font-bold tabular-nums text-slate-800 dark:text-white">{{ formatDate(booking.date) }}</p>
                  <p class="text-[11px] font-semibold tabular-nums text-slate-400 dark:text-slate-500">{{ formatTime(booking.time) }}</p>
                </div>
                <button
                  type="button"
                  title="Cancel booking"
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-500 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-900/10 dark:text-rose-400 dark:hover:bg-rose-900/20"
                  @click="handleRemove(booking)"
                >
                  ✕
                </button>
              </div>
            </li>
          </ul>
        </section>
      </div>

    </div>
  </div>
</template>