"""Provedor de mentira: gera atividades sem chamar nenhuma API de IA.
Existe pra desenvolver e testar o resto do sistema (rota, cache,
validação, roteador) sem precisar de conta paga em nenhum serviço
ainda. Todos os planos usam este provedor por enquanto — ver
app/config.py e docs/arquitetura-gerador.md.
"""
import random

from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao

_RESPOSTA_POR_NIVEL = {
    NivelElaboracao.basico: "conceito central",
    NivelElaboracao.intermediario: "mecanismo subjacente",
    NivelElaboracao.avancado: "princípio fundamental sob análise",
}


class ProvedorFalso:
    """Implementação de ProvedorIA que não fala com nenhuma IA de
    verdade — gera um template previsível a partir do assunto pedido."""

    async def gerar(
        self,
        assunto: str,
        estilo: EstiloAtividade,
        nivel_elaboracao: NivelElaboracao,
    ) -> Atividade:
        correta = _RESPOSTA_POR_NIVEL[nivel_elaboracao]
        distratores = random.sample(
            [texto for nivel, texto in _RESPOSTA_POR_NIVEL.items() if nivel != nivel_elaboracao],
            k=2,
        )
        opcoes = [correta, *distratores]
        random.shuffle(opcoes)

        pergunta = f"Em {assunto}, o principal ponto a entender é o ____."
        posicao_lacuna = pergunta.index("____")

        return Atividade(
            pergunta=pergunta,
            posicao_lacuna=posicao_lacuna,
            opcoes=opcoes,
            resposta_correta=correta,
            assunto=assunto,
            estilo=estilo,
            nivel_elaboracao=nivel_elaboracao,
        )
