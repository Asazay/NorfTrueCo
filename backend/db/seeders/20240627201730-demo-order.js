'use strict';
const {Order} = require('../models')

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
   await Order.bulkCreate([
    {
      user_id: 1,
      order_number: 2024001,
      total_price: 52.98,
      registered: true,
      status: 'shipped'
    },
    {
      user_id: 1,
      order_number: 2024002,
      total_price: 64.98,
      registered: true,
      status: 'processing'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Orders';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1]}
    })
  }
};
