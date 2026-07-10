<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import logo from '@/assets/pawmie-logo.png'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const isAuthenticated = ref(false)
const { getUser } = useAuth()
const userName = ref('')
const showDropdown = ref(false)
const isDarkMode = ref(false)
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const updateAuthState = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  const user = getUser()
  userName.value = user?.firstName ?? ''
}

const SCROLL_SOLID_THRESHOLD = 48

const handleScroll = () => {
  isScrolled.value = window.scrollY > SCROLL_SOLID_THRESHOLD
}

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  showDropdown.value = false
  mobileMenuOpen.value = false
  router.push('/login')
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.profile-menu')) {
    showDropdown.value = false
  }
  if (!target.closest('.mobile-menu-area')) {
    mobileMenuOpen.value = false
  }
}

const handleResize = () => {
  if (window.innerWidth >= 768) {
    mobileMenuOpen.value = false
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

let removeAfterEach: (() => void) | undefined

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
  updateAuthState()
  handleScroll()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('storage', updateAuthState)
  window.addEventListener('resize', handleResize)

  removeAfterEach = router.afterEach(() => {
    updateAuthState()
    mobileMenuOpen.value = false
    showDropdown.value = false
    void nextTick(() => handleScroll())
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('storage', updateAuthState)
  window.removeEventListener('resize', handleResize)
  removeAfterEach?.()
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out',
      isScrolled
        ? 'border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900'
        : 'border-transparent bg-transparent shadow-none',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="grid h-20 w-full grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4"
      >

        <!-- LEFT: Logo -->
        <router-link to="/" class="relative z-10 col-start-1 row-start-1 flex min-w-0 items-center justify-self-start self-center">
          <img :src="logo" alt="Pawmie Logo" class="h-25 w-auto" />
        </router-link>

        <!-- CENTER: Navigation Links -->
        <div
          class="relative z-10 hidden items-center gap-6 self-center md:col-start-2 md:row-start-1 md:flex lg:gap-8"
        >
          <router-link to="/" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500 font-medium transition-colors whitespace-nowrap">
            Home
          </router-link>

          <!-- Services dropdown (only when logged in) -->
          <div v-if="isAuthenticated" class="relative group">
            <button
              type="button"
              class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-indigo-500 font-medium transition-colors whitespace-nowrap"
            >
              <span>Services</span>
              <span class="text-[10px]">▾</span>
            </button>

            <div
              class="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                     absolute left-1/2 top-full mt-3 -translate-x-1/2 w-60 rounded-2xl bg-white dark:bg-gray-900
                     shadow-xl border border-gray-200/80 dark:border-gray-700/80 overflow-hidden transition-all duration-200"
            >
              <router-link
                to="/services/vet-appointment"
                class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
              >
                Vet Appointment
                <p class="text-xs text-gray-500 dark:text-gray-400">Routine health checks & vaccinations</p>
              </router-link>

              <router-link
                to="/services/emergency-care"
                class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800"
              >
                Emergency Care
                <p class="text-xs text-gray-500 dark:text-gray-400">Urgent support for critical situations</p>
              </router-link>

              <router-link
                to="/services/grooming-booking"
                class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800"
              >
                Grooming Booking
                <p class="text-xs text-gray-500 dark:text-gray-400">Baths, haircuts, nails & more</p>
              </router-link>

              <router-link
                to="/services/training-services"
                class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800"
              >
                Training Services
                <p class="text-xs text-gray-500 dark:text-gray-400">Obedience & behaviour training</p>
              </router-link>
            </div>
          </div>

          <router-link to="/about" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500 font-medium transition-colors whitespace-nowrap">
            About
          </router-link>

          <router-link to="/contact" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500 font-medium transition-colors whitespace-nowrap">
            Contact
          </router-link>

          <router-link
            v-if="isAuthenticated"
            to="/marketplace"
            class="text-gray-600 dark:text-gray-400 hover:text-indigo-500 font-medium transition-colors whitespace-nowrap"
          >
            Marketplace
          </router-link>

          <router-link
            v-if="isAuthenticated"
            to="/my-bookings"
            class="text-gray-600 dark:text-gray-400 hover:text-indigo-500 font-medium transition-colors whitespace-nowrap"
          >
            My Bookings
          </router-link>
        </div>

        <!-- RIGHT: Auth + Dark Toggle + Mobile Menu -->
        <div
          class="relative z-10 col-start-2 row-start-1 flex self-center items-center justify-self-end gap-3 sm:gap-4 md:col-start-3 mobile-menu-area"
        >
          <!-- Mobile menu button -->
          <button
            @click.stop="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 dark:text-white"
          >
            <span v-if="!mobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>

          <!-- Sign In (not logged in) -->
          <router-link
            v-if="!isAuthenticated"
            to="/login"
            class="shrink-0 px-5 py-2 rounded-full
                   bg-gradient-to-r from-blue-500 to-purple-500
                   text-white font-semibold whitespace-nowrap
                   hover:opacity-90 transition"
          >
            Sign In
          </router-link>

          <!-- Profile dropdown (logged in) -->
          <div v-else class="relative shrink-0 profile-menu">
            <button
              @click.stop="showDropdown = !showDropdown"
              class="flex h-10 items-center gap-2 rounded-full bg-gray-100 px-3 dark:bg-gray-700"
            >
              <span class="text-base">👤</span>
              <span v-if="userName" class="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-200">{{ userName }}</span>
            </button>

            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800
                     shadow-xl rounded-xl overflow-hidden
                     border border-gray-200 dark:border-gray-700"
            >
              <router-link
                to="/profile"
                class="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showDropdown = false"
              >
                Profile
              </router-link>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="w-10 h-10 rounded-full bg-[#fde68a] dark:bg-[#1e293b] hover:scale-110 transition"
          >
            <span v-if="isDarkMode">🌙</span>
            <span v-else>☀️</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu (absolute overlay — does not push page content) -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden absolute top-full left-0 w-full px-4 pb-5 pt-3
             bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
             shadow-xl border-t border-gray-200 dark:border-white/10
             mobile-menu-area z-50"
    >
      <div class="flex flex-col">
        <router-link to="/" class="py-3 px-1 text-gray-700 dark:text-white font-medium border-b border-gray-100 dark:border-gray-800 hover:text-indigo-500 transition-colors">
          Home
        </router-link>

        <router-link to="/about" class="py-3 px-1 text-gray-700 dark:text-white font-medium border-b border-gray-100 dark:border-gray-800 hover:text-indigo-500 transition-colors">
          About
        </router-link>

        <router-link to="/contact" class="py-3 px-1 text-gray-700 dark:text-white font-medium border-b border-gray-100 dark:border-gray-800 hover:text-indigo-500 transition-colors">
          Contact
        </router-link>

        <template v-if="isAuthenticated">
          <p class="pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Services
          </p>

          <router-link to="/services/vet-appointment" class="py-3 px-1 text-gray-700 dark:text-white border-b border-gray-100 dark:border-gray-800 hover:text-indigo-500 transition-colors">
            Vet Appointment
          </router-link>
          <router-link to="/services/emergency-care" class="py-3 px-1 text-gray-700 dark:text-white border-b border-gray-100 dark:border-gray-800 hover:text-rose-500 transition-colors">
            Emergency Care
          </router-link>
          <router-link to="/services/grooming-booking" class="py-3 px-1 text-gray-700 dark:text-white border-b border-gray-100 dark:border-gray-800 hover:text-pink-500 transition-colors">
            Grooming Booking
          </router-link>
          <router-link to="/services/training-services" class="py-3 px-1 text-gray-700 dark:text-white border-b border-gray-100 dark:border-gray-800 hover:text-emerald-500 transition-colors">
            Training Services
          </router-link>

          <router-link to="/marketplace" class="py-3 px-1 text-gray-700 dark:text-white font-medium border-b border-gray-100 dark:border-gray-800 hover:text-indigo-500 transition-colors">
            Marketplace
          </router-link>

          <router-link to="/my-bookings" class="py-3 px-1 text-gray-700 dark:text-white font-medium border-b border-gray-100 dark:border-gray-800 hover:text-indigo-500 transition-colors">
            My Bookings
          </router-link>

          <router-link to="/profile" class="py-3 px-1 text-gray-700 dark:text-white font-medium hover:text-indigo-500 transition-colors">
            Profile
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>