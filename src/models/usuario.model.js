
module.exports = (sequelize, DataTypes) => {
const Usuario = sequelize.define(
  'usuario',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    pin: {
      type: DataTypes.CHAR(4),
      allowNull: false,
    },
    es_presidente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    disponibilidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
},
  {
    tableName:'usuario',
    timestamps: false,
    freezeTableName:true,
    paranoid: true, //soft delete
  },
);

Usuario.associate = models =>{
  Usuario.hasMany(puntoMapa);
  Usuario.hasMany(comentarioAlerta);
  Usuario.hasMany(anuncio);

  Usuario.belongsToMany(Permiso,{
  through: 'usuario_permiso'});
};
return Usuario;
}