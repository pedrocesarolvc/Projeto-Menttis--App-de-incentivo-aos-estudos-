# Arquitetura do gerador de atividades

Como o motor de perguntas por IA é montado por dentro. Complementa
[`modelo-de-negocio.md`](modelo-de-negocio.md) — aqui é o "como", lá é o
"o que cada plano libera".

**Status:** primeira versão, rodando localmente com um provedor de IA
falso (sem chamar nenhuma API de verdade ainda — ver seção "Provedores").
O contrato e as camadas já estão desenhados pra aguentar provedores
reais sem precisar reescrever nada, só plugar.

## O contrato de uma atividade

Toda atividade gerada — solo ou de raid — tem o mesmo formato,
independente de qual IA gerou ou de qual plano pediu:

```json
{
  "pergunta": "A mitocôndria é a ____ da célula.",
  "posicao_lacuna": 18,
  "opcoes": ["central energética", "parede celular", "núcleo"],
  "resposta_correta": "central energética",
  "assunto": "Biologia celular",
  "estilo": "completar_frase",
  "nivel_elaboracao": "basico"
}
```

Isso é forçado via **Pydantic** (`app/esquemas.py`) — o provedor de IA
não devolve texto livre pra gente tentar interpretar depois; a resposta
já precisa vir nesse formato, ou é rejeitada.

## As camadas

```
requisição HTTP
      │
      ▼
┌─────────────────┐
│  app/main.py     │  rota FastAPI: recebe assunto/estilo/nível/plano
└────────┬─────────┘
         ▼
┌─────────────────────────┐
│  GeradorDeAtividades      │  orquestra as etapas abaixo
│  (geracao/gerador.py)     │
└─┬───────┬───────┬─────┬──┘
  │        │       │     │
  ▼        ▼       ▼     ▼
cache   roteador  provedor  validação
```

1. **Cache primeiro** (`geracao/cache.py`) — antes de gastar uma chamada
   de IA, verifica se já existe uma atividade salva pro mesmo
   assunto+estilo+nível. Duas pessoas estudando "Revolução Francesa"
   hoje não precisam de duas chamadas de API pra perguntas parecidas.
   Reduz custo real diretamente — junto com os limites diários, é a
   segunda linha de defesa contra custo de IA fora de controle.

2. **Roteador de modelo** (`geracao/roteador_modelo.py`) — decide *qual*
   provedor/modelo chamar, a partir do plano e do nível de elaboração
   (a tabela de planos em `modelo-de-negocio.md` vira, literalmente, um
   dicionário de configuração aqui — `app/config.py`). Trocar de modelo
   real no futuro é editar essa configuração, não reescrever a lógica de
   geração.

3. **Provedor** (`geracao/provedores/`) — quem de fato conversa com a IA
   (ou finge conversar, ver abaixo). Todo provedor implementa a mesma
   interface (`ProvedorIA.gerar(...)`), então o resto do sistema não
   sabe nem se importa se por trás é OpenAI, Anthropic, Gemini ou um
   provedor falso.

4. **Validação** (`geracao/validacao.py`) — IA erra. Antes de devolver
   pro usuário, confere: a resposta correta está mesmo entre as opções?
   a posição da lacuna existe dentro do texto da pergunta? não tem opção
   duplicada? Se falhar, tenta gerar de novo (limite de tentativas) em
   vez de mostrar uma pergunta quebrada.

**De propósito fora do gerador:** checar se o usuário ainda tem cota
disponível hoje. Isso é problema de conta/plano, que ainda não existe
(sem sistema de usuário de verdade) — quando existir, entra como uma
verificação *antes* de chamar o gerador (na camada da rota), não dentro
dele. O gerador não sabe nem precisa saber quantas atividades essa
pessoa já gerou hoje.

## Provedores

`ProvedorIA` é o contrato; hoje só um provedor está implementado de
verdade:

- **`ProvedorFalso`** (`provedores/falso.py`) — gera atividades de
  mentira (template simples com o assunto pedido), sem chamar nenhuma
  API, sem custo, sem chave. Existe pra desenvolver e testar o resto do
  sistema (rota, cache, validação, roteador) sem precisar de conta paga
  em nenhum serviço de IA ainda.
- **`OpenAIProvedor` / `AnthropicProvedor`** (stubs em
  `provedores/openai_provedor.py` e `provedores/anthropic_provedor.py`)
  — existem só como lembrete de onde a implementação real entra
  depois; hoje levantam `NotImplementedError`. Ligar um de verdade é
  questão de implementar `gerar(...)` ali dentro e trocar a configuração
  do roteador — nenhuma outra camada muda.

## Rodando local

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Sobe em `http://localhost:8000`. `POST /api/atividades/gerar` com
`{"assunto": "Cloud Computing", "estilo": "completar_frase", "nivel_elaboracao": "basico", "plano": "gratuito"}`
devolve uma atividade gerada pelo `ProvedorFalso`. `/docs` tem a
documentação interativa (Swagger), gerada automaticamente pelo FastAPI.

## Por que FastAPI

Mesma decisão de framework do outro projeto do autor — mas aqui tem um
motivo técnico específico além de familiaridade: o contrato de atividade
já precisa ser validado estruturalmente (seção "O contrato" acima), e
Pydantic (que o FastAPI usa nativamente pra validar entrada/saída) faz
exatamente isso de graça — a mesma classe `Atividade` valida a resposta
da IA E documenta a API automaticamente.
