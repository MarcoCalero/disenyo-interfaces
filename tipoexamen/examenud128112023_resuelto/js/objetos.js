"use strict";

/* ===========================================================================
   APARTADO c) (2 puntos) - objetos.js
   Clases Pedido y Plato (mismos atributos que las columnas de la BD,
   constructor + propiedades get/set) y la clase gestora Bar.
   =========================================================================== */

/* ---------------------------------------------------------------------------
   c.i) Clase Pedido  ->  tabla pedidos (idpedido, cliente, idplato, unidades)
   - Un atributo privado (#) por columna, en el mismo orden que la tabla.
   - Dentro de get/set siempre this.#campo (this.campo = recursión infinita).
   - toJSON(): no lo pide el enunciado, pero sin él JSON.stringify(oPedido)
     daría "{}" porque no ve los campos privados.
   --------------------------------------------------------------------------- */
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

    get idpedido() { return this.#idpedido; }
    set idpedido(valor) { this.#idpedido = valor; }

    get cliente() { return this.#cliente; }
    set cliente(valor) { this.#cliente = valor; }

    get idplato() { return this.#idplato; }
    set idplato(valor) { this.#idplato = valor; }

    get unidades() { return this.#unidades; }
    set unidades(valor) { this.#unidades = valor; }

    toJSON() {
        return {
            idpedido: this.#idpedido,
            cliente: this.#cliente,
            idplato: this.#idplato,
            unidades: this.#unidades
        };
    }
}

/* ---------------------------------------------------------------------------
   c.ii) Clase Plato  ->  tabla platos (idplato, nombre, descripcion, precio)
   --------------------------------------------------------------------------- */
class Plato {
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

    get idplato() { return this.#idplato; }
    set idplato(valor) { this.#idplato = valor; }

    get nombre() { return this.#nombre; }
    set nombre(valor) { this.#nombre = valor; }

    get descripcion() { return this.#descripcion; }
    set descripcion(valor) { this.#descripcion = valor; }

    get precio() { return this.#precio; }
    set precio(valor) { this.#precio = valor; }

    toJSON() {
        return {
            idplato: this.#idplato,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            precio: this.#precio
        };
    }
}

/* ---------------------------------------------------------------------------
   c.iii) Clase Bar (gestora)
   Cada método: empaqueta parámetros en un FormData -> peticionGET/POST
   (ajax.js) -> devuelve lo que pide el enunciado.
   El backend responde siempre { ok, mensaje, datos }. Si falla el HTTP,
   ajax.js devuelve { error: true, ... } y entonces ok es undefined (= falso).
   --------------------------------------------------------------------------- */
class Bar {

    /* (1) altaPedido(oPedido): respuesta (error, mensaje, datos)
           El pedido viaja como UN campo de texto con su JSON (usa toJSON);
           PHP lo reconstruye con json_decode($_POST["pedido"]). */
    async altaPedido(oPedido) {
        let datos = new FormData();
        datos.append("pedido", JSON.stringify(oPedido));

        return await peticionPOST("alta_pedido.php", datos);
    }

    /* (2) getPlatos(): array de filas de la tabla platos
           Sin parámetros, pero peticionGET recorre el FormData con for...of:
           hay que pasarle uno vacío (no undefined).
           Si hay error devolvemos un array vacío para que el for...of no falle. */
    async getPlatos() {
        let respuesta = await peticionGET("get_platos.php", new FormData());

        if (respuesta.ok) {
            return respuesta.datos;
        } else {
            console.error(respuesta.mensaje);
            return [];
        }
    }

    /* (3) listadoPedidosCliente(nombreCliente): string (tabla HTML con el listado)
           Columnas: IDPEDIDO, PLATO, UNIDADES, PRECIO, TOTAL.
           El orden por idpedido ascendente lo hace la consulta SQL.
           Se acumula todo en un string y se devuelve (no toca el DOM). */
    async listadoPedidosCliente(nombreCliente) {
        let datos = new FormData();
        datos.append("cliente", nombreCliente); // llega a PHP en $_GET["cliente"]

        let respuesta = await peticionGET("get_pedidos_cliente.php", datos);

        let html = "<h3>PEDIDOS DE " + nombreCliente + "</h3>";

        if (!respuesta.ok) {
            return html + "<p>" + respuesta.mensaje + "</p>";
        }
        if (respuesta.datos.length == 0) {
            return html + "<p>No hay pedidos de este cliente</p>";
        }

        html += `<table class="table table-striped">
                    <thead>
                        <tr>
                            <th>IDPEDIDO</th>
                            <th>PLATO</th>
                            <th>UNIDADES</th>
                            <th>PRECIO</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>`;

        for (let fila of respuesta.datos) {
            // MySQL devuelve los números como string ("5.50"): se convierten
            let precio = Number(fila.precio);
            let unidades = Number(fila.unidades);
            let total = precio * unidades;

            html += `<tr>
                        <td>${fila.idpedido}</td>
                        <td>${fila.nombre}</td>
                        <td>${unidades}</td>
                        <td>${precio.toFixed(2)}</td>
                        <td>${total.toFixed(2)}</td>
                     </tr>`;
        }

        html += "</tbody></table>";
        return html;
    }
}
