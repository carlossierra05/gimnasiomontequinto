<?php
require_once('config.php');
$conexion = obtenerConexion();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dni = $_POST['dni'] ?? null;

    if ($dni) {
        $sql = "DELETE FROM alumnos WHERE dni = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param('s', $dni);

        if ($stmt->execute()) {
            responder(null, true, "Alumno eliminado correctamente", $conexion);
        } else {
            responder(null, false, "Error al eliminar el alumno: " . $stmt->error, $conexion);
        }
    } else {
        responder(null, false, "Faltan datos necesarios (DNI)", $conexion);
    }
} else {
    responder(null, false, "Método no permitido", $conexion);
}
?>
