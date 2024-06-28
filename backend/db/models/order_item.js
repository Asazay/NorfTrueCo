'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Item.init({
    order_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // validate: {
      //   isInt: true,
      //   isGreaterThanZero(value){
      //     if(parseInt(value) < 0) throw new Error('Quantity can not be less than 0')
      //   }
      // }
    }
  }, {
    sequelize,
    modelName: 'Order_Item',
    // indexes: [
    //   {
    //     name: 'unique_order_items',
    //     unique: true,
    //     fields: ['order_number', 'item_id']
    //   }
    // ]
  });
  return Order_Item;
};