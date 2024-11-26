<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recupero las fechas de inicio y fin desde el GET
$fechaInicio = $_GET['fechaInicio'];
$fechaFin = $_GET['fechaFin'];

// SQL para recuperar los turismos entre las fechas proporcionadas
$sql = "SELECT alumnos.dni, planes.plan, alumnos.nombre, alumnos.edad, alumnos.fecha_nacimiento 
        FROM alumnos
        JOIN planes ON alumnos.id_plan = planes.id
        WHERE alumnos.fecha_nacimiento BETWEEN '$fechaInicio' AND '$fechaFin'
        ORDER BY alumnos.fecha_nacimiento ASC";

$resultado = mysqli_query($conexion, $sql);

// Inicialización del array vacío
$datos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);
