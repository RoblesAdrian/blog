"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Posts", [
      { title: "Primer Post", body: "Esta práctica implementa un blog" },
      { title: "Segundo Post", body: "Todo el mundo puede crear posts" },
      {
        title: "Tercer Post",
        body: "Cada post puede tener una imagen adjunta.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
