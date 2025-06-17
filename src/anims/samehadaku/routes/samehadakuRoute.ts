import { Hono } from "hono"
import { serverCache } from "../../../middlewares/cache"
import { samehadakuController } from "../controllers/samehadakuController"

export const samehadakuRoute = new Hono()

samehadakuRoute
  .get("/", samehadakuController.getMainView)
  .get("/view-data", serverCache(), samehadakuController.getMainViewData)
  .get("/home", serverCache(10), samehadakuController.getHome)
  .get("/genres", serverCache(), samehadakuController.getAllGenres)
  .get("/anime", serverCache(10), samehadakuController.getAllAnimes)
  .get("/schedule", serverCache(10), samehadakuController.getSchedule)
  .get("/recent", serverCache(10), samehadakuController.getRecentEpisodes)
  .get("/ongoing", serverCache(10), samehadakuController.getOngoingAnimes)
  .get("/completed", serverCache(10), samehadakuController.getCompletedAnimes)
  .get("/popular", serverCache(10), samehadakuController.getPopularAnimes)
  .get("/movies", serverCache(10), samehadakuController.getMovies)
  .get("/batch", serverCache(30), samehadakuController.getBatches)
  .get("/search", serverCache(10), samehadakuController.getSearch)
  .get("/genres/:genreId", serverCache(10), samehadakuController.getGenreAnimes)
  .get("/anime/:animeId", serverCache(30), samehadakuController.getAnimeDetails)
  .get("/episode/:episodeId", serverCache(30), samehadakuController.getAnimeEpisode)
  .get("/server/:serverId", serverCache(3), samehadakuController.getServerUrl)
  .post("/server/:serverId", serverCache(3), samehadakuController.getServerUrl)
  .get("/wibufile", serverCache(3), samehadakuController.getWibuFile)
  .get("/batch/:batchId", serverCache(30), samehadakuController.getAnimeBatch)
