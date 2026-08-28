# Modelo de negócio — planos e monetização

O Menttis, como está hoje, não é rentável: qualquer atividade gerada por
IA custa dinheiro de verdade (chamada de API), então não dá pra oferecer
geração ilimitada de graça pra sempre. Este documento registra as
decisões tomadas sobre como resolver isso, e por quê — antes de existir
backend ou motor de IA de verdade, pra não se perder entre conversas.

**Status: hipótese de lançamento.** Os números de limite diário
(especialmente) não foram validados contra custo real de geração — não
existe ainda estimativa de quanto uma atividade custa em API. Tudo aqui
deve ser reajustado assim que o motor de IA existir e houver uso real
pra medir.

## O princípio geral

Duas ideias foram avaliadas: uma assinatura que dá "bônus", ou um
sistema de energia parecido com o do Duolingo. A conclusão foi que essas
não são alternativas — são a mesma peça. O sistema de energia (ou, no
caso do Menttis, uma **cota diária de atividades geradas**) é o que cria
o motivo de existir assinatura; a assinatura vende o alívio dessa cota.

Uma diferença importante em relação ao Duolingo: o conteúdo dele é
estático (escrito uma vez, repetido de graça pra milhões). No Menttis
cada atividade é gerada na hora por IA — **o custo escala com o uso**,
não é fixo. Por isso a cota do plano grátis existe por necessidade
financeira, não só por psicologia de engajamento.

