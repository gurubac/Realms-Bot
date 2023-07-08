require('dotenv').config({
    path: "../../.env",
})
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    // schema: process.DATABASE_SCHEMA
});

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.')
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}