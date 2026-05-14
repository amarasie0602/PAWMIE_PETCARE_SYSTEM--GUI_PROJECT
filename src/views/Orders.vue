<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

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

const ORDERS_KEY = 'pawmie_marketplace_orders'

const orders = ref<Order[]>([])

const loadOrders = () => {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as Order[]
    if (Array.isArray(parsed)) {
      orders.value = parsed
    }
  } catch {
    orders.value = []
  }
}

onMounted(loadOrders)

const orderedCount = computed(() =>
  orders.value.reduce(
    (sum, order) => sum + order.items.reduce((s, item) => s + item.quantity, 0),
    0,
  )
)
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-slate-50 via-amber-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="mb-8 flex items-center justify-between gap-4">
        <div>
          <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
            📦 My Orders
            <span class="w-1 h-1 rounded-full bg-emerald-400" />
            Marketplace
          </p>
          <h1 class="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Orders from this device
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            These are demo orders created after checkout. Data is stored only in your browser using dummy JSON.
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
            Total items ordered:
            <span class="font-semibold text-slate-900 dark:text-white">{{ orderedCount }}</span>
          </p>
        </div>

        <div v-if="!orders.length" class="py-6 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          You don&apos;t have any demo orders yet. Add items to your cart and complete a checkout to see them here.
        </div>

        <div v-else class="space-y-5 max-h-[480px] overflow-y-auto pr-1">
          <section
            v-for="order in orders"
            :key="order.id"
            class="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 p-4"
          >
            <div class="flex items-center justify-between gap-3 mb-3">
              <div>
                <p class="text-xs font-semibold text-slate-900 dark:text-white">
                  Order ID: <span class="font-mono text-[11px]">{{ order.id }}</span>
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  Placed at:
                  {{ new Date(order.createdAt).toLocaleString() }}
                </p>
              </div>
              <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[11px] font-semibold text-emerald-800 dark:text-emerald-200">
                {{ order.items.length }} item<span v-if="order.items.length !== 1">s</span>
              </span>
            </div>

            <div class="space-y-2">
              <article
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center gap-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 px-3 py-2"
              >
                <div class="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
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
                    {{ item.category }} • Qty: {{ item.quantity }}
                  </p>
                </div>
                <div class="text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-white">
                  {{ item.price }}
                </div>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>  </style>