document.addEventListener('DOMContentLoaded', function () {
    const conteudo = document.getElementById('conteudo-grupo');
    const id = new URLSearchParams(window.location.search).get('id');
    const grupo = id ? menttisBuscarGrupo(id) : null;

    if (!grupo) {
        conteudo.innerHTML = `
            <div class="empty-state">
                <i class='bx bx-error-circle'></i>
                <p>Não encontramos esse grupo.</p>
                <p><a href="meus_grupos.html" style="color:var(--primary);font-weight:600;">← Voltar para meus grupos</a></p>
            </div>
        `;
        return;
    }

    document.title = `${grupo.nome} - Menttis`;

    const lider = grupo.membros[0];
    const roster = grupo.membros.map((m, i) => `
        <li>
            <span class="avatar" style="background:${m.cor}">${m.iniciais}</span>
            <span class="roster-name">${m.nome}</span>
            ${i === 0 ? '<span class="roster-tag">Líder</span>' : ''}
        </li>
    `).join('');

    const desafioHtml = grupo.desafio.ativo ? `
        <div class="card challenge-card">
            <h2>Desafio em andamento</h2>
            <div class="challenge-titulo">${grupo.desafio.titulo}</div>
            <div class="progress-row">
                <div class="progress-bar"><i style="width:${Math.round((grupo.desafio.acertos / grupo.desafio.total) * 100)}%"></i></div>
                <span class="progress-label">${grupo.desafio.acertos}/${grupo.desafio.total} acertos do grupo</span>
            </div>
            <button type="button" class="btn btn-primary" id="btn-entrar-sala">Entrar na sala</button>
        </div>
    ` : `
        <div class="card challenge-card">
            <div class="empty-state" style="padding:12px 0 20px;">
                <i class='bx bx-moon'></i>
                <p>Nenhum desafio ativo agora.</p>
            </div>
            <button type="button" class="btn btn-primary" id="btn-iniciar-desafio">Iniciar desafio em grupo</button>
        </div>
    `;

    conteudo.innerHTML = `
        <div class="detail-header">
            <div>
                <div class="card-subject">${grupo.materia}</div>
                <h1>${grupo.nome}</h1>
            </div>
            <span class="badge ${grupo.desafio.ativo ? 'badge-live' : 'badge-idle'}">${grupo.desafio.ativo ? '🔥 Raid em andamento' : 'Grupo parado'}</span>
        </div>

        <div class="detail-grid">
            <div>
                ${desafioHtml}
                <div class="card invite-card">
                    <h2>Convidar membros</h2>
                    <div class="invite-row">
                        <input type="text" readonly value="menttis.app/entrar/${grupo.id}" id="link-convite">
                        <button type="button" class="btn btn-ghost" id="btn-copiar">Copiar</button>
                    </div>
                </div>
            </div>
            <div class="card roster-card">
                <h2>Membros (${grupo.membros.length})</h2>
                <ul class="roster-list">${roster}</ul>
            </div>
        </div>
    `;

    const btnSala = document.getElementById('btn-entrar-sala');
    if (btnSala) btnSala.addEventListener('click', () => alert('Em breve: a sala de desafio em grupo, com perguntas geradas por IA. ⚔️'));

    const btnIniciar = document.getElementById('btn-iniciar-desafio');
    if (btnIniciar) btnIniciar.addEventListener('click', () => alert('Em breve: escolha um assunto e a IA monta o desafio pro grupo. ⚔️'));

    document.getElementById('btn-copiar').addEventListener('click', function () {
        const link = document.getElementById('link-convite');
        navigator.clipboard.writeText(link.value).then(() => {
            this.textContent = 'Copiado!';
            setTimeout(() => { this.textContent = 'Copiar'; }, 1800);
        });
    });
});
