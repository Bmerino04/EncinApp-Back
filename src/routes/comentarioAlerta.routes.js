import express from 'express';
import { crearComentarioAlerta, obtenerComentariosAlertas, eliminarComentarioAlerta} from '../controllers/comentarioAlerta.controller.js';

const comentariosRouter = express.Router();

comentariosRouter.post('/', crearComentarioAlerta);

comentariosRouter.get('/', obtenerComentariosAlertas);

comentariosRouter.delete('/:id', eliminarComentarioAlerta);

export default comentariosRouter;

