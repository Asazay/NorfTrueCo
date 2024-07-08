'use strict';
const { Item } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Item.bulkCreate([
      {
        name: 'Norf True Snapback',
        size: 'universal',
        color: 'red',
        price: 24.99,
        category: 'hats',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Stay True Snapback',
        size: 'universal',
        color: 'red',
        price: 24.99,
        category: 'hats',
        gender: 'men',
        quantity: 3,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Norf True 2024',
        size: 'medium',
        color: 'black',
        price: 29.99,
        category: 'shirts',
        gender: 'unisex',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'World Peace',
        size: 'large',
        color: 'pink',
        price: 21.99,
        category: 'shirts',
        gender: 'unisex',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Norf Diva',
        size: 'small',
        color: 'yellow',
        price: 24.99,
        category: 'shirts',
        gender: 'women',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Ripped Elegant',
        size: 'xxl',
        color: 'black',
        price: 24.99,
        category: 'pants',
        gender: 'men',
        quantity: 9,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Blue Dreamer',
        size: 'xs',
        color: 'blue',
        price: 39.99,
        category: 'pants',
        gender: 'women',
        quantity: 7,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Norf Socks',
        size: 'medium',
        color: 'white',
        price: 9.99,
        category: 'socks',
        gender: 'unisex',
        quantity: 20,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Norf True Messenger',
        size: 'universal',
        color: 'black',
        price: 49.99,
        category: 'accessories',
        gender: 'men',
        quantity: 12,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
      {
        name: 'Norf True Scarf',
        size: 'universal',
        color: 'pink',
        price: 24.99,
        category: 'accessories',
        gender: 'unisex',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Items'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['Norf True Snapback', 'Stay True Snapback', 'Norf True 2024', 'World Peace',
          'Norf Diva', 'Ripped Elegant', 'Blue Dreamer', 'Norf Socks', 'Norf True Messenger',
          'Norf True Scarf'
        ]
      }
    }, {});
  }
};
