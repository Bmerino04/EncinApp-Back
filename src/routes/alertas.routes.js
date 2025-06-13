import express from 'express';
import { crearAlerta, obtenerAlerta, obtenerAlertas, desactivarAlerta } from '../controllers/alerta.controller.js';
import verificarToken from '../middleware/auth.middleware.js';
import verificarPermiso from '../middleware/permisos.middleware.js';

const alertaRouter = express.Router();
alertaRouter.use(verificarToken);

alertaRouter.post('/', crearAlerta);

alertaRouter.get('/:id', obtenerAlerta);

alertaRouter.get('/', obtenerAlertas);

alertaRouter.patch('/:id', desactivarAlerta);

export default alertaRouter;

