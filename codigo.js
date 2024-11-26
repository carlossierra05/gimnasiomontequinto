"use strict";

var oGym = new GYM();

//PARTE GRUPAL

const frmAltaAlumno = document.getElementById("frmAltaAlumno");
const frmListadoParam = document.getElementById("frmListadoParam");
const frmBorrarAlumno = document.getElementById("frmBorrarAlumno");
const frmListadoAlumnos = document.getElementById("frmListadoAlumnos");
const frmBuscarAlumno = document.getElementById("frmBuscarAlumno");
const frmModificarAlumno = document.getElementById("frmModificarAlumno");

inicio();

function inicio() {
    document.querySelector("#mnuAltaAlumno").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoAlumnoParam").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBorrarAlumno").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoAlumnos").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarAlumno").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuModificarAlumno").addEventListener("click", mostrarFormulario);
    document.querySelector("#btnBuscarAlumnoModificar").addEventListener("click", buscarAlumnoModificar);


    frmAltaAlumno.btnAltaAlumno.addEventListener("click", altaAlumno);
    frmListadoParam.btnListadoParam.addEventListener("click", listadoParam);
    frmBorrarAlumno.btnBorrarAlumno.addEventListener("click", borrarAlumno);
    frmListadoAlumnos.btnListadoAlumnos.addEventListener("click", listadoAlumnos);
    frmBuscarAlumno.btnBuscarAlumno.addEventListener("click", buscarAlumno);
    frmModificarAlumno.btnModificarAlumno.addEventListener("click", modificarAlumno);
}

function mostrarFormulario(oEvento) {
    ocultarFormularios();

    switch (oEvento.target.id) {
        case "mnuAltaAlumno":
            frmAltaAlumno.classList.remove("d-none");
            cargarDesplegable()
            break;
        case "mnuListadoAlumnoParam":
            frmListadoParam.classList.remove("d-none");
            break;
        case "mnuBorrarAlumno":
            frmBorrarAlumno.classList.remove("d-none");
            break;
        case "mnuListadoAlumnos":
            frmListadoAlumnos.classList.remove("d-none");
            break;
        case "mnuBuscarAlumno":
            frmBuscarAlumno.classList.remove("d-none");
            break;
        case "mnuModificarAlumno":
             cargarPlanesModificar
            frmModificarAlumno.classList.remove("d-none");
            break;

    }
}


function ocultarFormularios() {
    frmAltaAlumno.classList.add("d-none");
    frmListadoParam.classList.add("d-none");
    frmBorrarAlumno.classList.add("d-none");
    frmListadoAlumnos.classList.add("d-none");
    frmBuscarAlumno.classList.add("d-none");
    frmModificarAlumno.classList.add("d-none");
}



//FUNCIONES DE CARLOS
async function altaAlumno() {
    let dni = frmAltaAlumno.dni.value.trim();
    let id_plan = frmAltaAlumno.lstPlanes.value;
    let nombre = frmAltaAlumno.nombre.value.trim();
    let edad = frmAltaAlumno.edad.value.trim();
    let fecha_nacimiento = frmAltaAlumno.fecha.value.trim();

    let alumno = new Alumno(dni, id_plan, nombre, edad, fecha_nacimiento);

    let respuesta = await oGym.altaAlumno(alumno);

    alert(respuesta.mensaje);

    if (respuesta.ok) {
        frmAltaAlumno.reset();
        ocultarFormularios();
    }
}

async function cargarDesplegable() {
    const respuesta = await oGym.getPlanes();

    if (respuesta.ok) {
        let optionsPlanes = "";
        for (let plan of respuesta.datos) {
            optionsPlanes += `<option value="${plan.id}">${plan.plan}</option>`;
        }

        frmAltaAlumno.lstPlanes.innerHTML = optionsPlanes;
    } else {
        alert("Error al recuperar las marcas");
    }
}

async function listadoParam() {
    let fechaInicio = frmListadoParam.txtFechaInicio.value.trim();
    let fechaFin = frmListadoParam.txtFechaFin.value.trim();

    const ventana = open("listado_alumnos.html");

    ventana.addEventListener("load", async () => {
        const listado = await oGym.listadoAlumno(fechaInicio, fechaFin);
        ventana.document.querySelector("#listado").innerHTML = listado;
    });
}

async function listadoAlumnos() {
    const ventana = open("listado_alumnos.html");

    ventana.addEventListener("load", async () => {
        const listado = await oGym.listarTodosAlumnos();
        ventana.document.querySelector("#listado").innerHTML = listado;
    });
}



