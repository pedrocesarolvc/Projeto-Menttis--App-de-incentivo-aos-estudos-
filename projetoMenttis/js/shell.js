// Monta a topbar + menu lateral em toda página do app que tiver
// <div id="app-shell"></div> logo após a tag <body>.
// A página marca qual item do menu deve ficar ativo via
// <body data-page="menu|meus_grupos|criar_grupo|entrar_grupo|config|ajuda">.
//
// O HTML fica aqui dentro (em vez de um partials/shell.html buscado por
// fetch) de propósito: fetch de arquivo local é bloqueado pelo navegador
// quando a página é aberta com duplo clique (file://), então o menu
// simplesmente não aparecia nesse caso. Um script normal roda sempre,
// com ou sem servidor.
const MENTTIS_SHELL_HTML = `
<header class="topbar">
    <div class="topbar-left">
        <button type="button" class="icon-btn" data-sidebar-toggle aria-label="Abrir menu" aria-expanded="false" aria-controls="sidebar">
            <i class='bx bx-menu'></i>
        </button>
        <a href="menu.html" class="brand">
            <img src="img/logo2.png" alt="" class="brand-mark">
            <span>Menttis</span>
        </a>
    </div>
    <div class="search-box">
        <i class='bx bx-search'></i>
        <input type="text" placeholder="Pesquisar">
    </div>
    <button type="button" class="icon-btn bell" aria-label="Avisos">
        <img src="img/sino.png" alt="">
    </button>
</header>

<div class="sidebar-backdrop" data-sidebar-backdrop></div>

<nav class="sidebar" id="sidebar" aria-label="Menu principal">
    <div class="sidebar-brand">
        <img src="img/logo2.png" class="sidebar-logo" alt="">
        <span>Menttis</span>
    </div>
    <ul class="sidebar-nav">
        <li><a href="menu.html" data-page="menu"><img src="img/casa.png" class="nav-icon" alt=""><span>Início</span></a></li>
        <li><a href="meus_grupos.html" data-page="meus_grupos"><i class='bx bxs-group'></i><span>Meus grupos</span></a></li>
        <li><a href="criar_grupo.html" data-page="criar_grupo"><img src="img/criar.png" class="nav-icon" alt=""><span>Criar grupo</span></a></li>
        <li><a href="entrar_grupo.html" data-page="entrar_grupo"><img src="img/juntar.png" class="nav-icon" alt=""><span>Entrar em grupo</span></a></li>
        <li><a href="menuLateral_config.html" data-page="config"><img src="img/config.png" class="nav-icon" alt=""><span>Configurações</span></a></li>
        <li><a href="menuLateral_ajuda.html" data-page="ajuda"><img src="img/ajuda.png" class="nav-icon" alt=""><span>Ajuda &amp; feedback</span></a></li>
    </ul>
    <a class="sidebar-logout" href="pc/pagina_login_pc.html"><img src="img/sair.png" alt="">Sair</a>
</nav>
`;

(function () {
    const slot = document.getElementById('app-shell');
    if (!slot) return;

    slot.innerHTML = MENTTIS_SHELL_HTML;
    document.body.classList.add('tem-shell');

    const toggle = document.querySelector('[data-sidebar-toggle]');
    const backdrop = document.querySelector('[data-sidebar-backdrop]');
    const paginaAtual = document.body.dataset.page;

    if (paginaAtual) {
        const linkAtivo = document.querySelector(`.sidebar-nav a[data-page="${paginaAtual}"]`);
        if (linkAtivo) linkAtivo.classList.add('active');
    }

    function abrirMenu() {
        document.body.classList.add('sidebar-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }

    function fecharMenu() {
        document.body.classList.remove('sidebar-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.contains('sidebar-open') ? fecharMenu() : abrirMenu();
        });
    }

    if (backdrop) backdrop.addEventListener('click', fecharMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharMenu();
    });
})();
