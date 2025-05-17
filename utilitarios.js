// Muestra texto dentro de un elemento (por id)
function mostrarTexto(idComponente, mensaje) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.innerText = mensaje;
  }
}

// Muestra HTML dentro de un elemento (por id)
function mostrarTextoHTML(idComponente, html) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.innerHTML = html;
  }
}

// Muestra texto dentro de un input o textarea
function mostrarTextoEnCaja(idComponente, mensaje) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.value = mensaje;
  }
}

// Recupera texto de input o textarea
function recuperarTexto(idComponente) {
  const componente = document.getElementById(idComponente);
  return componente ? componente.value : "";
}

// Recupera número entero de input, retorna NaN si no es válido
function recuperarInt(idComponente) {
  const texto = recuperarTexto(idComponente);
  return parseInt(texto, 10);
}

// Recupera número flotante de input, retorna NaN si no es válido
function recuperarFloat(idComponente) {
  const texto = recuperarTexto(idComponente);
  return parseFloat(texto);
}

// Recupera texto desde un div o span (textContent)
function recuperarTextoDiv(idComponente) {
  const componente = document.getElementById(idComponente);
  return componente ? componente.textContent : "";
}

// Muestra un elemento (display block)
function mostrarComponente(idComponente) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.style.display = "block";
  }
}

// Oculta un elemento (display none)
function ocultarComponente(idComponente) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.style.display = "none";
  }
}

// Deshabilita un input o botón
function deshabilitarComponente(idComponente) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.disabled = true;
  }
}

// Habilita un input o botón
function habilitarComponente(idComponente) {
  const componente = document.getElementById(idComponente);
  if (componente) {
    componente.disabled = false;
  }
}

// Verifica si un carácter es mayúscula (A-Z)
function esMayuscula(caracter) {
  if (!caracter || caracter.length === 0) return false;
  const codigo = caracter.charCodeAt(0);
  return codigo >= 65 && codigo <= 90;
}

// Verifica si toda una palabra está en mayúsculas
function sonMayusculas(palabra) {
  for (let i = 0; i < palabra.length; i++) {
    if (!esMayuscula(palabra[i])) {
      return false;
    }
  }
  return true;
}

esDigito = function(caracter){
  let esDigito = false;
  if (caracter.charCodeAt(0) >= 48 && caracter.charCodeAt(0) <= 57 ){
      esDigito = true;
  }
  return esDigito;
}

soloLetras = function(caracter){
  let esLetra = false;
  if((caracter.charCodeAt(0) >= 65 && caracter.charCodeAt(0) <= 89) || (caracter.charCodeAt(0) >= 97 && caracter.charCodeAt(0) <= 122) || caracter.charCodeAt(0)==32){
    esLetra = true
  }
  return esLetra;
}