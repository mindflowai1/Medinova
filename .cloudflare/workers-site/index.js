import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things:
 * 1. we will skip caching on the edge, which makes it easier to debug
 * 2. we will return an error message on exception in your Response rather than the default 404.html
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      }
    }
    
    // Check if the URL is for a SPA route
    const spaRoutes = ['/tratamentos', '/contato', '/sobre', '/antes-depois', '/depoimentos']
    if (spaRoutes.some(route => url.pathname.startsWith(route))) {
      // For SPA routes, serve the index.html
      options.mapRequestToAsset = req => new Request(`${new URL(req.url).origin}/index.html`, req)
    }

    const page = await getAssetFromKV(event, options)

    // Allow pages to be served with CORS headers
    const response = new Response(page.body, page)
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // Cache static assets
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|eot)/i)) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    }
    
    return response
  } catch (e) {
    // If an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}
