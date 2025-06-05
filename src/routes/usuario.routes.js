/**
 * Rutas para la entidad usuario
 *
 * Define los endpoints disponibles para crear, obtener, actualizar y eliminar usuarios en el sistema.
 * Cada ruta se enlaza con un controlador correspondiente que maneja la lógica de negocio.
 */
import express from 'express';
import { registrarUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, actualizarDisponibilidad, eliminarUsuario} from '../controllers/usuario.controller.js';
import  verificarToken  from '../middleware/auth.middleware.js';

const usuarioRouter = express.Router();

usuarioRouter.post('/', registrarUsuario);

usuarioRouter.use(verificarToken);

// Obtiene un usuario específico por ID
usuarioRouter.get('/:id', obtenerUsuario);

// Lista todos los usuarior existentes
usuarioRouter.get('/', obtenerUsuarios);

//Actualiza los datos de un usuario
usuarioRouter.patch('/:id', actualizarUsuario);

//Actualiza la disponibilidad de un usuario
usuarioRouter.patch('/:id/disponibilidad', actualizarDisponibilidad);

// Elimina un usuario por ID
usuarioRouter.delete('/:id', eliminarUsuario);

export default usuarioRouter;

