import { Hono } from "hono"
import { cors } from "hono/cors"
import { cache } from "hono/cache"
import { otakudesuRoute } from "./anims/otakudesu/routes/otakudesuRoute"
import { samehadakuRoute } from "./anims/samehadaku/routes/samehadakuRoute"
import { mainRoute } from "./routes/mainRoute"
import { errorHandler } from "./middlewares/errorHandler"

const app = new Hono()

// CORS middleware
app.use("*", cors())

// Cache middleware for static assets
app.use(
  "/css/*",
  cache({
    cacheName: "static-assets",
    cacheControl: "max-age=86400",
  }),
)

app.use(
  "/js/*",
  cache({
    cacheName: "static-assets",
    cacheControl: "max-age=86400",
  }),
)

// Routes
app.route("/otakudesu", otakudesuRoute)
app.route("/samehadaku", samehadakuRoute)
app.route("/", mainRoute)

// Error handler
app.onError(errorHandler)

export default app
