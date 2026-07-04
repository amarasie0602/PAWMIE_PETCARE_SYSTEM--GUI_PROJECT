<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface CartItem {
  id: string
  name: string
  price: string
  imageUrl: string
  category: string
  quantity: number
}

interface Order {
  id: string
  createdAt: string
  items: CartItem[]
}

const CART_KEY = 'pawmie_marketplace_cart'
const ORDERS_KEY = 'pawmie_marketplace_orders'

const router = useRouter()
const cart = ref<CartItem[]>([])
const message = ref('')

const loadCart = () => {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as CartItem[]
    if (Array.isArray(parsed)) {
      cart.value = parsed
    }
  } catch {
    cart.value = []
  }
}

const persistCart = () => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
  } catch {
    // ignore
  }
}

const addOrder = () => {
  if (typeof window === 'undefined') return
  const order: Order = {
    id: `ord-${Date.now()}`,
    createdAt: new Date().toISOString(),
    items: cart.value.map((item) => ({ ...item })),
  }

  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    let orders: Order[] = []
    if (raw) {
      const parsed = JSON.parse(raw) as Order[]
      if (Array.isArray(parsed)) {
        orders = parsed
      }
    }
    orders.push(order)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {
    // ignore
  }
}

onMounted(loadCart)

const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const orderTotal = computed(() => {
  let sum = 0
  for (const item of cart.value) {
    const num = parseFloat(item.price.replace(/[^0-9.]/g, ''))
    if (!isNaN(num)) sum += num * item.quantity
  }
  const symbol = cart.value[0]?.price.match(/^[^\d]+/)?.[0] ?? ''
  return symbol + sum.toFixed(2)
})

const increment = (id: string) => {
  const item = cart.value.find(i => i.id === id)
  if (item) { item.quantity += 1; persistCart() }
}

const decrement = (id: string) => {
  const item = cart.value.find(i => i.id === id)
  if (!item) return
  if (item.quantity > 1) { item.quantity -= 1; persistCart() }
  else removeItem(id)
}

const removeItem = (id: string) => {
  cart.value = cart.value.filter(i => i.id !== id)
  persistCart()
}

const handleCheckout = () => {
  if (!cart.value.length) {
    message.value = 'Your cart is empty.'
    return
  }
  addOrder()
  cart.value = []
  persistCart()
  message.value = 'Payment processed successfully! Your order has been placed.'
  setTimeout(() => {
    router.push('/marketplace')
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-slate-50 via-amber-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="mb-8 flex items-center justify-between gap-4">
        <div>
          <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
            🧺 Cart
            <span class="w-1 h-1 rounded-full bg-amber-400" />
            Review items
          </p>
          <h1 class="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your cart
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            These items are not real purchases. This flow is a demo checkout using dummy data.
          </p>
        </div>

        <button
          type="button"
          class="hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          @click="$router.push('/marketplace')"
        >
          ← Back to marketplace
        </button>
      </header>

      <section class="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-lg">
        <div class="flex items-center justify-between mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            Items in cart:
            <span class="font-semibold text-slate-900 dark:text-white">{{ totalItems }}</span>
          </p>
        </div>

        <div v-if="!cart.length" class="py-6 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Your cart is empty. Go back to the marketplace and add a few favourites.
        </div>

        <div v-else class="space-y-3 max-h-72 overflow-y-auto pr-1">
          <article
            v-for="item in cart"
            :key="item.id"
            class="flex items-center gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 p-3"
          >
            <div class="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
              <img
                :src="item.imageUrl"
                :alt="item.name"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                {{ item.name }}
              </p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                {{ item.category }}
              </p>
              <div class="mt-1.5 flex items-center gap-2">
                <button
                  type="button"
                  class="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label="Decrease quantity"
                  @click="decrement(item.id)"
                >
                  −
                </button>
                <span class="w-4 text-center text-[11px] font-semibold text-slate-700 dark:text-slate-200">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label="Increase quantity"
                  @click="increment(item.id)"
                >
                  +
                </button>
                <button
                  type="button"
                  class="ml-1 text-[11px] font-semibold text-rose-500 hover:text-rose-600 transition"
                  @click="removeItem(item.id)"
                >
                  Remove
                </button>
              </div>
            </div>
            <div class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {{ item.price }}
            </div>
          </article>
        </div>

        <div v-if="cart.length" class="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Order total</p>
          <p class="text-base font-black text-slate-900 dark:text-white">{{ orderTotal }}</p>
        </div>

        <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p v-if="message" class="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300">
            {{ message }}
          </p>
          <button
            type="button"
            class="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-pink-500 shadow-md hover:opacity-90 transition disabled:opacity-50"
            :disabled="!cart.length"
            @click="handleCheckout"
          >
            Proceed to checkout
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>  </style>