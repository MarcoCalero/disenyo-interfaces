"use strict";
var oBar = Bar();
// Codificar aquí el programa principal

registrarEventos();

function registrarEventos() {
  // dropdown --------------------
  document
    .querySelector("#mnuAltaPedido")
    .addEventListener("click", mostrarFormulario);

  //   document
  //     .querySelector("#mnuListado")
  //     .addEventListener("click", mostrarFormulario);

  // Botones --------------------

  document;
  frmAltaPedido.idboton.addEventListener("click", procesarCrearLibro);
}

function mostrarFormulario(oEvento) {
  let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

  ocultarFormularios();

  switch (opcionMenu) {
    case "mnuAltaPedido":
      frmAltaPedido.classList.remove("d-none");
      //  actualizarDesplegableGenero();
      break;
    // case "mnuListado":
    //     frmListado.classList.remove("d-none");
    //     actualizarDesplegableGenero();
    //     break;
  }
}

function ocultarFormularios() {
  frmAltaPedido.classList.add("d-none");
}

async function altapedido() {
  var nombreCliente = document.getElementById(campoNombreCliente);
  var plato = parseInt(frmAltaPedido.lstPlato.value);
  var unidades = document.querySelector('input[name="selected"]:checked').value;

  var respuesta = await oBar.crearPedido(
    new Pedido(null, nombreCliente, plato, unidades),
  );
}
