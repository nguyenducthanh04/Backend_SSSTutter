"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // colors.hasMany(models.colorSizes, {
      //   foreignKey: "colorId",
      // });
      colors.belongsToMany(models.products, {
        through: "productColors",
        foreignKey: "colorId",
      });
      colors.belongsToMany(models.sizes, {
        through: "colorSizes",
        foreignKey: "colorId",
      });
    }
  }
  colors.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "colors",
    }
  );
  return colors;
};
