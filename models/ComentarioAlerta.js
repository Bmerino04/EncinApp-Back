const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const ComentarioAlerta = sequelize.define(
  'ComentarioAlerta',
  {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },     
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    id_usuario: { //fk usuario
      type: DataTypes.INTEGER,
      allowNull: false
    },                
    id_punto_mapa: { //fk punto mapa
      type: DataTypes.INTEGER,
      allowNull: false
    },  
},
  {
    tableName:'comentario_alerta',
    timestamps: false,
    freezeTableName:true,
  },
);

// `sequelize.define` also returns the model
console.log(ComentarioAlerta === sequelize.models.ComentarioAlerta

); // true