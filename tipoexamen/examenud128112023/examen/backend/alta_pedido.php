<?php
require_once('config.php');

try {
    $conexion = obtenerConexion();

    // Lo que envía Bar.altaPedido(): datos.append("pedido", JSON.stringify(oPedido))
    $pedido = json_decode($_POST["pedido"]);

    // idpedido NO se inserta: es AUTO_INCREMENT
    $sql = "INSERT INTO pedidos (cliente, idplato, unidades) VALUES (?, ?, ?);";
    $stmt = $conexion->prepare($sql);

    // s = string, i = entero  (una letra por cada ?, en orden)
    $cliente = $pedido->cliente;
    $idplato = $pedido->idplato;
    $unidades = $pedido->unidades;
    $stmt->bind_param("sii", $cliente, $idplato, $unidades);
    $stmt->execute();

    responder(null, true, "Pedido dado de alta correctamente (nº " . $conexion->insert_id . ")", $conexion);
} catch (Exception $e) {
    responder(null, false, "Error al dar de alta el pedido: " . $e->getMessage(), $conexion ?? null);
}
