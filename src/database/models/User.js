const db = require("../Database.js");
const signale = require("signale");
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate() {}
}

try {
  User.init({
    discordUserID: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    cache: {
      type: DataTypes.JSON,
    },
  });
    
  signale.success("User Model Initalized");
} catch (error) {
  signale.error("Couldn't Initialize User Model: ", error);
}
