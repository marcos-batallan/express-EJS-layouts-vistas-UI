// Se importa la capa de servicios y se le delega a ella la lógica
import { obtenerSuperheroePorId, 
        obtenerTodosLosSuperheroes,
        buscarSuperheroePorAtributo,
        obtenerSuperheroesMayoresDe30,
        crearSuperheroe,
        actualizarSuperheroe,
        actualizarParcialSuperheroe,
        eliminarSuperheroePorNombre,
        eliminarSuperheroePorId } from "../services/superheroesService.mjs";

// Se importa la capa de vista para dar formato a las respuestas
import { renderizarSuperheroe, renderizarListaSuperheroes } from "../views/responseView.mjs";

// Se importa la función para renderizar vistas de feedback con mensajes personalizados
import { renderFeedback } from "../utils/feedbackHelper.mjs";


// Función obtener Superhéroe por Id - CONTROLLER API
export async function obtenerSuperheroePorIdController (req, res) {
    try {
        const { id } = req.params; // Leer el parámetro de ruta => GET /heroes/:id
        const superheroe = await obtenerSuperheroePorId(id); // Llama a la fn del service
        
        if (!superheroe) { // Se valida la existencia del parámetro
            return res.status(404).json({
                mensaje: "Superhéroe no encontrado" //error 404 (no encontrado) si no existe
            });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe); // Se da formato a la respuesta

        res.status(200).json(superheroeFormateado); // Se envía la respuesta

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el Superhéroe",
            error: error.message //error 500 error del servidor
        });
    }
}


// Función obtener todos los Superhéroes existentes en la DB - CONTROLLER API
export async function obtenerTodosLosSuperheroesAPIController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes(); // Llama a la fn del service
        const superheroesFormateados = renderizarListaSuperheroes(superheroes); // Se da formato a la respuesta
        
        res.status(200).json(superheroesFormateados); // Devuelve respuesta en JSON
    } catch (error) { // Mensaje de error del servidor
        res.status(500).json({
            mensaje: "Error al obtener los Superhéroes",
            error: error.message //error 500 error del servidor
        });
    }
}

// Función para mostrar todos los Superhéroes de la DB - CONTROLLER EJS
export async function obtenerSuperheroesDashboardController (req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes(); // Llama a la fn del service
        
        res.render("dashboard", {
            superheroes,
            esLanding: false 
        }); // Renderiza la vista y pasa los datos

    } catch (error) { // Mensaje de error del servidor
        return renderFeedback(res, {
            tipo: 'error',
            mensaje: 'Error al cargar el dashboard de superhéroes',
            redirect: '/',
            textoBoton: 'Ir al inicio',
            autoRedirect: false,
            status: 500
        });
    }
}


// Función buscar Superhéroes por atributo dinámico - CONTROLLER API
export async function buscarSuperheroePorAtributoController (req, res) {
    try {
        const { atributo, valor } = req.params; // Leer parámetros dinámicos => GET heroes/buscar/planetaOrigen/Tierra
        const superheroes = await buscarSuperheroePorAtributo (atributo, valor); // Llama a la fn del service
        if (superheroes.length === 0) { // Se validan los datos
            return res.status(404).json({
                mensaje: "No se encontraron Superhéroes con ese atributo"
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes); // Se da formato a la respuesta
        res.status(200).json(superheroesFormateados); // Devuelve respuesta en JSON
    } catch (error) { // Mensaje de error del servidor
        res.status(500).json({
            mensaje: "Error al buscar los Superhéroes",
            error: error.message
        });
    }
}


// Función obtener Superhéroes con más de 30 años - CONTROLLER API
export async function obtenerSuperheroesMayoresDe30Controller (req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30 (); // Llama a la fn del service

        if (superheroes.length === 0) { // Se validan los datos
            return res.status(404).json({
                mensaje: "No se encontraron Superhéroes mayores de 30 años"
            }); //404 si no existe
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes); // Se da formato a la respuesta

        res.status(200).json(superheroesFormateados); // Devuelve respuesta en JSON
        
    } catch (error) { // Mensaje de error del servidor
        res.status(500).json({
            mensaje: "Error al obtener Superhéroes mayores de 30 años",
            error: error.message
        });
    }
}


// Función para crear nuevo Superhéroe en la colección - CONTROLLER API
export async function crearSuperheroeController (req, res) {
    try {
        const datos = req.body; // Recibe los datos JSON
        const nuevoHeroe = await crearSuperheroe (datos); // Llama a la fn del service

        res.status(201).json(nuevoHeroe); // Devuelve la respuesta - creación correcta

    } catch (error) {
        res.status(400).json({ 
            mensaje: "Error de validación", 
            error: error.message
        });
    }
}


// Función para agregar un nuevo Superhéroe - VISTA EJS
export async function agregarSuperheroeControllerEJS(req, res) {
    try {
        const datos = req.body;

        await crearSuperheroe(datos);

        return renderFeedback(res, {
            tipo: 'success',
            mensaje: 'Héroe creado correctamente',
            redirect: '/heroes',
            textoBoton: 'Volver a la lista',
            autoRedirect: true
        });

    } catch (error) {
        return renderFeedback(res, {
            tipo: 'error',
            mensaje: 'No se pudo crear el héroe',
            redirect: '/heroes',
            textoBoton: 'Intentar nuevamente',
            autoRedirect: false,
            status: 500
        });
    }
}


// Función para actualización completa de algún Superhéroe de la colección - CONTROLLER API
export async function actualizarSuperheroeController (req, res) {
    try {
        const { id } = req.params; // Requiere el atributo Id para buscar el Superhéroe a actualizar 
        const datos = req.body; // Recibe los datos JSON

        const heroeActualizado = await actualizarSuperheroe (id, datos); // Llama a la fn del service

        if (!heroeActualizado) {
            return res.status(404).json({
                mensaje: "Superhéroe no encontrado"
            });
        }
        res.status(200).json(heroeActualizado);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error de validación",
            error: error.message
        });
    }
}


