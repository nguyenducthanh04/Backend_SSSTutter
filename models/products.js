"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.types, {
        foreignKey: "typeId",
      });
      products.belongsTo(models.statuses, {
        foreignKey: "statusId",
      });
      products.hasOne(models.productImages, {
        foreignKey: "productId",
      });
      products.belongsToMany(models.colors, {
        through: "productColors",
        foreignKey: "productId",
      });
      products.belongsToMany(models.sizes, {
        through: "productSizes",
        foreignKey: "productId",
      });
    }
  }
  products.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
