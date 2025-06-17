import { Hono } from "hono"
import { mainController } from "../controllers/mainController"
import { serverCache } from "../middlewares/cache"

export const mainRoute = new Hono()

mainRoute.get("/", mainController.getMainView)
mainRoute.get("/view-data", serverCache(), mainController.getMainViewData)
mainRoute.get("*", mainController._404)
