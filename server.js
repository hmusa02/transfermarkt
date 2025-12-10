// Simple Express server za lokalno testiranje Vercel serverless funkcija
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createServer as createViteServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function createServer() {
  const app = express()
  
  // Create Vite server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  })
  
  // API routes - Vercel serverless functions
  app.use('/api/search', async (req, res) => {
    const handler = (await import('./api/search.js')).default
    await handler(req, res)
  })
  
  app.use('/api/search/suggest', async (req, res) => {
    const handler = (await import('./api/search/suggest.js')).default
    await handler(req, res)
  })
  
  // Use Vite's connect instance as middleware
  app.use(vite.ssrLoadModule)
  
  // Serve static files
  app.use(express.static(join(__dirname, 'dist')))
  
  // SPA fallback
  app.get('*', async (req, res) => {
    const html = await vite.transformIndexHtml(req.url, `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>TransferHub</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.jsx"></script>
        </body>
      </html>
    `)
    res.send(html)
  })
  
  const port = 5173
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

createServer().catch(console.error)

