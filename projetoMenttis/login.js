const email = document.getElementById("email");
const senha = decument.getElementById("password");
//
const nome = document.getElementById("nome");
const cell = document.getElementById("celular");
const senha_criada = document.getElementById("new-password");
const email_criado = document.getElementById("email-criado");
const confirm_senha = document.getElementById("cpassoword");


function registrarLogin() {
    const emailRegistrado = (email.innerHTML == email_criado.innerHTML);
    if (senha_criada == confirm_senha) {
        const senhaRegistrada = (senha.innerHTML == senha_criada.innerHTML);
    };
    const nomeRegistrado = nome;
    const cellRegistrado = cell;

    window.alert("Redirecionando");
};