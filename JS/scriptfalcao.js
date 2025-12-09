let nome = document.getElementById("nome");
let senha = document.getElementById("senha");
let container = document.getElementById("container-senha");

function shrek(){
    if (nome.value === "Patrão" && senha.value === "2106"){
        container.style.display = "none";
        alert("Parabens.😊 Bem Vindo a sua área")
    }

    else{
        alert("No, bora dnv")
    }
   }
