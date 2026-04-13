'use strict';

module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Category name is required"
        },
        notEmpty: {
          msg: "Category name cannot be empty"
        },
        len: {
          args: [2, 50],
          msg: "Category name must be between 2 and 50 characters"
        }
      }
    }

  }, {
    tableName: "categories"
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      as: "products"
    });
  };

  return Category;
};