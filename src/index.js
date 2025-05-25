import express from 'express';
import db from './models/index.js';
import rutas from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', rutas);

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(3000, () => {
      console.log('Servidor escuchando en puerto 3000');
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });