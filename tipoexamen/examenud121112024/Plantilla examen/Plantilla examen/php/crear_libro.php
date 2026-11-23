<?php
require_once('config.php');
$libro = json_decode($_POST["libro"]);
try {
    $conexion = obtenerConexion();
    $sql = "INSERT INTO libro(idlibro, idgenero, titulo, autor, descripcion, imagen) VALUES (null, $libro->idgenero, '$libro->titulo', '$libro->autor', '$libro->descripcion', '$libro->imagen')";
    $resultado = $conexion->query($sql);
    responder(null, true, "Libro guardado en la base de datos", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
