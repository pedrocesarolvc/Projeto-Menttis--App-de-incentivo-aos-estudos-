const formCadastro = {
    // Transformamos as variáveis globais do formulário de cadastro em um objeto dicionário
    get nome() { return document.getElementById("nome"); },
    get celular() { return document.getElementById("celular"); },
    get email() { return document.getElementById("email-criado"); },
    get senha() { return document.getElementById("new-password"); },
    get confirmSenha() { return document.getElementById("cpassword"); },
    
    // Função principal de segurança e validação
    validar: function() {
        if (!this.nome || !this.nome.value.trim()) {
            alert("ERRO: O campo Nome não pode estar vazio.");
            if (this.nome) this.nome.focus();
            return false;
        }
        
        if (!this.celular || !this.celular.value.trim()) {
            alert("ERRO: O campo Celular não pode estar vazio.");
            if (this.celular) this.celular.focus();
            return false;
        }
        
        if (!this.email || !this.email.value.trim()) {
            alert("ERRO: O campo Email não pode estar vazio.");
            if (this.email) this.email.focus();
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email.value)) {
            alert("ERRO: E-mail com formato inválido. Insira um email real.");
            if (this.email) this.email.focus();
            return false;
        }
        
        if (!this.senha || !this.senha.value) {
            alert("ERRO: O campo Senha é obrigatório.");
            if (this.senha) this.senha.focus();
            return false;
        }
        
        if (this.senha.value.length < 6) {
            alert("ERRO: Por questões de segurança, a senha deve conter pelo menos 6 caracteres.");
            if (this.senha) this.senha.focus();
            return false;
        }
        
        if (!this.confirmSenha || !this.confirmSenha.value) {
            alert("ERRO: O campo de Confirmação de Senha é obrigatório.");
            if (this.confirmSenha) this.confirmSenha.focus();
            return false;
        }
        
        if (this.senha.value !== this.confirmSenha.value) {
            alert("ERRO: As senhas inseridas não coincidem.");
            if (this.confirmSenha) this.confirmSenha.focus();
            return false;
        }
        
        return true; // Todas as checagens passaram
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const btnRegister = document.getElementById("register-btn");
    
    if (btnRegister) {
        btnRegister.addEventListener('click', function(e) {
            e.preventDefault(); // Corta o comportamento padrão problemático
            
            if (formCadastro.validar()) {
                console.log("Dados seguros do novo usuário validados e prontos.");
                alert("Conta criada com sucesso! Redirecionando...");
                
                setTimeout(() => {
                    window.location.href = "menu.html";
                }, 500);
            }
        });
    }
});
