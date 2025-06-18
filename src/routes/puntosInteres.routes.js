import express from 'express';
import { crearPuntoInteres, obtenerPuntoInteres, obtenerPuntosInteres, eliminarPuntoInteres} from '../controllers/puntoInteres.controller.js';
import verificarToken from '../middleware/auth.middleware.js';

const puntoInteresRouter = express.Router();
puntoInteresRouter.use(verificarToken);

puntoInteresRouter.post('/', crearPuntoInteres);

puntoInteresRouter.get('/:id', obtenerPuntoInteres);

puntoInteresRouter.get('/', obtenerPuntosInteres);

puntoInteresRouter.delete('/:id', eliminarPuntoInteres);

export default puntoInteresRouter;
