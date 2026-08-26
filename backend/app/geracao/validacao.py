"""Confere se uma atividade gerada pela IA está estruturalmente
correta antes de mostrar pro usuário. IA erra — resposta fora das
opções, lacuna em posição errada, opção duplicada — e é mais barato
pegar isso aqui do que deixar a pessoa ver uma pergunta quebrada.
"""
from app.esquemas import Atividade


class AtividadeInvalida(Exception):
    pass


def validar_atividade(atividade: Atividade) -> None:
    if atividade.resposta_correta not in atividade.opcoes:
        raise AtividadeInvalida("resposta_correta não está entre as opções")

    if len(set(atividade.opcoes)) != len(atividade.opcoes):
        raise AtividadeInvalida("opções duplicadas")

    if "____" not in atividade.pergunta:
        raise AtividadeInvalida("pergunta não contém a lacuna (____)")

    if not (0 <= atividade.posicao_lacuna < len(atividade.pergunta)):
        raise AtividadeInvalida("posicao_lacuna fora do texto da pergunta")
