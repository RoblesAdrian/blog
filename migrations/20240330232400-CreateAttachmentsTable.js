"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Attachments",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        mime: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        image: {
          type: Sequelize.BLOB("long"),
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sync: { force: true },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Attachments");
  },
};
