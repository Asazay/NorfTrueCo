'use strict';

const {User_Information} = require('../models')

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
   await User_Information.bulkCreate([
    {
      user_id: 1,
      first_name: 'Demo',
      last_name: 'Lition',
      phone: 5551112222,
      address: '1234 Driven Way',
      city: 'Atlanta',
      state: 'GA',
      zip_code: 12345
    },
    {
      user_id: 2,
      first_name: 'Fake',
      last_name: 'User',
      phone: 2229992222,
      address: '4321 Driven Way',
      city: 'Atlanta',
      state: 'GA',
      zip_code: 12345
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
    options.tableName = 'User_Informations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1, 2]}
    });
  }
};
