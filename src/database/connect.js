import sequelize from './config.js';

export async function database() {
    try {
        await connect();
        await syncronize();
    } catch (error) {
        console.error('Unable to connect to the database:', error);

    }
}

export async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export async function syncronize() {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize models:', error);
    }
}

export async function close() {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Unable to close the connection:', error);
    }
}