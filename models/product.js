'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category"
      });

      Product.hasMany(models.Order, {
        foreignKey: "product_id",
        as: "orders"
      });
    }
  }

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  
  return Product;
};