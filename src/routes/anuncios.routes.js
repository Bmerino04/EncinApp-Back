/**
 * Rutas para la entidad Anuncio
 *
 * Define los endpoints disponibles para crear, obtener y eliminar comentarios en el sistema.
 * Cada ruta se enlaza con un controlador correspondiente que maneja la lógica de negocio.
 */
import express from 'express';
import { crearAnuncio, obtenerAnuncio, obtenerAnuncios, eliminarAnuncio} from '../controllers/anuncio.controller.js';
import  verificarToken  from '../middleware/auth.middleware.js';

const anuncioRouter = express.Router();

anuncioRouter.use(verificarToken);

// Crea un nuevo anuncio
anuncioRouter.post('/', crearAnuncio);

// Obtiene un anuncio específico por ID
anuncioRouter.get('/:id', obtenerAnuncio);

// Lista todos los anuncios existentes
anuncioRouter.get('/', obtenerAnuncios);

// Elimina un anuncio por ID
anuncioRouter.delete('/:id', eliminarAnuncio);

export default anuncioRouter;

