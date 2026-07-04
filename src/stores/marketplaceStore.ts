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

export function loadMarketplaceItems(): MarketplaceItem[] {
  const seed = baseItems as MarketplaceItem[]
  if (typeof window === 'undefined') return seed
  try {
    const raw = localStorage.getItem(MARKETPLACE_STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw) as MarketplaceItem[]
    return Array.isArray(parsed) ? parsed : seed
  } catch {
    return seed
  }
}
