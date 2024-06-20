let listaGenerica = [];

let lenguajesDeProgramacion = ["Js", "C", "C++", "K", "PY"];

lenguajesDeProgramacion.push("JAVA", "RUBY", "GO");

function showLanguages() {
    return lenguajesDeProgramacion;
}

function showLanguagesInverse() {
    return lenguajesDeProgramacion.reverse();
}

function sumar(...rest) {
    return rest;
}

console.log(showLanguages());
console.log(showLanguagesInverse());
console.log(sumar(5, 8, 4, 25, 42));
