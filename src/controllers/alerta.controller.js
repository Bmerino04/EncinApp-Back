import db from '../models/index.js';
const { puntoMapa } = db;

async function crearAlerta(request, response) {
    try {
        const body = request.body;
        const usuarioId = request.user.id;

        const alertaCreada = await puntoMapa.create({
            origen_punto: 'alerta',
            tipo: body.tipo,
            fecha_emision: body.fecha_emision,
            latitud: body.latitud,
            longitud: body.longitud,
            usuario_id: usuarioId,
        });
        return response.status(201).json({ alertaCreada });
    } catch (error) {
        return response.status(500).json({ error: "Error al emitir alerta", detalle: error.message });  
    }
}

