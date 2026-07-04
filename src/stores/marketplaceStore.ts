import baseItems from './marketplaceItems.json'

export interface MarketplaceItem {
  id: string
  name: string
  category: string
  price: string
  badge: string
  description: string
  tag: string
  color?: string
  imageUrl: string
}

export const MARKETPLACE_STORAGE_KEY = 'pawmie_marketplace_items'

const seedIds = new Set((baseItems as MarketplaceItem[]).map((item) => item.id))
export function isOriginalItem(id: string): boolean {
  return seedIds.has(id)
}

export function loadMarketplaceItems(): MarketplaceItem[] {
  const seed = baseItems as MarketplaceItem[]
  if (typeof window === 'undefined') return seed
  try {
    const raw = localStorage.getItem(MARKETPLACE_STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw) as MarketplaceItem[]
    if (!Array.isArray(parsed)) return seed

    // The original catalogue is always authoritative; only genuinely new
    // admin-added items (ids outside the seed) are merged in on top of it.
    const extras = parsed.filter((item) => !seed.some((s) => s.id === item.id))
    return [...seed, ...extras]
  } catch {
    return seed
  }
}
