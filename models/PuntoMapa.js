const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

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
    fechaEmision: {
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
    timestamps:false,
  },
);

// `sequelize.define` also returns the model
console.log(PuntoMapa === sequelize.models.PuntoMapa

); 