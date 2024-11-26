<?php
require_once('config.php');
$conexion = obtenerConexion();

// No hay datos de entrada

// SQL
$sql = "SELECT alumnos.dni, planes.plan, alumnos.nombre, alumnos.edad, alumnos.fecha_nacimiento 
        FROM alumnos
        JOIN planes ON alumnos.id_plan = planes.id
        WHERE alumnos.fecha_nacimiento 
        ORDER BY alumnos.fecha_nacimiento ASC";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);