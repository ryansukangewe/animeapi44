import type { Context } from "hono"
import { generatePayload } from "../helpers/payload"
import { otakudesuInfo } from "../anims/otakudesu"
import { samehadakuInfo } from "../anims/samehadaku"

const homeHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wajik Anime Api</title>
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
          const response = await fetch("/view-data");
          const { data } = await response.json();
          
          if (!response.ok) {
            rootElement.innerHTML = \`<h1 style="text-align: center; padding: 2rem 1rem;">\${response.status} \${response.statusText}</h1>\`;
          } else {
            rootElement.innerHTML = \`
              <div class="container">
                  <h2>\${data.message}</h2>
                  <h4>Deskripsi ada di response berdasarkan sumber!</h4>
                  <div class="card-wrapper">
                      <h3>Sources :</h3>
                      \${data.sources
                        .map((source) => {
                          return \`
                              <div class="card">
                                  <h4>\${source.title}</h4>
                                  <p>
                                      <span class="key">Get</span> :
                                      <a href="\${source.route}">\${source.route}</a>
                                  </p>
                              </div>
                          \`;
                        })
                        .join("")}
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

export const mainController = {
  getMainView: (c: Context) => {
    return c.html(homeHtml)
  },

  getMainViewData: (c: Context) => {
    const animeSources = {
      otakudesu: otakudesuInfo,
      samehadaku: samehadakuInfo,
    }

    const data = {
      message: "WAJIK ANIME API IS READY 🔥🔥🔥",
      sources: Object.values(animeSources).map((source) => ({
        title: source.title,
        route: source.baseUrlPath,
      })),
    }

    return c.json(generatePayload({ data }))
  },

  _404: (c: Context) => {
    return c.json(
      generatePayload({
        statusCode: 404,
        message: "halaman tidak ditemukan",
      }),
      404,
    )
  },
}
