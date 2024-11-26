"use strict";

class Alumno {
  //CLASE DE CARLOS

  #dni;
  #id_plan;
  #nombre;
  #edad;
  #fecha_nacimiento;

  constructor(dni, id_plan, nombre, edad, fecha_nacimiento) {
    this.#dni = dni;
    this.#id_plan = id_plan;
    this.#nombre = nombre;
    this.#edad = edad;
    this.#fecha_nacimiento = fecha_nacimiento;
  }

  //Getters
  get dni() {
    return this.#dni;
  }

  get id_plan() {
    return this.#id_plan;
  }

  get nombre() {
    return this.#nombre;
  }

  get edad() {
    return this.#edad;
  }

  get fecha_nacimiento() {
    return this.#fecha_nacimiento;
  }

  //Setters
  set dni(value) {
    this.#dni = value;
  }

  set id_plan(value) {
    this.#id_plan = value;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  set edad(value) {
    this.#edad = value;
  }

  set fecha_nacimiento(value) {
    this.#fecha_nacimiento = value;
  }

  toJSON() {
    return {
      dni: this.#dni,
      id_plan: this.#id_plan,
      nombre: this.#nombre,
      edad: this.#edad,
      fecha_nacimiento: this.#fecha_nacimiento,
    };
  }
}

class Plan {
  //CLASE DE CARLOS

  #id;
  #plan;

  constructor(id, plan) {
    this.#id = id;
    this.#plan = plan;
  }

  //Getters
  get id() {
    return this.#id;
  }

  get plan() {
    return this.#plan;
  }

  //Setters
  set id(value) {
    this.#id = value;
  }

  set plan(value) {
    this.#plan = value;
  }

  toJSON() {
    return {
      id: this.#id,
      plan: this.#plan,
    };
  }
}

class GYM {
  //FUNCIONES DE CARLOS

  async altaAlumno(oAlumno) {
    let datos = new FormData();
    datos.append("alumno", JSON.stringify(oAlumno));
    console.log("Datos:", datos);

    let respuesta = await peticionPOST("altaAlumno.php", datos);

    return respuesta;
  }

  async getPlanes() {
    let datos = new FormData();

    let respuesta = await peticionGET("getPlanes.php", datos);

    return respuesta;
  }

  async listadoAlumno(fechaIni, fechaFin) {
    let datos = new FormData();

    datos.append("fechaInicio", fechaIni);
    datos.append("fechaFin", fechaFin);

    const respuesta = await peticionGET("getAlumnosFecha.php", datos);

    if (respuesta.ok) {
      let listado = `<h1>Listado de alumnos nacidos entre ${fechaIni} y ${fechaFin}</h1>`;

      listado += "<table class='table'>";
      listado +=
        "<thead><tr><th>DNI</th><th>PLAN</th><th>NOMBRE</th><th>EDAD</th><th>FECHA NACIMIENTO</th></thead><tbody>";

      for (let alumno of respuesta.datos) {
        listado += `<tr><td>${alumno.dni}</td>`;
        listado += `<td>${alumno.plan}</td>`;
        listado += `<td>${alumno.nombre}</td>`;
        listado += `<td>${alumno.edad}</td>`;
        listado += `<td>${alumno.fecha_nacimiento}</td></tr>`;
      }
      listado += "</tbody></table>";

      return listado;
    } else {
      return "<h1>Error al recuperar los datos</h1>";
    }
  }

  //FUNCION LISTAR TODOS LOS ALUMNOS

  async listarTodosAlumnos() {
    let datos = new FormData();

    // Enviar la petición para obtener todos los alumnos
    const respuesta = await peticionGET("getTodosAlumnos.php", datos);

    if (respuesta.ok) {
      let listado = "<h1>Listado de todos los alumnos</h1>";

      listado += "<table class='table'>";
      listado +=
        "<thead><tr><th>DNI</th><th>PLAN</th><th>NOMBRE</th><th>EDAD</th><th>FECHA NACIMIENTO</th></thead><tbody>";

      for (let alumno of respuesta.datos) {
        listado += `<tr><td>${alumno.dni}</td>`;
        listado += `<td>${alumno.plan}</td>`;
        listado += `<td>${alumno.nombre}</td>`;
        listado += `<td>${alumno.edad}</td>`;
        listado += `<td>${alumno.fecha_nacimiento}</td></tr>`;
      }
      listado += "</tbody></table>";

      return listado;
    } else {
      return "<h1>Error al recuperar los datos</h1>";
    }
  }

  //FUNCION DE BORRAR ALUMNO
  async borrarAlumno(dni) {
    let datos = new FormData();
    datos.append("dni", dni); // Agregamos el DNI al cuerpo de la petición

    // Enviar la petición POST al servidor para borrar el alumno
    const respuesta = await peticionPOST("borrarAlumno.php", datos);

    // Procesar la respuesta
    if (respuesta.ok) {
      return { ok: true, mensaje: "Alumno borrado correctamente" };
    } else {
      return {
        ok: false,
        mensaje: "Error al borrar el alumno: " + respuesta.error,
      };
    }
  }

  // FUNCION BUSCAR ALUMNO POR DNI
  async buscarAlumnoPorDni(dni) {
    let datos = new FormData();
    datos.append("dni", dni); // Agregamos el DNI al cuerpo de la petición

    // Enviar la petición GET al servidor para buscar el alumno
    const respuesta = await peticionGET("buscarAlumno.php", datos);

    // Procesar la respuesta
    if (respuesta.ok) {
      return { ok: true, datos: respuesta.datos, mensaje: "Alumno encontrado" };
    } else {
      return {
        ok: false,
        mensaje: "No se encontró un alumno con el DNI proporcionado",
      };
    }
  }

  // FUNCION MODIFICAR ALUMNO
  async modificarAlumno(oAlumno) {
    let datos = new FormData();
    datos.append("alumno", JSON.stringify(oAlumno));

    let respuesta = await peticionPOST("modificarAlumno.php", datos);

    return respuesta;
}


  //FUNCIONES DE ALMUDENA

  //FUNCIONES DE SERGIO
}
