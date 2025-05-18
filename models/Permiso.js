module.exports = (sequelize, DataTypes) => {
const Permiso = sequelize.define(
  'Permiso',
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
Permiso.associate = (models) =>{
Permiso.belongsToMany(Usuario,{
  through: 'usuario_permiso',
  foreignKey: 'id_permiso',
  otherKey: 'id_usuario',
});
};
return Permiso;
}