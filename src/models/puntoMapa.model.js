module.exports = (sequelize, DataTypes) => {
const PuntoMapa = sequelize.define(
  'PuntoMapa',
  {
    id_punto_mapa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },   
    tipo: {
      type: DataTypes.ENUM('seguridad','salud','siniestro'),
      allowNull: false,
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    contacto: {
      type: DataTypes.STRING(45),
      allowNull: true,
    }, 
    id_usuario: { //fk usuario
      type: DataTypes.INTEGER,
      allowNull: false
    }       
},
  {
    tableName:'punto_mapa',
    timestamps: false,
    freezeTableName:true,
  },
);

PuntoMapa.associate = (models) =>{
  PuntoMapa.hasMany(ComentarioAlerta,{foreignKey:'id_usuario'});

  PuntoMapa.belongsTo(Usuario, {foreignKey:'id_usuario'});

};
return PuntoMapa;
}