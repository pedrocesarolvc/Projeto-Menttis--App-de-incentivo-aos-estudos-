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

O front-end (`projetoMenttis/`) e o começo do backend (`backend/`) já
existem; ainda não estão ligados um no outro. Isso significa:

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
- **O motor de perguntas (`backend/`) já roda e já tem uma rota de API
  de verdade** (`POST /api/atividades/gerar`), mas ainda usa um provedor
  de IA falso — sem chamar nenhuma IA de verdade, sem custo, sem chave.
  A escolha de qual modelo real usar foi deixada de propósito como
  parâmetro trocável; ver
  [`docs/arquitetura-gerador.md`](docs/arquitetura-gerador.md). O front
  ainda não chama essa API — os dois existem lado a lado por enquanto.

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

```
backend/
├── app/
│   ├── main.py                 Rotas da API (FastAPI)
│   ├── esquemas.py             Contrato de uma atividade (Pydantic)
│   ├── config.py               Qual provedor de IA cada plano usa
│   └── geracao/
│       ├── gerador.py          Orquestra cache → roteador → provedor → validação
│       ├── roteador_modelo.py  Escolhe o provedor a partir do plano
│       ├── validacao.py        Confere se a atividade gerada é válida
│       ├── cache.py            Evita gerar de novo o que já foi gerado
│       └── provedores/         Um arquivo por provedor de IA (hoje só o falso funciona)
└── tests/
```

Detalhe de cada camada em
[`docs/arquitetura-gerador.md`](docs/arquitetura-gerador.md).

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

### Front-end (`projetoMenttis/`)

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

### Backend (`backend/`)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Sobe em `http://localhost:8000/docs` (Swagger, documentação interativa
gerada automaticamente). Detalhes de como o gerador é montado por
dentro em [`docs/arquitetura-gerador.md`](docs/arquitetura-gerador.md).
Rodar os testes: `pytest` (de dentro de `backend/`, com o `.venv`
ativado).

## Próximos passos

1. ~~Motor de perguntas por IA~~ — existe e roda
   ([`docs/arquitetura-gerador.md`](docs/arquitetura-gerador.md)), mas
   ainda com um provedor de IA falso; falta decidir e ligar um modelo
   real.
2. Ligar o front no backend — hoje `js/mockData.js` e a rota de API
   existem lado a lado, sem se falar.
3. Persistência de verdade (banco de dados) — é nesse momento que
   criar/entrar em grupo passa a gravar algo, e conta de usuário passa
   a existir.
4. Planos e cota diária de geração — o modelo de monetização já está
   desenhado (planos, limites, o que cada um libera) em
   [`docs/modelo-de-negocio.md`](docs/modelo-de-negocio.md); falta
   implementar quando existir conta de usuário de verdade.

Veja o [`CHANGELOG.md`](CHANGELOG.md) pro histórico completo do que já
foi feito, e [`Relatorio_Refatoracao_Menttis.md`](Relatorio_Refatoracao_Menttis.md)
pra detalhes da refatoração original de login/cadastro (v1).
