import express from 'express';
import { crearComentario, obtenerComentarios, eliminarComentario} from '../controllers/comentarioAlerta.controller.js';

const comentariosRouter = express.Router();

comentariosRouter.post('/', crearComentarioAlerta);

comentariosRouter.get('/', obtenerComentariosAlertas);

comentariosRouter.delete('/:id', eliminarComentarioAlerta);

export default comentariosRouter;

