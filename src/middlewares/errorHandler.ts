import type { ErrorHandler } from "hono"
import { generatePayload } from "../helpers/payload"

export const errorHandler: ErrorHandler = (err, c) => {
  console.error("Error:", err)

  const status = err.status || 500
  const message = err.message || "Internal Server Error"

  return c.json(
    generatePayload({
      statusCode: status,
      message,
    }),
    status,
  )
}
