require("dotenv").config({
  path: "../../.env",
});
const signale = require("signale");
const { Sequelize } = require("sequelize");

try {
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    schema: process.DATABASE_SCHEMA,
  });
  signale.success("Database Connected");
  module.exports = sequelize;
} catch (error) {
  signale.error(error);
}
