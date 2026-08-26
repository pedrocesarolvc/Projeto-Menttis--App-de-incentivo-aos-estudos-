# Changelog

Histórico de mudanças do Menttis, mais detalhado que o log do git — cada
entrada explica o que mudou e, quando não é óbvio, por quê. Datas no
formato AAAA-MM-DD.

## 2026-08-19 — Recomeço v2

Depois de uma conversa com o professor orientador (fundador do Gradepen),
decidimos recomeçar o Menttis com um escopo bem mais amplo: em vez de um
app só pra ensino médio com matérias fixas, o Menttis vira uma plataforma
de aprendizagem gamificada pra **qualquer pessoa, sobre qualquer
assunto**, com perguntas geradas por IA. As mecânicas de v1 (jornada solo
estilo Duolingo, grupos que viram "raids" — um aluno chama outros pra
encarar desafios juntos) continuam as mesmas; o que muda é o alcance.

### Adicionado

- **Sistema de design compartilhado** (`css/tokens.css`, `css/layout.css`):
  cores, fonte (Outfit) e a casca do app (topbar + menu lateral) num só
  lugar. Antes cada tela tinha sua própria cópia, levemente diferente, do
  mesmo CSS.
- **`js/shell.js`**: monta a topbar e o menu lateral em toda página do
  app (o HTML vive dentro do próprio script, não é buscado por `fetch` —
  ver seção de bugs corrigidos abaixo pra entender o porquê) e garante
  sozinho que a fonte de ícones Boxicons está carregada.
- **`recuperar_senha.html`**: tela de recuperação de senha que não
  existia, no mesmo visual do login/cadastro.
- **Painel principal de verdade** (`menu.html`): nível, XP, sequência de
  dias, atalhos rápidos ("Estudar sozinho", "Grupos") e o carrossel de
  grupos — antes só existia o carrossel, o resto da tela ficava vazio.
- **`meus_grupos.html`**: grade com todos os grupos do usuário, mostrando
  quantos membros cada um tem e se há desafio em andamento.
- **`grupo_detalhe.html`**: a tela de "raid" — roster de membros, card do
  desafio ativo com barra de progresso, link de convite copiável.
- **`js/mockData.js`**: dados de exemplo (usuário e grupos) usados
  enquanto não existe backend. Inclui um grupo de "Cloud Computing &
  DevOps" — prova visual de que o app não é mais só matéria de escola.
- **Sistema de "tom"** (`js/tom.js`, `css/tom.css`): um seletor em
  Configurações com três níveis — Direto, Equilibrado (padrão) e Animado
  — que controla o quanto de decoração lúdica (emoji, exclamação,
  animação de comemoração) aparece pela interface, sem mudar a mecânica.
  Existe pra atender um público mais velho/profissional sem excluir quem
  gosta do app mais "brincalhão". Guardado em `localStorage`, trocável a
  qualquer momento.
- **`docs/modelo-de-negocio.md`**: os três planos (Gratuito, Aprendiz,
  Mestre), por que existe cota diária de geração (custo real de IA, não
  psicologia de engajamento tipo "vidas" do Duolingo), e a separação
  entre nível/XP (controla elaboração, de graça pra todo mundo) e plano
  (controla quantidade, modelo de IA, estilo de pergunta e velocidade).
  Marcado como hipótese — números não validados contra custo real ainda.
- **`backend/`**: primeira versão do motor de geração de atividades,
  rodando localmente (FastAPI). Arquitetura em camadas — cache, roteador
  de modelo, provedor de IA, validação — documentada em
  [`docs/arquitetura-gerador.md`](docs/arquitetura-gerador.md). Hoje usa
  um provedor de IA falso (sem custo, sem chave, sem chamar nenhuma API
  de verdade) de propósito: a escolha de qual modelo real usar ficou
  deliberadamente em aberto, como parâmetro trocável via
  `app/config.py`. Front e backend ainda não se falam.

### Corrigido

- **Menu lateral duplicado e divergente**: existiam duas implementações
  diferentes de sidebar (uma por toggle em JavaScript, outra por
  checkbox+CSS), cada uma com seu próprio CSS levemente diferente do
  outro — por isso as telas "não pareciam do mesmo site".
- **Ícones do menu com a cor errada**: os ícones (PNG) já são dourados,
  mas o CSS aplicava um filtro `invert()` pensado pra ícone escuro.
- **Caminhos de imagem quebrados** (`../inicial/img/...`) nas telas de
  Ajuda e Configurações — uma pasta que não existia.
- **CSS de login/cadastro duplicado**: `pc/estilo_login_pc.css` e
  `css/estilo_criar_conta.css` eram quase idênticos; viraram um só
  (`css/auth.css`), sem mudar o visual.
- **`</head>` duplicado e imagem externa quebrada** em
  `pagina_criar_conta.html`.
- **Menu lateral sumindo ao abrir o site com duplo clique**: o menu era
  montado com `fetch('partials/shell.html')`, que o navegador bloqueia em
  páginas abertas via `file://` (sem servidor). Resolvido embutindo o
  HTML do menu dentro do próprio `js/shell.js`.
- **Ícone de três linhas sumindo em Criar/Entrar grupo, Configurações e
  Ajuda**: essas quatro páginas não carregavam a folha de ícones
  Boxicons. `js/shell.js` agora garante isso sozinho, então nenhuma
  página pode mais esquecer.
- **Sino da topbar colado na logo no celular**: faltava
  `justify-content: space-between` na barra — sem a barra de busca (que
  some em telas pequenas) como "espaçador", nada empurrava o sino pra
  direita.

### Removido

- **App Android nativo** (pasta `Menttis/`, Kotlin + Jetpack Compose):
  decisão de manter só uma base de código (HTML/CSS/JS + Python), já que
  a versão web responsiva cobre mobile sem esforço extra de manter dois
  projetos.
- **Pasta `celular/`**: uma segunda versão de login feita só pro celular,
  nunca linkada de nenhum lugar do site, e redundante depois que o login
  de PC ganhou breakpoint responsivo.
- **Arquivos órfãos**: CSS duplicado sem nenhuma página usando
  (`css/menu.css`, `css/menuLateral_ajuda.css`,
  `css/menuLateral_config.css`, `css/criar_grupo.css`,
  `css/entrar_grupo.css`, `css/new_login_pc.css` — este último nunca
  tinha sido ligado a nenhuma página, apesar de já ter a paleta certa da
  marca) e um `teste.html` vazio.

### Experimentado e revertido

- Card "Grupos" do painel piscando entre azul e dourado no hover — ficou
  visualmente ruim, voltou pro hover padrão (levantar + sombra).

## v1 — Menttis original (ESUDA, 3º período)

A primeira versão, escrita pelo grupo da faculdade: login e cadastro
(PC e celular), criação e entrada em grupo por link, tela de
configurações e de ajuda/feedback. Documentado em detalhe em
[`Relatorio_Refatoracao_Menttis.md`](Relatorio_Refatoracao_Menttis.md),
que cobre a refatoração de login/cadastro (separação de responsabilidade
entre os dois formulários, correção de eventos duplicados nos botões,
etc.) — vale ler antes de mexer nesses arquivos, mesmo depois do v2.
