import db from '../models/index.js';
const { usuario } = db;

/**
 * Crea un nuevo usuario.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */

async function registrarUsuario(request, response) {
    try{
        const body = request.body;

        const user = await usuario.findOne({ where: { rut: body.rut } });

        if (user) {
            return response.status(400).json({error: 'Rut ya registrado'});
        }

        const salt = await bcrypt.genSalt(10)
        const pinEncriptado = await bcrypt.hash(body.pin, salt);

        const usuarioCreado = await usuario.create({
            nombre: body.nombre,
            rut: body.rut,
            pin: pinEncriptado,
            es_presidente: body.es_presidente,
            disponibilidad: body.disponibilidad,
            direccion: body.direccion,
        });
        return response.status(201).json({usuarioCreado});
    } catch(error){
        console.error('Error al registrar usuario:', error);
        return response.status(500).json({error: 'peoooo', detalle: error.message});
    }
}

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

export { registrarUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario };