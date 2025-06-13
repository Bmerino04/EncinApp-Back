import db from '../models/index.js';
const { puntoMapa } = db;

async function desactivarAlertaTiempo(request, response) {
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

export default desactivarAlertaTiempo;
