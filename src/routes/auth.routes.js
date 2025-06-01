import express from 'express';
import { iniciarSesion, cerrarSesion } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', iniciarSesion);

// Crea un nuevo usuario
authRouter.post('/', cerrarSesion);

export default authRouter;