// Función para editar datos de un Superhéroe en el formulario - EJS
export async function editarSuperheroeControllerEJS(req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;

        const actualizado = await actualizarSuperheroe(id, datos);
        if (!actualizado) {
            return renderFeedback(res, {
                tipo: 'error',
                mensaje: 'Superhéroe no encontrado',
                redirect: '/heroes',
                textoBoton: 'Volver a la lista',
                autoRedirect: false,
                status: 404
            });
}
        return renderFeedback(res, {
            tipo: 'success',
            mensaje: 'Héroe actualizado correctamente',
            redirect: '/heroes',
            textoBoton: 'Volver a la lista',
            autoRedirect: true
        });

    } catch (error) {
        return renderFeedback(res, {
            tipo: 'error',
            mensaje: 'Ocurrió un error al actualizar el superhéroe',
            redirect: '/heroes',
            textoBoton: 'Intentar nuevamente',
            autoRedirect: false,
            status: 500
        });
    }
}


// Función para cargar el formulario de edición con los datos actuales del Superhéroe - EJS
export async function obtenerSuperheroeParaEditarController(req, res) {
    try {
        const { id } = req.params;

        const superhero = await obtenerSuperheroePorId(id);

        if (!superhero) {
            return renderFeedback(res, {
                tipo: 'error',
                mensaje: 'No se pudo encontrar el Superhéroe',
                redirect: '/heroes',
                textoBoton: 'Volver a la lista',
                autoRedirect: false,
                status: 404
            });
        }

        res.render("editSuperhero", {
            superhero,
            errores: [],
            datos: {}
        });

    } catch (error) {
        return renderFeedback(res, {
            tipo: 'error',
            mensaje: 'Error al cargar el formulario de edición',
            redirect: '/heroes',
            textoBoton: 'Volver a la lista',
            autoRedirect: false,
            status: 500
        });
    }
}

// Función para actualizar algún Superhéroe de manera parcial - CONTROLLER API
export async function actualizarParcialSuperheroeController (req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;

        const heroeActualizadoParcial = await actualizarParcialSuperheroe (id, datos);

        if (!heroeActualizadoParcial) {
            return res.status(404).json({
                mensaje: "Superhéroe no encontrado"
            });
        }
        res.status(200).json(heroeActualizadoParcial);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error de validación",
            error: error.message
        });
    }
}


// Función para eliminar Superhéroe por atributo "nombreSuperHeroe" - CONTROLLER API
export async function eliminarSuperheroePorNombreController (req, res) {
    try {
        const { nombre } = req.params;

        const eliminado = await eliminarSuperheroePorNombre (nombre);

        if (!eliminado) {
            return res.status(404).json({
                mensaje: "Superhéroe no encontrado"
            });
        }
        res.status(200).json({
            mensaje: "Superhéroe eliminado correctamente",
            eliminado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar Superhéroe",
            error: error.message
        });
    }
}


// Función para eliminar Superhéroe por atributo "Id" - CONTROLLER API
export async function eliminarSuperheroeporIdController (req, res) {
    try {
        const { id } = req.params;
        
        const heroeEliminado = await eliminarSuperheroePorId (id);

        if (!heroeEliminado) {
            return res.status(404).json({
                mensaje: "Superhéroe no encontrado"
            });
        }
        res.status(200).json({
            mensaje: "Superhéroe eliminado",
            heroeEliminado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar Superhéroe",
            error: error.message
        });
    }
}

// Función para eliminar Superhéroe - Vista EJS
export async function eliminarSuperheroeControllerEJS(req, res) {
    try {
        const { id } = req.params;

        const eliminado = await eliminarSuperheroePorId(id);

        if (!eliminado) {
            return renderFeedback(res, {
                tipo: 'error',
                mensaje: 'Superhéroe no encontrado',
                redirect: '/heroes',
                textoBoton: 'Volver a la lista',
                autoRedirect: false,
                status: 404
            });
        }

        return renderFeedback(res, {
            tipo: 'success',
            mensaje: 'Héroe eliminado correctamente',
            redirect: '/heroes',
            textoBoton: 'Volver a la lista',
            autoRedirect: true
        });

    } catch (error) {
        return renderFeedback(res, {
            tipo: 'error',
            mensaje: 'No se pudo eliminar el héroe',
            redirect: '/heroes',
            textoBoton: 'Intentar nuevamente',
            autoRedirect: false,
            status: 500
        });
    }
}


// Función para recibir datos de "Contacto", procesamiento, validación y respuesta 
export function enviarContactoController(req, res) {
    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if (!nombre) errores.push({ msg: "El nombre es obligatorio" });
    if (!email) errores.push({ msg: "El email es obligatorio" });
    if (!mensaje) errores.push({ msg: "El mensaje es obligatorio" });

    if (errores.length > 0) {
        return res.render("contact", {
            errores,
            datos: req.body,
            mensaje: null,
            esLanding: false
        });
    }
    
    return renderFeedback(res, {
        tipo: 'success',
        mensaje: 'Mensaje enviado correctamente',
        redirect: '/',
        textoBoton: 'Volver al inicio',
        autoRedirect: true
    });
}



/*****
Este archivo es el intermediario entre el HTTP y la lógica interna.
Cumple la función de leer datos del request, llamar a la lógica de negocio en Services, 
manejar errores y devolver la respuesta HTTP al cliente.
*****/