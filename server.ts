// server.ts
import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { readFileSync } from 'node:fs';
import api from "./services/api"

const isProd = process.env["NODE_ENV"] === "production"
let html = readFileSync(isProd ? "build/index.html" : "index.html", "utf8")

if (!isProd) {
    // Inject Vite client code to the HTML
    html = html.replace("<head>", `
    <script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>

    <script type="module" src="/@vite/client"></script>
    `)
}

const app = new Hono()
	.route("/", api)
  .use("/assets/*", serveStatic({ root: isProd ? "build/" : "./" })) // path must end with '/'
  .get("/*", c => c.html(html))

app.use("*", async (c, next) => {
  c.res.headers.set("X-Powered-By", "Hono")
    await next()
})

export default app
export type AppType = typeof app

if (isProd) {
    serve({ ...app, port: 4000 }, info => {
        console.log(`Listening on http://localhost:${info.port}`);
    });
}
