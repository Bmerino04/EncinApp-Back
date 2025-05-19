'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      rut: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      pin: {
        type: Sequelize.CHAR(4),
        allowNull: false
      },
      es_presidente: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      disponibilidad: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuario');
  }
};
