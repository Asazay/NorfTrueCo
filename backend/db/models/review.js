'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Review.belongsTo(models.Item, {
        foreignKey: 'item_id'
      });

    }
  }
  Review.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};