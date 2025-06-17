import { Hono } from "hono"
import { serverCache } from "../../../middlewares/cache"
import { otakudesuController } from "../controllers/otakudesuController"

export const otakudesuRoute = new Hono()

otakudesuRoute
  .get("/", otakudesuController.getMainView)
  .get("/view-data", serverCache(), otakudesuController.getMainViewData)
  .get("/home", serverCache(10), otakudesuController.getHome)
  .get("/schedule", serverCache(10), otakudesuController.getSchedule)
  .get("/anime", serverCache(10), otakudesuController.getAllAnimes)
  .get("/genres", serverCache(), otakudesuController.getAllGenres)
  .get("/ongoing", serverCache(10), otakudesuController.getOngoingAnimes)
  .get("/completed", serverCache(10), otakudesuController.getCompletedAnimes)
  .get("/search", serverCache(10), otakudesuController.getSearch)
  .get("/genres/:genreId", serverCache(10), otakudesuController.getGenreAnimes)
  .get("/anime/:animeId", serverCache(30), otakudesuController.getAnimeDetails)
  .get("/episode/:episodeId", serverCache(30), otakudesuController.getAnimeEpisode)
  .get("/server/:serverId", serverCache(3), otakudesuController.getServerUrl)
  .post("/server/:serverId", serverCache(3), otakudesuController.getServerUrl)
  .get("/batch/:batchId", serverCache(30), otakudesuController.getAnimeBatch)
