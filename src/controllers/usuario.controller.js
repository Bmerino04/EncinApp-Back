const { usuario } = require('../models');

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

async function obtenerUsuarios(request, response) {
    try{
        const usuariosEncontrados = await usuario.findAll();
        return response.status(200).json({usuariosEncontrados});
    } catch(error){
        return response.status(500).json({error});
    }
}

async function actualizarUsuario(request, response) {

}

async function actualizarDisponibilidad(request, response) {}

async function eliminarUsuario(request, response) {
    try{
        const usuarioId = request.params.id;

        await usuario.destroy({ _id: usuarioId});
        return response.status(200).json({message: 'Usuario eliminado'});
    }catch(error){
        return response.status(500).json({error});
    }
}

export { crearUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario };