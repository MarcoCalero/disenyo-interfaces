<?php
require_once('config.php');
try {
    $conexion = obtenerConexion();
    $cliente = $_GET["cliente"];
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
