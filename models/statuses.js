"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      statuses.hasOne(models.products, {
        foreignKey: "statusId",
      });
    }
  }
  statuses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "statuses",
    }
  );
  return statuses;
};
