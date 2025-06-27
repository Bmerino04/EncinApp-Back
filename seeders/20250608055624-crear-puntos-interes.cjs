'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [admin] = await queryInterface.sequelize.query(
      `SELECT id_usuario FROM usuario WHERE rut = '12345678-9'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!admin) {
      throw new Error("Usuario admin no encontrado. Asegúrate de ejecutar primero el seeder del admin.");
    }

    const adminId = admin.id_usuario;
    const now = new Date();

    await queryInterface.bulkInsert('punto_mapa', [
      {
        tipo: 'seguridad',
        fecha_emision: now,
        longitud: -72.590105,
        latitud: -38.735671,
        contacto: '452-578200',
        nombre: 'Comisaría de Carabineros N°8 Temuco Alemania',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      },
      {
        tipo: 'seguridad',
        fecha_emision: now,
        longitud: -72.584987,
        latitud: -38.741396,
        contacto: '600-8181000',
        nombre: 'Seguridad Ciudadana Municipalidad de Temuco',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      },
      {
        tipo: 'salud',
        fecha_emision: now,
        longitud: -72.589190,
        latitud: -38.737905,
        contacto: '452-294100',
        nombre: 'Clínica Alemana de Temuco',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      },
      {
        tipo: 'salud',
        fecha_emision: now,
        longitud: -72.588254,
        latitud: -38.735290,
        contacto: '452-202200',
        nombre: 'Farmacia Cruz Verde Temuco Alemania',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      },
      {
        tipo: 'salud',
        fecha_emision: now,
        longitud: -72.586210,
        latitud: -38.734165,
        contacto: '452-588500',
        nombre: 'Centro Médico UC Temuco',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      },
      {
        tipo: 'siniestro',
        fecha_emision: now,
        longitud: -72.589526,
        latitud: -38.743280,
        contacto: '132',
        nombre: 'Cuarta Compañía de Bomberos Temuco (Germania)',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      },
      {
        tipo: 'siniestro',
        fecha_emision: now,
        longitud: -72.582075,
        latitud: -38.738015,
        contacto: '132',
        nombre: 'Segunda Compañía de Bomberos Temuco',
        origen_punto: 'punto_interes',
        id_usuario: adminId,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('punto_mapa', null, {});
  }
};