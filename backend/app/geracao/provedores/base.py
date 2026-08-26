"""Interface que todo provedor de IA precisa implementar. O resto do
sistema (roteador, orquestrador) só conhece isto — trocar de provedor
real depois é implementar esta interface de novo, sem mexer em mais
nada. Ver docs/arquitetura-gerador.md.
"""
from typing import Protocol

from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao


class ProvedorIA(Protocol):
    async def gerar(
        self,
        assunto: str,
        estilo: EstiloAtividade,
        nivel_elaboracao: NivelElaboracao,
    ) -> Atividade:
        ...
