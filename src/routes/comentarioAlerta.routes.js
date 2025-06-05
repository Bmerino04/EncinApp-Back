/**
 * Rutas para la entidad comentarioAlerta
 *
 * Define los endpoints disponibles para crear, obtener y eliminar anuncios en el sistema.
 * Cada ruta se enlaza con un controlador correspondiente que maneja la lógica de negocio.
 */
import express from 'express';
import { crearComentarioAlerta, obtenerComentariosAlertas, eliminarComentarioAlerta} from '../controllers/comentarioAlerta.controller.js';
import  verificarToken  from '../middleware/auth.middleware.js';

const comentariosRouter = express.Router();

comentariosRouter.use(verificarToken);

// Crea un nuevo comentario
comentariosRouter.post('/', crearComentarioAlerta);

// Lista todos los comentarios de una alerta existente
comentariosRouter.get('/', obtenerComentariosAlertas); //revisar porque falta implentar la logica de las alertas

// Elimina un comentario por ID
comentariosRouter.delete('/:id', eliminarComentarioAlerta);

export default comentariosRouter;
