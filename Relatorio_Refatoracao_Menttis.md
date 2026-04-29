# 📝 Anotações de Estudo: Refatoração do Menttis (Login & Cadastro)

Neste documento estão os detalhes de todas as vulnerabilidades, conflitos e más práticas que foram encontradas na estrutura original do projeto e como elas foram solucionadas. Use este material para revisar conceitos importantes de JavaScript e HTML!

---

## 1. 🗑️ Limpeza de Arquivos Obsoletos
- **O que foi feito:** O arquivo `cronometro.html` e a folha de estilo `css/cronometro.css` foram totalmente excluídos.
- **Por quê:** Fazer a faxina de código inativo (ou arquivos mortos) no projeto é essencial para manter a estrutura limpa e não acumular "débito técnico".

---

## 2. 🗂️ Separação de Responsabilidades (Login vs. Cadastro)
- **O Erro Anterior:** 
  Havia apenas **um** arquivo (`login.js`) lidando com a lógica de Login e de Criar Conta simultaneamente. Como ele buscava todos os campos de uma vez (como `nome`, `celular`, `email-criado`), quando você abria a página de Login (que só tinha e-mail e senha), o JavaScript tentava ler variáveis que **não existiam**, o que gerava erros pesados de `TypeError: Cannot read properties of null` e travava todo o script.
- **A Solução:** 
  A lógica foi dividida em dois arquivos distintos:
  - `js/login.js` (Exclusivo para checar E-mail e Senha nas telas do PC e Celular).
  - `js/cadastro.js` (Exclusivo para validar a tela grande de Criação de Conta).
- **Conceito de Estudo:** Princípio da Responsabilidade Única (SRP - Single Responsibility Principle). Cada script agora faz apenas o que lhe compete.

---

## 3. 📦 Uso de Objetos e Getters para Variáveis Globais
- **O Erro Anterior:** 
  As variáveis (`const nome = document.getElementById("nome");`) estavam no topo do arquivo globalmente. Dependendo de como e onde a tag `<script>` era inserida no HTML, o DOM (a página) podia ainda não estar carregada, resultando em variáveis vazias.
- **A Solução:** 
  As variáveis foram transformadas em um **dicionário (Objeto Javascript)**. Para que as variáveis só fossem chamadas na hora certa, foram utilizados **`getters`** (ex: `get email() { return ... }`).
  ```javascript
  const formLogin = {
      get email() { return document.getElementById("email"); },
      get senha() { return document.getElementById("password"); },
      validar: function() { ... }
  };
  ```
- **Conceito de Estudo:** Os `getters` fazem uma avaliação *preguiçosa* (lazy evaluation). O JavaScript só vai tentar procurar o elemento na tela (DOM) quando você efetivamente for usar `formLogin.email`, o que zera as chances do HTML não estar pronto no momento da busca.

---

## 4. 🛡️ Função de Segurança e Validação
- **O Erro Anterior:** 
  As validações do formulário estavam soltas e acopladas à lógica de clique/redirecionamento.
- **A Solução:** 
  A validação virou um método interno do próprio objeto (`formLogin.validar()`), criando um escopo coeso. Esta função confere se a senha e confirmação de senha conferem, se os campos estão em branco e usa **Regex** (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) para checar se o formato do e-mail é plausível (contém `@`, `.`, etc.).
- **Conceito de Estudo:** Encapsulamento. Manter os dados (variáveis) e as regras que governam os dados (funções de validação) dentro do mesmo objeto cria um código altamente manutenível.

---

## 5. ⚠️ Conflitos de Ações no HTML (Eventos Duplicados)
- **O Erro Anterior no Cadastro:** 
  O botão estava sendo forçado por via dupla: `onclick="window.location.href='...'"` no HTML, ao mesmo tempo que o `addEventListener('click')` agia pelo JS. 
- **O Erro Anterior no Login:** 
  No PC, o botão continha `<button type="submit" onclick="registrarLogin()"><a href="...">...</a></button>`. Isso faz o navegador tentar submeter o form, executar a função JS, e navegar pelo link da tag `<a>` **tudo ao mesmo tempo**.
- **A Solução:**
  1. A tag `<a>` foi removida de dentro de botões `<button type="submit">`.
  2. A regra de navegação `window.location.href = ...` foi removida de atributos `onclick=` do HTML e delegada integralmente aos novos arquivos JavaScript (`js/login.js` e `js/cadastro.js`).
  3. Foi aplicado `e.preventDefault()` na origem do evento no JS para barrar submissões de formulário acidentais antes da validação da função de segurança ser concluída.

---

## 6. 🐛 Correções Estruturais Diversas
- **Correção da tag `<head>` Duplicada:** No arquivo `pc/pagina_login_pc.html`, a tag de fechamento de cabeçalho `</head>` estava duplicada acidentalmente nas linhas 9 e 10. (Corrigido).
- **Inclusão Dinâmica no Celular:** A página `celular/pagina_login_celular.html` sequer possuía importação de script JavaScript ou links na aba de cadastro, isolando o celular da interatividade. (Corrigido com `<script src="../js/login.js">` e referência `href` correta).
