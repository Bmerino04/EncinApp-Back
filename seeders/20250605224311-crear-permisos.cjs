'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const permisos = [
      'gestionar_usuarios',
      'gestionar_anuncios',
      'gestionar_puntos',
      'gestionar_alertas',
      'gestionar_permisos',
    ];

    const now = new Date();

    // Verificar permisos existentes
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
      .map(nombre => ({
        nombre,
        //createdAt: now,
        //updatedAt: now,
      }));

    if (nuevos.length > 0) {
      await queryInterface.bulkInsert('permiso', nuevos, {});
    }

    // Verificar si ya existe el admin
    const [adminExists] = await queryInterface.sequelize.query(
      `SELECT id_usuario FROM usuario WHERE rut = '12345678-9'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    let adminId;

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const pinEncriptado = await bcrypt.hash('1234', salt);

      await queryInterface.bulkInsert('usuario', [
        {
          nombre: 'Admin',
          rut: '12345678-9',
          pin: pinEncriptado,
          es_presidente: true,
          disponibilidad: false,
          direccion: 'UFRO',
          //createdAt: now,
          //updatedAt: now,
        }
      ]);

      const [inserted] = await queryInterface.sequelize.query(
        `SELECT id_usuario FROM usuario WHERE rut = '12345678-9'`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      adminId = inserted.id_usuario;
    } else {
      adminId = adminExists.id_usuario;
    }

    const permisosDB = await queryInterface.sequelize.query(
      `SELECT id_permiso FROM permiso`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const usuarioPermisos = permisosDB.map(p => ({
      id_usuario: adminId,
      id_permiso: p.id_permiso,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('usuario_permiso', usuarioPermisos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario_permiso', null, {});
    await queryInterface.bulkDelete('usuario', { rut: '12345678-9' }, {});
    await queryInterface.bulkDelete('permiso', {
      nombre: [
        'gestionar_usuarios',
        'gestionar_anuncios',
        'gestionar_puntos',
        'gestionar_alertas',
        'gestionar_permisos',
      ],
    }, {});
  }
};