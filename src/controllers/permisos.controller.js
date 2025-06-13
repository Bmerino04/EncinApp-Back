import db from "../models/index.js";
const { usuario, permiso } = db;

async function obtenerPermisosUsuario(request, response) {
  try {
    const usuarioId = request.params.id;

    const usuarioEncontrado = await usuario.findByPk(usuarioId, {
      include: {
        model: permiso,
        as: "permisos",
        attributes: ["id_permiso", "nombre"],
        through: {
          attributes: [],
        },
      },
    });

    if (!usuarioEncontrado) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    if (usuarioEncontrado.permisos.length === 0) {
      return response.status(404).json({ message: "El usuario no tiene permisos asignados" });
    }

    return response.status(200).json({ permisos: usuarioEncontrado.permisos });
  } catch (error) {
    return response.status(500).json({error: "Error al obtener los permisos del usuario",detalle: error.message});
  }
}

async function actualizarPermisosUsuario(request, response) {
  try {
    const usuarioId = request.params.id;
    const nombrePermisos = request.body;

    if (!Array.isArray(nombrePermisos)) {
      return response.status(400).json({ message: "Debe proporcionar una lista de permisos válida" });
    }

    const usuarioExistente = await usuario.findByPk(usuarioId);
    if (!usuarioExistente) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    if (nombrePermisos.length === 0) {
      await usuarioExistente.setPermisos([]);
      return response.status(200).json({ message: "Permisos removidos correctamente" });
    }

    const permisos = await permiso.findAll({
      where: {
        nombre: nombrePermisos,
      },
    });

    if (permisos.length !== nombrePermisos.length) {
      return response.status(400).json({ message: "Algunos permisos no existen" });
    }

    await usuarioExistente.setPermisos(permisos);

    return response.status(200).json({ message: "Permisos actualizados correctamente" });
  } catch (error) {
    return response.status(500).json({ error: "Error al actualizar los permisos del usuario", detalle: error.message });
  }
}

async function transferirPresidencia(request, response) {
  try {
    const actualPresidenteId = request.user.id;
    const nuevoPresidenteId = request.params.id;

    const presidenteActual = await usuario.findByPk(actualPresidenteId, {
      include: {
        model: permiso,
        as: "permisos"
        }
      });

    const nuevoPresidente = await usuario.findByPk(nuevoPresidenteId);

    if (!nuevoPresidente) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    if (nuevoPresidente.es_presidente) {
      return response.status(400).json({ message: "El usuario ya es presidente" });
    }

    // Asignar la presidencia al usuario
    const todosLosPermisos = await permiso.findAll()
    
    console.log(todosLosPermisos);
    await presidenteActual.update({ es_presidente: true });
    await nuevoPresidente.setPermisos(todosLosPermisos);
  
    await presidenteActual.update({ es_presidente: false });
    await presidenteActual.setPermisos([]);

    return response.status(200).json({ message: "Presidencia transferida correctamente" });

  } catch (error) {
    return response.status(500).json({error: "Error al transferir la presidencia", detalle: error.message,});
  }
}

export { obtenerPermisosUsuario, actualizarPermisosUsuario, transferirPresidencia };