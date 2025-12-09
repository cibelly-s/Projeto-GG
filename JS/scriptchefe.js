let nome = document.getElementById("noome");
let senha = document.getElementById("password");
let container = document.getElementById("container-senha");

function severus(){
    if (noome.value === "Chefe" && password.value === "1805"){
     container.style.display = "none";
        alert("Parabens, bem vindo a sua área.😊")
    }

    else{
        alert("No, bora dnv")
    }
}
