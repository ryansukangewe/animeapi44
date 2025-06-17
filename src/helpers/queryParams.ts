import type { HonoRequest } from "hono"

function setErrorMessage(key: string, validValue: string[]): string {
  return `masukkan query parameter: ?${key}=${validValue.join("|")}`
}

export function getOrderParam(req: HonoRequest): string {
  const order = req.query("order")
  const orders = ["title", "title-reverse", "update", "latest", "popular"]

  if (typeof order === "string") {
    if (orders.includes(order)) {
      if (order === "title-reverse") return "titlereverse"
      return order
    } else {
      throw new Error(setErrorMessage("order", orders))
    }
  }

  return "title"
}

export function getPageParam(req: HonoRequest): number {
  const pageStr = req.query("page")
  const page = Number(pageStr) || 1

  if (page < 1) {
    throw new Error(setErrorMessage("page", ["number +"]))
  }

  if (pageStr && isNaN(Number(pageStr))) {
    throw new Error(setErrorMessage("page", ["number +"]))
  }

  return page
}

export function getQParam(req: HonoRequest): string {
  const q = req.query("q")

  if (q === undefined) {
    throw new Error(setErrorMessage("q", ["string"]))
  }

  if (typeof q === "string") return q

  return ""
}

export function getUrlParam(req: HonoRequest): string {
  const url = req.query("url")

  if (!url) {
    throw new Error(setErrorMessage("url", ["string"]))
  }

  if (typeof url === "string") return url

  return ""
}
