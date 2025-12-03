const nome = document.getElementById("nome");
const cell = document.getElementById("celular");
const senha_criada = document.getElementById("new-password");
const email_criado = document.getElementById("email-criado");
const confirm_senha = document.getElementById("cpassoword");

const email = email_criado;
const senha = senha_criada;


function registrarLogin() {
    if (!email_criado.value) {
        alert("ERROR[esse email não existe]")
        return;
    }
    const emailRegistrado = email_criado.value; 
    if (!senha_criada.value || !confirm_senha.value) {
        alert("ERROR[senha faltante]")
        return;
    }
    if (senha_criada !== confirm_senha) {
        alert("ERROR[senha errada]")
        return;
    }
    const senhaRegistrada = senha_criada.value;
    window.alert("Redirecionando");
};