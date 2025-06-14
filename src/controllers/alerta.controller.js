import db from '../models/index.js';
const { puntoMapa, comentarioAlerta } = db;

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
            id_usuario: usuarioId,
        });
        return response.status(201).json({ alertaCreada });
    } catch (error) {
        return response.status(500).json({ error: "Error al emitir alerta", detalle: error.message });  
    }
}

async function obtenerAlerta(request, response) {
    try {
        const alertaId = request.params.id;

        const alertaEncontrada = await puntoMapa.findByPk(alertaId, {
            include: [
                {
                    model: comentarioAlerta,
                    as: 'comentariosAlerta',
                    order: [['fecha_emision', 'DESC']],
                }
            ]
        });

        if (!alertaEncontrada) {
            return response.status(404).json({ message: 'Alerta no encontrada' });
        }

        return response.status(200).json({ alertaEncontrada });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alerta", detalle: error.message });
    }
}

async function obtenerAlertas(request, response) {
    try {
        const { estado, atendida } = request.query;

        const condicion = {origen_punto: 'alerta'};

        if (estado !== undefined) {
            condicion.estado_actividad = estado;
        }

        if (atendida !== undefined) {
            condicion.estado_atendida = atendida;
        }

        const alertasEncontradas = await puntoMapa.findAll({
            where: condicion,
            order: [['fecha_emision', 'DESC']]
        });

        return response.status(200).json({ alertasEncontradas });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alertas", detalle: error.message });
    }
}

async function desactivarAlerta(request, response) {
    try {
        const alertaId = request.params.id;

        const alertaActualizada = await puntoMapa.update(
            { estado_actividad: 0 },
            { where: { id_punto_mapa: alertaId } }
        );

        if (alertaActualizada[0] === 0) {
            return response.status(404).json({ message: 'Alerta no encontrada o ya desactivada' });
        }

        return response.status(200).json({ message: 'Alerta desactivada correctamente' });
    } catch (error) {
        return response.status(500).json({ error: "Error al desactivar alerta", detalle: error.message });
    }
}

export { crearAlerta, obtenerAlerta, obtenerAlertas, desactivarAlerta };