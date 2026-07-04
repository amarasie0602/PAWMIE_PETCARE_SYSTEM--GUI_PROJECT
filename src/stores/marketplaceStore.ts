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
export const DEFAULT_PLACEHOLDER_IMAGE =
  'https://images.pexels.com/photos/573182/pexels-photo-573182.jpeg?auto=compress&cs=tinysrgb&w=800'

export function hasProperImage(item: MarketplaceItem): boolean {
  return Boolean(item.imageUrl) && item.imageUrl !== DEFAULT_PLACEHOLDER_IMAGE
}

export function loadMarketplaceItems(): MarketplaceItem[] {
  const seed = baseItems as MarketplaceItem[]
  if (typeof window === 'undefined') return seed
  try {
    const raw = localStorage.getItem(MARKETPLACE_STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw) as MarketplaceItem[]
    if (!Array.isArray(parsed)) return seed

    const stored = new Map(parsed.map((item) => [item.id, item]))
    const merged = seed.map((item) => stored.get(item.id) ?? item)
    const extras = parsed.filter((item) => !seed.some((s) => s.id === item.id))
    return [...merged, ...extras]
  } catch {
    return seed
  }
}
