import { where } from 'sequelize';
import db from '../models/index.js';
const { comentarioAlerta, puntoMapa } = db;

/**
 * Crea un nuevo comentario.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function crearComentarioAlerta(request, response) {
    try{
        const usuarioId = request.user.id;
        const alertaId = request.params.id;
        const body = request.body;

        const comentarioCreado = await comentarioAlerta.create({
            contenido: body.contenido,
            fecha_emision: body.fecha_emision,
            id_usuario: usuarioId,
            id_punto_mapa: alertaId,

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
async function obtenerComentariosAlerta(request, response) {
    try{
        const alertaId = request.params.id;

        const comentariosEncontrados = await comentarioAlerta.findAll({
            where: {
                id_punto_mapa: alertaId
            },
            include: {
                model: puntoMapa,
                as: 'puntoMapa',
                where: {
                    origen_punto: 'alerta'
                },
                attributes: [],
            },
            order: [['fecha_emision', 'ASC']]
        });
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
        const alertaId = request.params.idAlerta;
        const comentarioId = request.params.idComentario;

        const comentarioEncontrado = await comentarioAlerta.findOne({
            where: {
                id_comentario: comentarioId,
                id_punto_mapa: alertaId
            }
        });

        if (!comentarioEncontrado) {
            return response.status(404).json({message: 'Comentario no encontrado'});
        }

        await comentarioAlerta.destroy({where: { id_comentario: comentarioId, id_punto_mapa: alertaId }});
        return response.status(200).json({message: 'Comentario eliminado'});
    }catch(error){
        return response.status(500).json({error: "Error al eliminar comentario", detalle: error.message });
    }
}

export { crearComentarioAlerta, obtenerComentariosAlerta, eliminarComentarioAlerta };
