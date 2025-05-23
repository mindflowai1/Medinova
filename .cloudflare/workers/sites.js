// Simples script para servir o site estático
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    
    try {
      // Tenta obter o asset solicitado
      const asset = await env.ASSETS.fetch(new URL(path, request.url));
      
      if (asset.status === 200) {
        // Se for um asset estático, adicione cache adequado
        const response = new Response(asset.body, asset);
        
        if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|eot)/i)) {
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        }
        
        // Adiciona headers de segurança
        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        return response;
      }
      
      // Se for uma rota SPA, retorne o index.html
      const spaRoutes = ['/tratamentos', '/contato', '/sobre', '/antes-depois', '/depoimentos'];
      if (spaRoutes.some(route => url.pathname.startsWith(route))) {
        const indexPage = await env.ASSETS.fetch(new URL('/index.html', request.url));
        return new Response(indexPage.body, indexPage);
      }
      
      // Se não encontrou, retorne 404
      return new Response('Not Found', { status: 404 });
    } catch (e) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}
