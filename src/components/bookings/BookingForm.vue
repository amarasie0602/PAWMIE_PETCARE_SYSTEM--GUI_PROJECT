<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'

const props = defineProps<{
  service?: string
  category?: string
  heading?: string
  notesPlaceholder?: string
  theme?: 'default' | 'emergency'
}>()

const router = useRouter()
const { addBooking } = useBookingStore()

const isEmergency = computed(() => props.theme === 'emergency')

const form = reactive({
  petName: '',
  ownerName: '',
  service: props.service ?? '',
  category: props.category ?? '',
  date: '',
  time: '',
  notes: '',
})

const inputClass = computed(() =>
  isEmergency.value
    ? 'w-full p-3 border rounded-lg bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition'
    : 'w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition'
)

const handleSubmit = () => {
  if (!form.petName || !form.ownerName || !form.service || !form.category || !form.date || !form.time) {
    alert('Please fill in all required fields.')
    return
  }

  addBooking({
    petName: form.petName,
    ownerName: form.ownerName,
    service: form.service,
    category: form.category,
    date: form.date,
    time: form.time,
    notes: form.notes || undefined,
  })

  alert('Booking saved (dummy data).')
  router.push('/my-bookings')
}
</script>

<template>
  <div
    :class="[
      'p-8 rounded-2xl shadow-xl w-full max-w-lg',
      isEmergency
        ? 'bg-slate-900/80 border border-rose-900/30 backdrop-blur-sm ring-1 ring-white/5'
        : 'bg-white dark:bg-gray-800'
    ]"
  >
    <!-- Heading -->
    <div class="mb-6 text-center">
      <span
        v-if="isEmergency"
        class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-400 ring-1 ring-rose-500/20"
      >
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400 inline-block" />
        Live Emergency Form
      </span>
      <h2
        :class="[
          'text-2xl font-bold',
          isEmergency ? 'text-white mt-2' : 'text-gray-900 dark:text-white'
        ]"
      >
        {{ heading || 'Book Service' }}
      </h2>
      <p v-if="isEmergency" class="mt-1 text-[12px] text-slate-400">
        Fill in quickly — nearby clinics will be notified immediately.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      <!-- Pet Name -->
      <div>
        <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
          Pet Name *
        </label>
        <input
          v-model="form.petName"
          type="text"
          :class="inputClass"
          placeholder="Enter your pet's name"
        />
      </div>

      <!-- Owner Name -->
      <div>
        <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
          Owner Name *
        </label>
        <input
          v-model="form.ownerName"
          type="text"
          :class="inputClass"
          placeholder="Enter your name"
        />
      </div>

      <!-- Service + Category -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
            Service *
          </label>
          <input
            v-model="form.service"
            type="text"
            :class="inputClass"
            placeholder="e.g. Emergency Care"
          />
        </div>
        <div>
          <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
            Category *
          </label>
          <input
            v-model="form.category"
            type="text"
            :class="inputClass"
            placeholder="e.g. Medical Care"
          />
        </div>
      </div>

      <!-- Date + Time -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
            Date *
          </label>
          <input
            v-model="form.date"
            type="date"
            :class="inputClass"
          />
        </div>
        <div>
          <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
            Time *
          </label>
          <input
            v-model="form.time"
            type="time"
            :class="inputClass"
          />
        </div>
      </div>

      <!-- Notes / Symptoms -->
      <div>
        <label :class="['block text-sm font-semibold mb-1', isEmergency ? 'text-slate-300' : 'text-gray-700 dark:text-gray-300']">
          {{ isEmergency ? 'Symptoms / Notes' : 'Notes' }}
        </label>
        <textarea
          v-model="form.notes"
          rows="3"
          :class="inputClass + ' resize-none'"
          :placeholder="notesPlaceholder ?? (isEmergency ? 'Describe your pet\'s symptoms (e.g. difficulty breathing, seizure, bleeding)' : 'Any special instructions for your pet')"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :class="[
          'w-full py-3 rounded-lg font-bold text-white transition-all duration-200 active:scale-[0.98] text-[15px]',
          isEmergency
            ? 'bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-900/40 hover:-translate-y-0.5'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90'
        ]"
      >
        {{ isEmergency ? '🚑 Confirm Emergency Visit' : 'Confirm Booking' }}
      </button>

    </form>
  </div>
</template>

<style scoped></style>