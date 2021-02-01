let posicionArray = 0;
// Punteros HTML
const formInitial = document.getElementById("form-initial");
const btnTryAgain = document.getElementById("btnTryAgain");
const inputJugador1 = document.getElementById("jugador1");
const inputJugador2 = document.getElementById("jugador2");
const templatePantallaCartas = document.getElementById(
  "template-pantalla-cartas"
).content;
const pantallaCartas = document.getElementById("pantalla-cartas");
const fragmentPantallaCartas = document.createDocumentFragment();

//Funciones de renderizado

// Add Event Listeners

formInitial.addEventListener("submit", (e) => {
  e.preventDefault();
  let jugador1 = new Persona(
    inputJugador1.value,
    cartas[Tools.GenerarAleatorio()],
    cartas[Tools.GenerarAleatorio()],
    cartas[Tools.GenerarAleatorio()]
  );
  let jugador2 = new Persona(
    inputJugador2.value,
    cartas[Tools.GenerarAleatorio()],
    cartas[Tools.GenerarAleatorio()],
    cartas[Tools.GenerarAleatorio()]
  );

  jugador1.agregarArray();
  jugador2.agregarArray();
  renderizarPantallaCartas(arregloCartasPersonas, 0);
  formInitial.reset();
});

btnTryAgain.addEventListener("click", () => {
  arregloCartasPersonas.splice(0, arregloCartasPersonas.length);
});
//Array de objetos cartas

let cartas;
fetch("arreglo.json")
  .then((res) => res.json())
  .then((res) => (cartas = res));

//areglo de cartas de personas
let arregloCartasPersonas = [];
// clases

class Persona {
  constructor(nombre, carta1, carta2, carta3) {
    this.nombre = nombre;
    this.carta1 = carta1;
    this.carta2 = carta2;
    this.carta3 = carta3;
  }
  saludar() {
    console.log(
      this.nombre,
      this.carta1.nombre,
      this.carta2.nombre,
      this.carta3.nombre
    );
  }
  agregarArray() {
    arregloCartasPersonas.push({
      titulo: `Carta 1 de 3 de ${this.nombre}`,
      carta: this.carta1,
    });
    arregloCartasPersonas.push({
      titulo: `Carta 2 de 3 de ${this.nombre}`,
      carta: this.carta2,
    });
    arregloCartasPersonas.push({
      titulo: `Carta 3 de 3 de ${this.nombre}`,
      carta: this.carta3,
    });
  }
}
function aumentarPosicionArray() {
  posicionArray++;
  if (posicionArray > 5) posicionArray = 0;
  renderizarPantallaCartas(arregloCartasPersonas, posicionArray);
}

function disminuirPosicionArray() {
  posicionArray--;
  if (posicionArray < 0) posicionArray = 5;
  renderizarPantallaCartas(arregloCartasPersonas, posicionArray);
  console.log(`variable interna: ${posicionArray}`);
}

function renderizarPantallaCartas(arreglo, position) {
  templatePantallaCartas.querySelector(
    "h1"
  ).textContent = `${arreglo[position].titulo}`;
  templatePantallaCartas.querySelector(
    "img"
  ).src = `${arreglo[position].carta.src}`;

  let clone = templatePantallaCartas.cloneNode("true");
  pantallaCartas.innerHTML = "";
  pantallaCartas.appendChild(clone);
  pantallaCartas
    .querySelector(".sliderLeft")
    .addEventListener("click", () => aumentarPosicionArray());
  pantallaCartas
    .querySelector("#sliderRight")
    .addEventListener("click", () => disminuirPosicionArray());
}

class Tools {
  static GenerarAleatorio() {
    return Math.floor(Math.random() * 7);
  }
}
