import comentariosModel from '../models/comentarioAlerta.model';
import express from 'express';
import { crearComentario, obtenerComentarios, eliminarComentario} from '../controllers/comentarioAlerta.controller';

const comentariosRouter = express.Router();

comentariosRouter.post('/', crearComentario);

comentariosRouter.get('/', obtenerComentarios);

comentariosRouter.delete('/:comentarioId', eliminarComentario);

export default comentariosRouter;

