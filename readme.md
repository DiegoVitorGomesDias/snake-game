# Snake Game with JSVanilla

O jogo foi feito com base na playlist [Jogo da Serpente](https://youtube.com/playlist?list=PLzi7gnV7P9PRJSrqFCguFoXnURwFCH-I5) do canal [EuCurso](https://www.youtube.com/@EuCurso).

## Introdução
Vale ressaltar que não copiei linha a linha do código mostrado na playlist, para fins de treinamento, fui criando partes/funções do jogo e comparando o resultado com o mostrado nos vídeos. Dessa forma, assim como cheguei em soluções "melhores" e mantive como aprendi e implementei as melhores soluções mostradas durante as aulas.

## Desenvolvimento
Durante o desenvolvimento deste jogo tive muitas difuldades em controlar o Buffer do jogo, causando sobrecarga no carregamento dos gráficos e lag. Principalmente quando aumentava o tamanho da área de jogo, aumentando respectivamentes o número de imagens na tela.

Por causa disso, tive que pesquisar, quebrar a cabeça, ler e reler todo o código, criar vários arquivos e realizar grandes alterações para achar uma forma de resolver o problema e continuar com o código limpo e finalmente chegar em uma solução.

### O Problema e a Solução
Durante a inicialização do jogo, é criada um `window.addEventListener("keydown", ({ code }) => setKey(code));` e quando o jogo é encerrado, o mesmo era removido, entretanto, devido a quantidade de teclas pressionadas durante a jogatina, a função era sobrescrita várias vezes antes mesmo de renderizar o movimento causando lag e Buffer durante o carregamento das imagens onde o movimento da cobra ocorria.

Para a resolução dessa problemática instanciei a função após o movimento da cobra e com um adendo: `window.addEventListener("keydown", ({ code }) => setKey(code), { once: true });`, com a propriedade **once: true** o eventListener receberá apenas um evento "kewdown" após o carregamento da nova posição da cobra e assim será "destruída" e recriada após a execução do movimento, poupando memória do browser e resolvendo o lag do jogo.

## Conclusão
Para me desafiar ainda mais, acrescentei por conta própria 3 níveis de dificuldades, assim gerando um código mais dinâmico, criando a tela de jogo em qualquer proporção **par** acima de **8x8** ajustando o tamanho dos sprites, a renderização das maçãs e o limite de movimentos da cobra.
No fim, acredito que cheguei em uma resolução melhor e mais avançada do que a mostrada no mini-curso, provando meu progresso em lógica de programação, estruturação de códigos e otimização de aplicativos.
