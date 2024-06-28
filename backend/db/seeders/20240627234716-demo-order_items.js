'use strict';

const {Order_Item} = require('../models')

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
   await Order_Item.bulkCreate([
    {
      order_number: 2024001,
      item_id: 3,
      item_quantity: 1
    },
    {
      order_number: 2024001,
      item_id: 2,
      item_quantity: 1
    },
    {
      order_number: 2024001,
      item_id: 7,
      item_quantity: 1
    },
    {
      order_number: 2024002,
      item_id: 4,
      item_quantity: 1
    },
    {
      order_number: 2024002,
      item_id: 6,
      item_quantity: 1
    },
    {
      order_number: 2024002,
      item_id: 10,
      item_quantity: 1
    },
    {
      order_number: 2024002,
      item_id: 9,
      item_quantity: 1
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
    options.tableName = 'order_items';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      order_number: {[Op.in]: [2024001, 2024002]}
    })
  }
};
