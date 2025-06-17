// Simple in-memory cache for Cloudflare Workers
class SimpleCache {
  private cache = new Map<string, { value: any; expires: number }>()
  private maxSize = 50

  set(key: string, value: any, options?: { ttl?: number }) {
    const ttl = options?.ttl || 1000 * 60 * 30 // 30 minutes default
    const expires = Date.now() + ttl

    // Simple LRU: remove oldest if at max size
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, { value, expires })
  }

  get(key: string): any {
    const item = this.cache.get(key)

    if (!item) return undefined

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return undefined
    }

    return item.value
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}

export const defaultTTL = 1000 * 60 * 30 // 30 minutes
export const cache = new SimpleCache()
