import sequelize from './config';

export async function database() {
    try {
        await connect();
        await sycronize();
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

export async function sycronize() {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize models:', error);
    }
}