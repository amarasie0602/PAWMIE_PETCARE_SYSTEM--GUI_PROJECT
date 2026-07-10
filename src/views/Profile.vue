<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuth } from '@/composables/useAuth'
import { useBookingStore } from '@/stores/bookingStore'

const { getUser } = useAuth()
const user = getUser()

const bookingStore = useBookingStore()
const { myGroupedByCategory } = storeToRefs(bookingStore)

const totalBookings = computed(() =>
  Object.values(myGroupedByCategory.value).reduce((sum, list) => sum + list.length, 0)
)

const categoryCount = computed(() => Object.keys(myGroupedByCategory.value).length)
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
    <div v-if="user" class="space-y-6">
      <!-- Header card -->
      <div class="flex items-center gap-5 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/[0.07] dark:bg-slate-900/70">
        <img
          :src="user.image"
          :alt="`${user.firstName} ${user.lastName}`"
          class="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
        />
        <div class="min-w-0">
          <p class="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">Pawmie Profile</p>
          <h1 class="mt-1 truncate text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {{ user.firstName }} {{ user.lastName }}
          </h1>
          <p class="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">@{{ user.username }}</p>
        </div>
      </div>

      <!-- Account details -->
      <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/[0.07] dark:bg-slate-900/70">
        <p class="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">Account details</p>
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email</dt>
            <dd class="mt-0.5 text-sm font-semibold text-slate-800 dark:text-white">{{ user.email }}</dd>
          </div>
          <div>
            <dt class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Username</dt>
            <dd class="mt-0.5 text-sm font-semibold text-slate-800 dark:text-white">{{ user.username }}</dd>
          </div>
          <div>
            <dt class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Gender</dt>
            <dd class="mt-0.5 text-sm font-semibold capitalize text-slate-800 dark:text-white">{{ user.gender }}</dd>
          </div>
        </dl>
      </div>

      <!-- Booking stats -->
      <div class="grid grid-cols-2 gap-4">
        <div class="rounded-2xl border border-slate-200/70 bg-white p-5 text-center shadow-sm dark:border-white/[0.07] dark:bg-slate-900/70">
          <p class="text-2xl font-black tabular-nums text-slate-900 dark:text-white">{{ totalBookings }}</p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total bookings</p>
        </div>
        <div class="rounded-2xl border border-slate-200/70 bg-white p-5 text-center shadow-sm dark:border-white/[0.07] dark:bg-slate-900/70">
          <p class="text-2xl font-black tabular-nums text-slate-900 dark:text-white">{{ categoryCount }}</p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Service categories used</p>
        </div>
      </div>

      <router-link
        to="/my-bookings"
        class="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        View My Bookings
      </router-link>
    </div>

    <div v-else class="py-24 text-center text-sm text-slate-500 dark:text-slate-400">
      Could not load your profile. Try logging in again.
    </div>
  </main>
</template>
