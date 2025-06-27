/**
 * Modelo comentarioAlerta
 * @module models/comentarioAlerta
 */

/**
 * Modelo ComentarioAlerta
 *
 * Representa un comentario de un usuario en las alertas emitidas.
 *
 * @param {Object} sequelize - Instancia de Sequelize.
 * @param {Object} DataTypes - Tipos de datos de Sequelize.
 * @returns {Object} Modelo ComentarioAlerta.
 */
export default (sequelize, DataTypes) => {
  const ComentarioAlerta = sequelize.define(
    'comentarioAlerta',
    {
      /**
       * ID del comentario (clave primaria, autoincremental).
       * @type {number}
       */
      id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      /**
       * Contenido del comentario.
       * @type {string}
       */
      contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      /**
       * Fecha de emisión del comentario (por defecto fecha actual).
       * @type {Date}
       */
      fecha_emision: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      /**
       * Configuración de la tabla:
       * - tableName: fuerza el nombre de la tabla a 'comentario_alerta'.
       * - timestamps: desactivado (no guarda fechas de creación/modificación).
       * - freezeTableName: evita pluralizar el nombre de la tabla.
       */
      tableName: 'comentario_alerta',
      timestamps: false,
      freezeTableName: true,
    }
  );

  /**
   * Define las asociaciones del modelo ComentarioAlerta con otros modelos.
   *
   * @param {Object} models - Los modelos disponibles para asociar.
   */
  ComentarioAlerta.associate = models => {
    ComentarioAlerta.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });

    ComentarioAlerta.belongsTo(models.puntoMapa, {
      foreignKey: 'id_punto_mapa',
      as: 'puntoMapa',
    });
  };

  return ComentarioAlerta;
};