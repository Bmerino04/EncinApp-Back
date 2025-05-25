export default  (sequelize, DataTypes) => {
const ComentarioAlerta = sequelize.define(
  'comentarioAlerta',
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
},
  {
    tableName:'comentario_alerta',
    timestamps: false,
    freezeTableName:true,
  },
);
ComentarioAlerta.associate = models =>{
    ComentarioAlerta.belongsTo(models.usuario, {
      foreignKey : 'id_usuario',
      as: 'usuario',
    });
    ComentarioAlerta.belongsTo(models.puntoMapa, {
      foreignKey : 'id_punto_mapa',
      as: 'puntoMapa',
    });
};
return ComentarioAlerta;
};