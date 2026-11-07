// variables para guardar los datos de la calculadora
let valorPantalla = "0";
let primerNumero = null;
let operacionActual = null;
let reiniciarPantalla = false;

const pantalla = document.getElementById("pantalla");

// funcion para actualizar la vista de la pantalla
function actualizarPantalla() {
    pantalla.textContent = valorPantalla;
}

// funcion para agregar digitos a la pantalla
function agregarNumero(numero) {
    if (valorPantalla === "0" || reiniciarPantalla) {
        valorPantalla = numero;
        reiniciarPantalla = false;
    } else {
        // Evitar multiples puntos decimales
        if (numero === "." && valorPantalla.includes(".")) return;
        valorPantalla += numero;
    }
    actualizarPantalla();
}

// seleccion de la operacion matematica
function seleccionarOperacion(op) {
    if (operacionActual !== null) {
        calcular();
    }
    primerNumero = parseFloat(valorPantalla);
    operacionActual = op;
    reiniciarPantalla = true;
}

// función para realizar el calculo segun la operación seleccionada
function calcular() {
    if (operacionActual === null || reiniciarPantalla) return;
    
    let segundoNumero = parseFloat(valorPantalla);
    let resultado = 0;

    switch (operacionActual) {
        case "+":
            resultado = primerNumero + segundoNumero;
            break;
        case "-":
            resultado = primerNumero - segundoNumero;
            break;
        case "*":
            resultado = primerNumero * segundoNumero;
            break;
        case "/":
            if (segundoNumero === 0) {
                alert("No se puede dividir entre cero");
                limpiar();
                return;
            }
            resultado = primerNumero / segundoNumero;
            break;
    }

    // redondear para evitar decimales largos
    valorPantalla = Math.round(resultado * 10000) / 10000;
    valorPantalla = valorPantalla.toString();
    operacionActual = null;
    actualizarPantalla();
}

// función del boton C 
function limpiar() {
    valorPantalla = "0";
    primerNumero = null;
    operacionActual = null;
    reiniciarPantalla = false;
    actualizarPantalla();
}

// función para borrar el ultimo caracter ingresado 
function borrarUno() {
    if (valorPantalla.length === 1) {
        valorPantalla = "0";
    } else {
        valorPantalla = valorPantalla.slice(0, -1);
    }
    actualizarPantalla();
}

// soporte para teclado numerico del computador
document.addEventListener("keydown", function(event) {
    if (event.key >= "0" && event.key <= "9") {
        agregarNumero(event.key);
    } else if (event.key === ".") {
        agregarNumero(".");
    } else if (event.key === "+") {
        seleccionarOperacion("+");
    } else if (event.key === "-") {
        seleccionarOperacion("-");
    } else if (event.key === "*") {
        seleccionarOperacion("*");
    } else if (event.key === "/") {
        seleccionarOperacion("/");
    } else if (event.key === "Enter" || event.key === "=") {
        calcular();
    } else if (event.key === "Backspace") {
        borrarUno();
    } else if (event.key === "Escape") {
        limpiar();
    }
});