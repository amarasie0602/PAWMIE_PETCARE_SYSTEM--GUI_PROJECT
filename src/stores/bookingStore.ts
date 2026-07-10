import { defineStore } from 'pinia'
import dummyBookings from './dummyBookings.json'

export interface Booking {
  id: string
  petName: string
  ownerName: string
  userEmail: string
  service: string
  category: string
  date: string
  time: string
  notes?: string
}

const STORAGE_KEY = 'pawmie_bookings'

function getCurrentUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userEmail')
}

function loadInitialBookings(): Booking[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return dummyBookings as Booking[]
    }
    const parsed = JSON.parse(raw) as Booking[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function groupByCategory(bookings: Booking[]): Record<string, Booking[]> {
  const groups: Record<string, Booking[]> = {}
  for (const booking of bookings) {
    let list = groups[booking.category]
    if (!list) { list = []; groups[booking.category] = list }
    list.push(booking)
  }
  return groups
}

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: loadInitialBookings(),
  }),

  getters: {
    groupedByCategory: (state): Record<string, Booking[]> => groupByCategory(state.bookings),

    myGroupedByCategory: (state): Record<string, Booking[]> => {
      const email = getCurrentUserEmail()
      if (!email) return {}
      return groupByCategory(state.bookings.filter(b => b.userEmail === email))
    },
  },

  actions: {
    persist() {
      if (typeof window === 'undefined') return
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookings))
      } catch {}
    },

    addBooking(booking: Omit<Booking, 'id' | 'userEmail'>) {
      const email = getCurrentUserEmail() ?? 'unknown'
      const newBooking: Booking = {
        ...booking,
        userEmail: email,
        id: `bk-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      }
      this.bookings.push(newBooking)
      this.persist()
    },

    removeBooking(id: string) {
      this.bookings = this.bookings.filter(b => b.id !== id)
      this.persist()
    },
  },
})
