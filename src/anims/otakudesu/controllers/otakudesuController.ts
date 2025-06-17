import type { Context } from "hono"
import { getPageParam, getQParam } from "../../../helpers/queryParams"
import { OtakudesuParser } from "../parsers/OtakudesuParser"
import { otakudesuInfo } from "../info/otakudesuInfo"
import { generatePayload } from "../../../helpers/payload"

const { baseUrl, baseUrlPath } = otakudesuInfo
const parser = new OtakudesuParser(baseUrl, baseUrlPath)

const animeSourceHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anime Source</title>
    <style>
      /* CSS styles here - same as before */
    </style>
  </head>
  <body>
    <div id="root">
      <h1 style="text-align: center; padding: 2rem 1rem;">Loading...</h1>
    </div>
    <script>
      // JavaScript code here - same as before
    </script>
  </body>
</html>
`

export const otakudesuController = {
  getMainView: (c: Context) => {
    return c.html(animeSourceHtml)
  },

  getMainViewData: (c: Context) => {
    const data = otakudesuInfo
    return c.json(generatePayload({ data }))
  },

  getHome: async (c: Context) => {
    try {
      const data = await parser.parseHome()
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getSchedule: async (c: Context) => {
    try {
      const data = await parser.parseSchedule()
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getAllAnimes: async (c: Context) => {
    try {
      const data = await parser.parseAllAnimes()
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getAllGenres: async (c: Context) => {
    try {
      const data = await parser.parseAllGenres()
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getOngoingAnimes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseOngoingAnimes(page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getCompletedAnimes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseCompletedAnimes(page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getSearch: async (c: Context) => {
    try {
      const q = getQParam(c.req)
      const data = await parser.parseSearch(q)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getGenreAnimes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const genreId = c.req.param("genreId")
      const { data, pagination } = await parser.parseGenreAnimes(genreId, page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getAnimeDetails: async (c: Context) => {
    try {
      const animeId = c.req.param("animeId")
      const data = await parser.parseAnimeDetails(animeId)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getAnimeEpisode: async (c: Context) => {
    try {
      const episodeId = c.req.param("episodeId")
      const data = await parser.parseAnimeEpisode(episodeId)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getServerUrl: async (c: Context) => {
    try {
      const serverId = c.req.param("serverId")
      const data = await parser.parseServerUrl(serverId)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },

  getAnimeBatch: async (c: Context) => {
    try {
      const batchId = c.req.param("batchId")
      const data = await parser.parseAnimeBatch(batchId)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: 500,
          message: error.message,
        }),
        500,
      )
    }
  },
}
