/* ==========================
   PARALLAX
========================== */

const layers = document.querySelectorAll(
".mountains-back, .mountains-middle, .cliff, .tree"
);

document.addEventListener(
"mousemove",
(e)=>{

const x =
(e.clientX /
window.innerWidth - 0.5);

const y =
(e.clientY /
window.innerHeight - 0.5);

layers.forEach(layer=>{

let speed = 20;

if(
layer.classList.contains(
"mountains-middle"
)
){
speed = 40;
}

if(
layer.classList.contains(
"cliff"
)
){
speed = 60;
}

if(
layer.classList.contains(
"tree"
)
){
speed = 80;
}

layer.style.transform =
`translate(
${x * speed}px,
${y * speed}px
)`;

});

});

/* ==========================
   LEAVES
========================== */

const leavesContainer =
document.getElementById(
"leaves-container"
);

function createLeaf(){

const leaf =
document.createElement("div");

leaf.classList.add("leaf");

leaf.innerHTML = "🍂";

leaf.style.left =
Math.random() * 100 + "vw";

leaf.style.animationDuration =
10 + Math.random() * 10 + "s";

leaf.style.fontSize =
20 + Math.random() * 25 + "px";

leavesContainer.appendChild(
leaf
);

setTimeout(()=>{

leaf.remove();

},20000);

}

setInterval(
createLeaf,
500
);

/* ==========================
   LEAVES REACT
========================== */

document.addEventListener(
"mousemove",
(e)=>{

const leaves =
document.querySelectorAll(
".leaf"
);

const move =
(e.clientX /
window.innerWidth)
* 40;

leaves.forEach(leaf=>{

leaf.style.marginLeft =
move + "px";

});

});

/* ==========================
   PARTICLES
========================== */

const canvas =
document.getElementById(
"particles"
);

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

const particles = [];

for(let i=0;i<120;i++){

particles.push({

x:
Math.random()
* canvas.width,

y:
Math.random()
* canvas.height,

size:
Math.random()*3,

speed:
Math.random()*0.6

});

}

function drawParticles(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);

ctx.shadowBlur = 15;

ctx.shadowColor =
"rgba(255,220,120,.9)";

ctx.fillStyle =
"rgba(255,220,120,.8)";

ctx.fill();

p.y -= p.speed;

if(p.y < 0){

p.y = canvas.height;

p.x =
Math.random()
* canvas.width;

}

});

requestAnimationFrame(
drawParticles
);

}

drawParticles();

/* ==========================
   FIREFLIES
========================== */

const fireflies =
document.getElementById(
"fireflies"
);

for(let i=0;i<40;i++){

const fly =
document.createElement(
"div"
);

fly.classList.add(
"firefly"
);

fly.style.left =
Math.random()*100+"vw";

fly.style.top =
Math.random()*100+"vh";

fly.style.animationDuration =
5 + Math.random()*10
+ "s";

fireflies.appendChild(
fly
);

}

/* ==========================
   STARS
========================== */

const stars =
document.getElementById(
"stars"
);

for(let i=0;i<200;i++){

const star =
document.createElement(
"div"
);

star.classList.add(
"star"
);

star.style.left =
Math.random()*100+"vw";

star.style.top =
Math.random()*100+"vh";

star.style.animationDelay =
Math.random()*3+"s";

stars.appendChild(star);

}

/* ==========================
   AUDIO
========================== */

const audio =
document.getElementById(
"natureAudio"
);

const playBtn =
document.getElementById(
"playBtn"
);

let playing = false;

playBtn.addEventListener(
"click",
()=>{

if(!playing){

audio.volume = 0;

audio.play();

let fade =
setInterval(()=>{

if(audio.volume < 0.8){

audio.volume += 0.02;

}else{

clearInterval(
fade
);

}

},100);

playBtn.innerHTML = "❚❚";

playing = true;

}else{

audio.pause();

playBtn.innerHTML = "▶";

playing = false;

}

});

/* ==========================
   DAY / NIGHT CYCLE
========================== */

const sky =
document.querySelector(
".sky"
);

const moon =
document.querySelector(
".moon"
);

let cycle = 0;

function dayNightCycle(){

cycle++;

if(cycle < 150){

sky.style.background =
"linear-gradient(180deg,#8cc7ff,#ffd27d)";

moon.style.opacity = 0;

stars.style.opacity = 0;

}

else if(cycle < 300){

sky.style.background =
"linear-gradient(180deg,#ff944d,#ff5f45)";

moon.style.opacity = 0;

stars.style.opacity = 0;

}

else{

sky.style.background =
"linear-gradient(180deg,#0f172a,#000000)";

moon.style.opacity = 1;

stars.style.opacity = 1;

}

if(cycle > 450){

cycle = 0;

}

}

setInterval(
dayNightCycle,
1000
);

/* ==========================
   MOON GLOW
========================== */

setInterval(()=>{

moon.animate(

[
{
transform:
"scale(1)"
},

{
transform:
"scale(1.05)"
},

{
transform:
"scale(1)"
}
],

{
duration:4000
}

);

},4000);

/* ==========================
   SCROLL EFFECT
========================== */

window.addEventListener(
"scroll",
()=>{

const scroll =
window.scrollY;

document.querySelector(
".parallax-container"
).style.transform =

`scale(${
1 + scroll/15000
})`;

});

/* ==========================
   EAGLE RANDOM HEIGHT
========================== */

const eagle =
document.querySelector(
".eagle"
);

setInterval(()=>{

const newTop =
10 + Math.random()*30;

eagle.style.top =
newTop + "%";

},6000);

/* ==========================
   WIND EFFECT
========================== */

setInterval(()=>{

const trees =
document.querySelectorAll(
".tree"
);

trees.forEach(tree=>{

tree.animate(

[
{
transform:
"rotate(-2deg)"
},

{
transform:
"rotate(3deg)"
},

{
transform:
"rotate(-2deg)"
}

],

{
duration:3000
}

);

});

},3000);

/* ==========================
   HERO FADE
========================== */

window.addEventListener(
"scroll",
()=>{

const hero =
document.querySelector(
".hero-content"
);

const value =
window.scrollY;

hero.style.opacity =
1 - value / 600;

});

/* ==========================
   PRELOADER FUTURO
========================== */

window.addEventListener(
"load",
()=>{

console.log(
"Autumn Nature Loaded 🍂"
);

});