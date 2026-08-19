// Injeta a topbar + menu lateral (partials/shell.html) em toda página do
// app que tiver <div id="app-shell"></div> logo após a tag <body>.
// A página marca qual item do menu deve ficar ativo via
// <body data-page="menu|meus_grupos|criar_grupo|entrar_grupo|config|ajuda">.
(function () {
    const slot = document.getElementById('app-shell');
    if (!slot) return;

    fetch('partials/shell.html')
        .then((resposta) => resposta.text())
        .then((html) => {
            slot.innerHTML = html;
            document.body.classList.add('tem-shell');
            iniciarShell();
        })
        .catch(() => {
            console.error('Não foi possível carregar o menu. Está servindo os arquivos por http:// (não file://)?');
        });

    function iniciarShell() {
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
    }
})();
