'use strict';

const {
  Model
} = require('sequelize');

// import User from './user'
module.exports = (sequelize, DataTypes) => {
  class User_Information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Information.hasOne(models.User)

      User_Information.belongsTo(models.Order, {
        foreignKey: 'user_info'
      })
    }
  }
  User_Information.init({
    user_id: {
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 16]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 16]
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
        isProperLength(value){
          if(value.toString().length !== 10) throw new Error('Phone number must be 10 digits, Ex: "5555555555"')
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        isProperLength(value){
          if(value.toString().length !== 5) throw new Error('Zip code must be 5 digits, Ex: "12345"')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User_Information',
  });
  return User_Information;
};