import express from 'express';

import usuarioRouter from './usuario.routes.js';
import alertaRouter from './alertas.routes.js';
import anuncioRouter from './anuncios.routes.js';
import comentarioAlertaRouter from './comentarioAlerta.routes.js';
import puntosInteresRouter from './puntosInteres.routes.js';
import authRouter from './auth.routes.js';
import permisosRouter from './permisos.routes.js';

const router = express.Router();

router.use('/usuarios', usuarioRouter);
router.use('/alertas', alertaRouter);
router.use('/anuncios', anuncioRouter);
router.use('/comentarios-alerta', comentarioAlertaRouter);
router.use('/puntos-interes', puntosInteresRouter);
router.use('/auth', authRouter);
router.use('/permisos', permisosRouter);

export default router; 