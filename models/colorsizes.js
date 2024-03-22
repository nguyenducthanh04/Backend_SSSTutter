"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class colorSizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      colorSizes.belongsTo(models.colors, {
        foreignKey: "colorId",
      });
      colorSizes.belongsTo(models.sizes, {
        foreignKey: "sizeId",
      });
    }
  }
  colorSizes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      colorId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "colorSizes",
    }
  );
  return colorSizes;
};
