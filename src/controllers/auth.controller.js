import db from '../models/index.js';
const { usuario } = db;
import 'bcrypt'
from
'bcryptjs';


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

}

async function cerrarSesion(request, response) {

}

export { registrarUsuario, iniciarSesion, cerrarSesion };