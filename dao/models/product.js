'use strict';

module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {

    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  return Product;
};