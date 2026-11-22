<?php

include_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();

    $idpedido = trim($_POST['idpedido']);
    $cliente = trim($_POST['cliente']);
    $idplato = trim($_POST['idplato']);
    $unidades = trim($_POST['unidades']);

    // Prepared statement para insertar de forma segura
    $sql = "INSERT INTO `pedidos` (`cliente`, `idplato`, `unidades`) VALUES (?, ?, ?);";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }

    // Bind y ejecución ('s' -> string)
    $stmt->bind_param('sii', $cliente, $idplato, $cantidad);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar INSERT: ' . $stmt->error);
    }

    // Éxito
    responder(null, true, 'Se ha insertado el libro', $conexion);
} catch (mysqli_sql_exception $e) {
    // Responder con información controlada sobre el error de BBDD
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}