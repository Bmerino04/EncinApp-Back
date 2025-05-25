module.exports = (sequelize, DataTypes) => {
const PuntoMapa = sequelize.define(
  'puntoMapa',
  {
    id_punto_mapa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },   
    tipo: {
      type: DataTypes.ENUM('siniestro', 'salud', 'seguridad', 'otro'),
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
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    origen_punto: {
        type: DataTypes.ENUM('alerta', 'punto_interes'),
        allowNull: false,
    }
},
  {
    tableName:'punto_mapa',
    timestamps: false,
    freezeTableName:true,
  },
);

PuntoMapa.associate = models =>{
  PuntoMapa.hasMany(models.comentarioAlerta, {
    foreignKey: 'id_usuario',
    as: 'comentariosAlerta'
  });

  PuntoMapa.belongsTo(models.usuario, {
      foreignKey : 'id_usuario',
      as: 'usuario',
    });

};
return PuntoMapa;
};