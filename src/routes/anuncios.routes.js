import express from 'express';
import { crearAnuncio, obtenerAnuncio, obtenerAnuncios, eliminarAnuncio} from '../controllers/anuncio.controller.js';

const anuncioRouter = express.Router();

anuncioRouter.post('/', crearAnuncio);

anuncioRouter.get('/:id', obtenerAnuncio);

anuncioRouter.get('/', obtenerAnuncios);

anuncioRouter.delete('/:id', eliminarAnuncio);

export default anuncioRouter;

