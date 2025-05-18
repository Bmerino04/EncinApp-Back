const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Permiso = sequelize.define(
  'Permiso',
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

// `sequelize.define` also returns the model
console.log(Permiso === sequelize.models.Permiso

); // true