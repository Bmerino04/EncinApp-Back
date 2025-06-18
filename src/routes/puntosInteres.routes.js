import express from 'express';
import { crearPuntoInteres, obtenerPuntoInteres, obtenerPuntosInteres, eliminarPuntoInteres} from '../controllers/puntoInteres.controller.js';
import verificarToken from '../middleware/auth.middleware.js';
import verificarPermiso from '../middleware/permisos.middleware.js';

const puntoInteresRouter = express.Router();
puntoInteresRouter.use(verificarToken);

puntoInteresRouter.post('/', verificarPermiso('gestionar_puntos'), crearPuntoInteres);

puntoInteresRouter.get('/:id', obtenerPuntoInteres);

puntoInteresRouter.get('/', obtenerPuntosInteres);

puntoInteresRouter.delete('/:id', verificarPermiso('gestionar_puntos'),eliminarPuntoInteres);

export default puntoInteresRouter;
