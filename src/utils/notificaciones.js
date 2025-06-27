const admin = require('../firebase/firebaseAdmin');

async function enviarNotificacion(token, titulo, cuerpo) {
  const mensaje = {
    notification: {
      title: titulo,
      body: cuerpo,
    },
    token,
  };

  try {
    const respuesta = await admin.messaging().send(mensaje);
    console.log('Notificación enviada:', respuesta);
    return respuesta;
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
    throw error;
  }
}

module.exports = { enviarNotificacion };