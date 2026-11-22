<?php
/*
  config.php  -  Configuración común del backend (basado en el config.php
  del examen resuelto de la librería, Examen_11-2024_resuelto/php/config.php)

  Todos los scripts hacen:
      require_once('config.php');
      $conexion = obtenerConexion();
      ...
      responder($datos, true|false, "mensaje", $conexion);

  Respuesta JSON SIEMPRE con la forma { ok, mensaje, datos }.
*/

// Datos de conexión (Docker: el servidor es el nombre del servicio, "db").
// Usuario/contraseña = los del .env (con dbuser hace falta el GRANT sobre `bar`).
$basedatos = array(
    "basedatos" => "bar",
    "usuario"   => "root",
    "password"  => "test",
    "servidor"  => "db",
    "puerto"    => 3306
);

// Solo errores graves: un warning delante del JSON rompería el fetch
error_reporting(E_ERROR | E_PARSE);

// A diferencia de la librería (MYSQLI_REPORT_OFF), aquí mysqli LANZA excepciones:
// así los catch funcionan y el front recibe {ok:false, mensaje} en vez de un 500.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);


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
        "mensaje" => $mensaje,
        "datos" => $datos
    ], JSON_UNESCAPED_UNICODE);

    if ($conexion) {
        $conexion->close();
    }
    exit();
}
