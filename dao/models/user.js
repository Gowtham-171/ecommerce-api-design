'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "Email already exists"
      }
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }

  });

  return User;
}