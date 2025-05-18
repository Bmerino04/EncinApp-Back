const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Usuario = sequelize.define(
  'Usuario',
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
  },
);

// `sequelize.define` also returns the model
console.log(Usuario === sequelize.models.Usuario);