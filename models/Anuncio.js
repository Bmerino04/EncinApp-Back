const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Anuncio = sequelize.define(
  'Anuncio',
  {
    id_anuncio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },     
    titulo: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cuerpo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    multimedia_url: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    tipo_multimedia: {
      type: DataTypes.ENUM('imagen', 'video'),
      allowNull: true,
    },
    fecha_relacionada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },    
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },  
    id_usuario: { //fk usuario
      type: DataTypes.INTEGER,
      allowNull: false
    },            
},
  {
    tableName:'anuncio',
    timestamps: false,
    freezeTableName:true,
  },
);

// `sequelize.define` also returns the model
console.log(Anuncio === sequelize.models.Anuncio

); // true