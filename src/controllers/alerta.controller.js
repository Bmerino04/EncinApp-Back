import db from '../models/index.js';
const { puntoMapa, comentarioAlerta } = db;
import { formatTime } from '../utils/formatTime.js';

/**
 * Crea una nueva alerta.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function crearAlerta(request, response) {
    try {
        const body = request.body;
        const usuarioId = request.user.id;

        const alertaCreada = await puntoMapa.create({
            origen_punto: 'alerta',
            tipo: body.tipo,
            latitud: body.latitud,
            longitud: body.longitud,
            id_usuario: usuarioId,
        });
        
        const alertaFormateada = alertaCreada.toJSON();
        alertaFormateada.fecha_emision = formatTime(alertaFormateada.fecha_emision)
    
        return response.status(201).json({ alertaCreada: alertaFormateada });

    } catch (error) {
        return response.status(500).json({ error: "Error al emitir alerta", detalle: error.message });  
    }
}

/**
 * Obtiene una alerta por su ID.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function obtenerAlerta(request, response) {
    try {
        const alertaId = request.params.id;
        const condicion = {origen_punto: 'alerta'};

        const alertaEncontrada = await puntoMapa.findByPk(alertaId, {
            where: condicion,
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

        const alertaFormateada = alertaEncontrada.toJSON();
        alertaFormateada.fecha_emision = formatTime(alertaFormateada.fecha_emision)

        return response.status(200).json({ alertaEncontrada: alertaFormateada });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alerta", detalle: error.message });
    }
}


/**
 * Obtiene una lista de alertas filtradas por estado o si fueron atendidas.
 *
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
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

        const alertasFormateadas = alertasEncontradas.map(alerta => {
            const alertaJson = alerta.toJSON();
            alertaJson.fecha_emision = formatTime(alertaJson.fecha_emision);
            return alertaJson;
        });
        
        return response.status(200).json({ alertasEncontradas: alertasFormateadas });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener alertas", detalle: error.message });
    }
}

/**
 * Desactiva una alerta marcando su estado como inactivo.
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {Response} response - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
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