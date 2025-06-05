import express from 'express';
import  iniciarSesion  from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', iniciarSesion);


export default authRouter;