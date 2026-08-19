const formRecuperar = {
    get email() { return document.getElementById("email"); },
    get form() { return document.getElementById("form-recuperar"); },
    get mensagemSucesso() { return document.getElementById("mensagem-sucesso"); },

    validar: function () {
        if (!this.email || !this.email.value.trim()) {
            alert("ERRO: O campo Email é obrigatório e não pode estar vazio.");
            if (this.email) this.email.focus();
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email.value)) {
            alert("ERRO: Formato de Email inválido. Verifique o dado inserido.");
            if (this.email) this.email.focus();
            return false;
        }

        return true;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (!formRecuperar.form) return;

    formRecuperar.form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!formRecuperar.validar()) return;

        // Sem backend ainda: só confirma visualmente que o pedido foi "enviado".
        formRecuperar.mensagemSucesso.textContent = `Se ${formRecuperar.email.value} tiver uma conta no Menttis, um link de recuperação foi enviado.`;
        formRecuperar.mensagemSucesso.hidden = false;
        formRecuperar.form.reset();
    });
});
