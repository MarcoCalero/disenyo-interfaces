"use strict";
// Codificar aquí las clases

class plato {
  #idplato;
  #nombre;
  #descripcion;
  #precio;
  constructor(idplato, nombre, descripcion, precio) {
    this.#idplato = idplato;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#precio = precio;
  }

  get idplato() {
    return this.#idplato;
  }
  set idplato(idplato) {
    this.#idplato = idplato;
  }
  get nombre() {
    return this.#nombre;
  }
  set nombre(nombre) {
    this.#nombre = nombre;
  }
  get descripcion() {
    return this.#descripcion;
  }
  set descripcion(descripcion) {
    this.#descripcion = descripcion;
  }
  get precio() {
    return this.#precio;
  }
  set precio(precio) {
    this.#precio = precio;
  }

  toJSON() {
    let oPlato = {
      idplato: this.#idplato,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      precio: this.#precio,
    };
    return oPlato;
  }
}

class Pedido {
  #idpedido;
  #cliente;
  #idplato;
  #unidades;
  constructor(idpedido, cliente, idplato, unidades) {
    this.#idpedido = idpedido;
    this.#cliente = cliente;
    this.#idplato = idplato;
    this.#unidades = unidades;
  }

  get idpedido() {
    return this.#idpedido;
  }
  set idpedido(idpedido) {
    this.#idpedido = idpedido;
  }
  get cliente() {
    return this.#cliente;
  }
  set cliente(cliente) {
    this.#cliente = cliente;
  }
  get idplato() {
    return this.#idplato;
  }
  set idplato(idplato) {
    this.#idplato = idplato;
  }
  get unidades() {
    return this.#unidades;
  }
  set unidades(unidades) {
    this.#unidades = unidades;
  }

  toJSON() {
    return {
      idpedido: this.#idpedido,
      cliente: this.#cliente,
      idplato: this.#idplato,
      unidades: this.#unidades,
    };
  }
}

class Bar {
  async altaPedido(oPedido) {
    let datos = new FormData();
    datos.append("pedido", JSON.stringify(oPedido)); // usa toJSON()
    return await peticionPOST("alta_pedido.php", datos);
  }
  async getPlatos() {
    let respuesta = await peticionGET("get_platos.php", new FormData());
    return respuesta.datos;
  }
  async listadoPedidosCliente(nombreCliente) {
    let datos = new FormData();
    datos.append("cliente", nombreCliente);
    let respuesta = await peticionGET("get_pedidos_cliente.php", datos);
    let html = `<h3>PEDIDOS DE ${nombreCliente}</h3>
<table class="table table-striped">
<thead><tr><th>IDPEDIDO</th><th>PLATO</th><th>UNIDADES</th>
<th>PRECIO</th><th>TOTAL</th></tr></thead><tbody>`;
    for (let fila of respuesta.datos) {
      let total = fila.unidades * fila.precio;
      html += `<tr><td>${fila.idpedido}</td><td>${fila.nombre}</td>
<td>${fila.unidades}</td><td>${Number(fila.precio).toFixed(2)}</td>
<td>${total.toFixed(2)}</td></tr>`;
    }
    html += "</tbody></table>";
    return html;
  }
}
