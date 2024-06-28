'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
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
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Favorites'
    await queryInterface.dropTable(options);
  }
};