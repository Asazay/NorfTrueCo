'use strict';
const { Item } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Item.bulkCreate([
      // Hats
      {
        name: 'Black Snapback',
        size: 'universal',
        color: 'black',
        price: 14.99,
        category: 'hats',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Snapbacks/Black+snapback.jpg',
        description: 'A black snapback hat made with high quality cotton.'
      },
      {
        name: 'Blue Snapback',
        size: 'universal',
        color: 'blue',
        price: 14.99,
        category: 'hats',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Snapbacks/Blue+snapback.jpg',
        description: 'A blue snapback hat made with high quality cotton.'
      },
      {
        name: 'Red Snapback',
        size: 'universal',
        color: 'red',
        price: 14.99,
        category: 'hats',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Snapbacks/Red+Snapback.jpeg',
        description: 'A red snapback hat made with high quality cotton.'
      },
      {
        name: 'White Snapback',
        size: 'universal',
        color: 'white',
        price: 14.99,
        category: 'hats',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Snapbacks/White+snapback.jpg',
        description: 'A red snapback hat made with high quality cotton.'
      },
      //Hoodies
      {
        name: 'Black Hoodie',
        size: 'medium',
        color: 'black',
        price: 29.99,
        category: 'hoodies',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Hoodies/Men+black+hoodie.jpg',
        description: 'A black hoodie made with high quality cotton.'
      },
      {
        name: 'Red Hoodie',
        size: 'large',
        color: 'red',
        price: 29.99,
        category: 'hoodies',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Hoodies/Men+red+hoodie.jpg',
        description: 'A red hoodie made with high quality cotton.'
      },
      {
        name: 'Grey Hoodie',
        size: 'small',
        color: 'grey',
        price: 29.99,
        category: 'hoodies',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Hoodies/women+grey+sweat+hoodie.jpg',
        description: 'A grey hoodie made with high quality cotton.'
      },
      {
        name: 'Purple Hoodie',
        size: 'xl',
        color: 'purple',
        price: 29.99,
        category: 'hoodies',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Hoodies/Women+purple+hoodie.jpg',
        description: 'A purple hoodie made with high quality cotton.'
      },
      //Shirts
      {
        name: 'Black Shirt',
        size: 'xxl',
        color: 'black',
        price: 19.99,
        category: 'shirts',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shirts/Men+black+shirt.jpg',
        description: 'A black shirt made with high quality cotton.'
      },
      {
        name: 'Blue Shirt',
        size: '3xl',
        color: 'blue',
        price: 19.99,
        category: 'shirts',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shirts/Men+blue+shirt.jpg',
        description: 'A blue shirt made with high quality cotton.'
      },
      {
        name: 'Red Shirt',
        size: '3xl',
        color: 'red',
        price: 19.99,
        category: 'shirts',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shirts/Men+red+shirt.jpg',
        description: 'A red shirt made with high quality cotton.'
      },
      {
        name: 'Pink Shirt',
        size: 'medium',
        color: 'pink',
        price: 19.99,
        category: 'shirts',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shirts/Pink+shirt.jpg',
        description: 'A pink shirt made with high quality cotton.'
      },
      {
        name: 'Yellow Shirt',
        size: 'xxl',
        color: 'yellow',
        price: 19.99,
        category: 'shirts',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shirts/Yellow+shirt.jpg',
        description: 'A yellow shirt made with high quality cotton.'
      },
      //Pants
      {
        name: 'Black Pants',
        size: 'medium',
        color: 'black',
        price: 34.99,
        category: 'pants',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Pants/Men+black+pants.jpeg',
        description: 'A pair of black pants made with high quality cotton.'
      },
      {
        name: 'Red Pants',
        size: 'large',
        color: 'black',
        price: 34.99,
        category: 'pants',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Pants/Men+red+pants.jpg',
        description: 'A pair of red pants made with high quality cotton.'
      },
      {
        name: 'White Pants',
        size: 'xxl',
        color: 'white',
        price: 34.99,
        category: 'pants',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Pants/Men+white+pants.jpg',
        description: 'A pair of white pants made with high quality cotton.'
      },
      {
        name: 'Vintage Blue Pants',
        size: 'medium',
        color: 'blue',
        price: 39.99,
        category: 'pants',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Pants/Women+pants+blue.jpg',
        description: 'A pair of blue pants made with high quality cotton.'
      },
      {
        name: 'Vintage Pink Pants',
        size: 'small',
        color: 'pink',
        price: 39.99,
        category: 'pants',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Pants/Women+pants+pink.jpg',
        description: 'A pair of pink pants made with high quality cotton.'
      },
      //Shorts
      {
        name: 'Black Shorts',
        size: 'medium',
        color: 'black',
        price: 24.99,
        category: 'shorts',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shorts/Men+shorts+black.jpg',
        description: 'A pair of black shorts made with high quality cotton.'
      },
      {
        name: 'Red Shorts',
        size: 'large',
        color: 'black',
        price: 24.99,
        category: 'shorts',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shorts/Men+shorts+red.jpg',
        description: 'A pair of red shorts made with high quality cotton.'
      },
      {
        name: 'Vintage Pink Shorts',
        size: 'small',
        color: 'pink',
        price: 17.99,
        category: 'shorts',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shorts/Women+pink+shorts.jpg',
        description: 'A pair of pink shorts made with high quality cotton.'
      },
      {
        name: 'Vintage Blue Shorts',
        size: 'large',
        color: 'blue',
        price: 17.99,
        category: 'shorts',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/shorts/Women+shorts+blue.jpg',
        description: 'A pair of blue shorts made with high quality cotton.'
      },
      //Socks
      {
        name: 'Black Socks',
        size: 'large',
        color: 'black',
        price: 4.99,
        category: 'socks',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/socks/Black+socks.jpg',
        description: 'A pair of blue socks made with high quality cotton.'
      },
      {
        name: 'Blue Socks',
        size: 'small',
        color: 'blue',
        price: 4.99,
        category: 'socks',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/socks/blue+socks.jpg',
        description: 'A pair of blue socks made with high quality cotton.'
      },
      {
        name: 'Pink Socks',
        size: 'xl',
        color: 'pink',
        price: 7.99,
        category: 'socks',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/socks/pink+socks.jpg',
        description: 'A pair of pink socks made with high quality cotton.'
      },
      {
        name: 'Red Socks',
        size: 'small',
        color: 'red',
        price: 7.99,
        category: 'socks',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/socks/red+socks.jpg',
        description: 'A pair of red socks made with high quality cotton.'
      },
      //Accessories
      {
        name: 'Black Belt',
        size: 'medium',
        color: 'black',
        price: 8.99,
        category: 'accessories',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Accessories/Black+belt.jpg',
        description: 'A black belt made with high quality leather.'
      },
      {
        name: 'Black Messenger Bag',
        size: 'universal',
        color: 'black',
        price: 129.99,
        category: 'accessories',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Accessories/Black+Messenger+Bag.jpg',
        description: 'A black messenger bag made with high quality leather.'
      },
      {
        name: 'Octo Glasses',
        size: 'universal',
        color: 'blue',
        price: 12.99,
        category: 'accessories',
        gender: 'men',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Accessories/Octo+glasses.jpg',
        description: 'A pair of designer glasses crafted with with best glass.'
      },
      {
        name: 'Pink Scarf',
        size: 'universal',
        color: 'pink',
        price: 14.99,
        category: 'accessories',
        gender: 'women',
        quantity: 5,
        image: 'https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Accessories/Pink+scarf.jpg',
        description: 'A pink scarf high quality cotton.'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Items'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['Black Snapback', 'Blue Snapback', 'Red Snapback', 'White Snapback', 'Black Hoodie', 'Red Hoodie', 'Grey Hoodie', 'Purple Hoodie',
          'Black Shirt', 'Blue Shirt', 'Red Shirt', 'Pink Shirt', 'Yellow Shirt', 'Black Pants', 'Red Pants', 'White Pants', 'Vintage Blue Pants',
          'Vintage Pink Pants', 'Black Shorts', 'Red Shorts', 'Vintage Pink Shorts', 'Vintage Blue Shorts', 'Black Socks', 'Blue Socks', 'Pink Socks', 
          'Red Socks', 'Black Belt', 'Black Messenger Bag', 'Octo Glasses', 'Pink Scarf' 
          ]
      }
    }, {});
  }
};
