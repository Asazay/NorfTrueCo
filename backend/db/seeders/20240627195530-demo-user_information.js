'use strict';

const {User_Information} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User_Information.bulkCreate([
      {
        user_id: 1,
        first_name: 'Demo',
        last_name: 'Lition',
        phone: 5555555555,
        address: '1234 One Way Ave',
        city: 'Lansing',
        state: 'MI',
        zip_code: 48864
      },
      {
        user_id: 2,
        first_name: 'Fake',
        last_name: 'User1',
        phone: 5554445555,
        address: '5354 Femi Dr',
        city: 'Buckhead',
        state: 'GA',
        zip_code: 30625
      },
      {
        user_id: 3,
        first_name: 'Fake',
        last_name: 'User2',
        phone: 4443335555
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
    options.tableName = 'user_information';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
