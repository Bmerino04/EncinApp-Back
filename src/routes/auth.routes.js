import express from 'express';
import { iniciarSesion, cerrarSesion, registrarUsuario } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/', iniciarSesion);
authRouter.post('/', cerrarSesion);
authRouter.post('/', registrarUsuario);

export default authRouter;