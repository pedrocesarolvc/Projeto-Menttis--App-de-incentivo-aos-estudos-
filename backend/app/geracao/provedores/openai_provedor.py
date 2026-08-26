"""Stub — a escolha de modelo ficou deliberadamente em aberto (ver
docs/arquitetura-gerador.md), então esta implementação ainda não fala
com a API da OpenAI de verdade. Implementar `gerar()` aqui e apontar o
plano correspondente pra uma instância desta classe em app/config.py é
o suficiente pra ligar — nenhuma outra camada do gerador precisa mudar.
"""
from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao


class OpenAIProvedor:
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
            "OpenAIProvedor ainda não está implementado — falta decidir "
            "o modelo e configurar a chave de API. Ver docs/arquitetura-gerador.md."
        )
