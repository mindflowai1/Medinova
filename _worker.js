export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Para rotas SPA, retornar index.html
    const spaRoutes = ['/tratamentos', '/contato', '/sobre', '/antes-depois', '/depoimentos'];
    const isSpaRoute = spaRoutes.some(route => url.pathname.startsWith(route));
    
    if (isSpaRoute) {
      // Reescrever para index.html para rotas SPA
      url.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    
    // Obter o asset solicitado do KV storage
    let response = await env.ASSETS.fetch(request);
    
    // Se for 404 e não for um arquivo com extensão, servir index.html
    if (response.status === 404 && !url.pathname.match(/\.\w+$/)) {
      url.pathname = '/index.html';
      response = await env.ASSETS.fetch(new Request(url.toString(), request));
    }
    
    // Adicionar cabeçalhos de segurança
    response = new Response(response.body, response);
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Cache para arquivos estáticos
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|eot)/i)) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    return response;
  }
};
