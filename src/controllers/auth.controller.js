import db from '../models/index.js';
const { usuario } = db;
import 'bcrypt'
from
'bcryptjs';
import jwt from 'jsonwebtoken';


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
        return response.status(500).json({error});
    }
}

async function iniciarSesion(request, response) {
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

        const token = jwt.sign({ id: usuarioEncontrado.id, rut: usuarioEncontrado.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.status(200).json({token, usuarioEncontrado});
    } catch(error){
        return response.status(500).json({error});
    }

}

async function cerrarSesion(request, response) {

}

export { registrarUsuario, iniciarSesion, cerrarSesion };