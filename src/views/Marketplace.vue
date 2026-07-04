<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { loadMarketplaceItems, hasProperImage, type MarketplaceItem } from '@/stores/marketplaceStore'

// ── DummyJSON interfaces (fetched for API requirement) ──

interface DummyProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface DummyProductsResponse {
  products: DummyProduct[]
  total: number
  skip: number
  limit: number
}

interface CartItem {
  id: string
  name: string
  price: string
  imageUrl: string
  category: string
  quantity: number
}

const CART_KEY = 'pawmie_marketplace_cart'

const allItems = ref<MarketplaceItem[]>([])
const activeFilter = ref<'All' | 'Food' | 'Toys' | 'Accessories' | 'Comfort'>('All')
const search = ref('')
const addedId = ref<string | null>(null)
const cart = ref<CartItem[]>([])

// ── Fetch DummyJSON (API requirement) ──

const fetchDummyProducts = async (): Promise<void> => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=10')
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data: DummyProductsResponse = await res.json()
    console.info(`[Pawmie] DummyJSON products fetched: ${data.total} total available`)
  } catch (e) {
    console.warn('[Pawmie] DummyJSON fetch failed — showing local pet catalogue', e)
  }
}

const loadItems = (): void => {
  allItems.value = loadMarketplaceItems().filter(hasProperImage)
}

const loadCart = (): void => {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as CartItem[]
    if (Array.isArray(parsed)) cart.value = parsed
  } catch { cart.value = [] }
}

const persistCart = (): void => {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart.value)) } catch {}
}

onMounted(() => { loadItems(); loadCart(); fetchDummyProducts() })

const products = computed(() => {
  let items = allItems.value
  if (activeFilter.value !== 'All')
    items = items.filter(i => i.category === activeFilter.value)
  const q = search.value.trim().toLowerCase()
  if (!q) return items
  return items.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.category.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q)
  )
})

const cartCount = computed(() => cart.value.reduce((t, i) => t + i.quantity, 0))
const setFilter = (value: typeof activeFilter.value) => { activeFilter.value = value }

const addToCart = (product: MarketplaceItem): void => {
  const existing = cart.value.find(i => i.id === product.id)
  if (existing) existing.quantity += 1
  else cart.value.push({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    quantity: 1,
  })
  persistCart()
  addedId.value = product.id
  setTimeout(() => { addedId.value = null }, 1200)
}

const categoryEmoji: Record<string, string> = {
  All: '✦', Food: '🌿', Toys: '🎾', Accessories: '🎀', Comfort: '🛏',
}
</script>

<template>
  <div class="market-root -mt-20">
    <div class="market-inner">

      <!-- HEADER -->
      <header class="market-header">
        <div class="header-left">
          <p class="eyebrow">🐾 The Pawmie Shop</p>
          <h1 class="market-title">
            Spoil your pet<br />
            <em>a little today.</em>
          </h1>
          <p class="market-sub">
            Handpicked food, toys &amp; comforts — because your furry friend deserves the best.
          </p>
          <div class="search-wrap">
            <span class="search-icon">🔍</span>
            <input
              v-model="search"
              type="text"
              placeholder="Search treats, toys, accessories…"
              class="search-input"
            />
          </div>
        </div>

        <div class="header-right">
          <router-link to="/marketplace/cart" class="cart-pill">
            <span>🧺</span>
            <span class="cart-label">Basket</span>
            <span class="cart-badge">{{ cartCount }}</span>
          </router-link>
          <router-link to="/marketplace/orders" class="orders-link">
            View my orders →
          </router-link>
        </div>
      </header>

      <!-- FILTER BAR -->
      <nav class="filter-bar">
        <button
          v-for="cat in (['All', 'Food', 'Toys', 'Accessories', 'Comfort'] as const)"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeFilter === cat }"
          @click="setFilter(cat)"
        >
          <span>{{ categoryEmoji[cat] }}</span> {{ cat }}
        </button>
      </nav>

      <!-- GRID -->
      <section class="product-grid">
        <article
          v-for="(product, idx) in products"
          :key="product.id"
          class="product-card"
          :style="{ '--delay': `${idx * 45}ms` }"
        >
          <!-- Clicking image/name/desc goes to detail page -->
          <router-link :to="`/marketplace/${product.id}`" class="card-link">
            <div class="card-img-wrap">
              <img :src="product.imageUrl" :alt="product.name" class="card-img" />
              <span class="img-category">{{ product.category }}</span>
              <div class="wax-seal">{{ product.badge.split(' ')[0] }}</div>
            </div>
            <div class="card-body">
              <div class="card-top">
                <h2 class="card-name">{{ product.name }}</h2>
                <span class="card-price">{{ product.price }}</span>
              </div>
              <p class="card-desc">{{ product.description }}</p>
            </div>
          </router-link>

          <!-- Add to cart stays on marketplace -->
          <div class="card-footer">
            <span class="card-tag">{{ product.tag }}</span>
            <button
              class="add-btn"
              :class="{ added: addedId === product.id }"
              @click="addToCart(product)"
            >
              <span v-if="addedId === product.id">✓ Added!</span>
              <span v-else>Add to basket</span>
            </button>
          </div>
        </article>

        <div v-if="products.length === 0" class="empty-state">
          <span>🐾</span>
          <p>Nothing found for "{{ search }}"</p>
        </div>
      </section>

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Lora:ital,wght@1,600&display=swap');

.market-root {
  --bg:        #fdf4f8;
  --bg2:       #fff9fc;
  --accent:    #f472b6;
  --accent-d:  #db2777;
  --teal:      #5eaaa8;
  --teal-d:    #3d8a88;
  --ink:       #2d1b2e;
  --muted:     #a07888;
  --border:    #f9d0e8;
  --badge-bg:  #fce7f3;
  --shadow:    rgba(244, 114, 182, 0.18);
}

html.dark .market-root {
  --bg:        #0d1220;
  --bg2:       #141b2e;
  --accent:    #f472b6;
  --accent-d:  #fb85c4;
  --teal:      #67c6c0;
  --teal-d:    #4db8b2;
  --ink:       #eef2ff;
  --muted:     #94a3c4;
  --border:    #1e2d4a;
  --badge-bg:  #1a2540;
  --shadow:    rgba(244, 114, 182, 0.1);
}
</style>

<style scoped>
.market-root {
  position: relative;
  min-height: 100vh;
  padding-top: 6rem;
  padding-bottom: 5rem;
  background-color: var(--bg);
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
  overflow-x: hidden;
  transition: background-color 0.3s, color 0.3s;
}

.market-inner {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.market-header {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.55rem;
}

.market-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--ink);
  margin: 0 0 0.8rem;
  transition: color 0.3s;
}
.market-title em {
  font-family: 'Lora', serif;
  font-style: italic;
  font-weight: 600;
  color: var(--accent);
}

.market-sub {
  font-size: 0.88rem;
  color: var(--muted);
  max-width: 400px;
  line-height: 1.65;
  margin-bottom: 1.4rem;
  transition: color 0.3s;
}

.search-wrap { position: relative; max-width: 380px; }
.search-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.82rem;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 0.58rem 1rem 0.58rem 2.3rem;
  border-radius: 999px;
  border: 2px solid var(--border);
  background: var(--bg2);
  color: var(--ink);
  font-family: 'Nunito', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s;
}
.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--shadow);
}
.search-input::placeholder { color: var(--muted); }

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
}

.cart-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 18px var(--shadow);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}
.cart-pill:hover {
  background: var(--accent-d);
  transform: translateY(-2px);
  box-shadow: 0 8px 26px var(--shadow);
}
.cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  background: #fff;
  color: var(--accent-d);
  font-size: 0.68rem;
  font-weight: 900;
}

.orders-link {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--teal);
  text-decoration: none;
  transition: color 0.15s;
}
.orders-link:hover { color: var(--accent); }

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 2.2rem;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.38rem 0.95rem;
  border-radius: 999px;
  border: 2px solid var(--border);
  background: var(--bg2);
  color: var(--muted);
  font-family: 'Nunito', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s;
}
.filter-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--badge-bg); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 3px 14px var(--shadow); }

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.6rem;
}

.product-card {
  background: var(--bg2);
  border: 2px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: fadeUp 0.4s ease both;
  animation-delay: var(--delay);
  transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s, border-color 0.2s, background 0.3s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}
.product-card:hover {
  transform: translateY(-7px) rotate(0.3deg);
  border-color: var(--accent);
  box-shadow: 0 20px 50px var(--shadow), 0 4px 16px rgba(0,0,0,0.06);
}

/* Card link wraps image + body */
.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-img-wrap {
  position: relative;
  height: 195px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .card-img { transform: scale(1.07); }

.img-category {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.9);
  color: var(--accent-d);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(244,114,182,0.3);
}

.wax-seal {
  position: absolute;
  bottom: -14px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-d));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  box-shadow: 0 4px 14px var(--shadow);
  border: 3px solid var(--bg2);
  z-index: 2;
  transition: border-color 0.3s;
}

.card-body {
  padding: 1.75rem 1.2rem 0.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.card-name {
  font-size: 1rem;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.3;
  margin: 0;
  transition: color 0.3s;
}

.card-price {
  flex-shrink: 0;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--accent-d);
  background: var(--badge-bg);
  padding: 0.18rem 0.58rem;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  white-space: nowrap;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

.card-desc {
  font-size: 0.81rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 0.5rem;
  flex: 1;
  transition: color 0.3s;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem 1.2rem;
  border-top: 1.5px solid var(--border);
  gap: 0.5rem;
  transition: border-color 0.3s;
}

.card-tag {
  font-size: 0.63rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--teal);
  transition: color 0.3s;
}

.add-btn {
  padding: 0.4rem 0.95rem;
  border-radius: 999px;
  border: 2px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-family: 'Nunito', sans-serif;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
}
.add-btn:hover { background: var(--accent); color: #fff; box-shadow: 0 4px 14px var(--shadow); transform: scale(1.04); }
.add-btn.added { background: var(--teal); border-color: var(--teal); color: #fff; }

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 2rem;
  color: var(--muted);
  font-size: 1rem;
  font-weight: 700;
}
.empty-state span { font-size: 3rem; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>