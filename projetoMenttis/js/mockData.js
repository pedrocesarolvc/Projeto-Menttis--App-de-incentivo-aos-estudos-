// Dados de exemplo para as telas de grupo e do painel principal, enquanto
// não existe backend. Uma vez que o motor de perguntas por IA e a API em
// Python existirem, isto vira uma chamada de API — a forma dos dados
// (MENTTIS_GRUPOS, MENTTIS_USUARIO) foi pensada pra já ficar parecida.

const MENTTIS_USUARIO = {
    nome: "Pedro",
    nivel: 7,
    xp: 340,
    xpProximoNivel: 500,
    sequenciaDias: 12
};

const MENTTIS_GRUPOS = [
    {
        id: "matematica-enem",
        nome: "Grupo Matemática ENEM",
        materia: "Matemática",
        membros: [
            { nome: "Júlia Prado", iniciais: "JP", cor: "#2b4d9c" },
            { nome: "Rafa Souza", iniciais: "RS", cor: "#2f7a52" },
            { nome: "Léo Martins", iniciais: "LM", cor: "#c98a1d" }
        ],
        desafio: { ativo: true, titulo: "Frações e Probabilidade", acertos: 3, total: 5 }
    },
    {
        id: "historia-brasil",
        nome: "Grupo História",
        materia: "História",
        membros: [
            { nome: "Bia Costa", iniciais: "BC", cor: "#a34a9c" },
            { nome: "Enzo Lima", iniciais: "EL", cor: "#2b4d9c" }
        ],
        desafio: { ativo: false }
    },
    {
        id: "biologia-celular",
        nome: "Grupo Biologia",
        materia: "Biologia",
        membros: [
            { nome: "Sofia Reis", iniciais: "SR", cor: "#2f7a52" },
            { nome: "Davi Nunes", iniciais: "DN", cor: "#2b4d9c" },
            { nome: "Alice Farias", iniciais: "AF", cor: "#c98a1d" },
            { nome: "Théo Duarte", iniciais: "TD", cor: "#a34a9c" }
        ],
        desafio: { ativo: true, titulo: "Organelas e suas funções", acertos: 1, total: 5 }
    },
    {
        id: "ingles-conversacao",
        nome: "Grupo Inglês",
        materia: "Inglês",
        membros: [
            { nome: "Marina Alves", iniciais: "MA", cor: "#c98a1d" }
        ],
        desafio: { ativo: false }
    }
];

function menttisBuscarGrupo(id) {
    return MENTTIS_GRUPOS.find((g) => g.id === id) || null;
}
