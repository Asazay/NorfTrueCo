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

      Order.hasOne(models.Order_Information, {
        foreignKey: 'order_number',
        onDelete: 'CASCADE',
      })

      Order.hasMany(models.Order_Item, {
        foreignKey: 'order_number',
        onDelete: 'CASCADE'
      })
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
      unique: true,
      validate: {
        isInt: true
      }
    },
    total_price:{
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    registered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        isBoolean(value){
          if(typeof value !== 'boolean') throw new Error('Registed field must be true or false')
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValid(value){
          value = value.toLowerCase()
          if(value === 'processing' || value === 'shipped' || value === 'delivered') return
          else throw new Error('Status must be "processing", "shipped", or "delivered"')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};