import express from 'express';
import { crearUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario} from '../controllers/usuario.controller';

const usuarioRouter = express.Router();

usuarioRouter.post('/', crearUsuario);

usuarioRouter.get('/:id', obtenerUsuario);

usuarioRouter.get('/', obtenerUsuarios);

usuarioRouter.patch('/:id', actualizarUsuario);

usuarioRouter.patch('/:id/disponibilidad', actualizarDisponibilidad);

usuarioRouter.delete('/:id', eliminarUsuario);

export default usuarioRouter;

