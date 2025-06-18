import db from '../models/index.js';
const { anuncio } = db;
import { formatTime } from '../utils/formatTime.js';

/**
 * Crea un nuevo anuncio.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function crearAnuncio(request, response) {
    try{

        const body = request.body;
        const usuarioId = request.user.id;

        const anuncioCreado = await anuncio.create({
            titulo: body.titulo,
            cuerpo: body.cuerpo,
            multimedia_url: body.multimedia_url,
            tipo_multimedia: body.tipo_multimedia,
            fecha_relacionada: body.fecha_relacionada,
            direccion: body.direccion,
            id_usuario: usuarioId,
        });

        const anuncioFormateado = anuncioCreado.toJSON();
        anuncioFormateado.fecha_emision = formatTime(anuncioFormateado.fecha_emision)

        return response.status(201).json({anuncioCreado: anuncioFormateado});
    } catch(error){
        return response.status(500).json({error});
    }
}

/**
 * Obtiene un anuncio por su ID.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function obtenerAnuncio(request, response) {
    try{
        const anuncioId = request.params.id;

        const anuncioEncontrado = await anuncio.findByPk(anuncioId);

        if(!anuncioEncontrado){
            return response.status(404).json({message: 'Anuncio no encontrado'});
        }

        const anuncioFormateado = anuncioEncontrado.toJSON();
        anuncioFormateado.fecha_emision = formatTime(anuncioFormateado.fecha_emision)

        return response.status(200).json({anuncioEncontrado: anuncioFormateado});
    } catch(error){
        return response.status(500).json({error});
    }
}

/**
 * Obtiene la lista de todos los anuncios.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function obtenerAnuncios(request, response) {
    try{
        const anunciosEncontrados = await anuncio.findAll();

        const anunciosFormateados = anunciosEncontrados.map(anuncio => {
        const anuncioJson = anuncio.toJSON();
        anuncioJson.fecha_emision = formatTime(anuncioJson.fecha_emision);
        return anuncioJson;
        });
        
        return response.status(200).json({anunciosEncontrados: anunciosFormateados});
    } catch(error){
        return response.status(500).json({error});
    }
}

/**
 * Elimina un anuncio por su ID}.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function eliminarAnuncio(request, response) {
    try{
        const anuncioId = request.params.id;

        await anuncio.destroy({ where: { id_anuncio: anuncioId } });
        return response.status(200).json({message: 'Anuncio eliminado'});
    }catch(error){
        return response.status(500).json({error});
    }
}

export { crearAnuncio, obtenerAnuncio, obtenerAnuncios, eliminarAnuncio };


