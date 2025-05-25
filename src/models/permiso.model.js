/**
 * Modelo Permiso
 *
 * Representa a un permisos administrativos que puede tener un usuario del sistema.
 * 
 */
export default  (sequelize, DataTypes) => {
const Permiso = sequelize.define(
  'permiso',
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
/**
 * Configuración de tabla:
 * - tableName: fuerza el nombre de la tabla a 'usuario'
 * - timestamps: desactivado (no guarda las fechas de creacion o modificacion)
 * - freezeTableName: evita pluralizar el nombre de la tabla
*/
  {
    tableName:'permiso',
    timestamps: false,
    freezeTableName:true,
  },
);
/**
 * Asociaciones:
 */
Permiso.associate = models => {
  Permiso.belongsToMany(models.usuario, {
    through: 'usuario_permiso',
    foreignKey: 'id_permiso',
    otherKey: 'id_usuario',
    as: 'usuarios'
  });
};
return Permiso;
};