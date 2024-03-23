"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // sizes.hasMany(models.colorSizes, {
      //   foreignKey: "sizeId",
      // });
      sizes.belongsToMany(models.products, {
        through: "productSizes",
        foreignKey: "sizeId",
      });
      sizes.belongsToMany(models.colors, {
        through: "colorSizes",
        foreignKey: "sizeId",
      });
    }
  }
  sizes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sizes",
    }
  );
  return sizes;
};
