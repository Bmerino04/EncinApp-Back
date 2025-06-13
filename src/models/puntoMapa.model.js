/**
 * Modelo PuntoMapa
 *
 * Representa un punto georreferenciado en el sistema. Puede tener distintos fines como reportar alertas y mostrar distintos puntos de interés.
 */
export default (sequelize, DataTypes) => {
const PuntoMapa = sequelize.define(
  'puntoMapa',
  {
    id_punto_mapa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },   
    tipo: {
      type: DataTypes.ENUM('siniestro', 'salud', 'seguridad', 'otro'),
      allowNull: false,
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado_atendida:{
      type: DataTypes.TINYINT,
      defaultValue: 0, // 1 = atendida, 0 = no atendida
      allowNull: true,
    },
    estado_actividad:{
      type: DataTypes.TINYINT,
      defaultValue: 1, // 1 = activo, 0 = inactivo
      allowNull: true,
     
    },
    contacto: {
      type: DataTypes.STRING(45),
      allowNull: true,
    }, 
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    origen_punto: {
        type: DataTypes.ENUM('alerta', 'punto_interes'),
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
    tableName:'punto_mapa',
    timestamps: false,
    freezeTableName:true,
  },
);
/**
 * Asociaciones:
 */
PuntoMapa.associate = models =>{
  PuntoMapa.hasMany(models.comentarioAlerta, {
    foreignKey: 'id_usuario',
    as: 'comentariosAlerta'
  });

  PuntoMapa.belongsTo(models.usuario, {
      foreignKey : 'id_usuario',
      as: 'usuario',
    });

};
return PuntoMapa;
};