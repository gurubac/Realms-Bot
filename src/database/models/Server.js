const db = require("../Database.js");
const signale = require("signale");
const { Model, DataTypes } = require("sequelize");

class Server extends Model {
  static associate() {}
}

try {
  Server.init(
    {
      discordServerID: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      paranoid: true,
      sequelize: db.sequelize,
      modelName: "Server",
    }
  );
  signale.success("Server Initalized");
} catch (error) {
  signale.error("Couldn't Initialize Server Model: ", error);
}
