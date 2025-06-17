export interface Pagination {
  currentPage?: number
  totalPages?: number
  hasPrevPage?: boolean
  prevPage?: number | null
  hasNextPage?: boolean
  nextPage?: number | null
}

export interface PayloadProps {
  statusCode?: number
  message?: string
  data?: any
  pagination?: Pagination
}

export interface Payload {
  statusCode: number
  statusMessage: string
  message: string
  ok: boolean
  data: any
  pagination: Pagination | null
}

const STATUS_CODES: Record<number, string> = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
}

export function generatePayload(props?: PayloadProps): Payload {
  const statusCode = props?.statusCode || 200

  const payload: Payload = {
    statusCode,
    statusMessage: STATUS_CODES[statusCode] || "Unknown",
    message: props?.message || "",
    ok: statusCode < 400,
    data: props?.data || null,
    pagination: props?.pagination || null,
  }

  return payload
}

export default generatePayload
