"""Decide qual provedor chamar, a partir do plano pedido — a tabela de
planos em docs/modelo-de-negocio.md vira, literalmente, a configuração
em app/config.py. Trocar de modelo real é editar lá, não mexer aqui.
"""
from app.config import PROVEDOR_POR_PLANO
from app.esquemas import Plano
from app.geracao.provedores.base import ProvedorIA


class RoteadorDeModelo:
    def escolher(self, plano: Plano) -> ProvedorIA:
        return PROVEDOR_POR_PLANO[plano]
