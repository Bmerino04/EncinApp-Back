import { raw } from 'mysql2';
import db from '../models/index.js';
const { puntoMapa } = db;

async function crearPuntoInteres(request, response) {
    try {
        const body = request.body;
        const usuarioId = request.user.id;

        const puntoInteresCreado = await puntoMapa.create({
            origen_punto: 'punto_interes',
            tipo: body.tipo,
            nombre: body.nombre,
            latitud: body.latitud,
            longitud: body.longitud,
            contacto: body.contacto,
        });

        return response.status(201).json({ puntoInteresCreado });
    } catch (error) {
        return response.status(500).json({ error: "Error al crear punto de interés", detalle: error.message });
    }
}

export { crearPuntoInteres, obtenerPuntoInteres, obtenerPuntosInteres, eliminarPuntoInteres};
