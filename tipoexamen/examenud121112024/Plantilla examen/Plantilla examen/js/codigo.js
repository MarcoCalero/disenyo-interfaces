"use strict";

// Codificar aquí el programa principal

var oLibreria = new Libreria();

const frmCrear = document.getElementById("frmCrearLibro");
const frmListado = document.getElementById("frmListado");

registrarEventos();

function registrarEventos() {
  document
    .getElementById("mnuCrearLibro")
    .addEventListener("click", mostrarFormulario);
  document
    .getElementById("mnuListado")
    .addEventListener("click", mostrarFormulario);
  frmCrear.btnCrearLibro.addEventListener("click", procesarAltaLibro);
  frmListado.btnListado.addEventListener("click", procesarListado);
}

function mostrarFormulario(oEvento) {
  oEvento.preventDefault();
  ocultarFormularios();
  switch (oEvento.target.id) {
    case "mnuCrearLibro":
      frmCrearLibro.classList.remove("d-none");
      cargarDesplegables()
      break;
    case "mnuListado":
      frmListado.classList.remove("d-none");
      cargarDesplegables()
      break;
  }
}

function ocultarFormularios() {
  frmCrear.classList.add("d-none");
  frmListado.classList.add("d-none");
}

async function cargarDesplegables() {
  let respuesta = await oLibreria.getGeneros();
  if (respuesta.ok) {
    let options = "";
    for (let genero of respuesta.datos) {
      options += `<option value="${genero.idgenero}">${genero.genero}</option>`;
    }
    frmCrear.lstGenero.innerHTML = options;
    frmListado.lstGenero.innerHTML = options;
  } else {
    alert(
      "No se han podido cargar los generos literarios: " + respuesta.mensaje,
    );
  }
}

async function procesarAltaLibro() {
  let titulo = frmCrear.txtTitulo.value.trim();
  let autor = frmCrear.txtAutor.value.trim();
  let descripcion = frmCrear.txtDescripcion.value.trim();
  let imagen = frmCrear.txtImagen.value.trim();
  let idgenero = frmCrear.lstGenero.value;
  let oLibro = new Libro(null, idgenero, titulo, autor, descripcion, imagen);
  let respuesta = await oLibreria.crearLibro(oLibro);
  alert(respuesta.mensaje);
  if (respuesta.ok) {
    frmCrear.reset();
    frmCrear.classList.add("d-none");
  }
}

function procesarListado() {
  let lst = frmListado.lstGenero;
  let idgenero = lst.value;
  let genero = lst.options[lst.selectedIndex].textContent;
  open(
    "tarjetas.html?idgenero=" +
      encodeURIComponent(idgenero) +
      "&genero=" +
      encodeURIComponent(genero),
  );
}
