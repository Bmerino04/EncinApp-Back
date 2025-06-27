/**
 * Modelo Anuncio
 * @module models/anuncio
 */

/**
 * Modelo Anuncio
 *
 * Representa un anuncio emitido por un usuario del sistema.
 *
 * @param {Object} sequelize - Instancia de Sequelize.
 * @param {Object} DataTypes - Tipos de datos de Sequelize.
 * @returns {Object} Modelo Anuncio.
 */
export default (sequelize, DataTypes) => {
  const Anuncio = sequelize.define(
    'anuncio',
    {
      /**
       * ID del anuncio (clave primaria, autoincremental).
       * @type {number}
       */
      id_anuncio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      /**
       * Título del anuncio.
       * @type {string}
       */
      titulo: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      /**
       * Cuerpo o contenido del anuncio.
       * @type {string|null}
       */
      cuerpo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      /**
       * URL del recurso multimedia asociado al anuncio.
       * @type {string|null}
       */
      multimedia_url: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },

      /**
       * Tipo de multimedia ('imagen' o 'video').
       * @type {'imagen' | 'video' | null}
       */
      tipo_multimedia: {
        type: DataTypes.ENUM('imagen', 'video'),
        allowNull: true,
      },

      /**
       * Fecha relacionada al anuncio (opcional).
       * @type {Date|null}
       */
      fecha_relacionada: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      /**
       * Dirección asociada al anuncio (opcional).
       * @type {string|null}
       */
      direccion: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },

      /**
       * Fecha de emisión del anuncio (por defecto fecha actual).
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
       * - tableName: fuerza el nombre de la tabla a 'anuncio'.
       * - timestamps: desactivado (no guarda fechas de creación/modificación).
       * - freezeTableName: evita pluralizar el nombre de la tabla.
       */
      tableName: 'anuncio',
      timestamps: false,
      freezeTableName: true,
    }
  );

  /**
   * Define las asociaciones del modelo Anuncio con otros modelos.
   *
   * @param {Object} models - Los modelos disponibles para asociar.
   */
  Anuncio.associate = models => {
    Anuncio.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  };

  return Anuncio;
};