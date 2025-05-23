import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * Trabalhador do Cloudflare para servir a landing page da Medinova
 * Lida com ativos estáticos como HTML, CSS, JS e imagens
 */
addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    // Tenta obter o ativo do KV
    return await getAssetFromKV(event);
  } catch (e) {
    // Se ocorrer um erro, responda com uma página de erro personalizada
    let notFoundResponse = new Response(
      `<!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Página não encontrada | Medinova</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #D9C7B6;
              color: #8D6E63;
              text-align: center;
              padding: 50px 20px;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: rgba(255, 255, 255, 0.9);
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #8D6E63;
              margin-bottom: 20px;
            }
            .back-link {
              display: inline-block;
              margin-top: 30px;
              background-color: #8D6E63;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
            .back-link:hover {
              background-color: #6D5046;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe ou foi movida.</p>
            <a href="/" class="back-link">Voltar para a página inicial</a>
          </div>
        </body>
      </html>`,
      {
        status: 404,
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      }
    );

    return notFoundResponse;
  }
}
