// Defina aqui o nome e a senha corretos
const nomeCorreto = "Cor Vermelho";
const senhaCorreta = "Belly";

document.querySelector("#lock-screen button").addEventListener("click", function () {

    const nome = document.querySelector("#lock-screen input[type='text']").value;
    const senha = document.querySelector("#lock-screen input[type='password']").value;

    if (nome === nomeCorreto && senha === senhaCorreta) {

        // Some com a tela de bloqueio
        document.getElementById("lock-screen").style.display = "none";

        // Mostra o conteúdo real
        document.getElementById("conteudo").style.visibility = "visible";

    } else {
        alert("Nome ou senha incorretos!");
    }
});
