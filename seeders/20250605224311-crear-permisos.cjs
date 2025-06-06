'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const permisos = [
        'gestionar_usuarios',
        'gestionar_anuncios',
        'gestionar_puntos',
        'gestionar_permisos',
    ];

    const existentes = await queryInterface.sequelize.query(
      `SELECT nombre FROM permiso WHERE nombre IN (:nombres)`,
      {
        replacements: { nombres: permisos },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const nombresExistentes = existentes.map(p => p.nombre);
    const nuevos = permisos
      .filter(nombre => !nombresExistentes.includes(nombre))
      .map(nombre => ({ nombre }));

    if (nuevos.length > 0) {
      await queryInterface.bulkInsert('permiso', nuevos, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permiso', {
      nombre: [
        'gestionar_usuarios',
        'gestionar_anuncios',
        'gestionar_puntos',
        'gestionar_permisos',
      ],
    }, {});
  },
};