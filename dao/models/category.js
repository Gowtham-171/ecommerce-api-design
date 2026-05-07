'use strict';

module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }

    });

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: "categoryId"
        });
    };

    return Category;
};