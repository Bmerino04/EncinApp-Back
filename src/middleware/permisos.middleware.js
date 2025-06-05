import db from '../models/index.js';
const { usuario, permiso } = db;

export default function verificarPermiso(nombrePermisoRequerido) {
    return async (request, response, next) => {
        try {
            const usuarioId = request.user.id; // Asumiendo que el ID del usuario está en request.user.id

            const usuarioEncontrado = await usuario.findByPk(usuarioId, {
                include: {
                    model: permiso,
                    attributes: ['nombre'],
                    through: {
                        attributes: [] 
                    }
                }
            });

            if (!usuarioEncontrado) {
                return response.status(404).json({ message: 'Usuario no encontrado' });
            }

            const permisosUsuario = usuarioEncontrado.permisos.map(p => p.nombre === nombrePermisoRequerido);

            if (!permisosUsuario) {
                return response.status(403).json({ message: 'Permiso denegado' });
            }

            next();
        } catch (error) {
            return response.status(500).json({ error: 'Error al verificar permisos' });
        }
    }
}