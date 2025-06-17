const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

export async function wajikFetch(
  url: string,
  ref: string,
  options?: {
    method?: string
    responseType?: "text" | "json"
    data?: URLSearchParams | FormData
    headers?: Record<string, string>
  },
  callback?: (response: Response) => void,
): Promise<any> {
  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers: {
      "User-Agent": userAgent,
      Referer: ref,
      ...options?.headers,
    },
  }

  if (options?.data) {
    fetchOptions.body = options.data
    if (options.data instanceof URLSearchParams) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    throw { status: response.status, message: `HTTP error! status: ${response.status}` }
  }

  if (callback) callback(response)

  if (options?.responseType === "json") {
    return await response.json()
  }

  return await response.text()
}

export async function getFinalUrl(url: string, ref: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent": userAgent,
        Referer: ref,
      },
      redirect: "manual",
    })

    const location = response.headers.get("location")
    return location || url
  } catch {
    return url
  }
}

export async function getFinalUrls(
  urls: string[],
  ref: string,
  config?: {
    retryConfig?: {
      retries?: number
      delay?: number
    }
  },
): Promise<string[]> {
  const { retries = 2, delay = 500 } = config?.retryConfig || {}

  const retryRequest = async (url: string): Promise<string> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await getFinalUrl(url, ref)
      } catch (error) {
        if (attempt === retries) return url
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
    return url
  }

  const requests = urls.map((url) => retryRequest(url))
  const responses = await Promise.allSettled(requests)

  return responses.map((response) => {
    if (response.status === "fulfilled") return response.value
    return ""
  })
}
