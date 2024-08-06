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
      item_id: 6,
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Hoodies/Men+red+hoodie.jpg',
      name: 'Red Hoodie',
      size: 'medium',
      color: 'Red',
      price: 29.99,
      quantity: 1,
    },
    {
      order_number: 2024001,
      item_id: 19,
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shorts/Men+shorts+black.jpg',
      name: 'Black Shorts',
      size: 'large',
      color: 'Black',
      price: 24.99,
      quantity: 2
    },
    {
      order_number: 2024002,
      item_id: 22,
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shorts/Women+shorts+blue.jpg',
      name: 'Vintage Blue Shorts',
      size: 'small',
      color: 'Blue',
      price: 17.99,
      quantity: 1
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
    options.tableName = 'Order_Items';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      order_number: {[Op.in]: [2024001, 2024002]}
    })
  }
};
