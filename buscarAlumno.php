<?php
require_once('config.php');
$conexion = obtenerConexion();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $dni = $_GET['dni'] ?? null;

    if ($dni) {
        $sql = "SELECT * FROM alumnos WHERE dni = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param('s', $dni);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($alumno = $resultado->fetch_assoc()) {
            responder($alumno, true, "Alumno encontrado", $conexion);
        } else {
            responder(null, false, "No se encontró un alumno con ese DNI", $conexion);
        }
    } else {
        responder(null, false, "Faltan datos necesarios (DNI)", $conexion);
    }
} else {
    responder(null, false, "Método no permitido", $conexion);
}
?>
