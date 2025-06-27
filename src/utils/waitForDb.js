export default async function waitForDb(sequelize, retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log(":white_check_mark: Base de datos conectada");
            return;
        } catch (err) {
            console.log(`Intentando conectar a la DB (${i + 1}/${retries})...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error(":x: No se pudo conectar con la base de datos después de varios intentos");
}