module.exports = (sequelize, DataTypes) => {
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
Permiso.associate = models =>{
    Permiso.belongsToMany(usuario,{through: 'usuario_permiso'});
};
return Permiso;
};