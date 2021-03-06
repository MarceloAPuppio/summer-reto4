let posicionArray = 0;
let contadorGuardados = 0;

//Clases
class Tools {
  static GenerarAleatorio() {
    return Math.floor(Math.random() * 20);
  }
  static Matching(persona1, persona2) {
    if (persona1.calcularValor() == persona2.calcularValor()) return "Si";
    else return "No";
  }
}

class Persona {
  constructor(nombre, carta1, carta2, carta3) {
    this.nombre = nombre;
    this.carta1 = carta1;
    this.carta2 = carta2;
    this.carta3 = carta3;
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
  calcularValor() {
    /* Suma los valores de las cartas y averigua si el valor es par o impar */
    return (this.carta1.valor + this.carta2.valor + this.carta3.valor) % 2 == 0;
  }
}

// Punteros HTML
const formInitial = document.getElementById("form-initial");
const btnTryAgain = document.getElementById("btnTryAgain");
const btnShowResults = document.getElementById("btnShowResults");
const inputJugador1 = document.getElementById("jugador1");
const inputJugador2 = document.getElementById("jugador2");
const templatePantallaCartas = document.getElementById(
  "template-pantalla-cartas"
).content;
const templatePantallaResultados = document.getElementById(
  "template-pantalla-resultados"
).content;
const templateHistorialLi = document.getElementById("template-historial-li")
  .content;
const historialUl = document.getElementById("historial-ul");
const header = document.querySelector("header");
const pantallaInicial = document.querySelector(".pantalla-inicial");
const pantallaModal = document.querySelector(".pantalla-modal");
const pantallaCartas = document.getElementById("pantalla-cartas");
const pantallaLoading = document.querySelector(".pantalla-loading");
const pantallaResultados = document.getElementById("pantalla-resultados");
const fragmentPantallaCartas = document.createDocumentFragment();
const fragmentPantallaResultados = document.createDocumentFragment();

//Funciones de renderizado
let historico = [];
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
  renderizarPantallaResultados(jugador1, jugador2);
  formInitial.reset();
  pantallaInicial.style.display = "none";
  header.style.display = "none";
  pantallaLoading.style.display = "flex";
  setTimeout(() => {
    pantallaLoading.style.display = "none";
    pantallaCartas.style.display = "flex";
  }, 4500);
});

btnTryAgain.addEventListener("click", () => {
  arregloCartasPersonas.splice(0, arregloCartasPersonas.length);
  pantallaModal.style.display = "none";
  pantallaCartas.style.display = "none";
  pantallaInicial.style.display = "flex";
  header.style.display = "flex";
});
btnShowResults.addEventListener("click", () => {
  arregloCartasPersonas.splice(0, arregloCartasPersonas.length);
  pantallaModal.style.display = "none";
  pantallaCartas.style.display = "none";
  pantallaResultados.style.display = "flex";
});

//Array de objetos cartas

let cartas;
fetch("arreglo.json")
  .then((res) => res.json())
  .then((res) => (cartas = res));

//areglo de cartas de personas
let arregloCartasPersonas = [];

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
  templatePantallaCartas.querySelector(
    "p"
  ).textContent = `${arreglo[position].carta.descripcion}`;
  templatePantallaCartas.querySelector(
    "h3"
  ).textContent = `${arreglo[position].carta.nombre}`;

  let clone = templatePantallaCartas.cloneNode("true");
  pantallaCartas.innerHTML = "";
  pantallaCartas.appendChild(clone);
  pantallaCartas
    .querySelector("#sliderRight")
    .addEventListener("click", () => aumentarPosicionArray());
  pantallaCartas
    .querySelector(".sliderLeft")
    .addEventListener("click", () => disminuirPosicionArray());
  const btnExitCartas = document.getElementById("exit-cartas");
  btnExitCartas.addEventListener("click", () => {
    pantallaModal.style.display = "flex";
  });
}

function renderizarPantallaResultados(persona1, persona2) {
  templatePantallaResultados.querySelector("#carta1").src = persona1.carta1.src;
  templatePantallaResultados.querySelector("#carta2").src = persona1.carta2.src;
  templatePantallaResultados.querySelector("#carta3").src = persona1.carta3.src;
  templatePantallaResultados.querySelector("#carta4").src = persona2.carta1.src;
  templatePantallaResultados.querySelector("#carta5").src = persona2.carta2.src;
  templatePantallaResultados.querySelector("#carta6").src = persona2.carta3.src;
  templatePantallaResultados.querySelector("#nombreJ1").textContent =
    persona1.nombre;
  templatePantallaResultados.querySelector("#nombreJ2").textContent =
    persona2.nombre;
  templatePantallaResultados.querySelector(
    "#match"
  ).textContent = `${Tools.Matching(persona1, persona2)}`;
  let clone = templatePantallaResultados.cloneNode(true);
  fragmentPantallaResultados.appendChild(clone);
  pantallaResultados.innerHTML = "";
  pantallaResultados.appendChild(fragmentPantallaResultados);
  document.getElementById("volver").addEventListener("click", () => {
    pantallaResultados.style.display = "none";
    header.style.display = "flex";
    pantallaInicial.style.display = "flex";
  });
  document.getElementById("guardar").addEventListener("click", function () {
    templateHistorialLi.querySelector("#li-j1").textContent = persona1.nombre;
    templateHistorialLi.querySelector("#li-j2").textContent = persona2.nombre;
    templateHistorialLi
      .querySelector("#li")
      .setAttribute("data-json", contadorGuardados);
    let clone = templateHistorialLi.cloneNode(true);
    historialUl.appendChild(clone);
    arregloCartasPersonas.splice(0, arregloCartasPersonas.length);
    historico.push({ jugador1: persona1, jugador2: persona2 });
    historialUl
      .querySelector(`li:nth-child(${contadorGuardados + 1})`)
      .addEventListener("click", function () {
        let positionHistorico = this.getAttribute("data-json");
        historico[positionHistorico].jugador1.agregarArray();
        historico[positionHistorico].jugador2.agregarArray();
        renderizarPantallaCartas(arregloCartasPersonas, 0);
        renderizarPantallaResultados(
          historico[positionHistorico].jugador1,
          historico[positionHistorico].jugador2
        );
        pantallaInicial.style.display = "none";
        header.style.display = "none";
        document.getElementById("guardar").style.display = "none";
        pantallaCartas.style.display = "flex";
      });
    contadorGuardados++;
    document.getElementById("guardar").style.display = "block";
    pantallaResultados.style.display = "none";
    header.style.display = "flex";
    pantallaInicial.style.display = "flex";
  });
}
