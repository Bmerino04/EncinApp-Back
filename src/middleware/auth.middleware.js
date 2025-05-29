import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function verificarToken(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) {
        return response.status(401).json({
            message: 'No se ha enviado el token'
        });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        request.user = data;
        next();
    }catch(error){
        return response.status(403).json({message: 'Token inválido o expirado'})
    }

}