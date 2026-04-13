'use strict';

module.exports = (sequelize, DataTypes) => {

  const Order = sequelize.define('Order', {

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "user_id is required" },
        isInt: { msg: "user_id must be integer" }
      }
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "product_id is required" },
        isInt: { msg: "product_id must be integer" }
      }
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "quantity is required" },
        isInt: { msg: "quantity must be integer" },
        min: {
          args: [1],
          msg: "quantity must be greater than 0"
        }
      }
    },

    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "total_price required" },
        isFloat: { msg: "total_price must be number" },
        min: {
          args: [0],
          msg: "total_price must be positive"
        }
      }
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: {
          args: [["pending", "placed", "shipped", "delivered", "cancelled"]],
          msg: "Invalid status"
        }
      }
    }

  }, {
    tableName: "orders"
  });

  Order.associate = (models) => {

    Order.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });

    Order.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product"
    });

  };

  return Order;
};