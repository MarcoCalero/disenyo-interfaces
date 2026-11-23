<?php

$basedatos = array(
    "basedatos" => "libreria",
    "usuario" => "root",
    "password" => "test",
    "servidor" => "db",
    "puerto" => 3306
);

error_reporting(E_ALL);
ini_set('display_errors', 1);

//mysqli_report(MYSQLI_REPORT_OFF);

function obtenerConexion()
{
    global $basedatos;
    try {
        $conexion = new mysqli(
            $basedatos["servidor"],
            $basedatos["usuario"],
            $basedatos["password"],
            $basedatos["basedatos"],
            $basedatos["puerto"]
        );
        $conexion->set_charset("utf8mb4");
        return $conexion;
    } catch (mysqli_sql_exception $e) {
        responder(null, false, "Error de conexión: " . $e->getMessage(), null);
    }
}


function responder($datos, $ok, $mensaje, $conexion = null)
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        "ok" => $ok,
        "datos" => $datos,
        "mensaje" => $mensaje
    ], JSON_UNESCAPED_UNICODE);
    if ($conexion) {
        $conexion->close();
    }
    exit($ok ? 0 : 1);
}