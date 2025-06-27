import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware para verificar un token JWT y autorizar al usuario.
 *
 * @param {Request} request - Objeto de solicitud HTTP con el token en el encabezado `Authorization`.
 * @param {Response} response - Objeto de respuesta HTTP usado para devolver errores de autenticación.
 * @param {NextFunction} next - Función para pasar al siguiente middleware si el token es válido.
 * @returns {Promise<void>}
 */
export default async function verificarToken (request, response, next) {
    const token = request.headers['authorization'];
    if (!token) {
        return response.status(401).json({ message: 'No se ha enviado el token'});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        request.user = {
            id: data.id,
            ...data
        };
        next();
    } catch(error) {
        return response.status(401).json({ message: 'Token inválido o expirado' });
    }
}