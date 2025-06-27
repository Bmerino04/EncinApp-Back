import express from "express";
import {  obtenerPermisosUsuario, actualizarPermisosUsuario, transferirPresidencia } from "../controllers/permisos.controller.js";
import verificarToken from "../middleware/auth.middleware.js";
import verificarPresidencia from "../middleware/presidencia.middleware.js";
import verificarPermiso from '../middleware/permisos.middleware.js';

const permisosRouter = express.Router();
permisosRouter.use(verificarToken);

permisosRouter.patch("/presidencia/:id", verificarPresidencia(), transferirPresidencia);

permisosRouter.get("/:id", verificarPermiso('gestionar_permisos'), obtenerPermisosUsuario);

permisosRouter.patch("/:id",verificarPermiso('gestionar_permisos'), actualizarPermisosUsuario);

export default permisosRouter;