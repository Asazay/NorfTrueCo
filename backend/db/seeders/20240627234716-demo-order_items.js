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
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
      name: 'Norf True Snapback',
      size: 'universal',
      color: 'red',
      price: 24.99,
      quantity: 3,
    },
    {
      order_number: 2024001,
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
      name: 'Stay True Snapback',
      size: 'universal',
      color: 'red',
      price: 24.99,
      quantity: 5
    },
    {
      order_number: 2024002,
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
      name: 'World Peace',
      size: 'small',
      color: 'pink',
      price: 21.99,
      quantity: 2
    },
    {
      order_number: 2024002,
      image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
      name: 'Blue Dreamer',
      size: 'small',
      color: 'blue',
      price: 39.99,
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
