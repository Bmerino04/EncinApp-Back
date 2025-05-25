import anuncioModel from '../models/anuncio.model';
import express from 'express';
import { crearAnuncio, obtenerAnuncio, obtenerAnuncios, eliminarAnuncio} from '../controllers/anuncio.controller';

const anuncioRouter = express.Router();

anuncioRouter.post('/', crearAnuncio);

anuncioRouter.get('/:anuncioId', obtenerAnuncio);

anuncioRouter.get('/', obtenerAnuncios);

anuncioRouter.delete('/:anuncioId', eliminarAnuncio);

export default anuncioRouter;

