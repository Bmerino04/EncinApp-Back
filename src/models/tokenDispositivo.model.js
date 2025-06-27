export default (sequelize, DataTypes) => {
  const TokenDispositivo = sequelize.define(
    'token_dispositivo',
    {
      id_token: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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

  TokenDispositivo.associate = models => {
    TokenDispositivo.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  };

  return TokenDispositivo;
};