import { BuildEnvironmentOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import build from '@hono/vite-build/node'

// https://vite.dev/config/
export default defineConfig(({ mode }) => { 
  
  const buildOptions:BuildEnvironmentOptions = {
    outDir: "build"
  }
  if (mode === "server") {
    buildOptions.outDir = 'dist'
    buildOptions.copyPublicDir = false
  }
  
  return {
  server: {
    port: 4000, // change to a custom port
  },
  build: buildOptions,
  plugins: [mode === "server" ? build({entry: './server.ts'}) : react(),
    devServer({
      entry: "server.ts",
      exclude: [ // We need to override this option since the default setting doesn't fit
          /.*\.tsx?($|\?)/,
          /.*\.(s?css|less)($|\?)/,
          /.*\.(svg|png)($|\?)/,
          /^\/@.+$/,
          /^\/favicon\.ico$/,
          /^\/(public|assets|static)\/.+/,
          /^\/node_modules\/.*/
      ],
      injectClientScript: false, // This option is buggy, disable it and inject the code manually
  })    
  ]
}})
