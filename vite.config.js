import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin za API routes
    {
      name: 'api-routes',
      configureServer(server) {
        server.middlewares.use('/api', async (req, res, next) => {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const query = Object.fromEntries(url.searchParams)
            
            console.log('[Vite Plugin] API Request:', req.method, url.pathname, query)
            
            // Vercel-style request object
            const vercelReq = {
              method: req.method,
              url: req.url,
              query: query,
              headers: req.headers,
            }
            
            let responseSent = false
            
            // Vercel-style response object
            const vercelRes = {
              statusCode: 200,
              headers: {},
              setHeader: (key, value) => {
                if (!responseSent) {
                  res.setHeader(key, value)
                }
              },
              status: function(code) {
                this.statusCode = code
                return this
              },
              json: function(data) {
                if (responseSent) return
                responseSent = true
                console.log('[Vite Plugin] API Response:', data)
                res.writeHead(this.statusCode, { 
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                })
                res.end(JSON.stringify(data))
              },
              end: function() {
                if (responseSent) return
                responseSent = true
                res.end()
              }
            }
            
            // Load i pozovi handler koristeći Vite's module system
            if (url.pathname === '/api/search/suggest' || url.pathname.startsWith('/api/search/suggest')) {
              const handlerPath = join(__dirname, 'api', 'search', 'suggest.js')
              const handlerModule = await server.ssrLoadModule(handlerPath)
              await handlerModule.default(vercelReq, vercelRes)
              return // Stop middleware chain
            } else if (url.pathname === '/api/search' || url.pathname.startsWith('/api/search')) {
              const handlerPath = join(__dirname, 'api', 'search.js')
              const handlerModule = await server.ssrLoadModule(handlerPath)
              await handlerModule.default(vercelReq, vercelRes)
              return // Stop middleware chain
            }
            
            next()
          } catch (error) {
            console.error('[Vite Plugin] API handler error:', error)
            console.error('[Vite Plugin] Error stack:', error.stack)
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Internal server error', details: error.message }))
            }
          }
        })
      }
    }
  ]
})
