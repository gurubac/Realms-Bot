const db = require("../Database.js");
const signale = require("signale");
const { Model, DataTypes } = require("sequelize");

class Server extends Model {
  static associate() {}
}

Server.init(
  {
    discordServerID: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    paranoid: true,
    sequelize: db,
    modelName: "Server",
  }
);

signale.success("Server Initalized");
