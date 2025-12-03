document.addEventListener('DOMContentLoaded', function() {
    const nome = document.getElementById("nome");
    const cell = document.getElementById("celular");
    const senha_criada = document.getElementById("new-password");
    const email_criado = document.getElementById("email-criado");
    const confirm_senha = document.getElementById("cpassword");
    const registerBtn = document.getElementById("register-btn");

    registerBtn.addEventListener('click', registrarLogin);

    function registrarLogin(event) {
        event.preventDefault();
        
        if (!nome.value.trim()) {
            alert("ERROR[campo vazio: Nome]");
            nome.focus();
            return;
        }
        
        if (!cell.value.trim()) {
            alert("ERROR[campo vazio: Celular]");
            cell.focus();
            return;
        }
        
        if (!email_criado.value.trim()) {
            alert("ERROR[campo vazio: Email]");
            email_criado.focus();
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_criado.value)) {
            alert("ERROR[email inválido]");
            email_criado.focus();
            return;
        }
        
        if (!senha_criada.value) {
            alert("ERROR[senha faltante]");
            senha_criada.focus();
            return;
        }
        
        if (!confirm_senha.value) {
            alert("ERROR[confirmação de senha faltante]");
            confirm_senha.focus();
            return;
        }
        
        if (senha_criada.value !== confirm_senha.value) {
            alert("ERROR[senhas não coincidem]");
            senha_criada.focus();
            return;
        }
        
        if (senha_criada.value.length < 6) {
            alert("ERROR[senha muito curta, mínimo 6 caracteres]");
            senha_criada.focus();
            return;
        }
        
        const userData = {
            nome: nome.value,
            celular: cell.value,
            email: email_criado.value,
            senha: senha_criada.value
        };
        
        console.log("Dados do usuário:", userData);
        
        alert("Redirecionando para o menu...");
        
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 100);
    }

    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarLogin(e);
    });
});