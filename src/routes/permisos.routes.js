import express from "express";
import {  obtenerPermisosUsuario, actualizarPermisosUsuario } from "../controllers/permisos.controller.js";
import verificarToken from "../middleware/auth.middleware.js";

const permisosRouter = express.Router();

permisosRouter.use(verificarToken);

permisosRouter.get("/:id", obtenerPermisosUsuario);

permisosRouter.patch("/:id", actualizarPermisosUsuario);

export default permisosRouter;