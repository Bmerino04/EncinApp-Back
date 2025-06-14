import express from 'express';
import { crearAlerta, obtenerAlerta, obtenerAlertas, desactivarAlerta } from '../controllers/alerta.controller.js';
import { crearComentarioAlerta, obtenerComentariosAlerta, eliminarComentarioAlerta} from '../controllers/comentarioAlerta.controller.js';

import verificarToken from '../middleware/auth.middleware.js';
import verificarPermiso from '../middleware/permisos.middleware.js';

const alertaRouter = express.Router();
alertaRouter.use(verificarToken);

alertaRouter.post('/', crearAlerta);

alertaRouter.get('/:id', obtenerAlerta);

alertaRouter.get('/', obtenerAlertas);

alertaRouter.patch('/:id', desactivarAlerta);

alertaRouter.post('/:id/comentarios', crearComentarioAlerta);

alertaRouter.get('/:id/comentarios', obtenerComentariosAlerta);

alertaRouter.delete('/:idAlerta/comentarios/:idComentario', verificarPermiso('gestionar_alertas'), eliminarComentarioAlerta);

export default alertaRouter;

