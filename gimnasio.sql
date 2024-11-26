-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS gimnasio DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE gimnasio;

-- Eliminar la tabla 'planes' si ya existe
DROP TABLE IF EXISTS planes;

-- Crear la tabla 'planes' con AUTO_INCREMENT
CREATE TABLE planes (
  id int(11) NOT NULL AUTO_INCREMENT,  -- La columna 'id' ahora es AUTO_INCREMENT
  plan varchar(50) NOT NULL,
  PRIMARY KEY (id)  -- Definir la clave primaria
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Insertar datos en la tabla 'planes', no es necesario especificar 'id' ya que es AUTO_INCREMENT
INSERT INTO planes (plan) VALUES
('basico'),
('premium'),
('vip');

-- Eliminar la tabla 'alumnos' si ya existe
DROP TABLE IF EXISTS alumnos;

-- Crear la tabla 'alumnos'
CREATE TABLE alumnos (
  dni varchar(9) NOT NULL,
  id_plan int(11) NOT NULL,
  nombre varchar(40) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  edad int(3) NOT NULL,
  fecha_nacimiento date NOT NULL,
  PRIMARY KEY (dni),  -- Definir la clave primaria en 'dni'
  KEY FK_PLANES (id_plan)  -- Crear índice para la clave foránea
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Insertar datos en la tabla 'alumnos'
INSERT INTO alumnos (dni, id_plan, nombre, edad, fecha_nacimiento) VALUES
('12344544B', 3, 'Angel', 7, '2017-04-10'),
('33334444B', 2, 'Carlos', 5, '2015-03-10'),
('76544444R', 1, 'Luis', 5, '2013-10-08'),
('98764444A', 2, 'Jose', 5, '2015-07-08');

-- Agregar la clave foránea entre 'alumnos' y 'planes'
ALTER TABLE alumnos
  ADD CONSTRAINT FK_PLANES FOREIGN KEY (id_plan) REFERENCES planes (id);

-- Eliminar la tabla 'clases' si ya existe
DROP TABLE IF EXISTS clases;

-- Crear la tabla 'clases'
CREATE TABLE clases (
  id_clase int(11) NOT NULL AUTO_INCREMENT,  -- La columna 'id_clase' es AUTO_INCREMENT
  nombre_clase varchar(50) NOT NULL,  -- Nombre de la clase
  PRIMARY KEY (id_clase)  -- Definir la clave primaria
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Insertar datos en la tabla 'clases'
INSERT INTO clases (nombre_clase) VALUES
('Yoga'),
('Pilates'),
('Crossfit'),
('Zumba');

-- Eliminar la tabla intermedia 'alumnos_clases' si ya existe
DROP TABLE IF EXISTS alumnos_clases;

-- Crear la tabla intermedia 'alumnos_clases' para la relación N:M
CREATE TABLE alumnos_clases (
  dni_alumno varchar(9) NOT NULL,  -- Clave foránea hacia 'alumnos'
  id_clase int(11) NOT NULL,       -- Clave foránea hacia 'clases'
  PRIMARY KEY (dni_alumno, id_clase),  -- Clave primaria compuesta
  FOREIGN KEY (dni_alumno) REFERENCES alumnos (dni) ON DELETE CASCADE, -- Relación con 'alumnos'
  FOREIGN KEY (id_clase) REFERENCES clases (id_clase) ON DELETE CASCADE -- Relación con 'clases'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Insertar datos en la tabla intermedia 'alumnos_clases'
INSERT INTO alumnos_clases (dni_alumno, id_clase) VALUES
('12344544B', 1), -- Angel está inscrito en Yoga
('33334444B', 2), -- Carlos está inscrito en Pilates
('76544444R', 3), -- Luis está inscrito en Crossfit
('98764444A', 4), -- Jose está inscrito en Zumba
('12344544B', 2), -- Angel también está inscrito en Pilates
('76544444R', 1); -- Luis también está inscrito en Yoga

-- Confirmar las transacciones
COMMIT;
