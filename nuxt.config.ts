import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url))
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  vite: {
    plugins: [
      {
        name: 'nuxt-asset-root-guard',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/_nuxt' || req.url === '/_nuxt/') {
              res.statusCode = 204
              return res.end('')
            }
            return next()
          })
        }
      }
    ]
  }
})
