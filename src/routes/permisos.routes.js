import express from "express";
import {  obtenerPermisosUsuario, actualizarPermisosUsuario, transferirPresidencia } from "../controllers/permisos.controller.js";
import verificarToken from "../middleware/auth.middleware.js";
import verificarPresidencia from "../middleware/presidencia.middleware.js";

const permisosRouter = express.Router();


permisosRouter.use(verificarToken, verificarPresidencia);

permisosRouter.patch("/:id", transferirPresidencia);

permisosRouter.get("/:id", obtenerPermisosUsuario);

permisosRouter.patch("/:id", actualizarPermisosUsuario);

export default permisosRouter;