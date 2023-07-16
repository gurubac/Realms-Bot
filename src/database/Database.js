require("dotenv").config();

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
		schema: process.env.DATABASE_SCHEMA,
	});

	sequelize.query(
		`CREATE SCHEMA IF NOT EXISTS "${process.env.DATABASE_SCHEMA}";`
	);
	sequelize.options.schema = process.env.DATABASE_SCHEMA;

	const Cache = sequelize.define(
    'Cache',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      cacheName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      tableName: 'caches',
    }
  );
	Cache.sync();

	signale.success("Database Connected");
	module.exports = sequelize;
} catch (error) {
	signale.error(error);
}
