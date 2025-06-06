import db from '../models/index.js';
import bcrypt from 'bcryptjs';
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

        await usuarioCreado.setPermisos([]);
        
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
    try {
        const usuarioId = request.params.id;
        const updates = request.body;

        const usuarioExistente = await usuario.findByPk(usuarioId);
        if (!usuarioExistente) {
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (updates.rut && updates.rut !== usuarioExistente.rut) {
            const usuarioConRut = await usuario.findOne({ where: { rut: updates.rut } });
            if (usuarioConRut) {
                return response.status(400).json({ error: 'El RUT ya está registrado para otro usuario' });
            }
        }

        const updatedData = {};
        if (updates.nombre) updatedData.nombre = updates.nombre;
        if (updates.rut) updatedData.rut = updates.rut;
        if (updates.es_presidente !== undefined) updatedData.es_presidente = updates.es_presidente;
        if (updates.disponibilidad !== undefined) updatedData.disponibilidad = updates.disponibilidad;
        if (updates.direccion) updatedData.direccion = updates.direccion;

        if (updates.pin) {
            const salt = await bcrypt.genSalt(10);
            updatedData.pin = await bcrypt.hash(updates.pin, salt);
        }

        await usuarioExistente.update(updatedData);
        return response.status(200).json({ 
            message: 'Usuario actualizado correctamente', 
            usuario: usuarioExistente 
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return response.status(500).json({ 
            error: 'Error al actualizar usuario', 
            detalle: error.message 
        });
    }
}

/**
 * Actualiza la disponibilidad de un usuario.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function actualizarDisponibilidad(request, response) {
    try {
        const usuarioId = request.params.id;
        const { disponibilidad } = request.body;

        const usuarioExistente = await usuario.findByPk(usuarioId);
        if (!usuarioExistente) {
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }

        usuarioExistente.disponibilidad = disponibilidad;
        await usuarioExistente.save();
        
        return response.status(200).json({ message: 'Disponibilidad actualizada correctamente', usuario: usuarioExistente });
    } catch (error) {
        return response.status(500).json({ error: 'Error al actualizar disponibilidad', detalle: error.message });
    }

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

        const usuarioExistente = await usuario.findByPk(usuarioId); // Sequelize ya usa la PK definida (id_usuario)

        if (!usuarioExistente) {
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }
        await usuarioExistente.destroy(); // soft delete si paranoid está activo
        return response.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return response.status(500).json({ error: 'Error al eliminar usuario', detalle: error.message });
    }
}

export { registrarUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario };