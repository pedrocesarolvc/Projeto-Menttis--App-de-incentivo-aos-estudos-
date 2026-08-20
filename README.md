# Menttis

Menttis transforma qualquer assunto em jogo. Você escolhe o que quer
aprender — matéria de escola, uma certificação de Cloud, um idioma, um
hobby — e a IA gera perguntas rápidas e difíceis, estilo Duolingo, pra
fixar o conteúdo. Dá pra estudar sozinho (jornada solo, gamificada) ou em
grupo: um estudante chama outros do mesmo assunto e encaram desafios
juntos, como uma party de RPG enfrentando um chefe — uma "raid" de
estudo.

Projeto de Pedro Cesar e do grupo da faculdade ESUDA (Análise e
Desenvolvimento de Sistemas, 3º período). A v1 nasceu focada em ensino
médio; a v2 — a versão que está neste repositório agora — abandona esse
recorte de propósito: o motor de perguntas por IA e a mecânica de grupo
servem pra qualquer pessoa estudando qualquer coisa. Veja o
[`CHANGELOG.md`](CHANGELOG.md) pra o histórico detalhado dessa virada.

## Estado atual

**Só o front-end existe por enquanto**, de propósito — a decisão foi
consolidar o HTML/CSS/JS antes de começar o motor de IA e o backend em
Python. Isso significa:

- Login, cadastro e recuperação de senha têm validação e navegam
  corretamente, mas não persistem nada de verdade — é só o formulário e a
  troca de tela.
- Os grupos, membros e desafios que aparecem no app vêm de dados fixos em
  [`projetoMenttis/js/mockData.js`](projetoMenttis/js/mockData.js), não
  de um banco de dados. Criar ou entrar em um grupo mostra uma
  confirmação e redireciona, mas não grava nada — decisão deliberada,
  pra não construir persistência descartável em cima do que o backend em
  Python vai substituir.
- A tela de Configurações salva os campos de conta em `localStorage`
  (um jeito temporário de "lembrar" os dados sem servidor).

## Estrutura

```
projetoMenttis/
├── menu.html                 Painel principal (nível, XP, sequência, grupos)
├── meus_grupos.html          Grade com todos os grupos do usuário
├── grupo_detalhe.html        Tela de um grupo: membros, desafio, convite
├── criar_grupo.html          Formulário de criar grupo
├── entrar_grupo.html         Entrar em grupo por link de convite
├── recuperar_senha.html      Recuperação de senha
├── pagina_criar_conta.html   Criar conta
├── menuLateral_config.html   Configurações da conta + tom da interface
├── menuLateral_ajuda.html    Ajuda / FAQ / feedback
├── pc/pagina_login_pc.html   Login (desktop)
│
├── css/
│   ├── tokens.css            Cores, fonte, componentes de base (botão, card, badge...)
│   ├── layout.css            Topbar + menu lateral (a "casca" do app)
│   ├── auth.css              Visual compartilhado de login/cadastro/recuperar senha
│   ├── grupos.css            Cards de grupo, formulários de criar/entrar, tela de raid
│   ├── dashboard.css         Painel principal
│   ├── config.css / ajuda.css  Estilos específicos dessas duas telas
│   └── tom.css                Sistema de tom (ver abaixo)
│
├── js/
│   ├── shell.js               Monta a topbar/menu lateral em toda página do app
│   ├── tom.js                 Sistema de tom (ver abaixo)
│   ├── mockData.js            Dados de exemplo (usuário e grupos)
│   ├── grupoDetalhe.js        Lógica da tela de detalhe do grupo
│   └── login.js / cadastro.js / recuperarSenha.js   Validação dos formulários de conta
│
└── img/                       Ícones e logo (identidade visual feita por uma desenhista)
```

**Por que `js/shell.js` não busca um `partials/shell.html` com `fetch`:**
já foi feito assim uma vez, e quebrava toda vez que alguém abria o site
com duplo clique (`file://`) em vez de por um servidor — o navegador
bloqueia esse tipo de busca por segurança. O HTML do menu agora mora
dentro do próprio `shell.js`, como uma string, então funciona dos dois
jeitos. Ver [`CHANGELOG.md`](CHANGELOG.md) pra mais detalhes desse (e de
outros) bug.

### O sistema de "tom"

Em Configurações existe um seletor com três opções — **Direto**,
**Equilibrado** (padrão) e **Animado** — que controla o quanto de
decoração lúdica (emoji, exclamação, uma animaçãozinha de comemoração no
selo de desafio ativo) aparece pela interface. A mecânica de pontos,
nível e sequência é sempre a mesma nos três; só a "roupagem" muda.

Isso existe porque gamificar demais na aparência afasta um público mais
velho ou profissional (alguém estudando pra uma certificação de Cloud
não necessariamente quer confete), mas tirar toda a graça do app também
não é o objetivo. Em vez de duas ou três versões de interface escritas
do zero, existe **um conteúdo base só** (o nível "Equilibrado", que é o
visual de sempre do Menttis) e os outros dois níveis ligam ou desligam
camadas de decoração por cima dele — ver os comentários em
[`projetoMenttis/js/tom.js`](projetoMenttis/js/tom.js) pra entender como.
A preferência fica em `localStorage` e vale pro navegador, não pra
conta.

## Como rodar

Não precisa instalar nada — é HTML/CSS/JS puro. Mas **precisa abrir por
um servidor local**, não com duplo clique no arquivo: o menu lateral e
alguns scripts dependem de recursos carregados via JavaScript, e
navegadores restringem isso em páginas abertas como `file://`.

Com Python já instalado (qualquer versão 3):

```bash
cd projetoMenttis
python -m http.server 8000
```

Depois acesse `http://localhost:8000/pc/pagina_login_pc.html` — crie uma
conta pela própria interface (não persiste, mas navega normalmente) ou
vá direto pra `http://localhost:8000/menu.html` pra ver o painel com os
dados de exemplo.

Se preferir, qualquer outro servidor estático serve (a extensão "Live
Server" do VS Code, `npx serve`, etc.) — o importante é ser `http://`,
não `file://`.

## Próximos passos

1. Motor de perguntas por IA (gera questões estilo cloze a partir de
   qualquer assunto digitado).
2. Backend em Python — substitui `js/mockData.js` por dados de verdade,
   com banco de dados. É nesse momento que criar/entrar em grupo passa a
   gravar algo.
3. Refazer o fluxo solo e o de raid em grupo sobre o front atual, já
   ligados ao motor de IA.

Veja o [`CHANGELOG.md`](CHANGELOG.md) pro histórico completo do que já
foi feito, e [`Relatorio_Refatoracao_Menttis.md`](Relatorio_Refatoracao_Menttis.md)
pra detalhes da refatoração original de login/cadastro (v1).
