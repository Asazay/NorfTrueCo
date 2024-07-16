'use strict';
const {Order_Information} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await Order_Information.bulkCreate([
      {
        order_number: 2024001,
        first_name: 'Demo',
        last_name: 'Lition',
        email: 'demo@user.io',
        bill_address: '1234 Happy Lane',
        bill_city: 'Maricopa',
        bill_state: 'AZ',
        bill_zip_code: '85286',
        ship_address: '1234 Happy Lane',
        ship_city: 'Maricopa',
        ship_state: 'AZ',
        ship_zip_code: '85286',
        card_number: '5489',
      },
      {
        order_number: 2024002,
        first_name: 'Demo',
        last_name: 'Lition',
        email: 'demo@user.io',
        bill_address: '1234 Happy Lane',
        bill_city: 'Maricopa',
        bill_state: 'AZ',
        bill_zip_code: '85286',
        ship_address: '8898 Flanders Way',
        ship_city: 'New York',
        ship_state: 'NY',
        ship_zip_code: '55555',
        card_number: '5489'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Order_Informations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      order_number: {[Op.in]: [2024001, 2024002]}
    })
  }
};
