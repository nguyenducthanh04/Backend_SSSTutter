"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(200),
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: { model: "types", key: "id" },
        onDelete: "CASCADE",
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: { model: "statuses", key: "id" },
        onDelete: "CASCADE",
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
