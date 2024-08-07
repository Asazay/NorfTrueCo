'use strict';

const {Review} = require('../models')

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
   await Review.bulkCreate([
    {
      user_id: 2,
      item_id: 9,
      comment: 'This is a great shirt. I Love it!',
      stars: 4
    },
    {
      user_id: 1,
      item_id: 2,
      comment: 'I really love this snapback. It has such a good quality!',
      stars: 5
    },
    {
      user_id: 3,
      item_id: 11,
      comment: 'I think its a nice product, but it shrunk a little.',
      stars: 3
    },
    {
      user_id: 2,
      item_id: 11,
      comment: "what's not to love about this!?",
      stars: 5
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1, 2]}
    })
  }
};
