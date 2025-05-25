import usuarioModel from '../models/usuario.model';
import express from 'express';
import { crearUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario} from '../controllers/usuario.controller';

const usuarioRouter = express.Router();

usuarioRouter.post('/', crearUsuario);

usuarioRouter.get('/:usuarioId', obtenerUsuario);

usuarioRouter.get('/', obtenerUsuarios);

usuarioRouter.patch('/:usuarioId', actualizarUsuario);

usuarioRouter.patch('/:usuarioId/disponibilidad', actualizarDisponibilidad);

usuarioRouter.delete('/:usuarioId', eliminarUsuario);

export default usuarioRouter;

