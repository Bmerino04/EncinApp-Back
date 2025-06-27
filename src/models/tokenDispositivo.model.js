/**
 * Modelo TokenDispositivo
 *
 * Representa el token de dispositivo de un usuario, utilizado para enviar notificaciones
 * push mediante Firebase Cloud Messaging (FCM). Cada usuario puede tener un token asociado,
 * que corresponde al identificador único del dispositivo.
 *
 * @param {Object} sequelize - Instancia de Sequelize.
 * @param {Object} DataTypes - Tipos de datos de Sequelize.
 * @returns {Object} Modelo TokenDispositivo.
 */
export default (sequelize, DataTypes) => {
  const TokenDispositivo = sequelize.define(
    'token_dispositivo',
    {
      /**
       * ID del token (clave primaria, autoincremental).
       * @type {number}
       */
      id_token: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      /**
       * ID del usuario al que pertenece el token.
       * @type {number}
       */
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      /**
       * Token del dispositivo (generalmente token FCM).
       * @type {string}
       */
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'token_dispositivo',
      timestamps: false,
      freezeTableName: true,
    }
  );

  /**
   * Define las asociaciones del modelo.
   *
   * @param {Object} models - Los modelos disponibles para asociar.
   */
  TokenDispositivo.associate = models => {
    TokenDispositivo.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  };

  return TokenDispositivo;
};