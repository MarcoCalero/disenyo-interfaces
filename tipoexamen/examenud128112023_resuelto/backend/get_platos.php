<?php
// GET get_platos.php  ->  { ok, mensaje, datos: [ {idplato, nombre, descripcion, precio}, ... ] }
require_once('config.php');

try {
    $conexion = obtenerConexion();

    $resultado = $conexion->query("SELECT * FROM platos ORDER BY idplato;");

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }

    responder($datos, true, "Datos recuperados correctamente", $conexion);
} catch (Exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
}
