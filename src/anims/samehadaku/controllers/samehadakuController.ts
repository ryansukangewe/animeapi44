import type { Context } from "hono"
import { getOrderParam, getPageParam, getQParam, getUrlParam } from "../../../helpers/queryParams"
import SamehadakuParser from "../parsers/SamehadakuParser"
import { samehadakuInfo } from "../info/samehadakuInfo"
import { generatePayload } from "../../../helpers/payload"

const { baseUrl, baseUrlPath } = samehadakuInfo
const parser = new SamehadakuParser(baseUrl, baseUrlPath)

const animeSourceHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Samehadaku - Anime Source</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");
      
      :root {
        --ijo: #00ffb3;
        --biru-muda: rgb(104, 195, 255);
        --kuning: rgb(255, 201, 99);
        --light: #eaeaea;
        --semi-light: #949494;
        --dark: #222;
        --semi-dark: #333;
      }
      
      body {
        font-family: "Fira Code", monospace;
        background-color: var(--dark);
        color: var(--light);
        min-height: calc(100vh + 8rem);
        position: relative;
        margin: 0;
        padding: 0;
      }
      
      #root {
        padding-bottom: 10rem;
      }
      
      h2, h4 {
        text-align: center;
      }
      
      a {
        color: var(--biru-muda);
      }
      
      .container {
        max-width: 75rem;
        margin: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      
      .key {
        color: var(--ijo);
      }
      
      .value {
        color: var(--kuning);
      }
      
      .card-wrapper {
        background-color: var(--semi-dark);
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        border: 1px solid var(--semi-light);
        border-radius: 0.25rem;
        overflow-x: auto;
      }
      
      .dot {
        width: 0.1rem;
        height: 0.8rem;
        margin-right: 0.3rem;
        background-color: #fff;
        border: 0.5px solid var(--light);
        display: inline-block;
        line-height: 0.2rem;
      }
      
      footer {
        width: 100%;
        padding: 2rem 0;
        position: absolute;
        background-color: black;
        text-align: center;
        bottom: 0;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <h1 style="text-align: center; padding: 2rem 1rem;">Loading...</h1>
    </div>
    
    <footer>
      <div class="container">
        <h3>Created by wajik45</h3>
      </div>
    </footer>
    
    <script>
      (async function () {
        const rootElement = document.getElementById("root");
        
        try {
          const response = await fetch(location.pathname + "/view-data");
          const { data } = await response.json();
          
          if (!response.ok) {
            rootElement.innerHTML = \`<h1 style="text-align: center; padding: 2rem 1rem;">\${response.status} \${response.statusText}</h1>\`;
          } else {
            document.title = data.title;
            // Render the anime source page content here
            rootElement.innerHTML = \`
              <div class="container">
                <h2>\${data.title} is \${data.ok ? "Ready 💧🍌🚀🚀... Izin bang " + data.title : "not Ready 🛌😴"}</h2>
                <h4>Message : \${data.message}</h4>
                <h4>Source : <a href="\${data.baseUrl}" target="_blank">\${data.baseUrl}</a></h4>
                <h4><a href="/">back to home</a></h4>
                <div class="card-wrapper">
                  <h3>Routes :</h3>
                  \${data.routesView.map(route => \`
                    <div class="card">
                      <h4>\${route.title}</h4>
                      <p><span class="key"><span class="dot"></span>Get</span> : <a href="\${data.baseUrlPath + route.route}" target="_blank">\${data.baseUrlPath + route.route}</a></p>
                    </div>
                  \`).join('')}
                </div>
              </div>
            \`;
          }
        } catch (error) {
          rootElement.innerHTML = '<h1 style="text-align: center; padding: 2rem 1rem;">Error loading data</h1>';
        }
      })();
    </script>
  </body>
</html>
`

export const samehadakuController = {
  getMainView: (c: Context) => {
    return c.html(animeSourceHtml)
  },

  getMainViewData: (c: Context) => {
    const data = samehadakuInfo
    return c.json(generatePayload({ data }))
  },

  getHome: async (c: Context) => {
    try {
      const data = await parser.parseHome()
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
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
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
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
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
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
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getRecentEpisodes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseRecentAnime(page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getOngoingAnimes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const order = getOrderParam(c.req)
      const { data, pagination } = await parser.parseOngoingAnimes(page, order)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getCompletedAnimes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const order = getOrderParam(c.req)
      const { data, pagination } = await parser.parseCompletedAnimes(page, order)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getPopularAnimes: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parsePopularAnimes(page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getMovies: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseMovies(page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getBatches: async (c: Context) => {
    try {
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseBatches(page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getSearch: async (c: Context) => {
    try {
      const q = getQParam(c.req)
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseSearch(q, page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getGenreAnimes: async (c: Context) => {
    try {
      const genreId = c.req.param("genreId")
      const page = getPageParam(c.req)
      const { data, pagination } = await parser.parseGenreAnimes(genreId, page)
      return c.json(generatePayload({ data, pagination }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
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
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getAnimeEpisode: async (c: Context) => {
    try {
      const episodeId = c.req.param("episodeId")
      const originUrl = `${c.req.header("x-forwarded-proto") || "https"}://${c.req.header("host")}`
      const data = await parser.parseAnimeEpisode(episodeId, originUrl)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getServerUrl: async (c: Context) => {
    try {
      const serverId = c.req.param("serverId")
      const originUrl = `${c.req.header("x-forwarded-proto") || "https"}://${c.req.header("host")}`
      const data = await parser.parseServerUrl(serverId, originUrl)
      return c.json(generatePayload({ data }))
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
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
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },

  getWibuFile: async (c: Context) => {
    try {
      const url = getUrlParam(c.req)
      const wibuFile = await parser.parseWibuFile(url)
      return c.text(wibuFile)
    } catch (error: any) {
      return c.json(
        generatePayload({
          statusCode: error.status || 500,
          message: error.message || "Internal Server Error",
        }),
        error.status || 500,
      )
    }
  },
}
