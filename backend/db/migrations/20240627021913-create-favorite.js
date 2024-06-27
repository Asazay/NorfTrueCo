'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favorites', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(Sequelize.literal('CURRENT_TIMESTAMP'))
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(Sequelize.literal('CURRENT_TIMESTAMP'))
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('favorites');
  }
};