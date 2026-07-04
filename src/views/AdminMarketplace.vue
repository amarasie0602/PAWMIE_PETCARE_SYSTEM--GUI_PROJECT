<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadMarketplaceItems, isOriginalItem, MARKETPLACE_STORAGE_KEY, type MarketplaceItem } from '@/stores/marketplaceStore'

const ADMIN_KEY = 'isAdmin'

const isAdmin = ref(false)
const adminCode = ref('')
const adminError = ref('')

const name = ref('')
const category = ref<'Food' | 'Toys' | 'Accessories' | 'Comfort'>('Food')
const price = ref('')
const badge = ref('')
const description = ref('')
const tag = ref('')
const color = ref('from-amber-400 to-orange-500')
const imageUrl = ref('')
const successMessage = ref('')
const items = ref<MarketplaceItem[]>([])
const editingId = ref<string | null>(null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  const file = target?.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result
    if (typeof result === 'string') {
      imageUrl.value = result
      successMessage.value = ''
      adminError.value = ''
    }
  }
  reader.readAsDataURL(file)
}

onMounted(() => {
  items.value = loadMarketplaceItems()
  if (typeof window !== 'undefined') {
    isAdmin.value = localStorage.getItem(ADMIN_KEY) === 'true'
  }
})

const handleAdminUnlock = () => {
  if (adminCode.value.trim() === 'pawmie-admin') {
    isAdmin.value = true
    adminError.value = ''
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_KEY, 'true')
    }
  } else {
    adminError.value = 'Incorrect admin code. Try "pawmie-admin".'
  }
}

const resetForm = () => {
  name.value = ''
  category.value = 'Food'
  price.value = ''
  badge.value = ''
  description.value = ''
  tag.value = ''
  color.value = 'from-amber-400 to-orange-500'
  imageUrl.value = ''
  editingId.value = null
}

const startEdit = (item: MarketplaceItem) => {
  editingId.value = item.id
  name.value = item.name
  category.value = item.category as typeof category.value
  price.value = item.price
  badge.value = item.badge
  description.value = item.description
  tag.value = item.tag
  color.value = item.color ?? 'from-amber-400 to-orange-500'
  imageUrl.value = item.imageUrl
  successMessage.value = ''
  adminError.value = ''
}

const deleteItem = (id: string) => {
  if (typeof window === 'undefined') return
  items.value = items.value.filter((item) => item.id !== id)
  try {
    localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(items.value))
    if (editingId.value === id) {
      resetForm()
    }
    successMessage.value = 'Item deleted from dummy data.'
    adminError.value = ''
  } catch {
    adminError.value = 'Failed to delete item from storage.'
  }
}

const handleSubmit = () => {
  if (!name.value || !category.value || !price.value || !description.value) {
    successMessage.value = ''
    adminError.value = 'Please fill in name, category, price, and description.'
    return
  }

  if (typeof window !== 'undefined') {
    const baseItem: MarketplaceItem = {
      id: editingId.value ?? `adm-${Date.now()}`,
      name: name.value,
      category: category.value,
      price: price.value,
      badge: badge.value || 'Added by admin',
      description: description.value,
      tag: tag.value || (editingId.value ? 'Admin item (edited)' : 'Admin item'),
      color: color.value,
      imageUrl: imageUrl.value || 'https://images.pexels.com/photos/573182/pexels-photo-573182.jpeg?auto=compress&cs=tinysrgb&w=800'
    }

    if (editingId.value) {
      const index = items.value.findIndex((item) => item.id === editingId.value)
      if (index !== -1) {
        items.value[index] = baseItem
      }
    } else {
      items.value.push(baseItem)
    }

    try {
      localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(items.value))
      adminError.value = ''
      successMessage.value = editingId.value
        ? 'Item updated in marketplace dummy data.'
        : 'Item added to marketplace (saved in browser).'
      resetForm()
    } catch {
      adminError.value = 'Failed to save item to storage.'
      successMessage.value = ''
    }
  }
}
</script>

