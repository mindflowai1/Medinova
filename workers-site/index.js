/**
 * Worker para a landing page da Medinova
 * Utiliza a abordagem moderna do Cloudflare para assets estáticos
 */

const DEBUG = false

export default {
  async fetch(request, env, ctx) {
    return await handleEvent(request, env, ctx)
  }
}

async function handleEvent(request, env, ctx) {
  const url = new URL(request.url)

  try {
    // Verifica se a URL é uma rota SPA
    const spaRoutes = ['/tratamentos', '/contato', '/sobre', '/antes-depois', '/depoimentos']
    if (spaRoutes.some(route => url.pathname.startsWith(route))) {
      // Para rotas SPA, servir o index.html
      return await serveIndexHtml(request, env, ctx)
    }

    // Tenta servir o asset requisitado
    let response = await env.__STATIC_CONTENT.fetch(request)
    
    // Se o asset foi encontrado, adiciona headers de segurança e cache
    if (response.status === 200) {
      response = new Response(response.body, response)
      response.headers.set('X-XSS-Protection', '1; mode=block')
      response.headers.set('X-Content-Type-Options', 'nosniff')
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
      
      // Cache para assets estáticos
      if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|eot)/i)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      }
      
      return response
    }
    
    // Se o asset não foi encontrado (404), servir o index.html
    if (response.status === 404) {
      return await serveIndexHtml(request, env, ctx)
    }
    
    return response
  } catch (e) {
    return new Response(DEBUG ? (e.message || e.toString()) : 'Internal Error', { 
      status: 500 
    })
  }
}

// Função auxiliar para servir o index.html
async function serveIndexHtml(request, env, ctx) {
  try {
    let response = await env.__STATIC_CONTENT.fetch(new Request(new URL('/index.html', request.url)))
    response = new Response(response.body, response)
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    return response
  } catch (e) {
    return new Response(DEBUG ? (e.message || e.toString()) : 'Not Found', { 
      status: 404 
    })
  }
}
