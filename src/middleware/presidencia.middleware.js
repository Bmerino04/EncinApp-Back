import db from '../models/index.js';
const { usuario } = db;

export default function verificarPresidencia() {
    return async (request, response, next) => {
        try{
            const usuarioId = request.user.id;

            const usuarioEncontrado =  await  usuario.findByPk(usuarioId)

            if (!usuarioEncontrado) {
                return response.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (usuarioEncontrado.es_presidente) {
                next();
            } else {
                return response.status(403).json({ message: 'No tienes permisos de presidencia' });
            }     

        } catch (error) {
            return response.status(500).json({ error: 'Error al verificar la presidencia', detalle: error.message });
        }   
    }
}