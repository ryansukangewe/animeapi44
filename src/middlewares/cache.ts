import type { Context, Next } from "hono"

export function serverCache(ttlMinutes = 60) {
  return async (c: Context, next: Next) => {
    const cache = caches.default
    const cacheKey = new Request(c.req.url, c.req.raw)

    // Try to get from cache
    const cachedResponse = await cache.match(cacheKey)
    if (cachedResponse) {
      return cachedResponse
    }

    // Continue to next middleware
    await next()

    // Cache the response if successful
    if (c.res.status < 400) {
      const response = c.res.clone()
      response.headers.set("Cache-Control", `public, max-age=${ttlMinutes * 60}`)

      // Store in cache
      c.executionCtx?.waitUntil(cache.put(cacheKey, response))
    }
  }
}

export function clientCache(maxAgeMinutes = 1) {
  return async (c: Context, next: Next) => {
    await next()
    c.res.headers.set("Cache-Control", `public, max-age=${maxAgeMinutes * 60}`)
  }
}
