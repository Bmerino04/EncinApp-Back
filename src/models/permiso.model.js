/**
 * Modelo Permiso
 * @module models/permiso
 */

/**
 * Modelo Permiso
 *
 * Representa un permiso administrativo que puede tener un usuario del sistema.
 *
 * @param {Object} sequelize - Instancia de Sequelize.
 * @param {Object} DataTypes - Tipos de datos de Sequelize.
 * @returns {Object} Modelo Permiso.
 */
export default (sequelize, DataTypes) => {
  const Permiso = sequelize.define(
    'permiso',
    {
      /**
       * ID del permiso (clave primaria, autoincremental).
       * @type {number}
       */
      id_permiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      /**
       * Nombre del permiso.
       * @type {string}
       */
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      /**
       * Configuración de la tabla:
       * - tableName: fuerza el nombre de la tabla a 'permiso'.
       * - timestamps: desactivado (no guarda fechas de creación/modificación).
       * - freezeTableName: evita pluralizar el nombre de la tabla.
       */
      tableName: 'permiso',
      timestamps: false,
      freezeTableName: true,
    }
  );

  /**
   * Define las asociaciones del modelo Permiso con otros modelos.
   *
   * @param {Object} models - Los modelos disponibles para asociar.
   */
  Permiso.associate = models => {
    Permiso.belongsToMany(models.usuario, {
      through: 'usuario_permiso',
      foreignKey: 'id_permiso',
      otherKey: 'id_usuario',
      as: 'usuarios',
    });
  };

  return Permiso;
};
