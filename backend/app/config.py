"""Qual provedor de IA cada plano usa. Ver docs/modelo-de-negocio.md
pra tabela completa de planos e docs/arquitetura-gerador.md pra como
isso se encaixa no gerador.

Hoje todos os planos apontam pro ProvedorFalso, de propósito — a
escolha de modelo real (e as chaves de API) ainda não foi decidida.
Ligar um provedor de verdade depois é trocar a entrada correspondente
aqui; nenhuma outra camada do gerador muda.
"""
from app.esquemas import Plano
from app.geracao.provedores.falso import ProvedorFalso

_provedor_falso = ProvedorFalso()

PROVEDOR_POR_PLANO = {
    Plano.gratuito: _provedor_falso,
    Plano.aprendiz: _provedor_falso,
    Plano.mestre: _provedor_falso,
}
