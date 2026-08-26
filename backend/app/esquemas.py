"""Esquemas Pydantic — o contrato de uma atividade gerada.

A mesma classe Atividade valida tanto a resposta que o provedor de IA
devolve quanto o JSON que a API expõe pro front. Se um provedor
devolver algo fora desse formato, o Pydantic já rejeita antes de
chegar em qualquer lógica de negócio. Ver docs/arquitetura-gerador.md.
"""
from enum import Enum

from pydantic import BaseModel, Field


class EstiloAtividade(str, Enum):
    completar_frase = "completar_frase"
    multipla_escolha = "multipla_escolha"


class NivelElaboracao(str, Enum):
    basico = "basico"
    intermediario = "intermediario"
    avancado = "avancado"


class Plano(str, Enum):
    gratuito = "gratuito"
    aprendiz = "aprendiz"
    mestre = "mestre"


class Atividade(BaseModel):
    pergunta: str
    posicao_lacuna: int
    opcoes: list[str] = Field(min_length=2)
    resposta_correta: str
    assunto: str
    estilo: EstiloAtividade
    nivel_elaboracao: NivelElaboracao


class PedidoDeGeracao(BaseModel):
    assunto: str = Field(min_length=1, max_length=200)
    estilo: EstiloAtividade = EstiloAtividade.completar_frase
    nivel_elaboracao: NivelElaboracao = NivelElaboracao.basico
    plano: Plano = Plano.gratuito
