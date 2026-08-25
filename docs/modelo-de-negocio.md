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
Em vez disso, o limite é uma **cota de uso neutra** ("N atividades por
dia"), que reseta à meia-noite — não penaliza performance, só limita
volume.

## Os dois eixos independentes

Depois de discutir bastante, o modelo final separa duas coisas que
parecem a mesma coisa mas não são:

### Eixo 1 — Nível/XP: controla a *elaboração* do conteúdo

Quanto maior o nível do usuário, mais elaboradas ficam as perguntas —
tanto as individuais quanto as de raid em grupo. **Isso vale pra todo
mundo, inclusive quem nunca pagou.** É a razão de existir o sistema de
XP/nível: não é só decoração de gamificação, é o que efetivamente
melhora a qualidade do que a IA gera pra você, conforme você estuda mais.

Isso é deliberado: significa que ninguém fica impedido de aprender bem
só por não pagar — o que separa isso de "pay to win" e mantém o produto
alinhado com o objetivo de ser sério o suficiente pra qualquer público.
O que a assinatura vende não é acesso à qualidade, é **velocidade pra
chegar lá** (mais atividades/dia = sobe de nível mais rápido) mais um
conjunto de coisas que nível nenhum desbloqueia (eixo 2).

### Eixo 2 — Plano: controla quantidade, modelo de IA, estilo e velocidade

Independente do nível, o plano da conta determina:

- **Quantidade** — quantas atividades solo e quantas raids por dia.
- **Modelo de IA usado pra gerar** — planos pagos têm acesso a mais
  modelos (presumivelmente mais caros/capazes por chamada, o que amarra
  preço a custo real de forma natural).
- **Estilos de pergunta disponíveis** (múltipla escolha, completar
  frase, etc.) — variedade de formato, exclusiva do Mestre.
- **Velocidade/prioridade na fila de geração** — exclusiva do Mestre.

## Os três planos

| | Gratuito | Aprendiz | Mestre |
|---|---|---|---|
| Atividades solo / dia | **120** (hipótese — ver nota no topo) | 510 | Sem limite |
| Raids em grupo / dia | 2 | 4 (+2) | Sem limite |
| Atividades por raid | 3 | 3 | 3 |
| Modelos de IA disponíveis | 1 (base) | +2 (total 3) | +2 (herda do Aprendiz) |
| Estilos de pergunta | Base | Base | Mais estilos, além dos já existentes |
| Velocidade de geração | Normal | Normal | Prioridade na fila |
| Elaboração do conteúdo | Cresce com o nível (todos os planos) | Cresce com o nível (todos os planos) | Cresce com o nível (todos os planos) |

Notas sobre a tabela:

- O limite solo do **Gratuito** era 20 na primeira proposta, foi pra 170,
  e ficou em **120** como meio-termo — ainda não validado contra custo
  real (ver Status no topo do documento).
- **Aprendiz não tem atividades solo ilimitadas de propósito.** A
  primeira versão da proposta tinha "sem limite" no Aprendiz; foi trocado
  por um teto alto (510) porque "ilimitado" no plano de entrada, mais
  barato, é como serviço de assinatura quebra a própria margem — quem
  usa pesado custa mais em API do que paga. "Sem limite" de verdade fica
  reservado pro Mestre, onde o preço presumivelmente aguenta.

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
- Custo real por atividade gerada (bloqueia validar os números de limite
  acima com confiança).
- Proteção contra abuso óbvio (ex.: criar várias contas grátis pra
  somar cotas) — não é prioridade agora, sem sistema de conta real
  ainda, mas fica registrado pra não esquecer antes de ter usuários de
  verdade.
