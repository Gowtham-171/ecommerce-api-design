'use strict';

module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name is required"
        },
        len: {
          args: [2, 100],
          msg: "Product name must be between 2 and 100 characters"
        }
      }
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "Price must be a number"
        },
        min: {
          args: [0.01],
          msg: "Price must be greater than 0"
        }
      }
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Stock must be integer"
        },
        min: {
          args: [0],
          msg: "Stock cannot be negative"
        }
      }
    },
  });

  return Product;
};