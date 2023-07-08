require('dotenv').config({
    path: "../../.env",
})
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.DATABASE_NAME,
    host: process.DATABASE_HOST,
    port: process.DATABASE_PORT,
    username: process.DATABASE_USERNAME,
    password: process.DATABASE_PASSWORD,
    schema: process.DATABASE_SCHEMA
});

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.')
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}