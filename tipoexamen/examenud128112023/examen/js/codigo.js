"use strict";

// Codificar aquí el programa principal
var oBar = new Bar();

const frmAlta = document.getElementById("frmAltaPedido");
const frmListado = document.getElementById("frmListadoPedidosCliente");

registrarEventos();

function registrarEventos() {
  document
    .getElementById("mnuAltaPedido")
    .addEventListener("click", mostrarFormulario);
  document
    .getElementById("mnuListadoPedidosCliente")
    .addEventListener("click", mostrarFormulario);
  frmAltaPedido.btnAltaPedido.addEventListener("click", procesarAltaPedido);
  frmListadoPedidosCliente.btnListadoPedidosCliente.addEventListener(
    "click",
    procesarListado,
  );
}

function mostrarFormulario(oEvento) {
  oEvento.preventDefault();
  ocultarFormularios();
  switch (oEvento.target.id) {
    case "mnuAltaPedido":
      frmAltaPedido.style.display = "block";
      cargarDesplegables();
      break;
    case "mnuListadoPedidosCliente":
      frmListadoPedidosCliente.style.display = "block";
      cargarDesplegables();
      break;
  }
}

function ocultarFormularios() {
  frmAltaPedido.style.display = "none";
  frmListadoPedidosCliente.style.display = "none";
}

async function cargarDesplegables() {
  let platos = await oBar.getPlatos();
  let options = "";
  for (let plato of platos) {
    options += `<option value="${plato.idplato}">${plato.nombre}</option>`;
  }
  frmAltaPedido.lstPlato.innerHTML = options;
}

async function procesarAltaPedido() {
  let cliente = frmAltaPedido.txtCliente.value.trim();
  let idplato = frmAltaPedido.lstPlato.value;
  let unidades = frmAltaPedido.radUnidades.value;
  let oPedido = new Pedido(null, cliente, idplato, unidades);
  let respuesta = await oBar.altaPedido(oPedido);
  alert(respuesta.mensaje);
  if (respuesta.ok) {
    frmAltaPedido.reset();
  }
}

async function procesarListado() {
  let cliente = frmListadoPedidosCliente.txtNombreClienteListado.value.trim();
  let tabla = await oBar.listadoPedidosCliente(cliente);
  let capa = document.querySelector("#listado");
  capa.innerHTML = tabla;
  capa.style.display = "block";
}
