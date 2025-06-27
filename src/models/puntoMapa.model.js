/**
 * Modelo PuntoMapa
 * @module models/puntoMapa
 */

/**
 * Representa un punto georreferenciado en el sistema. Puede tener distintos fines
 * como reportar alertas y mostrar distintos puntos de interés.
 *
 * @param {Object} sequelize - Instancia de Sequelize.
 * @param {Object} DataTypes - Tipos de datos de Sequelize.
 * @returns {Object} Modelo PuntoMapa.
 */
export default (sequelize, DataTypes) => {
  const PuntoMapa = sequelize.define(
    'puntoMapa',
    {
      /**
       * ID del punto en el mapa (clave primaria, autoincremental).
       * @type {number}
       */
      id_punto_mapa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      /**
       * Origen del punto ('alerta' o 'punto_interes').
       * @type {'alerta' | 'punto_interes'}
       */
      origen_punto: {
        type: DataTypes.ENUM('alerta', 'punto_interes'),
        allowNull: false,
      },

      /**
       * Tipo de punto ('siniestro', 'salud', 'seguridad', 'otro').
       * @type {'siniestro' | 'salud' | 'seguridad' | 'otro'}
       */
      tipo: {
        type: DataTypes.ENUM('siniestro', 'salud', 'seguridad', 'otro'),
        allowNull: false,
      },

      /**
       * Longitud geográfica del punto.
       * @type {number}
       */
      longitud: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      /**
       * Latitud geográfica del punto.
       * @type {number}
       */
      latitud: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      /**
       * Nombre descriptivo del punto.
       * @type {string|null}
       */
      nombre: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },

      /**
       * Contacto asociado al punto.
       * @type {string|null}
       */
      contacto: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },

      /**
       * Estado de atención del punto (0 = no atendida, 1 = atendida).
       * @type {number|null}
       */
      estado_atendida: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: true,
      },

      /**
       * Estado de actividad del punto (0 = inactivo, 1 = activo).
       * @type {number|null}
       */
      estado_actividad: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: true,
      },

      /**
       * Fecha de emisión del punto (por defecto fecha actual).
       * @type {Date|null}
       */
      fecha_emision: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      /**
       * Configuración de la tabla:
       * - tableName: fuerza el nombre de la tabla a 'punto_mapa'.
       * - timestamps: desactivado (no guarda fechas de creación/modificación).
       * - freezeTableName: evita pluralizar el nombre de la tabla.
       */
      tableName: 'punto_mapa',
      timestamps: false,
      freezeTableName: true,
    }
  );

  /**
   * Define las asociaciones del modelo PuntoMapa con otros modelos.
   *
   * @param {Object} models - Los modelos disponibles para asociar.
   */
  PuntoMapa.associate = models => {
    PuntoMapa.hasMany(models.comentarioAlerta, {
      foreignKey: 'id_punto_mapa',
      as: 'comentariosAlerta',
    });

    PuntoMapa.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  };

  return PuntoMapa;
};