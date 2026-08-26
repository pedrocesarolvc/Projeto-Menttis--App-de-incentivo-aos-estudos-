"""Cache de atividades já geradas, por assunto+estilo+nível. Antes de
gastar uma chamada de IA, o gerador verifica se já existe uma
atividade parecida aqui — reduz custo real diretamente (ver
docs/arquitetura-gerador.md).

Implementação em memória por enquanto (esvazia a cada reinício do
servidor) — é um começo por interface, não uma decisão final. Quando o
backend ganhar banco de dados de verdade, troca-se só esta classe por
uma versão que lê/escreve no Postgres; quem usa o cache (GeradorDeAtividades)
não muda.
"""
from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao

_Chave = tuple[str, str, str]


class CacheDeAtividades:
    def __init__(self):
        self._armazenamento: dict[_Chave, list[Atividade]] = {}

    def _chave(self, assunto: str, estilo: EstiloAtividade, nivel: NivelElaboracao) -> _Chave:
        # normaliza o assunto pra "Cloud Computing" e "cloud computing"
        # baterem no mesmo cache.
        return (assunto.strip().lower(), estilo.value, nivel.value)

    def buscar(self, assunto: str, estilo: EstiloAtividade, nivel: NivelElaboracao) -> Atividade | None:
        atividades = self._armazenamento.get(self._chave(assunto, estilo, nivel))
        return atividades[0] if atividades else None

    def salvar(self, atividade: Atividade) -> None:
        chave = self._chave(atividade.assunto, atividade.estilo, atividade.nivel_elaboracao)
        self._armazenamento.setdefault(chave, []).append(atividade)
