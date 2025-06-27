/**
 * Modelo TokenDispositivo
 * @module models/usuario
 */

/**
 * Representa a un usuario del sistema, incluyendo sus datos personales,
 * estado y relaciones con otros modelos.
 *
 * @param {Object} sequelize - Instancia de Sequelize.
 * @param {Object} DataTypes - Tipos de datos de Sequelize.
 * @returns {Object} Modelo Usuario.
 */
export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'usuario',
    {
      /**
       * ID del usuario (clave primaria, autoincremental).
       * @type {number}
       */
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      /**
       * Nombre completo del usuario.
       * @type {string}
       */
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      /**
       * RUT del usuario (identificación única).
       * @type {string}
       */
      rut: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      /**
       * PIN cifrado del usuario para autenticación.
       * @type {string}
       */
      pin: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      /**
       * Indica si el usuario es presidente.
       * @type {boolean}
       */
      es_presidente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      /**
       * Disponibilidad del usuario (activo/inactivo).
       * @type {boolean}
       */
      disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      /**
       * Dirección física del usuario.
       * @type {string}
       */
      direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      /**
       * Configuración de la tabla:
       * - tableName: fuerza el nombre de la tabla a 'usuario'.
       * - timestamps: desactivado (no guarda fechas de creación/modificación).
       * - freezeTableName: evita pluralizar el nombre de la tabla.
       * - paranoid: activo (uso de soft delete).
       */
      tableName: 'usuario',
      timestamps: false,
      freezeTableName: true,
      paranoid: true,
    }
  );

  /**
   * Define las asociaciones del modelo Usuario con otros modelos.
   *
   * @param {Object} models - Los modelos disponibles para asociar.
   */
  Usuario.associate = models => {
    Usuario.hasMany(models.puntoMapa, {
      foreignKey: 'id_usuario',
      as: 'puntosMapa',
    });
    Usuario.hasMany(models.comentarioAlerta, {
      foreignKey: 'id_usuario',
      as: 'comentariosAlerta',
    });
    Usuario.hasMany(models.anuncio, {
      foreignKey: 'id_usuario',
      as: 'anuncios',
    });

  Usuario.belongsToMany(models.permiso, { 
    through: 'usuario_permiso',
    foreignKey: 'id_usuario',
    otherKey: 'id_permiso',
    as: 'permisos'
  });
};
return Usuario;
}