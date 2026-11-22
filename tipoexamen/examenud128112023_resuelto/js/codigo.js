"use strict";

/* ===========================================================================
   APARTADO d) PROGRAMA PRINCIPAL - codigo.js
   Se carga el último en index.html: ya existen Bar, Pedido, Plato,
   peticionGET y peticionPOST, y el DOM ya está listo.
   =========================================================================== */

// Referencias a los elementos (getElementById explícito, sin depender
// de las variables globales automáticas por id)
const frmAltaPedido = document.getElementById("frmAltaPedido");
const frmListadoPedidosCliente = document.getElementById("frmListadoPedidosCliente");
const capaListado = document.getElementById("listado");

var oBar = new Bar();

registrarEventos();

function registrarEventos() {
    // Opciones del menú
    document.getElementById("mnuAltaPedido").addEventListener("click", mostrarFormulario);
    document.getElementById("mnuListadoPedidosCliente").addEventListener("click", mostrarFormulario);

    // Botones de los formularios (referencia a la función, SIN paréntesis)
    frmAltaPedido.btnAltaPedido.addEventListener("click", procesarAltaPedido);
    frmListadoPedidosCliente.btnListadoPedidosCliente.addEventListener("click", procesarListadoPedidosCliente);
}

/* ===========================================================================
   d.i) (1,5 puntos) Visibilidad de formulario/listado + carga del desplegable
   La plantilla oculta form y #listado con CSS (display:none), así que se
   muestran con style.display = "block" (con "" volvería a mandar el CSS).
   =========================================================================== */

function mostrarFormulario(oEvento) {
    oEvento.preventDefault(); // los <a href="#"> saltarían al inicio de la página

    // Patrón "ocultar todo y mostrar uno": nunca se ven dos cosas a la vez
    ocultarTodo();

    switch (oEvento.target.id) {
        case "mnuAltaPedido":
            cargarDesplegablePlatos();
            frmAltaPedido.style.display = "block";
            break;
        case "mnuListadoPedidosCliente":
            frmListadoPedidosCliente.style.display = "block";
            break;
    }
}

function ocultarTodo() {
    frmAltaPedido.style.display = "none";
    frmListadoPedidosCliente.style.display = "none";
    capaListado.style.display = "none";
}

/* value de cada <option> = idplato; texto visible = nombre del plato */
async function cargarDesplegablePlatos() {
    let platos = await oBar.getPlatos(); // await: sin él sería una Promesa

    let options = "";
    for (let plato of platos) {
        options += `<option value="${plato.idplato}">${plato.nombre}</option>`;
    }
    frmAltaPedido.lstPlato.innerHTML = options; // se asigna una sola vez
}

/* ===========================================================================
   d.ii) (2 puntos) Alta de un pedido
   - Sin validación (lo dice el enunciado).
   - Éxito o error: SIEMPRE alert con el mensaje del servidor.
   - Si va bien se limpia el formulario para el siguiente pedido.
   =========================================================================== */

async function procesarAltaPedido() {
    // 1) Leer los campos
    let cliente = frmAltaPedido.txtCliente.value.trim();
    let idplato = frmAltaPedido.lstPlato.value;       // value del <option> elegido
    let unidades = frmAltaPedido.radUnidades.value;   // value del radio marcado

    // 2) Construir el objeto (idpedido = null: lo genera AUTO_INCREMENT)
    let oPedido = new Pedido(null, cliente, idplato, unidades);

    // 3) Enviar y ESPERAR la respuesta
    let respuesta = await oBar.altaPedido(oPedido);

    // 4) Informar siempre
    alert(respuesta.mensaje);

    // 5) Solo si ha ido bien
    if (respuesta.ok) {
        frmAltaPedido.reset();
    }
}

/* ===========================================================================
   d.iii) (2 puntos) Listado de pedidos de un cliente en la capa #listado
   - innerHTML = (no +=): solo se ve una tabla, no se acumulan.
   =========================================================================== */

async function procesarListadoPedidosCliente() {
    let nombreCliente = frmListadoPedidosCliente.txtNombreClienteListado.value.trim();

    let tabla = await oBar.listadoPedidosCliente(nombreCliente);

    capaListado.innerHTML = tabla;
    capaListado.style.display = "block";
}
