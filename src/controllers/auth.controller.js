import db from '../models/index.js';
const { usuario } = db;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * @module controllers/authController
 */

/**
 * Inicia sesión de un usuario autenticando su RUT y PIN.
 * 
 * @param {Request} request - Objeto de solicitud HTTP con los campos `rut` y `pin` en el cuerpo.
 * @param {Response} response - Objeto de respuesta HTTP que retorna un token JWT y los datos del usuario si la autenticación es exitosa.
 * @returns {Promise<void>}
 */
export default async function iniciarSesion(request, response) {
    try{
        const {rut, pin} = request.body;

        const usuarioEncontrado = await usuario.findOne({ where: { rut } });
        if (!usuarioEncontrado) {
            return response.status(404).json({error: 'Usuario no encontrado. Intente de nuevo.'});
        }

        const pinValido = await bcrypt.compare(pin, usuarioEncontrado.pin);
        if (!pinValido) {
            return response.status(401).json({error: 'Pin incorrecto. Intente de nuevo.'});
        }

        const token = jwt.sign({ id: usuarioEncontrado.id_usuario, rut: usuarioEncontrado.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.status(200).json({token, usuarioEncontrado  });
    } catch(error){
        return response.status(500).json({error: 'Error al iniciar sesión', detalle: error.message});
    }
}