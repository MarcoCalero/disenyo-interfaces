"use strict";

// Codificar aquí el programa principal

const frmCrear = document.getElementById("frmCrearLibro");
const frmListado = document.getElementById("frmListado");

registrarEventos();

function registrarEventos() {
  // Opciones del menu (B.1)
  document.getElementById("mnuCrearLibro").addEventListener("click", mostrarFormulario);
  document.getElementById("mnuListado").addEventListener("click", mostrarFormulario);

  // Botones de los formularios (B.2 y B.3).
  // Se pasa la REFERENCIA a la funcion (sin parentesis): si no, se ejecutaria ya.
  frmCrear.btnCrearLibro.addEventListener("click", procesarAltaLibro);
  frmListado.btnListado.addEventListener("click", procesarListado);
}


function mostrarFormulario(oEvento) {
  oEvento.preventDefault(); // los <a href="#"> saltarian al inicio de la pagina

  // Patron "ocultar todo y luego mostrar uno": no depende del estado anterior
  // y garantiza que los dos formularios nunca se vean a la vez.
  ocultarFormularios();

  switch (oEvento.target.id) {
    case "mnuCrearLibro":
      
      frmCrearLibro.classList.remove("d-none"); // d-none = display:none de Bootstrap
      break;
    case "mnuListado":
      
      frmListado.classList.remove("d-none");
      break;
  }
}

function ocultarFormularios() {
  frmCrear.classList.add("d-none");
  frmListado.classList.add("d-none");
}
