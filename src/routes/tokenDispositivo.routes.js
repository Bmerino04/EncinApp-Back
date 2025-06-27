import express from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import { registrarTokenDispositivo } from '../controllers/tokenDispositivo.controller.js';

const tokenRouter = express.Router();

tokenRouter.use(verificarToken);

// Ruta para registrar/actualizar el token del dispositivo
tokenRouter.post('/', registrarTokenDispositivo);

export default tokenRouter;