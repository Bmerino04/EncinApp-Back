import db from '../models/index.js';
const { puntoMapa, comentarioAlerta } = db;

async function desactivarAlertaTiempo() {
    try {
        const ahora = new Date();

        const alertas = await puntoMapa.findAll({
            where: {
                origen_punto: 'alerta',
                estado_actividad: '1',
            }
        });

        for (const alerta of alertas) {
            const tiempoTranscurrido = ahora - new Date(alerta.fecha_emision);

            if (tiempoTranscurrido > 300000) { // 5 minutos en milisegundos
                await alerta.update({ estado_actividad: '0' }); // Desactivar alerta
                alerta.estado_actividad = '0'; // Desactivar alerta
                console.log(`Alerta ${alerta.id_punto_mapa} desactivada automáticamente`);
            }
        }

    } catch (error) {
        console.error("Error al desactivar alertas automáticamente:", error.message);
    }
}

async function actualizarEstadoAtencion() {
    try{
        const alertas = await puntoMapa.findAll({
            where: {
                origen_punto: 'alerta',
                estado_actividad: '1',
            },
            attributes: ['id_punto_mapa']  
        });

        for (const alerta of alertas) {
            const comentarios = await comentarioAlerta.count({
                where: {
                    id_punto_mapa: alerta.id_punto_mapa,
                },
            });

            const nuevoEstadoAtendida = comentarios > 0 ? '1' : '0';

            await puntoMapa.update(
                { estado_atendida: nuevoEstadoAtendida },
                { where: { id_punto_mapa: alerta.id_punto_mapa } }
            );
        }

        console.log("Estado de atención actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar estado de atención:", error.message);
    }
    
}

export { desactivarAlertaTiempo, actualizarEstadoAtencion };
