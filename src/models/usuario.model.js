/**
 * Modelo Usuario
 *
 * Representa a un usuario del sistema, incluyendo sus datos personales, estado y relaciones con otros modelos.
 * 
 */
export default (sequelize, DataTypes) => {
const Usuario = sequelize.define(
  'usuario',
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

/**
 * Configuración de tabla:
 * - tableName: fuerza el nombre de la tabla a 'usuario'
 * - timestamps: desactivado (no guarda las fechas de creacion o modificacion)
 * - freezeTableName: evita pluralizar el nombre de la tabla
 * - paranoid: activo (usa soft delete)
*/    
},
  {
    tableName:'usuario',
    timestamps: false,
    freezeTableName:true,
    paranoid: true,
  },
);

/**
 * Asociaciones:
 */
Usuario.associate = models => {
  Usuario.hasMany(models.puntoMapa, {
    foreignKey: 'id_usuario',
    as: 'puntosMapa'
  });
  Usuario.hasMany(models.comentarioAlerta, {
    foreignKey: 'id_usuario',
    as: 'comentariosAlerta'
  });
  Usuario.hasMany(models.anuncio, {
    foreignKey: 'id_usuario',
    as: 'anuncios'
  });

  Usuario.belongsToMany(models.permiso, { 
    through: 'usuario_permiso',
    foreignKey: 'id_usuario',
    otherKey: 'id_permiso',
    as: 'permisos'
  });
};
return Usuario;
}