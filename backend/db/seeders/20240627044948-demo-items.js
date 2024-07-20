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
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
        description: 'A comfy hat stitched with compassion.'
      },
      {
        name: 'Stay True Snapback',
        size: 'universal',
        color: 'red',
        price: 24.99,
        category: 'hats',
        gender: 'men',
        quantity: 3,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo-Alt.png',
        description: 'This norf true hat is crafted with love.'
      },
      {
        name: 'Norf True 2024',
        size: 'medium',
        color: 'black',
        price: 29.99,
        category: 'shirts',
        gender: 'men',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
        description: 'A 2024 exclusive made with the best cloth around.'
      },
      {
        name: 'World Peace',
        size: 'large',
        color: 'pink',
        price: 21.99,
        category: 'shirts',
        gender: 'men',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo-Alt.png',
        description: 'World peace is a important goal to strive for. Spread the message with this exclusive.'
      },
      {
        name: 'Norf Diva',
        size: 'small',
        color: 'yellow',
        price: 24.99,
        category: 'shirts',
        gender: 'women',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
        description: 'A shirt made truly for a diva. True to size.'
      },
      {
        name: 'Ripped Elegant',
        size: 'xxl',
        color: 'black',
        price: 24.99,
        category: 'pants',
        gender: 'men',
        quantity: 9,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo-Alt.png',
        description: 'Exclusive ripped jeans designed and made to fit you perfectly.'
      },
      {
        name: 'Blue Dreamer',
        size: 'xs',
        color: 'blue',
        price: 39.99,
        category: 'pants',
        gender: 'women',
        quantity: 7,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
        description: 'A abstract design focused around creativity.'
      },
      {
        name: 'Norf Socks',
        size: 'medium',
        color: 'white',
        price: 9.99,
        category: 'socks',
        gender: 'unisex',
        quantity: 20,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo-Alt.png',
        description: 'Norf true logo socks.'
      },
      {
        name: 'Norf True Messenger',
        size: 'universal',
        color: 'black',
        price: 49.99,
        category: 'accessories',
        gender: 'men',
        quantity: 12,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png',
        description: 'Exclusive release Norf True Co. messenger bag.'
      },
      {
        name: 'Norf True Scarf',
        size: 'universal',
        color: 'pink',
        price: 24.99,
        category: 'accessories',
        gender: 'women',
        quantity: 10,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo-Alt.png',
        description: 'A scarf made of the best cotton in the country. :)'
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
