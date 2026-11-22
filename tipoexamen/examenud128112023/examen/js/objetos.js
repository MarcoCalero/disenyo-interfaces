"use strict";
// Codificar aquí las clases

class plato {
    #idplato
    #nombre
    #descripcion
    #precio
    constructor(idplato,
        nombre,
        descripcion,
        precio) {
        this.#idplato = idplato
        this.#nombre = nombre
        this.#descripcion = descripcion
        this.#precio = precio
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
    } get precio() {
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
            precio: this.#precio
        };
        return oPlato;
    }

}


class Pedido {
    #idpedido
    #cliente
    #idplato
    #unidades
    constructor(idpedido,
        cliente,
        idplato,
        unidades) {
        this.#idpedido = idpedido
        this.#cliente = cliente
        this.#idplato = idplato
        this.#unidades = unidades
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
}