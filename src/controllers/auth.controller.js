import db from '../models/index.js';
const { usuario } = db;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        const token = jwt.sign({ id_usuario: usuarioEncontrado.id_usuario, rut: usuarioEncontrado.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.status(200).json({token, usuarioEncontrado  });
    } catch(error){
        return response.status(500).json({error});
    }
}