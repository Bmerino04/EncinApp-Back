export default  (sequelize, DataTypes) => {
const Permiso = sequelize.define(
  'permiso',
  {
    id_permiso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },    
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },       
},
  {
    tableName:'permiso',
    timestamps: false,
    freezeTableName:true,
  },
);
Permiso.associate = models => {
  Permiso.belongsToMany(models.usuario, {
    through: 'usuario_permiso',
    foreignKey: 'id_permiso',
    otherKey: 'id_usuario',
    as: 'usuarios'
  });
};
return Permiso;
};