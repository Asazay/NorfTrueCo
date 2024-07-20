'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Review, {
        foreignKey: 'item_id'
      })
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ['small', 'medium', 'large', 'xl', 'xxl', '3xl']
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isIn: ['red','blue', 'white', 'green', 'yellow', 'black', 'purple', 'pink']
      // }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        isFloat: true,
        isGreaterThanZero: true,
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidProduct(value){
          value = value.toLowerCase()
          if(value !== 'hats' || value !== 'shirts' || value !== 'hoodies' || value !== 'pants' || 
            value !== 'shorts' || value !== 'socks' || value !== 'accessories') throw new Error('Category must be hats, shirts, hoodies, pants, shorts, socks, or accessories')
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValid(value){
          value = value.toLowerCase();
          if(value !== 'men' || value !== "women" || value !== 'unisex') throw new Error('Gender must be men, women, or unisex')
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isGreaterThanZero: true,
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};