import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import rutas from './routes/index.js';
import waitForDb from './utils/waitForDb.js';
import dotenv from 'dotenv';
const { config } = dotenv;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', rutas);

(async () => {
    try {
        await waitForDb(db.sequelize);
        await db.sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada');
        app.listen(3000, () => {
            console.log('Servidor escuchando en puerto 3000');
        });
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    }
})();
