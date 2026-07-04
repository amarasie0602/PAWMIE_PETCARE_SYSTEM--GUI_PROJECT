<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadMarketplaceItems, type MarketplaceItem } from '@/stores/marketplaceStore'

// ── Interfaces ──

interface CartItem {
  id: string
  name: string
  price: string
  imageUrl: string
  category: string
  quantity: number
}

const CART_KEY = 'pawmie_marketplace_cart'

const route  = useRoute()
const router = useRouter()

const added = ref(false)

// ── Find product by id from route param ──

const allItems = loadMarketplaceItems()

const product = computed<MarketplaceItem | null>(() => {
  const id = route.params.id as string
  return allItems.find(p => p.id === id) ?? null
})

// ── Related products (same category, excluding current) ──

const related = computed<MarketplaceItem[]>(() => {
  if (!product.value) return []
  return allItems
    .filter(p => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 3)
})

// ── Cart ──

const addToCart = (): void => {
  if (!product.value) return
  try {
    const raw = localStorage.getItem(CART_KEY)
    const cart: CartItem[] = raw ? (JSON.parse(raw) as CartItem[]) : []
    const existing = cart.find(i => i.id === product.value!.id)
    if (existing) existing.quantity += 1
    else cart.push({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      imageUrl: product.value.imageUrl,
      category: product.value.category,
      quantity: 1,
    })
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {}
  added.value = true
  setTimeout(() => { added.value = false }, 1500)
}

onMounted(() => {
  if (!product.value) router.push('/marketplace')
})
</script>

<template>
  <div class="detail-root -mt-20">
    <div class="detail-inner" v-if="product">

      <!-- Back button -->
      <button class="back-btn" @click="router.push('/marketplace')">
        ← Back to Shop
      </button>

      <!-- Main card -->
      <div class="detail-card">

        <!-- Image -->
        <div class="detail-img-wrap">
          <img :src="product.imageUrl" :alt="product.name" class="detail-img" />
          <span class="detail-badge">{{ product.badge }}</span>
        </div>

        <!-- Info -->
        <div class="detail-info">
          <span class="detail-category">{{ product.category }}</span>
          <h1 class="detail-name">{{ product.name }}</h1>
          <p class="detail-tag">{{ product.tag }}</p>
          <p class="detail-desc">{{ product.description }}</p>

          <div class="detail-meta">
            <span class="detail-price">{{ product.price }}</span>
            <button
              class="add-btn"
              :class="{ added }"
              @click="addToCart"
            >
              <span v-if="added">✓ Added to Basket!</span>
              <span v-else>🧺 Add to Basket</span>
            </button>
          </div>

          <router-link to="/marketplace/cart" class="view-cart-link">
            View Basket →
          </router-link>
        </div>

      </div>

      <!-- Related products -->
      <div v-if="related.length" class="related-section">
        <h2 class="related-title">More in {{ product.category }}</h2>
        <div class="related-grid">
          <router-link
            v-for="item in related"
            :key="item.id"
            :to="`/marketplace/${item.id}`"
            class="related-card"
          >
            <img :src="item.imageUrl" :alt="item.name" class="related-img" />
            <div class="related-body">
              <p class="related-name">{{ item.name }}</p>
              <p class="related-price">{{ item.price }}</p>
            </div>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.detail-root {
  --bg:       #fdf4f8;
  --bg2:      #fff9fc;
  --accent:   #f472b6;
  --accent-d: #db2777;
  --teal:     #5eaaa8;
  --ink:      #2d1b2e;
  --muted:    #a07888;
  --border:   #f9d0e8;
  --badge-bg: #fce7f3;
  --shadow:   rgba(244, 114, 182, 0.18);
}

html.dark .detail-root {
  --bg:       #0d1220;
  --bg2:      #141b2e;
  --accent:   #f472b6;
  --accent-d: #fb85c4;
  --teal:     #67c6c0;
  --ink:      #eef2ff;
  --muted:    #94a3c4;
  --border:   #1e2d4a;
  --badge-bg: #1a2540;
  --shadow:   rgba(244, 114, 182, 0.12);
}
</style>

<style scoped>
.detail-root {
  min-height: 100vh;
  padding-top: 6rem;
  padding-bottom: 5rem;
  background: var(--bg);
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
  transition: background 0.3s, color 0.3s;
}

.detail-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-btn {
  background: none;
  border: 2px solid var(--border);
  color: var(--muted);
  font-family: 'Nunito', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.18s;
}
.back-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Main card */
.detail-card {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  background: var(--bg2);
  border: 2px solid var(--border);
  border-radius: 28px;
  overflow: hidden;
  margin-bottom: 3rem;
  animation: fadeUp 0.5s ease both;
  transition: background 0.3s, border-color 0.3s;
}

.detail-img-wrap {
  position: relative;
  flex: 1 1 340px;
  min-height: 320px;
}
.detail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 320px;
}
.detail-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  box-shadow: 0 3px 12px var(--shadow);
}

.detail-info {
  flex: 1 1 300px;
  padding: 2rem 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .detail-info { padding: 1.5rem; }
}

.detail-category {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.detail-name {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: var(--ink);
  line-height: 1.2;
  margin: 0;
  transition: color 0.3s;
}

.detail-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal);
  margin: 0;
}

.detail-desc {
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.7;
  margin: 0.25rem 0 0.5rem;
  flex: 1;
  transition: color 0.3s;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.detail-price {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent-d);
  transition: color 0.3s;
}

.add-btn {
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, var(--accent), #c084fc);
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
  box-shadow: 0 4px 18px var(--shadow);
  white-space: nowrap;
}
.add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px var(--shadow); }
.add-btn:active { transform: scale(0.97); }
.add-btn.added {
  background: linear-gradient(135deg, var(--teal), #34d399);
}

.view-cart-link {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--teal);
  text-decoration: none;
  transition: color 0.15s;
  margin-top: 0.25rem;
}
.view-cart-link:hover { color: var(--accent); }

/* Related */
.related-section { animation: fadeUp 0.5s ease 0.15s both; }

.related-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 1.2rem;
  transition: color 0.3s;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
}

.related-card {
  background: var(--bg2);
  border: 2px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.related-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 10px 30px var(--shadow);
}

.related-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.related-body {
  padding: 0.75rem 1rem;
}

.related-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.25rem;
  transition: color 0.3s;
}

.related-price {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--accent-d);
  margin: 0;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>