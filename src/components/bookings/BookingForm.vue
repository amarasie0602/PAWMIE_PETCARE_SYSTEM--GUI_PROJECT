<script setup lang="ts">
import { reactive, computed, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'

const props = defineProps<{
  service?: string
  category?: string
  heading?: string
  notesPlaceholder?: string
  theme?: 'default' | 'emergency' | 'grooming' | 'vet'
}>()

const router = useRouter()
const { addBooking } = useBookingStore()

const isEmergency = computed(() => props.theme === 'emergency')
const isGrooming   = computed(() => props.theme === 'grooming')
const isVet        = computed(() => props.theme === 'vet')
const isStyled     = computed(() => isEmergency.value || isGrooming.value || isVet.value)

const form = reactive({
  petName: '',
  ownerName: '',
  service: props.service ?? '',
  category: props.category ?? '',
  date: '',
  time: '',
  notes: '',
})

const inputClass = computed(() => {
  if (isEmergency.value)
    return 'w-full p-3 border rounded-lg bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition'
  if (isGrooming.value)
    return 'w-full p-3 border rounded-lg bg-white/10 border-pink-300/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition'
  if (isVet.value)
    return 'w-full p-3 border rounded-lg bg-white/10 border-indigo-300/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition'
  return 'w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition'
})

// ── Tracker ────────────────────────────────────────────────────────
const tracking         = ref(false)
const submittedPetName = ref('')
const assignedClinic   = ref('')
const currentStage     = ref(0)
const etaSeconds       = ref(0)

const CLINIC_NAMES = [
  'Colombo Pet Clinic',
  'PawCare Animal Hospital',
  'VetPlus Colombo',
  'Animal Medical Centre',
]

const stages = computed(() => [
  { label: 'Visit Logged',      icon: '✅', detail: 'Your request has been received.'                         },
  { label: 'Notifying Clinics', icon: '📡', detail: 'Searching for nearby available vets...'                  },
  { label: 'Clinic Confirmed',  icon: '🏥', detail: `${assignedClinic.value} has accepted your request.`      },
  { label: 'Team En Route',     icon: '🚗', detail: 'The vet team is heading to you now.'                     },
])

let countdownTimer: ReturnType<typeof setInterval> | null = null
const stageTimeouts: ReturnType<typeof setTimeout>[] = []

function clearTimers() {
  if (countdownTimer) clearInterval(countdownTimer)
  stageTimeouts.forEach(t => clearTimeout(t))
  stageTimeouts.length = 0
}

// ── FIX: closing brace was misplaced, body was outside the function ─
function startTracker(petName: string) {
  submittedPetName.value = petName
  assignedClinic.value   = CLINIC_NAMES[Math.floor(Math.random() * CLINIC_NAMES.length)] ?? 'Nearby Clinic'
  tracking.value         = true
  currentStage.value     = 0
  etaSeconds.value       = 8 * 60

  countdownTimer = setInterval(() => {
    if (etaSeconds.value > 0) {
      etaSeconds.value--
    } else {
      clearInterval(countdownTimer!)
    }
  }, 1000)

  const delays = [2000, 5000, 9000]
  delays.forEach((delay, i) => {
    stageTimeouts.push(
      setTimeout(() => { currentStage.value = i + 1 }, delay)
    )
  })
}

// ── Cancel: stop timers, hide tracker, reset form ─────────────────
function cancelTracking() {
  clearTimers()
  tracking.value = false
  submittedPetName.value = ''
  assignedClinic.value   = ''
  currentStage.value     = 0
  etaSeconds.value       = 0
  // Reset form back to initial values so the user can re-submit
  form.petName   = ''
  form.ownerName = ''
  form.service   = props.service ?? ''
  form.category  = props.category ?? ''
  form.date      = ''
  form.time      = ''
  form.notes     = ''
}

function formatETA(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

onUnmounted(clearTimers)

// ── Submit ─────────────────────────────────────────────────────────
const handleSubmit = () => {
  if (!form.petName || !form.ownerName || !form.service || !form.category || !form.date || !form.time) {
    alert('Please fill in all required fields.')
    return
  }

  addBooking({
    petName:   form.petName,
    ownerName: form.ownerName,
    service:   form.service,
    category:  form.category,
    date:      form.date,
    time:      form.time,
    notes:     form.notes || undefined,
  })

  if (isEmergency.value) {
    startTracker(form.petName)
  } else {
    alert('Booking saved (dummy data).')
    router.push('/my-bookings')
  }
}
</script>

<template>
  <!-- ── DEFAULT THEME ──────────────────────────────────────────── -->
  <div
    v-if="!isEmergency && !isGrooming && !isVet"
    class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg"
  >
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
      {{ heading || 'Book Service' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Pet Name *</label>
        <input v-model="form.petName" type="text" :class="inputClass" placeholder="Enter your pet's name" />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Owner Name *</label>
        <input v-model="form.ownerName" type="text" :class="inputClass" placeholder="Enter your name" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Service *</label>
          <input v-model="form.service" type="text" :class="inputClass" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Category *</label>
          <input v-model="form.category" type="text" :class="inputClass" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Date *</label>
          <input v-model="form.date" type="date" :class="inputClass" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Time *</label>
          <input v-model="form.time" type="time" :class="inputClass" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Notes</label>
        <textarea v-model="form.notes" rows="3" :class="inputClass + ' resize-none'"
          :placeholder="notesPlaceholder ?? 'Any special instructions for your pet'" />
      </div>
      <button type="submit"
        class="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition">
        Confirm Booking
      </button>
    </form>
  </div>

  <!-- ── VET THEME ─────────────────────────────────────────────── -->
  <div
    v-if="isVet"
    class="w-full max-w-lg rounded-2xl border border-indigo-200/60 bg-white/80 p-7 shadow-xl backdrop-blur-sm dark:border-indigo-900/30 dark:bg-slate-900/80 ring-1 ring-indigo-100/40 dark:ring-white/5"
  >
    <!-- Header -->
    <div class="mb-6 text-center">
      <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-indigo-500 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:ring-indigo-500/20">
        <span class="h-1.5 w-1.5 rounded-full bg-indigo-400 inline-block" />
        🩺 Vet Appointment
      </span>
      <h2 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">{{ heading || 'Book Vet Appointment' }}</h2>
      <p class="mt-1 text-[12px] text-slate-400">Pick a slot — your vet will have all details ready before you arrive.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Pet Name *</label>
        <input v-model="form.petName" type="text" :class="inputClass" placeholder="Enter your pet's name" />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Owner Name *</label>
        <input v-model="form.ownerName" type="text" :class="inputClass" placeholder="Enter your name" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Service *</label>
          <input v-model="form.service" type="text" :class="inputClass" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Category *</label>
          <input v-model="form.category" type="text" :class="inputClass" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Date *</label>
          <input v-model="form.date" type="date" :class="inputClass" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Time *</label>
          <input v-model="form.time" type="time" :class="inputClass" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Symptoms / Notes</label>
        <textarea v-model="form.notes" rows="3" :class="inputClass + ' resize-none'"
          :placeholder="notesPlaceholder ?? 'Describe symptoms or the reason for your visit'" />
      </div>
      <button type="submit"
        class="w-full py-3.5 rounded-xl font-black text-white text-[15px] bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 shadow-lg shadow-indigo-200/60 dark:shadow-indigo-900/40 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
        🩺 Confirm Appointment
      </button>
    </form>
  </div>

  <!-- ── GROOMING THEME ─────────────────────────────────────────── -->
  <div
    v-if="isGrooming"
    class="w-full max-w-lg rounded-2xl border border-pink-200/60 bg-white/80 p-7 shadow-xl backdrop-blur-sm dark:border-pink-900/30 dark:bg-slate-900/80 ring-1 ring-pink-100/40 dark:ring-white/5"
  >
    <!-- Header -->
    <div class="mb-6 text-center">
      <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-pink-500 ring-1 ring-pink-200 dark:bg-pink-900/30 dark:ring-pink-500/20">
        <span class="h-1.5 w-1.5 rounded-full bg-pink-400 inline-block" />
        ✂️ Grooming Session
      </span>
      <h2 class="mt-2 text-2xl font-black text-slate-900 dark:text-white">{{ heading || 'Book Grooming Session' }}</h2>
      <p class="mt-1 text-[12px] text-slate-400">Pick a time that works — your groomer will be ready.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Pet Name *</label>
        <input v-model="form.petName" type="text" :class="inputClass" placeholder="Enter your pet's name" />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Owner Name *</label>
        <input v-model="form.ownerName" type="text" :class="inputClass" placeholder="Enter your name" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Service *</label>
          <input v-model="form.service" type="text" :class="inputClass" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Category *</label>
          <input v-model="form.category" type="text" :class="inputClass" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Date *</label>
          <input v-model="form.date" type="date" :class="inputClass" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Time *</label>
          <input v-model="form.time" type="time" :class="inputClass" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-300">Notes</label>
        <textarea v-model="form.notes" rows="3" :class="inputClass + ' resize-none'"
          :placeholder="notesPlaceholder ?? 'Any coat type, skin sensitivities or special requests?'" />
      </div>
      <button type="submit"
        class="w-full py-3.5 rounded-xl font-black text-white text-[15px] bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 shadow-lg shadow-pink-200/60 dark:shadow-pink-900/40 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
        🐾 Confirm Grooming Session
      </button>
    </form>
  </div>

  <!-- ── EMERGENCY THEME ────────────────────────────────────────── -->
  <div v-else class="w-full max-w-lg">

    <!-- TRACKER — shown after submit -->
    <Transition name="slide-up">
      <div
        v-if="tracking"
        class="rounded-2xl border border-rose-900/30 bg-slate-900/90 p-7 shadow-2xl backdrop-blur-sm ring-1 ring-white/5"
      >
        <!-- Header -->
        <div class="mb-6 text-center">
          <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-400 ring-1 ring-rose-500/20">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400 inline-block" />
            Live Tracking
          </span>
          <h2 class="mt-2 text-xl font-black text-white">
            Help is on the way, {{ submittedPetName }}!
          </h2>
          <p class="mt-1 text-[13px] text-slate-400">Stay calm — we've got you covered.</p>
        </div>

        <!-- ETA countdown -->
        <div class="mb-6 flex flex-col items-center justify-center rounded-xl border border-rose-900/30 bg-rose-950/30 py-5">
          <p class="text-[10px] font-black uppercase tracking-[0.25em] text-rose-400/70">Estimated Arrival</p>
          <p class="mt-1 font-mono text-[3rem] font-black tabular-nums tracking-tight text-white leading-none">
            {{ formatETA(etaSeconds) }}
          </p>
          <p class="mt-1.5 text-[11px] text-slate-500">minutes remaining</p>
        </div>

        <!-- Assigned clinic -->
        <div class="mb-6 flex items-center gap-3 rounded-xl border border-emerald-900/30 bg-emerald-950/20 px-4 py-3">
          <span class="text-xl">🏥</span>
          <div class="min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">Assigned Clinic</p>
            <p class="text-[14px] font-bold text-white truncate">{{ assignedClinic }}</p>
          </div>
          <span
            class="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition-all duration-500"
            :class="currentStage >= 2
              ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
              : 'bg-slate-700/50 text-slate-500'"
          >
            {{ currentStage >= 2 ? 'Confirmed ✓' : 'Pending...' }}
          </span>
        </div>

        <!-- Stage pipeline -->
        <div class="mb-6">
          <div
            v-for="(stage, i) in stages"
            :key="stage.label"
            class="flex items-start gap-4"
          >
            <div class="flex flex-col items-center">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-base transition-all duration-500"
                :class="i < currentStage
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : i === currentStage
                    ? 'border-rose-500 bg-rose-500/10 ring-4 ring-rose-500/10'
                    : 'border-slate-700 bg-slate-800/50'"
              >
                <span v-if="i < currentStage">✅</span>
                <span v-else-if="i === currentStage" class="animate-pulse">{{ stage.icon }}</span>
                <span v-else class="opacity-30">{{ stage.icon }}</span>
              </div>
              <div
                v-if="i < stages.length - 1"
                class="w-0.5 h-6 mt-1 transition-colors duration-700"
                :class="i < currentStage ? 'bg-emerald-500/40' : 'bg-slate-700/40'"
              />
            </div>
            <div class="pb-4 pt-1">
              <p
                class="text-[13px] font-bold transition-colors duration-300"
                :class="i <= currentStage ? 'text-white' : 'text-slate-600'"
              >
                {{ stage.label }}
              </p>
              <p
                v-if="i === currentStage"
                class="mt-0.5 text-[11px] text-slate-400"
              >
                {{ stage.detail }}
              </p>
              <p
                v-else-if="i < currentStage"
                class="mt-0.5 text-[11px] text-emerald-500/70"
              >
                {{ stage.detail }}
              </p>
            </div>
          </div>
        </div>

        <!-- Hotline strip -->
        <div class="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/40 px-4 py-3 mb-4">
          <p class="text-[12px] text-slate-400">Need to speak to someone?</p>
          <a href="tel:+94112345678" class="text-[12px] font-black text-rose-400 transition hover:text-rose-300">
            📞 Call Hotline
          </a>
        </div>

        <!-- Cancel / back to form button -->
        <button
          type="button"
          @click="cancelTracking"
          class="w-full py-2.5 rounded-xl border border-slate-700/60 bg-slate-800/60 text-[12px] font-bold text-slate-400 transition hover:bg-slate-700/60 hover:text-white active:scale-[0.98]"
        >
          ← Cancel &amp; Log a New Emergency
        </button>
      </div>
    </Transition>

    <!-- FORM — shown before submit -->
    <Transition name="slide-up">
      <div
        v-if="!tracking"
        class="rounded-2xl border border-rose-900/30 bg-slate-900/80 p-7 shadow-xl backdrop-blur-sm ring-1 ring-white/5"
      >
        <div class="mb-6 text-center">
          <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-400 ring-1 ring-rose-500/20">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400 inline-block" />
            Live Emergency Form
          </span>
          <h2 class="mt-2 text-2xl font-black text-white">{{ heading || 'Log Emergency Visit' }}</h2>
          <p class="mt-1 text-[12px] text-slate-400">Fill in quickly — nearby clinics will be notified immediately.</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-1 text-slate-300">Pet Name *</label>
            <input v-model="form.petName" type="text" :class="inputClass" placeholder="Enter your pet's name" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1 text-slate-300">Owner Name *</label>
            <input v-model="form.ownerName" type="text" :class="inputClass" placeholder="Enter your name" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-semibold mb-1 text-slate-300">Service *</label>
              <input v-model="form.service" type="text" :class="inputClass" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1 text-slate-300">Category *</label>
              <input v-model="form.category" type="text" :class="inputClass" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-semibold mb-1 text-slate-300">Date *</label>
              <input v-model="form.date" type="date" :class="inputClass" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1 text-slate-300">Time *</label>
              <input v-model="form.time" type="time" :class="inputClass" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1 text-slate-300">Symptoms / Notes</label>
            <textarea v-model="form.notes" rows="3" :class="inputClass + ' resize-none'"
              :placeholder="notesPlaceholder ?? 'Describe your pet\'s symptoms (e.g. difficulty breathing, seizure, bleeding)'" />
          </div>
          <button type="submit"
            class="w-full py-3.5 rounded-lg font-black text-white text-[15px] bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-900/40 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            🚑 Confirm Emergency Visit
          </button>
        </form>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>