"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productImages.belongsTo(models.products, {
        foreignKey: "productId",
      });
    }
  }
  productImages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: DataTypes.STRING,
      filePath: DataTypes.STRING,
      main: DataTypes.TINYINT,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productImages",
    }
  );
  return productImages;
};
