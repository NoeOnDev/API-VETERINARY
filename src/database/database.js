import sequelize from './config.js';


export async function database() {
    await connect();
    await sync();
}

export async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

export async function close() {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Unable to close the database:', error.message);
    }
}

export async function sync() {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error.message);
    }
}