Decisão explícita: **não copiar o mecanismo de "vidas que quebram ao
errar"** do Duolingo. Punir erro desincentiva justamente o
comportamento que ensina algo (arriscar e errar), e lê como manipulativo
pro público mais velho/profissional que o Menttis quer alcançar (a
mesma preocupação que motivou o [sistema de tom](../projetoMenttis/js/tom.js)).
Em vez disso, o limite é uma **cota de uso neutra** ("N tokens de
questão por dia" — ver seção abaixo), que reseta à meia-noite — não
penaliza performance, só limita volume.

## Questão, Atividade e tokens de questão

"Atividade" estava sendo usada pra duas coisas diferentes até essa
conversa se aprofundar — uma pergunta individual, e um conjunto delas.
Ficou separado assim:

- **Questão** — uma pergunta isolada e solo. É o que o backend já gera
  hoje (a classe `Atividade` em `app/esquemas.py` vai ser renomeada pra
  `Questao` — ver nota em `arquitetura-gerador.md`).
- **Atividade** — uma sessão de **5 a 10 questões** geradas de uma vez.
  Expansível: pedir mais questões na mesma atividade (ex.: +5) gera só
  a diferença, não a sessão inteira de novo.

As duas formas de aprender (questão solo, ou atividade em lote) usam a
mesma moeda interna pra controlar gasto: **tokens de questão**.

- Questão básica: **1 token**.
- Questão mais elaborada: **2 a 5 tokens**, dependendo do nível de
  detalhe pedido (o multiplicador exato dentro dessa faixa ainda não
  foi fechado).

Isso substitui contar "quantas atividades por dia" — o que importa é
quanto cada questão realmente custou pra gerar, não quantas sessões
foram abertas.

## Elaboração: o nível define o teto, a pessoa decide o gasto

Quanto maior o nível/XP do usuário, mais elaborado ele *pode* pedir uma
questão — isso vale pra todo mundo, inclusive quem nunca pagou, e
continua sendo a razão de existir o sistema de XP/nível (não é só
decoração de gamificação). Isso é deliberado: ninguém fica impedido de
aprender bem só por não pagar — o que separa isso de "pay to win".

O nível define **o teto** de elaboração disponível; **dentro** desse
teto, quem escolhe é a pessoa, atividade por atividade: gastar o
budget diário do dia em **quantidade** (várias questões básicas) ou em
**qualidade** (poucas questões bem elaboradas).

**Em desenvolvimento — ainda não é uma decisão fechada:** subir de
nível faz cada questão custar mais tokens (a IA realmente gasta mais
gerando algo elaborado), mas a ideia é que isso não vire punição
disfarçada. Uma questão mais elaborada também leva mais tempo pra ler
e responder — então o budget diário deve durar um tempo de estudo
parecido *em minutos*, mesmo rendendo menos questões *em contagem*: o
modelo de consumo é o mesmo, o que muda é a velocidade dele. Isso ainda
precisa ser validado na prática (o tempo de leitura realmente compensa
o custo extra?) antes de virar regra definitiva.

## Os dois eixos independentes

O modelo final separa duas coisas que parecem a mesma coisa mas não
são:

### Eixo 1 — Nível/XP: controla o teto de elaboração

Ver seção acima — vale pra todo mundo, de graça, e é o que a assinatura
**não** vende.

### Eixo 2 — Plano: controla quantidade, modelo de IA, estilo e velocidade

Independente do nível, o plano da conta determina:

- **Quantidade** — quantos tokens de questão por dia (solo), e quantas
  raids por dia.
- **Modelo de IA usado pra gerar** — planos pagos têm acesso a mais
  modelos (presumivelmente mais caros/capazes por chamada, o que amarra
  preço a custo real de forma natural).
- **Estilos de pergunta disponíveis** (múltipla escolha, completar
  frase, etc.) — variedade de formato, exclusiva do Mestre.
- **Velocidade/prioridade na fila de geração** — exclusiva do Mestre.

O que a assinatura vende não é acesso à qualidade (isso é de graça, via
nível) — é **quantidade de tokens** (logo, velocidade pra subir de
nível também) mais o conjunto acima que nível nenhum desbloqueia.

## Os três planos

| | Gratuito | Aprendiz | Mestre |
|---|---|---|---|
| Tokens de questão / dia (solo) | **120** (hipótese — ver nota no topo) | 510 | **1500** (hipótese) |
| Raids em grupo / dia | 2 | 4 (+2) | **16** (hipótese) |
| Questões por raid | 3 | 3 | 3 |
| Modelos de IA disponíveis | 1 (base) | +2 (total 3) | +2 (herda do Aprendiz) |
| Estilos de pergunta | Base | Base | Mais estilos, além dos já existentes |
| Velocidade de geração | Normal | Acelerada | Prioridade na fila |
| Teto de elaboração | Cresce com o nível (todos os planos) | Cresce com o nível (todos os planos) | Cresce com o nível (todos os planos) |

Notas sobre a tabela:

- Os números da linha "Tokens de questão / dia" **não são mais
  contagem de atividades** — são o budget em tokens de questão descrito
  acima. Uma pessoa no Gratuito, só com questões básicas (1 token),
  consegue **120 questões/dia** (~12 a 24 atividades de 5-10 questões).
  Só com questões bem elaboradas (5 tokens, o teto da faixa), consegue
  **24 questões/dia** (~2 a 4 atividades). O mesmo número de tokens
  cobre os dois casos — não precisa de uma tabela de limite separada por
  nível de elaboração.
- O limite solo do **Gratuito** era 20 na primeira proposta, foi pra 170,
  e ficou em **120** como meio-termo — ainda não validado contra custo
  real (ver Status no topo do documento).
- **Aprendiz não tem atividades solo ilimitadas de propósito.** A
  primeira versão da proposta tinha "sem limite" no Aprendiz; foi trocado
  por um teto alto (510) porque "ilimitado" no plano de entrada, mais
  barato, é como serviço de assinatura quebra a própria margem — quem
  usa pesado custa mais em API do que paga.
- **"Sem limite" no Mestre também foi abandonado — nenhum plano tem
  literalmente "ilimitado".** Com escala (não 1, mas, digamos, 200
  contas Mestre gerando ao mesmo tempo), "ilimitado" vira um cheque em
  branco de custo de API. Em vez disso, o Mestre tem um teto alto o
  bastante pra nunca ser sentido em uso normal, mas que exige várias
  horas seguidas de uso pra alcançar — a mesma lógica dos limites de uso
  do Claude Pro: generoso ao ponto de parecer ilimitado no dia a dia,
  sem ser de verdade. Conta grosseira: numa questão básica rápida
  (10-15 segundos pra responder), uma hora de estudo contínuo gera
  ~150-200 questões (tokens); 1500/dia representa algo como 8-10 horas
  seguidas de uso — um dia inteiro dedicado, não um estudo normal.

## Quem "é dono" da cota de uma raid

Decisão: **a cota de raids/dia é de quem cria o grupo/desafio**, não de
cada participante. Quem entra numa raid já criada não gasta a própria
cota pra participar.

Efeito colateral (bom, e vale usar no discurso de venda): se uma pessoa
com plano Mestre cria uma raid, todo mundo que entra — mesmo contas
grátis — participa daquela sessão sem esbarrar no próprio limite. É um
gancho de conversão orgânico: quem nunca pagou sente o app "melhor"
quando estuda com um amigo assinante.

## Em aberto / não decidido ainda

- Preço em R$ de cada plano.
- Custo real por questão gerada (bloqueia validar os números de limite
  acima com confiança).
- Multiplicador exato de tokens por nível de elaboração — hoje é uma
  faixa (2 a 5), não um valor fechado.
- **Em desenvolvimento:** se "tempo de leitura de uma questão elaborada
  compensa o custo extra em tokens" realmente se equilibra na prática
  (ver seção "Elaboração" acima) — precisa validar com uso real, não é
  garantido só pelo raciocínio.
- Como mostrar o consumo de tokens na tela, de forma simples e resumida
  — decidido que precisa existir, mas telas ficam pra depois.
- Se e como o mesmo sistema de tokens se aplica às questões de raid (o
  limite de raids/dia é uma contagem separada hoje, não em tokens).
- Proteção contra abuso óbvio (ex.: criar várias contas grátis pra
  somar cotas) — não é prioridade agora, sem sistema de conta real
  ainda, mas fica registrado pra não esquecer antes de ter usuários de
  verdade.
