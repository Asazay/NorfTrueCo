'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'id'
      });

      Order.belongsToMany(models.Item, {
        through: 'order_items'
      })

      Order.hasOne(models.User_Information, {
        as: 'user_information'
      });
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    user_info: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    registered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        isBoolean(value){
          value = value.toLowerCase()
          if(value !== 'true' || value !== 'false') throw new Error('Registered must be true or false')
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValid(value){
          value = value.toLowerCase()
          if(value !== 'processing' || value !== 'shipped') throw new Error('Status must be "processing" or "shipped"')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};