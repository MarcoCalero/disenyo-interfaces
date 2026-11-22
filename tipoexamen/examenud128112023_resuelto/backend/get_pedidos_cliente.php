<?php
// GET get_pedidos_cliente.php?cliente=Paco
//   ->  { ok, mensaje, datos: [ {idpedido, nombre, unidades, precio}, ... ] }  ordenado por idpedido
require_once('config.php');

try {
    $conexion = obtenerConexion();

    $cliente = $_GET["cliente"];

    // JOIN para traer el nombre y el precio del plato de cada pedido
    $sql = "SELECT p.idpedido, pl.nombre, p.unidades, pl.precio
            FROM pedidos p
            JOIN platos pl ON p.idplato = pl.idplato
            WHERE p.cliente = ?
            ORDER BY p.idpedido ASC;";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $cliente);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }

    responder($datos, true, "Datos recuperados correctamente", $conexion);
} catch (Exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
}
