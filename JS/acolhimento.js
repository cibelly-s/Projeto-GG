/* ========================= */
/* CHUVA DE BALEIAS */
/* ========================= */

const botao = document.getElementById("botaoBaleias");

let intervalo;
let ativo = false;

botao.addEventListener("click", () => {

    if (!ativo) {

        intervalo = setInterval(criarBaleia, 300);
        botao.innerText = "parar baleinhas 🌊";
        ativo = true;

    } else {

        clearInterval(intervalo);
        botao.innerText = "soltar baleinhas 🐋";
        ativo = false;

    }
});

function criarBaleia() {

    const baleia = document.createElement("div");
    baleia.classList.add("baleinha");
    baleia.innerText = "🐋";

    baleia.style.left = Math.random() * window.innerWidth + "px";
    baleia.style.animationDuration = (Math.random() * 4 + 4) + "s";

    document.body.appendChild(baleia);

    setTimeout(() => baleia.remove(), 8000);
}

/* ========================= */
/* PARTÍCULAS MOUSE */
/* ========================= */

let lastX = 0;
let lastY = 0;

document.addEventListener("mousemove", (e) => {

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 3) {
        createParticle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

function createParticle(x, y) {

    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = x + "px";
    p.style.top = y + "px";

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 1000);
}

/* ========================= */
/* RESPIRAÇÃO */
/* ========================= */

const text = document.querySelector(".breathing-text");

const states = ["inspira", "expira"];
let index = 0;

setInterval(() => {
    index = (index + 1) % states.length;
    text.textContent = states[index];
}, 3000);

/* ========================= */
/* MINI GAME DRAG */
/* ========================= */

const baleia = document.getElementById("baleia");
const destino = document.getElementById("destino");
const mensagem = document.getElementById("mensagemGame");
const area = document.querySelector(".gameArea");

let segurando = false;

baleia.addEventListener("pointerdown", () => {
    segurando = true;
});

document.addEventListener("pointerup", () => {
    segurando = false;
});

area.addEventListener("pointermove", (e) => {

    if (!segurando) return;

    const rect = area.getBoundingClientRect();

    let x = e.clientX - rect.left - baleia.offsetWidth / 2;
    let y = e.clientY - rect.top - baleia.offsetHeight / 2;

    baleia.style.left = x + "px";
    baleia.style.top = y + "px";

    verificar();
});

function verificar() {

    const b = baleia.getBoundingClientRect();
    const d = destino.getBoundingClientRect();

    if (
        b.left < d.right &&
        b.right > d.left &&
        b.top < d.bottom &&
        b.bottom > d.top
    ) {
        mensagem.innerText = "o oceano também acolhe você 🌌";
    }
}

function criarBolha() {

    const bolha = document.createElement("div");
    bolha.classList.add("bolha");

    const tamanho = Math.random() * 30 + 10;

    bolha.style.width = tamanho + "px";
    bolha.style.height = tamanho + "px";

    bolha.style.left = Math.random() * window.innerWidth + "px";

    bolha.style.animationDuration = (Math.random() * 8 + 6) + "s";

    document.body.appendChild(bolha);

    setTimeout(() => {
        bolha.remove();
    }, 14000);
}

setInterval(criarBolha, 400);