async function borrarAlumno() {
    let dni = frmBorrarAlumno.txtDni.value.trim();

    if (!dni) {
        alert("Por favor, introduce un DNI válido.");
        return;
    }

    const respuesta = await oGym.borrarAlumno(dni);

    alert(respuesta.mensaje);

    if (respuesta.ok) {
        frmBorrarAlumno.reset();
    }
}

async function buscarAlumno() {
    // Obtener el DNI ingresado en el formulario
    let dni = frmBuscarAlumno.txtDni.value.trim();

    // Validar que el DNI no esté vacío
    if (!dni) {
        alert("Por favor, introduce un DNI válido.");
        return;
    }

    // Llamar al método `buscarAlumnoPorDni` de la clase GYM
    const respuesta = await oGym.buscarAlumnoPorDni(dni);

    if (respuesta.ok) {
        // Si se encuentra el alumno, mostrar los datos en un formato amigable
        const alumno = respuesta.datos;
        let detalles = `
            <h2>Alumno encontrado:</h2>
            <p><strong>DNI:</strong> ${alumno.dni}</p>
            <p><strong>Nombre:</strong> ${alumno.nombre}</p>
            <p><strong>Plan:</strong> ${alumno.plan}</p>
            <p><strong>Edad:</strong> ${alumno.edad}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${alumno.fecha_nacimiento}</p>
        `;
        frmBuscarAlumno.querySelector("#resultadoBusqueda").innerHTML = detalles;
    } else {
        // Si no se encuentra el alumno, mostrar el mensaje de error
        alert(respuesta.mensaje);
        frmBuscarAlumno.querySelector("#resultadoBusqueda").innerHTML = "";
    }
}

async function cargarPlanesModificar() {
    const respuesta = await oGym.getPlanes();

    if (respuesta.ok) {
        let optionsPlanes = "";
        for (let plan of respuesta.datos) {
            optionsPlanes += `<option value="${plan.id}">${plan.plan}</option>`;
        }

        frmModificarAlumno.lstPlanes.innerHTML = optionsPlanes;
    } else {
        alert("Error al cargar los planes.");
    }
}

async function buscarAlumnoModificar() {
    let dni = frmModificarAlumno.txtDni.value.trim();

    if (!dni) {
        alert("Por favor, introduce un DNI válido.");
        return;
    }

    // Cargar los planes antes de buscar el alumno
    await cargarPlanesModificar();

    const respuesta = await oGym.buscarAlumnoPorDni(dni);

    if (respuesta.ok) {
        const alumno = respuesta.datos;

        // Mostrar los datos del alumno en los campos del formulario
        frmModificarAlumno.txtNombre.value = alumno.nombre;
        frmModificarAlumno.lstPlanes.value = alumno.plan; // Seleccionar el plan del alumno
        frmModificarAlumno.txtEdad.value = alumno.edad;
        frmModificarAlumno.txtFechaNacimiento.value = alumno.fecha_nacimiento;

        // Mostrar la sección de datos del alumno
        document.getElementById("datosAlumnoModificar").classList.remove("d-none");
    } else {
        alert(respuesta.mensaje);
    }
}

async function modificarAlumno() {
    let dni = frmModificarAlumno.txtDni.value.trim();
    let nombre = frmModificarAlumno.txtNombre.value.trim();
    let id_plan = frmModificarAlumno.lstPlanes.value;
    let edad = frmModificarAlumno.txtEdad.value.trim();
    let fecha_nacimiento = frmModificarAlumno.txtFechaNacimiento.value.trim();

    // Validar que todos los campos estén llenos
    if (!dni || !nombre || !id_plan || !edad || !fecha_nacimiento) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear un objeto alumno con los datos modificados
    let alumnoModificado = new Alumno(dni, id_plan, nombre, edad, fecha_nacimiento);

    // Enviar la solicitud al servidor para modificar el alumno
    const respuesta = await oGym.modificarAlumno(alumnoModificado);

    if (respuesta.ok) {
        alert("Alumno modificado correctamente.");
        frmModificarAlumno.reset();
        ocultarFormularios(); // Ocultar el formulario después de la modificación
    } else {
        alert("Error al modificar el alumno: " + respuesta.mensaje);
    }
}





//FUNCIONES DE ALMUDENA

//FUNCIONES DE SERGIO