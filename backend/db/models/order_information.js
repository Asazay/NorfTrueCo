'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Information.belongsTo(models.Order, {
        foreignKey: 'order_number'
      })
    }
  }
  Order_Information.init({
    order_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bill_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bill_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bill_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bill_zip_code: {
      type: DataTypes.STRING,
      // validate: {
      //   isInteger(value){
      //     if(typeof parseInt(value) !== 'number') throw new Error('Invalid zip code')
      //   }
      // }
    },
    ship_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ship_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ship_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ship_zip_code: {
      type: DataTypes.STRING,
      // validate: {
      //   isInteger(value){
      //     if(typeof parseInt(value) !== 'number') throw new Error('Invalid zip code')
      //   }
      // }
    },
    card_number: {
      type: DataTypes.STRING,
      // validate: {
      //   isInteger(value){
      //     if(typeof parseInt(value) !== 'number') throw new Error('Invalid card number: last 4 digits only')
      //   }
      // }
    },
  }, {
    sequelize,
    modelName: 'Order_Information',
  });
  return Order_Information;
};