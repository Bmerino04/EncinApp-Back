import db from '../models/index.js';
const { anuncio } = db;

/**
 * Crea un nuevo anuncio.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function crearAnuncio(request, response) {
    try{

        console.log('Request user:', request.user);
        const body = request.body;
        const usuarioId = request.user.id;

        const anuncioCreado = await anuncio.create({
            titulo: body.titulo,
            cuerpo: body.cuerpo,
            multimedia_url: body.multimedia_url,
            tipo_multimedia: body.tipo_multimedia,
            fecha_relacionada: body.fecha_relacionada,
            direccion: body.direccion,
            fecha_emision: body.fecha_emision,
            usuario_id: usuarioId,
        });
        return response.status(201).json({anuncioCreado});
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

        return response.status(200).json({anuncioEncontrado});
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
        return response.status(200).json({anunciosEncontrados});
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


