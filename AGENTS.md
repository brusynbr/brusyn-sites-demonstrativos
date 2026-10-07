# Direção para novos sites desta coleção

Ao criar ou reformular um site nesta coleção, use como padrão uma apresentação digital de alto nível: uma primeira dobra marcante, tipografia editorial bem escolhida, imagem principal grande e autêntica ao segmento, contraste forte, composição com profundidade e chamadas para ação muito claras. Use as referências visuais fornecidas pelo proprietário como inspiração, sem copiar marcas, textos ou composições de terceiros.

## Movimento e bibliotecas disponíveis

O projeto tem `three`, `gsap` e `lenis` instalados e versionados no `package.json` e `package-lock.json`. Antes de decidir como incluir as bibliotecas na entrega, respeite a estrutura pedida pelo proprietário. A coleção historicamente prefere uma página autônoma em HTML; preserve esse formato quando solicitado. Os pacotes locais servem para consulta e prototipagem. Se a página estática precisar executá-los no navegador, inclua arquivos do fornecedor no projeto ou use imports ESM com versões fixadas em CDN, verificando o funcionamento publicado. Não use caminho de `node_modules` em uma página pública se essa pasta não for enviada ao deploy.

- **GSAP**: ferramenta padrão para coreografar a entrada do hero, a sequência de elementos, transições e revelações discretas durante a rolagem. Prefira `gsap.context()` para limpeza e `gsap.matchMedia()` para variantes responsivas e movimento reduzido; use ScrollTrigger somente quando uma narrativa de rolagem melhorar a apresentação.
- **Lenis**: use para suavizar a rolagem de páginas longas quando a experiência realmente pedir essa sensação. Mantenha âncoras, teclado, gestos de toque e rolagem nativa acessíveis. Respeite `prefers-reduced-motion`; nunca bloqueie a rolagem natural.
- **Three.js**: recurso opcional para uma peça 3D leve e específica do segmento, como um produto, cenário abstrato ou detalhe de ambiente no hero. Faça fallback para imagem estática, carregue sob demanda, limite partículas e qualidade em dispositivos móveis e não coloque informação essencial somente no canvas.

## Princípios de direção de arte

- Faça a primeira dobra apresentar negócio, benefício, imagem e ação principal em poucos segundos. A imagem pode dominar o hero, mas o texto precisa manter contraste e hierarquia.
- Anime com intenção: revele conteúdo em poucos grupos, use movimento curto e elegante e dê resposta clara a botões e cartões. Evite parallax forte, rolagem sequestrada, cursores falsos, loop chamativo e movimento concorrendo com leitura.
- Aplique paleta, fotografias, ritmo e metáforas que façam sentido para o setor. Um restaurante pode usar textura e apelo sensorial; moda pode ser editorial e ousada; saúde e advocacia devem continuar calmas, legíveis e confiáveis mesmo com animações refinadas.
- Respeite `prefers-reduced-motion`, mantenha conteúdo visível sem JavaScript e garanta a operação por toque e teclado. O efeito deve degradar graciosamente sem WebGL, sem CDN ou sem suporte ao hover.
- Confira celular, teclado, contraste, carregamento das imagens, console e movimento reduzido antes de entregar. Na dúvida, escolha a versão visualmente forte que carrega mais rápido.