<template>
  <div class="min-h-screen -mt-20 pt-24 pb-16 bg-gradient-to-br from-slate-50 via-amber-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="mb-8 text-center">
        <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-900 text-amber-300 dark:bg-amber-100 dark:text-amber-800">
          Admin
          <span class="w-1 h-1 rounded-full bg-amber-400" />
          Marketplace Manager
        </p>
        <h1 class="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Manage demo marketplace items
        </h1>
        <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          This panel is for <strong>demo admin use only</strong>. New items are saved to your browser
          (localStorage) and merged with the built-in catalogue on the marketplace page. Built-in items
          can't be edited or deleted here — they always show their original details.
        </p>
      </header>

      <!-- Admin unlock -->
      <section v-if="!isAdmin" class="max-w-md mx-auto bg-white/90 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-lg">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Enter admin code
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          To keep this panel restricted, enter the demo admin code.
        </p>
        <div class="space-y-3">
          <input
            v-model="adminCode"
            type="password"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
            placeholder="Enter admin code (hint: pawmie-admin)"
          />
          <button
            type="button"
            class="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:opacity-90 transition"
            @click="handleAdminUnlock"
          >
            Unlock admin panel
          </button>
          <p v-if="adminError" class="text-xs text-red-500 mt-1">
            {{ adminError }}
          </p>
        </div>
      </section>

      <!-- Admin form -->
      <section
        v-else
        class="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl"
      >
        <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
          Add a new marketplace item
        </h2>
        <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="handleSubmit">
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Product name</label>
            <input
              v-model="name"
              type="text"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
              placeholder="Eg: Salmon & Rice Adult Dog Food"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              v-model="category"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
            >
              <option value="Food">Food</option>
              <option value="Toys">Toys</option>
              <option value="Accessories">Accessories</option>
              <option value="Comfort">Comfort</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Price</label>
            <input
              v-model="price"
              type="text"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
              placeholder="Eg: ₹999"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Highlight badge (optional)</label>
            <input
              v-model="badge"
              type="text"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
              placeholder="Eg: Vet recommended"
            />
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Short description</label>
            <textarea
              v-model="description"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80 min-h-[80px]"
              placeholder="Tell pet parents why this item is useful."
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Tag (optional)</label>
            <input
              v-model="tag"
              type="text"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
              placeholder="Eg: New, Bestseller"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Accent gradient</label>
            <select
              v-model="color"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
            >
              <option value="from-amber-400 to-orange-500">Amber → Orange</option>
              <option value="from-sky-400 to-indigo-500">Sky → Indigo</option>
              <option value="from-emerald-400 to-teal-500">Emerald → Teal</option>
              <option value="from-rose-400 to-fuchsia-500">Rose → Fuchsia</option>
            </select>
          </div>

          <div class="sm:col-span-2 space-y-2">
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL (optional)</label>
              <input
                v-model="imageUrl"
                type="text"
                class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80"
                placeholder="Paste a pet product image URL"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Or upload image from this device</label>
              <input
                type="file"
                accept="image/*"
                class="block w-full text-xs text-slate-600 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 dark:file:bg-slate-800 dark:file:text-amber-300"
                @change="handleFileChange"
              />
            </div>
            <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Uploaded images are stored inside dummy data as a base64 string in your browser (not written to the real assets folder).
              If you leave both fields empty, a default demo image is used.
            </p>
          </div>

          <div class="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
            <div class="space-y-1 text-xs">
              <p v-if="adminError" class="text-red-500">
                {{ adminError }}
              </p>
              <p v-if="successMessage" class="text-emerald-600 dark:text-emerald-300">
                {{ successMessage }}
              </p>
            </div>
            <div class="flex gap-3 justify-end">
              <button
                type="button"
                class="px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                @click="resetForm"
              >
                Clear
              </button>
              <button
                type="submit"
                class="px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:opacity-90 transition"
              >
                Save item to dummy data
              </button>
            </div>
          </div>
        </form>

        <!-- Items list -->
        <section class="mt-8 border-t border-slate-200 dark:border-slate-800 pt-5">
          <h3 class="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-3">
            All marketplace items (dummy data)
          </h3>
          <p v-if="!items.length" class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            No items found. Add a new product above to populate the marketplace.
          </p>
          <div v-else class="space-y-2 max-h-80 overflow-y-auto pr-1">
            <article
              v-for="item in items"
              :key="item.id"
              class="flex items-start justify-between gap-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 px-3 py-2 text-xs sm:text-sm"
            >
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-slate-900 dark:text-white truncate">
                  {{ item.name }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  {{ item.category }} • {{ item.price }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {{ item.description }}
                </p>
              </div>
              <div v-if="isOriginalItem(item.id)" class="text-[11px] text-slate-400 dark:text-slate-500 italic self-center">
                Built-in item
              </div>
              <div v-else class="flex flex-col items-end gap-1">
                <button
                  type="button"
                  class="px-2 py-1 rounded-full border border-amber-400/70 text-[11px] font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-slate-800 transition"
                  @click="startEdit(item)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="px-2 py-1 rounded-full border border-red-400/70 text-[11px] font-semibold text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-slate-800 transition"
                  @click="deleteItem(item.id)"
                >
                  Delete
                </button>
              </div>
            </article>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>


<style scoped>  </style>