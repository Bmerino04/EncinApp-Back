const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Anuncio = sequelize.define(
  'Anuncio',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
    },    
    nombre: {
      type: DataTypes.STRING,
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