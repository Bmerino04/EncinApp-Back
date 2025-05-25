/**
 * Modelo Anuncio
 *
 * Representa a un anuncio emitido por un usuario del sistema.
 * 
 */
export default  (sequelize, DataTypes) => {
const Anuncio = sequelize.define(
  'anuncio',
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
},
/**
 * Configuración de tabla:
 * - tableName: fuerza el nombre de la tabla a 'usuario'
 * - timestamps: desactivado (no guarda las fechas de creacion o modificacion)
 * - freezeTableName: evita pluralizar el nombre de la tabla
*/ 
  {
    tableName:'anuncio',
    timestamps: false,
    freezeTableName:true,
  },
);
/**
 * Asociaciones:
 */
Anuncio.associate = models =>{
    Anuncio.belongsTo(models.usuario, {
      foreignKey : 'id_usuario',
      as: 'usuario',
    });
};
return Anuncio;
};