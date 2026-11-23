<?php

require_once('config.php');

try {
    if (empty($_POST["libro"])) {
        throw new Exception("Datos de libro no proporcionados");
    }
    $libro = json_decode($_POST["libro"]);
    if ($libro === null) {
        throw new Exception("JSON inválido");
    }
    if (empty($libro->idgenero) || empty($libro->titulo) || empty($libro->autor)) {
        throw new Exception("Campos requeridos faltantes");
    }
    $conexion = obtenerConexion();
    $stmt = $conexion->prepare("INSERT INTO libro(idgenero, titulo, autor, descripcion, imagen) 
                               VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Error al preparar consulta");
    }
    $stmt->bind_param(
        "issss",
        $libro->idgenero,
        $libro->titulo,
        $libro->autor,
        $libro->descripcion,
        $libro->imagen
    );
    if (!$stmt->execute()) {
        throw new Exception("Error al guardar libro");
    }
    $stmt->close();
    responder(null, true, "Libro guardado en la base de datos", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos", $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, $e->getMessage(), $conexion ?? null);
}