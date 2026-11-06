/**
 * Vite Dev & Preview Server API Middleware Plugin
 *
 * Mounts the exact same server-side form handler during `npm run dev`,
 * `npm run preview`, and automated Playwright tests, ensuring consistent
 * Cloudflare Turnstile token validation and security checks in all environments.
 */

import { handleFormSubmission } from './formHandler.js'

function attachApiMiddleware(server) {
  server.middlewares.use(async (req, res, next) => {
    const url = req.url ? req.url.split('?')[0] : ''

    if (
      url === '/api/submit' ||
      url === '/api/contact' ||
      url === '/api/newsletter'
    ) {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }))
        return
      }

      // Read request body stream
      let bodyData = ''
      req.on('data', (chunk) => {
        bodyData += chunk
      })

      req.on('end', async () => {
        try {
          let parsedBody = {}
          if (bodyData) {
            try {
              parsedBody = JSON.parse(bodyData)
            } catch {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }))
              return
            }
          }

          if (url === '/api/contact' && !parsedBody.formType) {
            parsedBody.formType = 'contact'
          } else if (url === '/api/newsletter' && !parsedBody.formType) {
            parsedBody.formType = 'newsletter'
          }

          const mockReq = {
            body: parsedBody,
            headers: req.headers,
            ip: req.socket?.remoteAddress || '127.0.0.1',
          }

          const result = await handleFormSubmission(mockReq)

          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          if (result.headers) {
            for (const [key, val] of Object.entries(result.headers)) {
              res.setHeader(key, val)
            }
          }
          res.end(JSON.stringify(result.body))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              success: false,
              error: 'Internal server error while processing verification.',
            })
          )
        }
      })
      return
    }

    next()
  })
}

export function viteFormApiPlugin() {
  return {
    name: 'vite-form-api-plugin',
    configureServer(server) {
      attachApiMiddleware(server)
    },
    configurePreviewServer(server) {
      attachApiMiddleware(server)
    },
  }
}
