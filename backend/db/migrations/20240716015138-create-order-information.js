'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      order_number: {
        type: Sequelize.INTEGER,
        // primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bill_address: {
        type: Sequelize.STRING
      },
      bill_city: {
        type: Sequelize.STRING
      },
      bill_state: {
        type: Sequelize.STRING
      },
      bill_zip_code: {
        type: Sequelize.STRING(5)
      },
      ship_address: {
        type: Sequelize.STRING
      },
      ship_city: {
        type: Sequelize.STRING
      },
      ship_state: {
        type: Sequelize.STRING
      },
      ship_zip_code: {
        type: Sequelize.STRING(5)
      },
      card_number: {
        type: Sequelize.STRING(4)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Order_Informations'
    await queryInterface.dropTable(options);
  }
};