'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });
      Order.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product"
      });
    }
  }

  Order.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  
  return Order;
};