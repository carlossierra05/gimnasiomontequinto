<?php
// Conectar a la base de datos
require_once('config.php');

$data = json_decode(file_get_contents("php://input"));

// Verificar que los datos sean válidos
if (isset($data->dni) && isset($data->id_plan) && isset($data->nombre) && isset($data->edad) && isset($data->fecha_nacimiento)) {
    $dni = $data->dni;
    $id_plan = $data->id_plan;
    $nombre = $data->nombre;
    $edad = $data->edad;
    $fecha_nacimiento = $data->fecha_nacimiento;

    // Realizar la consulta para actualizar el alumno
    $query = "UPDATE alumnos SET id_plan = ?, nombre = ?, edad = ?, fecha_nacimiento = ? WHERE dni = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id_plan, $nombre, $edad, $fecha_nacimiento, $dni]);

    // Verificar si la actualización fue exitosa
    if ($stmt->rowCount() > 0) {
        echo json_encode(["ok" => true, "mensaje" => "Alumno modificado correctamente"]);
    } else {
        echo json_encode(["ok" => false, "mensaje" => "No se pudo modificar el alumno"]);
    }
} else {
    echo json_encode(["ok" => false, "mensaje" => "Faltan datos para modificar el alumno"]);
}
?>
