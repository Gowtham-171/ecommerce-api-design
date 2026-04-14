'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'category_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
