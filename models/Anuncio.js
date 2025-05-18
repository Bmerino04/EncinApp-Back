const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Anuncio = sequelize.define(
  'Anuncio',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
    },    
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuerpo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    multimediaURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipoMultimedia: {
      type: DataTypes.ENUM,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
    fechaAsociada: {
      type: DataTypes.DATE,
      allowNull: true,
    }, 
    fechaEmision: {
      type: DataTypes.DATE,
      allowNull: false,
    }        
//claves foraneas??
},
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(PuntoMapa === sequelize.models.PuntoMapa

); // true