'use strict';

const {Wishlist} = require('../models')

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
   await Wishlist.bulkCreate([
    {
      user_id: 1,
      item_id: 4
    },
    {
      user_id: 1,
      item_id: 8
    },
    {
      user_id: 2,
      item_id: 5
    },
    {
      user_id: 3,
      item_id: 7
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
    options.tableName = 'Wishlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1,2,3]}
    })
  }
};
