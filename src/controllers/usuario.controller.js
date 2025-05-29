import db from '../models/index.js';
const { usuario } = db;


/**
 * Obtiene un usuario por su ID.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function obtenerUsuario(request, response) {
    try{
        const usuarioId = request.params.id;

        const usuarioEncontrado = await usuario.findByPk(usuarioId); //soft delete

        if(!usuarioEncontrado){
            return response.status(404).json({message: 'Usuario no encontrado '});
        }

        return response.status(200).json({usuarioEncontrado});
    } catch(error){
        return response.status(500).json({error});
    }
}

/**
 * Obtiene la lista de todos los usuarios.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function obtenerUsuarios(request, response) {
    try{
        const usuariosEncontrados = await usuario.findAll();
        return response.status(200).json({usuariosEncontrados});
    } catch(error){
        return response.status(500).json({error});
    }
}

/**
 * Actualiza un usuario por su ID.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function actualizarUsuario(request, response) {
    //lógica aún no implementada
}

/**
 * Actualiza la disponibilidad de un usuario.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function actualizarDisponibilidad(request, response) {
    //lógica aún no implementada
}

/**
 * Elimina un usuario por su ID (soft delete).
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP..
 * @returns {Promise<void>}
 */
async function eliminarUsuario(request, response) {
    try{
        const usuarioId = request.params.id;

        await usuario.destroy({ where: { id: usuarioId } });
        return response.status(200).json({message: 'Usuario eliminado'});
    }catch(error){
        return response.status(500).json({error});
    }
}

export { obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario };