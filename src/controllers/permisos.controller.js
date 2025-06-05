import db from "../models/index.js";
const { usuario, permiso } = db;


async function obtenerPermisosUsuario(request, response) {
    try {
        const usuarioId = request.params.id;

        const usuarioEncontrado = await usuario.findByPk(usuarioId, {
            include: {
                model: permiso,
                attributes: ['id_permiso', 'nombre'],
                through: {
                    attributes: [] // Excluye los atributos de la tabla intermedia
                }
            }
        });

        if (!usuarioEncontrado) {
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }

        return response.status(200).json({ permisos: usuarioEncontrado.permisos });
    } catch (error) {
        return response.status(500).json({ error: 'Error al obtener los permisos del usuario' });
    }
}  

export { obtenerPermisosUsuario, actualizarPermisosUsuario };