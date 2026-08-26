"""Stub — mesmo caso de openai_provedor.py: implementação real fica
pra quando a escolha de modelo for decidida. Ver
docs/arquitetura-gerador.md.
"""
from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao


class AnthropicProvedor:
    def __init__(self, modelo: str, chave_api: str):
        self.modelo = modelo
        self.chave_api = chave_api

    async def gerar(
        self,
        assunto: str,
        estilo: EstiloAtividade,
        nivel_elaboracao: NivelElaboracao,
    ) -> Atividade:
        raise NotImplementedError(
            "AnthropicProvedor ainda não está implementado — falta decidir "
            "o modelo e configurar a chave de API. Ver docs/arquitetura-gerador.md."
        )
