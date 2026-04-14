'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        len: {
          args: [3, 50],
          msg: "Name must be between 3 and 50 characters"
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exists"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters"
        }
      }
    }

  });
  
  return User;
};