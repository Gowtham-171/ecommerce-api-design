'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {

    const password = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert('Users', [

      {
        name: 'Gowtham S',
        email: 'gowtham@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arun Kumar',
        email: 'arun@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vignesh R',
        email: 'vignesh@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Karthik M',
        email: 'karthik@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Praveen Kumar',
        email: 'praveen@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sathish B',
        email: 'sathish@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ramesh K',
        email: 'ramesh@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dinesh Kumar',
        email: 'dinesh@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manoj P',
        email: 'manoj@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vijay Kumar',
        email: 'vijay@example.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};