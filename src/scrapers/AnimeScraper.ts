import { load, type CheerioAPI } from "cheerio"
import { wajikFetch } from "../services/dataFetcher"
import animeConfig from "../configs/animeConfig"

export default class AnimeScraper {
  protected baseUrl: string
  protected baseUrlPath: string

  constructor(baseUrl: string, baseUrlPath: string) {
    this.baseUrl = this.generateBaseUrl(baseUrl)
    this.baseUrlPath = this.generateUrlPath([baseUrlPath])
  }

  private deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj

    if (Array.isArray(obj)) {
      return obj.map((item) => this.deepCopy(item)) as unknown as T
    }

    const result: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = this.deepCopy((obj as any)[key])
      }
    }

    return result as T
  }

  private generateBaseUrl(baseUrl: string): string {
    let hapusDariBelakang = true

    while (hapusDariBelakang) {
      if (baseUrl[baseUrl.length - 1] === "/") {
        baseUrl = baseUrl.slice(0, baseUrl.length - 1)
      } else {
        hapusDariBelakang = false
      }
    }

    return baseUrl
  }

  private generateUrlPath(paths: string[]): string {
    let urlPath = "/" + paths.join("/").replace(/\/+/g, "/")

    while (urlPath.endsWith("/") && urlPath.length > 1) {
      urlPath = urlPath.slice(0, -1)
    }

    return urlPath
  }

  private generateUrl(baseUrl: string, urlOrPath?: string): string {
    if (urlOrPath) {
      if (urlOrPath.includes(baseUrl)) {
        return urlOrPath
      }

      if (urlOrPath.startsWith("/")) {
        return baseUrl + urlOrPath
      }
    }

    return baseUrl
  }

  protected str(string?: string): string {
    return string?.trim() || ""
  }

  protected num(string?: string): number | null {
    return Number(string?.trim()) || null
  }

  protected generateSlug(url?: string): string {
    if (typeof url !== "string") return ""

    const urlArr = url.split("/").filter((url) => url !== "")

    return urlArr[urlArr.length - 1]?.trim() || ""
  }

  protected generateSourceUrl(urlOrPath?: string): string | undefined {
    if (animeConfig.response.sourceUrl) {
      return this.generateUrl(this.baseUrl, urlOrPath)
    }

    return undefined
  }

  protected generateHref(...paths: string[]): string | undefined {
    if (animeConfig.response.href) {
      return this.generateUrlPath([this.baseUrlPath, ...paths])
    }

    return undefined
  }

  protected generateSrcFromIframeTag(html?: string): string {
    const iframeMatch = html?.match(/<iframe[^>]+src="([^"]+)"/i)
    const src = iframeMatch ? iframeMatch[1] : "No iframe found"

    return src
  }

  protected toCamelCase(str: string): string {
    return str
      .split(" ")
      .map((item, index) => {
        if (index === 0) {
          item = item.toLowerCase()
        } else {
          item = item[0].toUpperCase() + item.slice(1)
        }

        return item
      })
      .join(" ")
      .replace(/[!@#$%^&*]| /g, "")
  }

  protected checkEmptyData(errorCondition: boolean): void {
    if (errorCondition) throw { status: 404, message: "data tidak ditemukan" }
  }

  protected enrawr(input: string): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const shift = 5
    let encoded = ""

    for (let i = 0; i < input.length; i++) {
      const char = input[i]
      const index = chars.indexOf(char)

      if (index !== -1) {
        const newIndex = (index + shift) % chars.length
        encoded += chars[newIndex]
      } else {
        encoded += char
      }
    }

    return encoded
  }

  protected derawr(enrawr: string): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const shift = 5
    let decoded = ""

    for (let i = 0; i < enrawr.length; i++) {
      const char = enrawr[i]
      const index = chars.indexOf(char)

      if (index !== -1) {
        const newIndex = (index - shift + chars.length) % chars.length
        decoded += chars[newIndex]
      } else {
        decoded += char
      }
    }

    return decoded
  }

  protected async scrape<T>(
    props: {
      path: string
      initialData: T
    },
    parser: ($: CheerioAPI, data: T) => Promise<T>,
  ): Promise<T> {
    const path = this.generateUrlPath([props.path])
    const htmlData = await wajikFetch(this.baseUrl + path, this.baseUrl, {
      method: "GET",
      responseType: "text",
    })
    const $ = load(htmlData)
    const data = parser($, this.deepCopy(props.initialData))

    return data
  }
}
