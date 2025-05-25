import db from '../models/index.js';
const { usuario } = db;

/**
 * Crea un nuevo usuario.
 *
 * @param {import('express').Request} request - Objeto de solicitud HTTP.
 * @param {import('express').Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function crearUsuario(request, response) {
    try{
        const body = request.body;

        const usuarioCreado = await usuario.create({
            nombre: body.nombre,
            rut: body.rut,
            pin: body.pin,
            es_presidente: body.es_presidente,
            disponibilidad: body.disponibilidad,
            direccion: body.direccion,
        });
        return response.status(201).json({usuarioCreado});
    } catch(error){
        return response.status(500).json({error});
    }
}

/**
 * Obtiene un usuario por su ID.
 *
 * @param {import('express').Request} request - Objeto de solicitud HTTP.
 * @param {import('express').Response} response - Objeto de respuesta HTTP.
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
 * @param {import('express').Request} request - Objeto de solicitud HTTP.
 * @param {import('express').Response} response - Objeto de respuesta HTTP.
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
 * @param {import('express').Request} request - Objeto de solicitud HTTP.
 * @param {import('express').Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function actualizarUsuario(request, response) {
    //lógica aún no implementada
}

/**
 * Actualiza la disponibilidad de un usuario.
 *
 * @param {import('express').Request} request - Objeto de solicitud HTTP.
 * @param {import('express').Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function actualizarDisponibilidad(request, response) {
    //lógica aún no implementada
}

/**
 * Elimina un usuario por su ID (soft delete).
 *
 * @param {import('express').Request} request - Objeto de solicitud HTTP.
 * @param {import('express').Response} response - Objeto de respuesta HTTP.
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

export { crearUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario };