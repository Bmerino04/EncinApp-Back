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

async function obtenerPuntoInteres(request, response) {
    try {
        const puntoInteresId = request.params.id;
        const condicion = { origen_punto: 'punto_interes' };

        const puntoInteresEncontrado = await puntoMapa.findByPk(puntoInteresId, {
            where: condicion
        });

        if (!puntoInteresEncontrado) {
            return response.status(404).json({ message: 'Punto de interés no encontrado' });
        }

        return response.status(200).json({ puntoInteresEncontrado });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener punto de interés", detalle: error.message });
    }
}

async function obtenerPuntosInteres(request, response) {
    try {
        const { tipo } = request.query;
        const condicion = { origen_punto: 'punto_interes' };

        if (tipo) {
            condicion.tipo = tipo;
        }

        const puntosInteresEncontrados = await puntoMapa.findAll({
            where: condicion
        });

        return response.status(200).json({ puntosInteresEncontrados });
    } catch (error) {
        return response.status(500).json({ error: "Error al obtener puntos de interés", detalle: error.message });
    }
}

async function eliminarPuntoInteres(request, response) {
    try {
        const puntoInteresId = request.params.id;

        const puntoInteresEncontrado = await puntoMapa.findByPk(puntoInteresId);

        if (!puntoInteresEncontrado) {
            return response.status(404).json({ message: 'Punto de interés no encontrado' });
        }

        await puntoInteresEncontrado.destroy();

        return response.status(200).json({ message: 'Punto de interés eliminado correctamente' });
    } catch (error) {
        return response.status(500).json({ error: "Error al eliminar punto de interés", detalle: error.message });
    }
    
}

export { crearPuntoInteres, obtenerPuntoInteres, obtenerPuntosInteres, eliminarPuntoInteres};
