# Medinova - Landing Page

Uma landing page elegante e moderna para a Medinova, uma clínica de estética que oferece tratamentos de beleza e bem-estar com excelência.

## Visão Geral

Esta landing page foi desenvolvida com design moderno e minimalista, seguindo uma paleta de cores em tons de bege (#D9C7B6) e marrom (#8D6E63) para transmitir elegância e sofisticação. O site apresenta diversas seções que destacam os serviços e diferenciais da clínica Medinova.

## Características

- **Design Responsivo**: Adaptação perfeita para dispositivos móveis e desktop
- **Animações Suaves**: Transições e efeitos que melhoram a experiência do usuário
- **Menu de Navegação**: Menu desktop e mobile para fácil acesso a todas as seções
- **Seções Principais**:
  - Hero com chamada para ação
  - Sobre a clínica
  - Tratamentos oferecidos
  - Antes e Depois (com cards interativos)
  - Depoimentos de clientes
  - Formulário de contato
  - Footer com informações e links úteis

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para cores e estilos consistentes)
- JavaScript (Vanilla)
- FontAwesome para ícones
- Google Fonts (Poppins e Playfair Display)

## Seções Especiais

### Seção "Antes e Depois"
Apresenta cards interativos que permitem aos usuários comparar os resultados dos tratamentos estéticos.

### Formulário de Contato
Design elegante e feminino com campos para nome, telefone, email, tratamento de interesse e mensagem.

## Instalação e Uso

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/medinova-landing-page.git
```

2. Abra o arquivo `index.html` em seu navegador preferido.

## Deploy no Cloudflare Pages

Este projeto está configurado para ser facilmente implantado no Cloudflare Pages:

1. Crie uma conta no [Cloudflare](https://dash.cloudflare.com/)
2. No painel do Cloudflare, vá para **Pages** > **Create a project** > **Connect to Git**
3. Conecte sua conta GitHub/GitLab e selecione este repositório
4. Configure as opções de build:
   - **Framework preset**: None / Static Site
   - **Build command**: Deixe em branco (não é necessário)
   - **Build output directory**: / (raiz)
   - **Environment variables**: Não é necessário definir nenhuma

5. Clique em **Save and Deploy**
6. Após o deploy, você receberá uma URL no formato `https://seu-projeto.pages.dev`

Os arquivos de configuração já estão incluídos:
- `_headers`: Define cabeçalhos HTTP para segurança e cache
- `_redirects`: Configura redirecionamentos, útil para SPA
- `netlify.toml`: Compatível com Cloudflare Pages para processamento de ativos

## Personalização

- Todas as cores do site podem ser facilmente alteradas através das variáveis CSS no arquivo `styles.css`
- As imagens podem ser substituídas na pasta `img/` mantendo os mesmos nomes de arquivo

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Preview

![Medinova Landing Page](preview.png)
