const email = document.getElementById("email");
const senha = document.getElementById("password");
//
const nome = document.getElementById("nome");
const cell = document.getElementById("celular");
const senha_criada = document.getElementById("new-password");
const email_criado = document.getElementById("email-criado");
const confirm_senha = document.getElementById("cpassoword");


function registrarLogin() {
    const emailRegistrado = (email.value == email_criado.value);
    if (senha_criada == confirm_senha) {
        const senhaRegistrada = (senha.value == senha_criada.value);
    };
    const nomeRegistrado = nome;
    const cellRegistrado = cell;

    window.alert("Redirecionando");
};