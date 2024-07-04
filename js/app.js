let numeroSecreto = 0;
const maxIntents = 3;
let intentos = 0;
let level = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// control del dom
let input = document.querySelector("#userValue");
input.addEventListener("keypress", (e) => (e.key == 'Enter') ? play() : '');
let newGameButton = document.getElementById("newGameButton");
let playButton = document.getElementById("playButton");

document.addEventListener("DOMContentLoaded", (e) => {
  newGame();
})

function newGame() {
  // intentos = intentos * level;
  condicionesIniciales();
  numeroSecreto = generarNumeroSecreto();

  intentos = level * maxIntents;
  asignarTextoElemento("#level", level);
  asignarTextoElemento("#intentos", intentos);
}



function condicionesIniciales() {
  input.focus();
  input.classList.remove("bg-red");
  input.classList.remove("bg-green");
  input.removeAttribute("disabled");
  newGameButton.setAttribute("disabled", "true");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  asignarTextoElemento("#level", level);
  asignarTextoElemento("#intentos", intentos);
  limpiarCaja();
  playButtonDisable(false);
}



function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  console.log(numeroGenerado);
  //Si ya sorteamos todos los números
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
    // gameOver();
  } else {
    // Si el numero generado está incluido en la lista
    // generamos uno nuevo
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
    // return (listaNumerosSorteados.includes(numeroGenerado)) ? generarNumeroSecreto() : listaNumerosSorteados.push(numeroGenerado);
  }
}




// CÓDIGO VIEJO

function play() {
  let numeroDeUsuario = parseInt(input.value);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${intentos === 1 ? "vez" : "veces"}`,
    );
    input.setAttribute("disabled", "true");
    newGameButton.removeAttribute("disabled")
    input.className += " bg-green";
    level++;
    numeroMaximo = numeroMaximo + 10
    playButtonDisable(true)
    asignarTextoElemento("#intentos", intentos);
  } else {
    //El usuario no acertó.
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }
    intentos--;
    if (intentos == 0) {
      gameOver();
    }
    limpiarCaja();
  }
  asignarTextoElemento("#intentos", intentos);

  return;
}

function gameOver() {
  input.type = "text";
  setTimeout(function () {
    playButtonDisable(true)
    console.log("perdiste...");
    input.value = "Game Over";
    input.setAttribute("disabled", "true");
    input.classList.add("bg-red");
    newGameButton.removeAttribute("disabled")

  }, 200)

}

function playButtonDisable(state) {
  (state) ? playButton.setAttribute("disabled", "true") : playButton.removeAttribute("disabled")

}


// funciones auxiliares
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function limpiarCaja() {
  input.value = "";
  input.focus();
}