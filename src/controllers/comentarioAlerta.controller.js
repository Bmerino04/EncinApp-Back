import db from '../models/index.js';
const { comentarioAlerta } = db;

/**
 * Crea un nuevo comentario.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function crearComentarioAlerta(request, response) {
    try{
        const body = request.body;

        const comentarioCreado = await comentarioAlerta.create({
            contenido: body.contenido,
            fecha_emision: body.fecha_emision,
        });
        return response.status(201).json({comentarioCreado});
    } catch(error){
        return response.status(500).json({error: "Error al crear comentario", detalle: error.message });
    }
}

/**
 * Obtiene la lista de todos los comentarios.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function obtenerComentariosAlertas(request, response) {
    try{
        const comentariosEncontrados = await comentarioAlerta.findAll();
        return response.status(200).json({comentariosEncontrados});
    } catch(error){
        return response.status(500).json({error: "Error al obtener comentarios", detalle: error.message });
    }
}

/**
 * Elimina un comentario por su ID.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function eliminarComentarioAlerta(request, response) {
    try{
        const comentarioId = request.params.id;

        await comentarioAlerta.destroy({ where: { id: comentarioId } });
        return response.status(200).json({message: 'Comentario eliminado'});
    }catch(error){
        return response.status(500).json({error: "Error al eliminar comentario", detalle: error.message });
    }
}

export { crearComentarioAlerta, obtenerComentariosAlertas, eliminarComentarioAlerta };
