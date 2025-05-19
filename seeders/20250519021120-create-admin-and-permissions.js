'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const permisos = [
      { nombre: 'GESTIONAR_VECINOS' },
      { nombre: 'GESTIONAR_ANUNCIOS' },
      { nombre: 'GESTIONAR_PUNTOS' },
      { nombre: 'GESTIONAR_PERMISOS' },
    ];

    await queryInterface.bulkInsert('permiso', permisos, {});

    const permisosDB = await queryInterface.sequelize.query(
      `SELECT id_permiso, nombre FROM permiso WHERE nombre IN (:nombres)`,
      {
        replacements: { nombres: permisos.map(p => p.nombre) },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkInsert('usuario', [
      {
        nombre: 'Admin',
        rut: '12345678-9',
        pin: '1234',
        es_presidente: true,
        disponibilidad: false,
        direccion: 'UFRO',
      },
    ], {});

    const [adminUser] = await queryInterface.sequelize.query(
      `SELECT id_usuario FROM usuario WHERE rut = '12345678-9'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const usuarioPermisos = permisosDB.map(p => ({
      id_usuario: adminUser.id_usuario,
      id_permiso: p.id_permiso,
    }));

    await queryInterface.bulkInsert('usuario_permiso', usuarioPermisos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario_permiso', null, {});
    await queryInterface.bulkDelete('usuario', { rut: '00000000-0' }, {});
    await queryInterface.bulkDelete('permiso', {
      nombre: [
        'GESTIONAR_VECINOS',
        'GESTIONAR_ANUNCIOS',
        'GESTIONAR_PUNTOS',
        'GESTIONAR_PERMISOS',
      ],
    }, {});
  },
};
