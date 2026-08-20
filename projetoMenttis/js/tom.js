// Sistema de "tom": controla o quanto de decoração lúdica (emoji,
// exclamação, animação de comemoração) aparece na interface, sem duplicar
// nenhum texto nem criar uma "skin" separada por opção. A ideia: existe
// UM conteúdo base — o visual de sempre do Menttis, que é o nível
// "equilibrado" — e os outros dois níveis só ligam ou desligam camadas de
// decoração em cima dele. Isso veio de uma conversa sobre o app não poder
// parecer "coisa de criança" pra quem tem mais idade ou usa pra estudo
// sério (ex.: alguém estudando Cloud & DevOps) — mas sem forçar a pessoa
// a escolher isso no cadastro, então mora em Configurações, trocável a
// qualquer momento, com um padrão sensato.
//
// Este arquivo precisa ser carregado BEM CEDO em cada página — sem
// "defer", antes de qualquer <link> de CSS — porque ele decide o
// data-tom do <html> antes da página desenhar na tela. Se ele rodasse
// depois, a pessoa veria o tom errado por uma fração de segundo (o mesmo
// problema clássico de "flash" que sites com modo escuro têm).

const MENTTIS_TOM_PADRAO = 'equilibrado';
const MENTTIS_TONS_VALIDOS = ['direto', 'equilibrado', 'animado'];

function menttisTomAtual() {
    const salvo = localStorage.getItem('menttisTom');
    return MENTTIS_TONS_VALIDOS.includes(salvo) ? salvo : MENTTIS_TOM_PADRAO;
}

function menttisDefinirTom(tom) {
    if (!MENTTIS_TONS_VALIDOS.includes(tom)) return;
    localStorage.setItem('menttisTom', tom);
    document.documentElement.dataset.tom = tom;
}

// Aplica imediatamente ao carregar o script (ver aviso no topo do arquivo
// sobre por que isso precisa ser síncrono e cedo).
document.documentElement.dataset.tom = menttisTomAtual();

// --- Helpers de conteúdo, pra usar ao montar textos dinamicamente ---

// Acrescenta 🔥 antes do texto e "!" no final quando o tom pede mais
// comemoração; tira a decoração inteira no tom "direto". Usado nos
// selos de "desafio ativo" / "raid em andamento" espalhados pelo app.
function menttisTextoComFogo(textoBase) {
    const tom = menttisTomAtual();
    if (tom === 'direto') return textoBase;
    if (tom === 'animado') return `🔥 ${textoBase}!`;
    return `🔥 ${textoBase}`; // equilibrado — igual ao visual padrão do app
}

// Classe CSS do selo de desafio ativo. "tom-comemorar" liga uma animação
// de pulso sutil (ver css/tom.css) só no nível "animado".
function menttisClasseBadgeAtiva(ativo) {
    const tom = menttisTomAtual();
    const comemorar = ativo && tom === 'animado' ? ' tom-comemorar' : '';
    return `badge ${ativo ? 'badge-live' : 'badge-idle'}${comemorar}`;
}

// Pra decorações soltas tipo o emoji no fim de um alerta ("Em breve...🎯").
// Sem decoração no tom direto; igual ao de sempre nos outros dois.
function menttisSufixo(emoji) {
    return menttisTomAtual() === 'direto' ? '' : ` ${emoji}`;
}

// Troca o texto de qualquer elemento marcado com data-texto-<tom>,
// caindo pro data-texto-equilibrado se o tom atual não tiver um texto
// próprio definido. Ex.: <p data-texto-equilibrado="Bora!"
// data-texto-direto="Continue seus estudos."></p>
function menttisAplicarTextosTom(escopo) {
    const raiz = escopo || document;
    const tom = menttisTomAtual();
    const chave = 'texto' + tom.charAt(0).toUpperCase() + tom.slice(1);
    raiz.querySelectorAll('[data-texto-equilibrado]').forEach((el) => {
        el.textContent = el.dataset[chave] || el.dataset.textoEquilibrado;
    });
}

// Liga o seletor de tom da tela de Configurações: marca a opção atual
// como ativa e troca o tom (+ reaplica textos/decorações da própria
// página) quando a pessoa clica em outra opção.
function menttisInicializarSeletorTom(containerSelector) {
    const botoes = document.querySelectorAll(`${containerSelector} [data-tom-opcao]`);
    if (!botoes.length) return;

    function marcarAtivo() {
        const atual = menttisTomAtual();
        botoes.forEach((botao) => {
            botao.classList.toggle('ativo', botao.dataset.tomOpcao === atual);
        });
    }

    botoes.forEach((botao) => {
        botao.addEventListener('click', () => {
            menttisDefinirTom(botao.dataset.tomOpcao);
            marcarAtivo();
            menttisAplicarTextosTom();
        });
    });

    marcarAtivo();
}
