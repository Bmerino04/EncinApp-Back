import db from '../models/index.js';
const { token_dispositivo } = db;

/**
 * Registra o actualiza el token de un dispositivo para un usuario.
 */
export async function registrarTokenDispositivo(req, res) {
  const { token } = req.body;
  const id_usuario = req.user.id;

  if (!token) {
    return res.status(400).json({ error: 'Token es requerido' });
  }

  try {
    const existente = await token_dispositivo.findOne({ where: { id_usuario } });

    if (existente) {
      await existente.update({ token });
    } else {
      await token_dispositivo.create({ id_usuario, token });
    }

    return res.status(200).json({ mensaje: 'Token guardado correctamente' });
  } catch (error) {
    console.error('Error al registrar token:', error);
    return res.status(500).json({ error: 'Error al registrar token', detalle: error.message });
  }
}