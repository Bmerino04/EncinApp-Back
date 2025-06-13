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

async function obtenerAlerta(request, response) {
    try {
        const alertaId = request.params.id;

        const alertaEncontrada = await puntoMapa.findByPk(alertaId);

        if (!alertaEncontrada) {
            return response.status(404).json({ message: 'Alerta no encontrada' });
        }

        return response.status(200).json({ alertaEncontrada });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alerta", detalle: error.message });
    }
}


async function obtenerAlertasActivas(request, response) {
    try {
        const alertasActivas = await puntoMapa.findAll({
            where: { origen_punto: 'alerta', estado_actividad: 1 },
            order: [['fecha_emision', 'DESC']],
        });
        return response.status(200).json({ alertasActivas });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alertas", detalle: error.message });
    }
}

async function obtenerAlertasInactivas(request, response) {
    try {
        const alertasInactivas = await puntoMapa.findAll({
            where: { origen_punto: 'alerta', estado_actividad: 0 },
            order: [['fecha_emision', 'DESC']],
        });
        return response.status(200).json({ alertasInactivas });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alertas inactivas", detalle: error.message });
    }
}

async function desactivarAlerta(request, response) {
    try {
        const alertaId = request.params.id;

        const alertaActualizada = await puntoMapa.update(
            { estado_actividad: 0 },
            { where: { id: alertaId } }
        );

        if (alertaActualizada[0] === 0) {
            return response.status(404).json({ message: 'Alerta no encontrada o ya desactivada' });
        }

        return response.status(200).json({ message: 'Alerta desactivada correctamente' });
    } catch (error) {
        return response.status(500).json({ error: "Error al desactivar alerta", detalle: error.message });
    }
}

export { crearAlerta, obtenerAlerta, obtenerAlertasActivas, obtenerAlertasInactivas, desactivarAlerta };