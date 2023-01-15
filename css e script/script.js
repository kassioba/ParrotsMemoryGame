let qtdeDeCartas = prompt(
  "Com quantas cartas você quer jogar? (Apenas números pares entre 4 e 14)"
);

while (
  isNaN(qtdeDeCartas) ||
  qtdeDeCartas % 2 >= 1 ||
  qtdeDeCartas < 4 ||
  qtdeDeCartas > 14
) {
  qtdeDeCartas = prompt(
    "Com quantas cartas você quer jogar? (Apenas números pares entre 4 e 14)"
  );
}

const frente = 0;

const imagens = [
  "./ícones/bobrossparrot.gif",
  "./ícones/bobrossparrot.gif",
  "./ícones/explodyparrot.gif",
  "./ícones/explodyparrot.gif",
  "./ícones/fiestaparrot.gif",
  "./ícones/fiestaparrot.gif",
  "./ícones/metalparrot.gif",
  "./ícones/metalparrot.gif",
  "./ícones/revertitparrot.gif",
  "./ícones/revertitparrot.gif",
  "./ícones/tripletsparrot.gif",
  "./ícones/tripletsparrot.gif",
  "./ícones/unicornparrot.gif",
  "./ícones/unicornparrot.gif",
];

const cartas = [];

function comparador() {
  return Math.random() - 0.5;
}

const container = document.querySelector(".container-cartas");

const imagensEscolhidas = imagens.splice(0, qtdeDeCartas);
imagensEscolhidas.sort(comparador);

for (contador = 0; contador < qtdeDeCartas; contador++) {
  container.innerHTML += `
      <div class='carta' data-test="card" onclick="virarCarta(this)">
        <div class="verso"><img src="./ícones/back.png" data-test="face-down-image" alt=""></div>
        <div class="frente desativado"><img src="${imagensEscolhidas[contador]}" data-test="face-up-image" alt="" class="img-verso"></div>
      </div>
  `;
}

const cartasViradas = [];

let cartaVirada = undefined;
const cartasSelecionadas = [];
let indice = 0;
let cartasClicadas = undefined;
let qtdeVirar = undefined;
const qtdeDeJogadas = [];
const seletorCarta = document.querySelectorAll(".carta");

function virarCarta(elemento) {
  elemento.removeAttribute("onClick");
  elemento.classList.add("virar");
  elemento.classList.add("selecionado");

  setTimeout(imagemDelayVirar, 500, elemento);

  qtdeDeJogadas.push(elemento.innerHTML);
  cartasSelecionadas.push(elemento.innerHTML);
  cartasClicadas = document.querySelectorAll(".selecionado");

  if (cartasClicadas.length >= 2) {
    for (let index = 0; index < seletorCarta.length; index++) {
      seletorCarta[index].removeAttribute("onClick");
    }
  }

  qtdeVirar = document.querySelectorAll(".virar");
  if (cartasSelecionadas[0] === cartasSelecionadas[indice] && indice >= 1) {
    cartasSelecionadas.splice(0, cartasSelecionadas.length);
    naoVirarCartasCertas();
    setTimeout(permitirClicarNovamente, 1000);
    setTimeout(fimDeJogo, 1000);
    indice = 0;
  } else if (cartasSelecionadas[0] === cartasSelecionadas[indice]) {
    indice++;
  } else {
    cartasSelecionadas.splice(0, cartasSelecionadas.length);
    indice = 0;
    setTimeout(virarCartasErradas, 1500);
    setTimeout(imagemDelayDesvirar, 2000);
    setTimeout(permitirClicarNovamente, 2500);
  }
}

function naoVirarCartasCertas() {
  for (i = 0; i < cartasClicadas.length; i++) {
    cartasClicadas[i].classList.remove("selecionado");
  }
}

function virarCartasErradas() {
  for (i = 0; i < cartasClicadas.length; i++) {
    cartasClicadas[i].classList.remove("virar", "selecionado");
  }
}

function imagemDelayVirar(a) {
  a.querySelector(".verso").classList.add("desativado");
  a.querySelector(".frente").classList.remove("desativado");
}

function imagemDelayDesvirar() {
  for (i = 0; i < cartasClicadas.length; i++) {
    cartasClicadas[i].querySelector(".verso").classList.remove("desativado");
    cartasClicadas[i].querySelector(".frente").classList.add("desativado");
  }
}

function permitirClicarNovamente() {
  const qtdeVirados = document.querySelectorAll(".virar");
  let u = 0;
  for (let i = 0; i < seletorCarta.length; i++) {
    if (seletorCarta[i] !== qtdeVirados[u])
      seletorCarta[i].setAttribute("onClick", "virarCarta(this)");
    u++;
  }
}

function fimDeJogo() {
  if (qtdeVirar.length == qtdeDeCartas) {
    alert(`Você ganhou em ${qtdeDeJogadas.length} jogadas!`);
  }
}
