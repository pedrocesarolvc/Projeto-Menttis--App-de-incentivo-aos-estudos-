"""GeradorDeAtividades: orquestra cache, roteador de modelo, provedor
de IA e validação — ver docs/arquitetura-gerador.md pro desenho
completo das camadas.

De propósito fora daqui: checar se o usuário ainda tem cota disponível
hoje. Isso é problema de conta/plano (ver docs/modelo-de-negocio.md),
que ainda não existe — quando existir, entra como verificação antes de
chamar gerar(), na camada da rota, não dentro do gerador.
"""
from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao, Plano
from app.geracao.cache import CacheDeAtividades
from app.geracao.roteador_modelo import RoteadorDeModelo
from app.geracao.validacao import AtividadeInvalida, validar_atividade

MAX_TENTATIVAS = 3


class GeradorDeAtividades:
    def __init__(self, cache: CacheDeAtividades, roteador: RoteadorDeModelo):
        self._cache = cache
        self._roteador = roteador

    async def gerar(
        self,
        assunto: str,
        estilo: EstiloAtividade,
        nivel_elaboracao: NivelElaboracao,
        plano: Plano,
        usar_cache: bool = True,
    ) -> Atividade:
        if usar_cache:
            em_cache = self._cache.buscar(assunto, estilo, nivel_elaboracao)
            if em_cache:
                return em_cache

        provedor = self._roteador.escolher(plano)

        ultimo_erro: Exception | None = None
        for _ in range(MAX_TENTATIVAS):
            atividade = await provedor.gerar(assunto, estilo, nivel_elaboracao)
            try:
                validar_atividade(atividade)
            except AtividadeInvalida as erro:
                ultimo_erro = erro
                continue

            self._cache.salvar(atividade)
            return atividade

        raise RuntimeError(
            f"Não foi possível gerar uma atividade válida após {MAX_TENTATIVAS} tentativas: {ultimo_erro}"
        )
