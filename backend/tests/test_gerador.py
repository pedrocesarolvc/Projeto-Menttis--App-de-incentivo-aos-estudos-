from fastapi.testclient import TestClient

from app.esquemas import Atividade, EstiloAtividade, NivelElaboracao, Plano
from app.geracao.cache import CacheDeAtividades
from app.geracao.gerador import GeradorDeAtividades
from app.geracao.provedores.falso import ProvedorFalso
from app.geracao.roteador_modelo import RoteadorDeModelo
from app.geracao.validacao import AtividadeInvalida, validar_atividade
from app.main import app


async def test_provedor_falso_gera_atividade_valida():
    provedor = ProvedorFalso()
    atividade = await provedor.gerar(
        "Cloud Computing", EstiloAtividade.completar_frase, NivelElaboracao.basico
    )
    validar_atividade(atividade)  # não deve levantar


def test_validacao_rejeita_resposta_fora_das_opcoes():
    atividade = Atividade(
        pergunta="Teste ____ aqui.",
        posicao_lacuna=6,
        opcoes=["a", "b"],
        resposta_correta="c",
        assunto="Teste",
        estilo=EstiloAtividade.completar_frase,
        nivel_elaboracao=NivelElaboracao.basico,
    )
    try:
        validar_atividade(atividade)
        assert False, "deveria ter levantado AtividadeInvalida"
    except AtividadeInvalida:
        pass


def test_validacao_rejeita_pergunta_sem_lacuna():
    atividade = Atividade(
        pergunta="Isso não tem lacuna nenhuma.",
        posicao_lacuna=0,
        opcoes=["a", "b"],
        resposta_correta="a",
        assunto="Teste",
        estilo=EstiloAtividade.completar_frase,
        nivel_elaboracao=NivelElaboracao.basico,
    )
    try:
        validar_atividade(atividade)
        assert False, "deveria ter levantado AtividadeInvalida"
    except AtividadeInvalida:
        pass


async def test_cache_evita_segunda_chamada_ao_provedor():
    gerador = GeradorDeAtividades(cache=CacheDeAtividades(), roteador=RoteadorDeModelo())
    primeira = await gerador.gerar(
        "História", EstiloAtividade.completar_frase, NivelElaboracao.basico, Plano.gratuito
    )
    segunda = await gerador.gerar(
        "História", EstiloAtividade.completar_frase, NivelElaboracao.basico, Plano.gratuito
    )
    assert primeira == segunda


async def test_assuntos_diferentes_nao_compartilham_cache():
    gerador = GeradorDeAtividades(cache=CacheDeAtividades(), roteador=RoteadorDeModelo())
    de_historia = await gerador.gerar(
        "História", EstiloAtividade.completar_frase, NivelElaboracao.basico, Plano.gratuito
    )
    de_biologia = await gerador.gerar(
        "Biologia", EstiloAtividade.completar_frase, NivelElaboracao.basico, Plano.gratuito
    )
    assert de_historia.assunto != de_biologia.assunto


def test_rota_gerar_atividade():
    cliente = TestClient(app)
    resposta = cliente.post(
        "/api/atividades/gerar",
        json={
            "assunto": "Cloud Computing",
            "estilo": "completar_frase",
            "nivel_elaboracao": "basico",
            "plano": "gratuito",
        },
    )
    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["resposta_correta"] in corpo["opcoes"]
    assert corpo["assunto"] == "Cloud Computing"


def test_rota_usa_valores_padrao():
    cliente = TestClient(app)
    resposta = cliente.post("/api/atividades/gerar", json={"assunto": "Espanhol"})
    assert resposta.status_code == 200
