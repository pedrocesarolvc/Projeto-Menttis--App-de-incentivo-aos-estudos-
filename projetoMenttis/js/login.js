const formLogin = {
    // Transformamos as variáveis globais em um dicionário (objeto) usando getters
    // Isso garante que os elementos sejam buscados no momento exato em que são necessários,
    // evitando erros caso o DOM ainda não esteja 100% carregado.
    get email() { return document.getElementById("email"); },
    get senha() { return document.getElementById("password"); },
    
    // Função de segurança agrupada dentro do objeto para validar os dados
    validar: function() {
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
        
        if (!this.senha || !this.senha.value) {
            alert("ERRO: O campo Senha é obrigatório e não pode estar vazio.");
            if (this.senha) this.senha.focus();
            return false;
        }
        
        return true; // Passou por todas as validações de segurança
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão de login (funciona tanto para a classe do PC quanto do celular)
    const btnLogin = document.querySelector(".login-button, .botao");
    
    if (btnLogin) {
        // Intercepta o clique para rodar nossa função de segurança
        btnLogin.addEventListener('click', function(e) {
            e.preventDefault(); // Impede que a página recarregue incorretamente
            
            if (formLogin.validar()) {
                console.log("Login seguro efetuado para o usuário:", formLogin.email.value);
                alert("Login efetuado com sucesso! Redirecionando para o menu principal...");
                
                // Redirecionamento seguro via JS, eliminando a tag <a> dentro do botão
                setTimeout(() => {
                    window.location.href = "../menu.html";
                }, 500);
            }
        });
    }
});