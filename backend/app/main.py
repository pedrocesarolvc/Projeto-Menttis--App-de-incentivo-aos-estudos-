"""API do Menttis. Por enquanto só a rota de geração de atividades —
ver docs/arquitetura-gerador.md pro desenho completo.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.esquemas import Atividade, PedidoDeGeracao
from app.geracao.cache import CacheDeAtividades
from app.geracao.gerador import GeradorDeAtividades
from app.geracao.roteador_modelo import RoteadorDeModelo

app = FastAPI(title="Menttis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # trocar por origem real quando o front for publicado
    allow_methods=["*"],
    allow_headers=["*"],
)

_gerador = GeradorDeAtividades(cache=CacheDeAtividades(), roteador=RoteadorDeModelo())


@app.post("/api/atividades/gerar", response_model=Atividade)
async def gerar_atividade(pedido: PedidoDeGeracao) -> Atividade:
    return await _gerador.gerar(
        assunto=pedido.assunto,
        estilo=pedido.estilo,
        nivel_elaboracao=pedido.nivel_elaboracao,
        plano=pedido.plano,
    )
