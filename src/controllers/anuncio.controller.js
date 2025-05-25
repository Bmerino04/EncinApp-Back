import anuncioModel from '../models/anuncio.model';

async function crearAnuncio(request, response) {
    try{
        const body = request.body;

        const anuncio = await anuncioModel.create({
            titulo: body.titulo,
            cuerpo: body.cuerpo,
            multimedia_url: body.multimedia_url,
            tipo_multimedia: body.tipo_multimedia,
            fecha_relacionada: body.fecha_relacionada,
            direccion: body.direccion,
            fecha_emision: body.fecha_emision,
        });
        return response.status(201).json({anuncio});
    } catch(error){
        return response.status(500).json({error});
    }
}
async function obtenerAnuncio(request, response) {
    try{
        const anuncioId = request.params.id;

        const anuncio = await anuncioModel.findByPK(anuncioId);

        if(!anuncio){
            return response.status(404).json({message: 'Anuncio no encontrado'});
        }

        return response.status(200).json({anuncio});
    } catch(error){
        return response.status(500).json({error});
    }
}

async function obtenerAnuncios(request, response) {
    try{
        const anuncios = await anuncioModel.findAll();
        return response.status(200).json({anuncios});
    } catch(error){
        return response.status(500).json({error});
    }
}

async function eliminarAnuncio(request, response) {
    try{
        const anuncioId = request.params.id;

        await anuncioModel.deleteOne({ _id: anuncioId});
        return response.status(200).json({message: 'Anuncio eliminado'});
    }catch(error){
        return response.status(500).json({error});
    }
}

export { crearAnuncio, obtenerAnuncio, obtenerAnuncios, eliminarAnuncio };


