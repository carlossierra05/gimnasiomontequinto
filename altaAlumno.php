<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos JSON
$alumno = json_decode($_POST['alumno']);

$sql = "INSERT INTO alumnos VALUES ('$alumno->dni',$alumno->id_plan,'$alumno->nombre',$alumno->edad,'$alumno->fecha_nacimiento');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha insertado el alumno", $conexion);
}
?>
