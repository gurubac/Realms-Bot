require("dotenv").config();

const signale = require("signale");
const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    try {
      this.sequelize = new Sequelize({
        dialect: "postgres",
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        schema: process.env.DATABASE_SCHEMA,
      });
      // this.sequelize = new Sequelize(name, username, password, options);
      this.sequelize.query(
        `CREATE SCHEMA IF NOT EXISTS "${process.env.DATABASE_SCHEMA}";`
      );

      signale.success("Database Connected");
    } catch (error) {
      signale.error("Database Connection Error: ", error);
    }
  }
}

// try {
//   const sequelize = new Sequelize({
//     dialect: "postgres",
//     database: process.env.DATABASE_NAME,
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     schema: process.env.DATABASE_SCHEMA,
//   });

//   sequelize.options.schema = process.env.DATABASE_SCHEMA;

//   signale.success("Database Connected");
//   module.exports = sequelize;
// } catch (error) {
//   signale.error(error);
// }

module.exports = new Database();
