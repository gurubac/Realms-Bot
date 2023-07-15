const db = require("./Database");
const { DataTypes, Model } = require('sequelize');

class Cache extends Model {
  static initialize() {
    this.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true, // Define the primary key attribute
        },
        cacheName: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true, // Define the primary key attribute
        },
        value: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: {},
        },
      },
      {
        sequelize: db,
        modelName: 'Cache',
        tableName: 'caches',
      }
    );
  }

  async getCached() {
		console.log("in getCached")
    const cache = await Cache.findOne({
      where: { username: this.username, cacheName: this.cacheName },
    });
    return cache ? cache.value : {};
  }

  async setCached(value) {
		console.log("username is", this.username);
		console.log("cacheName is", this.cacheName);
    await Cache.upsert({
      username: this.username,
      cacheName: this.cacheName,
      value,
    });
  }

  async setCachedPartial(value) {
    const cached = await this.getCached();
    await this.setCached({ ...cached, ...value });
  }
}

Cache.initialize();

module.exports = Cache;
